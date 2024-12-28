import { subscriptionPaths } from "../../constants/common.js";
import { NmapScan } from "../../models/nmap-model.js";
import { create } from "../actions/db-actions.js";
import { Docker } from "../docker/docker.js";
import { Utils } from "../utils/utils.js";
import { StreamListener } from "../stream-listener/stream-listener.js";
import { HttpActions } from "../actions/http-actions.js";
import {
  DOCKER_IMAGES,
  NMAP_ARG,
  NMAP_BIN,
  PROC_STATUS,
} from "../../constants/processes.js";
import { GeoIp } from "../geoip/geoip.js";

export class Nmap extends Docker {
  static containerName = "";

  constructor(request) {
    super();
    this.process = null;
    this.scan = null;
    this.request = request;
  }

  static async abortScan(scanId) {
    await Docker.abort(scanId);
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
      await this._writeServerMessage([
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

      this._notify(this.scan, "toast", this.request.userId);

      // resolve target domain to ip
      const ipData = await GeoIp.resolveDomain(this.scan.target);
      // write ip data to scan doc
      await this._updateDb({ ipData: ipData });
      // get first ipv4 address from results
      const ipToGetData = GeoIp.getIPv4Address(ipData);
      // look up go geolocation by resolved ip
      const geoData = GeoIp.lookup(ipToGetData);
      // insert/update data in db
      if (geoData) {
        if (geoData.ll[0] == null || geoData.ll[1] == null) {
          geoData.ll = [31, 31];
        }
        await GeoIp.upsertData(
          geoData,
          ipToGetData,
          this.scan.id,
          this.scan.target,
          "Nmap"
        );

        await this._updateDb({ geoData });
      }

      Nmap.log("warn: scan started");
      return this.scan;
    } catch (error) {
      Nmap.log(`err: error starting scan [${error}]`);
    }
  }

  async _stdout(data) {
    const port = await this._isOpenPort(data);

    if (port) {
      await this._updateDb(this._wrap({ openPorts: port }));
    }
    await this._updateDb(this._wrap({ stdout: data }));
  }

  async _stderr(data) {
    await this._updateDb(this._wrap({ stdout: data }));
  }

  async _exit(code, signal) {
    return await this._setExitStatus(
      Utils.handleStreamExitStatus(code, signal)
    );
  }

  async _setExitStatus(status) {
    await this._writeServerMessage(`scan ${status}!`);
    await this._updateDb({
      status,
      endTime: Utils.setCurrentTime(),
    });
    this._notify(this.scan, "toast", this.request.userId);
    Nmap.log(`info: scan ${status}`);
  }

  _close(code, signal) {}

  async _updateDb(data) {
    this.scan = await HttpActions.updateDb(NmapScan, data, this.scan._id);
    this._notify(this.scan, NMAP_BIN, this.request.userId);
  }

  async _writeServerMessage(data) {
    await HttpActions.writeServerMessage(NmapScan, data, this.scan._id);
  }

  _notify(data, module = NMAP_BIN, userId) {
    HttpActions.notify(subscriptionPaths.NMAP_ALL, data, module, userId);
    HttpActions.notify(`/nmap/${this.scan.id}`, data, module, userId);
  }

  _wrap(data) {
    return { $push: data };
  }

  async _isOpenPort(stdout) {
    const port = stdout.includes("Discovered open port")
      ? stdout
          .split(" ")
          .find((part) => part.includes("/tcp") || part.includes("/udp"))
      : null;
    return port ? parseInt(port) : undefined;
  }
}
