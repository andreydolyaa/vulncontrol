import { server } from "../../../index.js";
import { subscriptionPaths } from "../../constants/common.js";
import { NmapScan } from "../../models/nmap-model.js";
import { extractIP, loggerWrapper } from "../../utils/index.js";
import { create, update } from "../db-actions/db-actions.js";
import { Docker } from "../docker/docker.js";
import {
  DOCKER_IMAGES,
  PROC_SIGNAL,
  PROC_STATUS,
  PROC_STREAM_EVENT,
} from "../../constants/processes.js";

export class Nmap extends Docker {
  constructor(request) {
    super(DOCKER_IMAGES.NMAP);
    this.process = null;
    this.scan = null;
    this.request = request;
  }

  static containerName(id) {
    return Docker.constructContainerName("nmap_", id);
  }

  static async abortScan(scanId) {
    await Docker.abort(Nmap.containerName(scanId));
  }

  static log(msg) {
    loggerWrapper("NMAP | ", msg);
  }

  async _init() {
    const args = this.request.args.join(" ");

    this.scan = await create(NmapScan, {
      command: args,
      userId: this.request.userId,
      scanType: this.request.scanType,
      status: PROC_STATUS.LIVE,
      startTime: this._setTime(),
      target: extractIP(args),
    });
  }

  async start() {
    try {
      await this._init();
      await this._insertServerMessage("starting nmap docker image...");
      await this._insertServerMessage("starting nmap scan...");
      await this._insertServerMessage(`nmap ${this.request.args.join(" ")} -v`);

      this.process = await this.run(
        this.request.args,
        Nmap.containerName(this.scan.id)
      );

      this._handleStandardStream();
      Nmap.log("warn: scan started");
      return this.scan;
    } catch (error) {
      Nmap.log(`err: error starting scan [${error}]`);
    }
  }

  _handleStandardStream() {
    const p = this.process;
    p.stdout.on(PROC_STREAM_EVENT.DATA, (data) =>
      this._stdout(data.toString())
    );
    p.stderr.on(PROC_STREAM_EVENT.DATA, (data) =>
      this._stderr(data.toString())
    );
    p.on(PROC_STREAM_EVENT.EXIT, (code, signal) => this._exit(code, signal));
    p.on(PROC_STREAM_EVENT.CLOSE, (code, signal) => this._close(code, signal));
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
    return code === 0
      ? await this._setExitStatus(PROC_STATUS.DONE)
      : code === 1
      ? await this._setExitStatus(PROC_STATUS.FAILED)
      : code === null && signal === PROC_SIGNAL.SIGKILL
      ? await this._setExitStatus(PROC_STATUS.ABORTED)
      : null;
  }

  async _setExitStatus(status) {
    await this._insertServerMessage(`scan ${status}!`);
    await this._updateScanInDatabase({ status, endTime: this._setTime() });
    this._sendToast(status);
    Nmap.log(`info: scan ${status}`);
  }

  _close(code, signal) {
    Docker.processes.delete(Nmap.containerName(this.scan.id));
    Nmap.log(`info: process closed`);
  }

  _setTime() {
    return new Date().toISOString();
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

  async _insertServerMessage(message) {
    const update = { $push: { stdout: `server: ${message}\n` } };
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
