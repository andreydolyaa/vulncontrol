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
    this.nmap = null;
    this.scan = null;
    this.request = request;
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
      this.nmap = await this.run(
        this.request.args,
        this._createContainerName()
      );
      this._handleEvents();
      logger.info(`nmap | scan started`);
      return this.scan;
    } catch (error) {
      logger.error(`nmap | error starting scan [${error}]`);
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
    setTimeout(() => {}, 2000);
    const port = await this._isOpenPort(data);

    if (port) {
      const update = { $push: { openPorts: port } };
      await this._updateScanInDatabase(update);
    }

    const stream = { $push: { stdout: data } };
    await this._updateScanInDatabase(stream);
  }

  async _stderr(data) {
    const stream = { $push: { stdout: data } };
    await this._updateScanInDatabase(stream);
  }

  async _exit(code, signal) {
    if (code === 0) {
      await this._handleExitStatus("done");
    } else if (code === 1) {
      await this._handleExitStatus("failed");
    } else if (code === null && signal === "SIGKILL") {
      await this._handleExitStatus("aborted");
    }
  }
  async _handleExitStatus(status) {
    await this._insertServerMessage(`scan ${status}!`);
    await this._updateScanInDatabase({ status });
    logger.info(`nmap | scan ${status}`);
  }

  // TODO: handle process close
  _close(code, signal) {
    console.log("close");
  }

  _setTime() {
    return new Date().toISOString();
  }

  _createContainerName() {
    return "nmap_" + this.scan.id;
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
      logger.info(`nmap | updating db...`);
    } catch (error) {
      logger.error(`nmap | failed to update db`);
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
}
