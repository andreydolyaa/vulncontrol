import { server } from "../../../index.js";
import { subscriptionPaths } from "../../constants/common.js";
import { NmapScan } from "../../models/nmap-model.js";
import { create, update } from "../db-actions/db-actions.js";
import { Docker } from "../docker/docker.js";
import { Utils } from "../utils/Utils.js";
import {
  DOCKER_IMAGES,
  NMAP_ARG,
  NMAP_BIN,
  PROC_STATUS,
  PROC_STREAM_EVENT,
} from "../../constants/processes.js";
import { StreamListener } from "../stream-listener/stream-listener.js";

export class Nmap extends Docker {
  static containerName = "";

  constructor(request) {
    super();
    this.process = null;
    this.scan = null;
    this.request = request;
    this.streamListener = null;
  }

  static async abortScan() {
    await Docker.abort(Nmap.containerName);
  }

  static log(msg) {
    Utils.logWrapper(NMAP_BIN, msg);
  }

  async _init() {
    const args = this.request.args.join(" ");

    this.scan = await create(NmapScan, {
      command: args,
      userId: this.request.userId,
      scanType: this.request.scanType,
      status: PROC_STATUS.LIVE,
      startTime: Utils.setCurrentTime(),
      target: Utils.extractIPAddress(args),
    });

    Nmap.containerName = Docker.assignContainerName(NMAP_BIN, this.scan.id);
  }

  async start() {
    try {
      await this._init();
      await this._insertServerMsgs([
        "starting nmap docker image...",
        "starting nmap scan...",
        `nmap ${this.request.args.join(" ")} -v`,
      ]);

      if (!this.request.args.includes(NMAP_ARG.VERBOSE))
        this.request.args.push(NMAP_ARG.VERBOSE);

      this.process = await Docker.run(
        DOCKER_IMAGES.NMAP,
        Nmap.containerName,
        this.request.args
      );

      new StreamListener(this.process, {
        stdout: this._stdout.bind(this),
        stderr: this._stderr.bind(this),
        exit: this._exit.bind(this),
        close: this._close.bind(this),
      });

      Nmap.log("warn: scan started");
      return this.scan;
    } catch (error) {
      Nmap.log(`err: error starting scan [${error}]`);
    }
  }

  async _stdout(data) {
    const port = await this._isOpenPort(data);

    if (port) {
      await this._updateScanInDatabase(this._wrap({ openPorts: port }));
    }
    await this._updateScanInDatabase(this._wrap({ stdout: data }));
  }

  async _stderr(data) {
    await this._updateScanInDatabase(this._wrap({ stdout: data }));
  }

  async _exit(code, signal) {
    return await this._setNmapExitStatus(
      Utils.handleStreamExitStatus(code, signal)
    );
  }

  async _setNmapExitStatus(status) {
    await this._insertServerMsgs([`scan ${status}!`]);
    await this._updateScanInDatabase({
      status,
      endTime: Utils.setCurrentTime(),
    });
    this._sendToast(status);
    Nmap.log(`info: scan ${status}`);
  }

  _close(code, signal) {
    Docker.processes.delete(Nmap.containerName);
    Nmap.log(`info: process closed`);
  }

  async _updateScanInDatabase(data) {
    try {
      this.scan = await update(NmapScan, data, this.scan._id);
      this._sendNotification(this.scan);
      Nmap.log(`info: updating db...`);
    } catch (error) {
      Nmap.log(`error: failed to update db`);
    }
  }

  async _isOpenPort(stdout) {
    const port = stdout.includes("Discovered open port")
      ? stdout
          .split(" ")
          .find((part) => part.includes("/tcp") || part.includes("/udp"))
      : null;
    return port ? parseInt(port) : undefined;
  }

  async _insertServerMsgs(messages) {
    const update = {
      $push: {
        stdout: {
          $each: messages.map((msg) => `server: ${msg}\n`),
        },
      },
    };
    try {
      await this._updateScanInDatabase(update);
    } catch (error) {
      Nmap.log(`error: failed to insert server message`);
    }
  }

  _sendNotification(data) {
    server.websocketServer.updateSubsAtSubscription(
      subscriptionPaths.NMAP_ALL,
      data
    );
    server.websocketServer.updateSubsAtSubscription(
      `/nmap/${this.scan.id}`,
      data
    );
  }

  _sendToast(status) {
    const messageWrapper = {
      type: status,
      scan: this.scan,
    };
    this._sendNotification(messageWrapper);
  }

  _wrap(data) {
    return { $push: data };
  }
}
