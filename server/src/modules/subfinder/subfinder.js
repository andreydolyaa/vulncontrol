import { Docker } from "../docker/docker.js";
import { Utils } from "../utils/utils.js";
import { create } from "../actions/db-actions.js";
import { SubfinderScan } from "../../models/subfinder-model.js";
import { StreamListener } from "../stream-listener/stream-listener.js";
import { subscriptionPaths } from "../../constants/common.js";
import { HttpActions } from "../actions/http-actions.js";
import {
  DOCKER_IMAGES,
  PROC_STATUS,
  SUBFINDER_ARG,
  SUBFINDER_BIN,
} from "../../constants/processes.js";
import { GeoIp } from "../geoip/geoip.js";

export class Subfinder extends Docker {
  static containerName = "";

  constructor(request) {
    super();
    this.process = null;
    this.scan = null;
    this.request = request;
  }

  static log(msg) {
    Utils.logWrapper(SUBFINDER_BIN, msg);
  }

  async _init() {
    this.scan = await create(SubfinderScan, {
      userId: this.request.userId,
      scanType: this.request.scanType,
      status: PROC_STATUS.LIVE,
      startTime: Utils.setCurrentTime(),
      target: Utils.extractDomainAddress(this.request.domain),
      domain: this.request.domain,
    });

    Subfinder.containerName = Docker.assignContainerName(
      SUBFINDER_BIN,
      this.scan.id
    );
  }

  async start() {
    try {
      await this._init();

      const scanSettings = [
        SUBFINDER_ARG.DOMAIN,
        this.scan.target,
        SUBFINDER_ARG.SILENT,
      ];

      this.process = await Docker.run(
        DOCKER_IMAGES.SUBFINDER,
        Subfinder.containerName,
        scanSettings
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
          geoData.ll = [31,31]          
        }
        await GeoIp.upsertData(
          geoData,
          ipToGetData,
          this.scan.id,
          this.scan.target,
          "Subfinder"
        );

        await this._updateDb({ geoData });
      }

      Subfinder.log("warn: scan started");
      return this.scan;
    } catch (error) {
      Subfinder.log(`err: error starting scan [${error}]`);
    }
  }
  async _stdout(data) {
    const subdomains = !data ? "" : data.trim().split("\n");
    Subfinder.log(
      `warn: found ${subdomains?.length || 0} subdomains [${this.scan.target}]`
    );
    await this._updateDb({ $push: { subdomains: { $each: subdomains } } });
  }

  async _stderr(data) {
    Subfinder.log(`warn: stderr: ${data}`);
  }

  async _exit(code, signal) {
    const status = Utils.handleStreamExitStatus(code, signal);
    await this._updateDb({
      endTime: Utils.setCurrentTime(),
      status,
    });
    this._notify(this.scan, "toast", this.request.userId);
    Subfinder.log(`info: scan ${status}`);
  }

  _close(code, signal) {}

  _notify(data, module = SUBFINDER_BIN, userId) {
    HttpActions.notify(subscriptionPaths.SUBFINDER_ALL, data, module, userId);
  }

  async _updateDb(data) {
    this.scan = await HttpActions.updateDb(SubfinderScan, data, this.scan._id);
    this._notify(this.scan, SUBFINDER_BIN, this.request.userId);
  }
}
