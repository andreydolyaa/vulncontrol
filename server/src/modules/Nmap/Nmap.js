import { server } from "../../../index.js";
import { subscriptionPaths } from "../../constants/common.js";
import logger from "../../core/logger.js";
import { NmapScan } from "../../models/nmap-model.js";
import { extractIP } from "../../utils/index.js";
import { create, update } from "../db-actions/db-actions.js";
import { Docker } from "../docker/docker.js";

export class Nmap extends Docker {
  constructor(request) {
    super("instrumentisto/nmap");
    this.process = null;
    this.scan = null;
    this.request = request;
  }

  static constructContainerName(id) {
    return "nmap_" + id;
  }

  static async abortScan(scanId) {
    await Docker.abort(Nmap.constructContainerName(scanId));
  }

  async _init() {
    const args = this.request.args.join(" ");

    this.scan = await create(NmapScan, {
      command: args,
      userId: this.request.userId,
      scanType: this.request.scanType,
      status: "live",
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
        Nmap.constructContainerName(this.scan.id),
        this.scan.id
      );

      this._handleEvents();
      logger.info(`NMAP | scan started`);
      return this.scan;
    } catch (error) {
      logger.error(`NMAP | error starting scan [${error}]`);
    }
  }

  _handleEvents() {
    const p = this.process;
    p.stdout.on("data", (data) => this._stdout(data.toString()));
    p.stderr.on("data", (data) => this._stderr(data.toString()));
    p.on("exit", (code, signal) => this._exit(code, signal));
    p.on("close", (code, signal) => this._close(code, signal));
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
      ? await this._setExitStatus("done")
      : code === 1
      ? await this._setExitStatus("failed")
      : code === null && signal === "SIGKILL"
      ? await this._setExitStatus("aborted")
      : null;
  }

  async _setExitStatus(status) {
    await this._insertServerMessage(`scan ${status}!`);
    await this._updateScanInDatabase({ status, endTime: this._setTime() });
    logger.info(`NMAP | scan ${status}`);
  }

  _close(code, signal) {
    Docker.processes.delete(Nmap.constructContainerName(this.scan.id));
    logger.info("NMAP | process closed");
  }

  _setTime() {
    return new Date().toISOString();
  }

  async _updateScanInDatabase(data) {
    try {
      this.scan = await update(NmapScan, data, this.scan._id);
      server.websocketServer.updateSubsAtSubscription(
        subscriptionPaths.NMAP_ALL,
        this.scan
      );
      server.websocketServer.updateSubsAtSubscription(
        `/nmap/${this.scan.id}`,
        this.scan
      );
      logger.info(`NMAP | updating db...`);
    } catch (error) {
      logger.error(`NMAP | failed to update db`);
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
      logger.error("failed to insert server message");
    }
  }

  _wrap(data) {
    return { $push: data };
  }
}
