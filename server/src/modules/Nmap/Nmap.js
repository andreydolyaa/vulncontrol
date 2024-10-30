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
      await this.insertServerMessage("nmap scan initiated");
      await this.insertServerMessage("starting nmap docker container...");
      await this.insertServerMessage(`nmap ${this.request.args.join(" ")} -v`);
      this.nmap = await this.run(this.request.args, this._createContainerName());
      this._handleEvents();
      logger.warn(`nmap | scan started`);
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
    const port = await this._isOpenPort(data);

    if (port) {
      const update = { $push: { openPorts: port } };
      await this._updateScanInDatabase(update);
    }

    const stream = { $push: { stdout: data } };
    await this._updateScanInDatabase(stream);
  }

  async _stderr(data) {
    await this._updateScanInDatabase(data);
  }

  _exit(code, signal) {
    console.log("exit");
    console.log(code);
    console.log(signal);
  }

  _close(code, signal) {
    console.log("close");
    console.log(code);
    console.log(signal);
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

  async insertServerMessage(message) {
    const update = { $push: { stdout: `server: ${message}\n` } };
    try {
      await this._updateScanInDatabase(update);
    } catch (error) {
      logger.error("failed to insert server message");
    }
  }
}
