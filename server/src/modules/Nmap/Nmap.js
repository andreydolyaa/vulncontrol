import { Logger } from "../../core/logger2.js";
import { NmapScan } from "../../models/nmapScanModel.js";
import { extractIP } from "../../utils/index.js";
import { createDocument, updateDocument } from "../DatabaseActions/index.js";
import { DockerProcess } from "../DockerProcess/DockerProcess.js";
import { containers, processes, websocketServer } from "../../../index.js";
import { scanTypes } from "../../constants/common.js";

export class Nmap {
  static SIGKILL = "SIGKILL";
  static STATUS = {
    LIVE: "live",
    DONE: "done",
    FAILED: "failed",
    ABORTED: "aborted",
  };
  static TYPE = {
    SHELL: "Shell Command",
  };

  constructor(target, args, userId, command) {
    this.target = target;
    this.args = args;
    this.userId = userId;
    this.command = command;
    this.ip = null;
    this.scan = null;
    this.nmap = null;
    this.error = false;
    this.aborted = false;
    this.arguments = null;
    this.containerName = null;
    this.imageName = "instrumentisto/nmap";

    if (this.command) {
      this.ip = extractIP(this.command);
      this.target = this.ip;
    }
  }

  async init() {
    this.scan = await createDocument(NmapScan, {
      target: this.target,
      stdout: [],
      status: Nmap.STATUS.LIVE,
      byUser: this.userId,
      scanType: this.command ? Nmap.TYPE.SHELL : this.setScanType(this.args),
      startTime: this.setTime(),
      command: this.command,
    });
    const scanId = this.scan._id.toString();
    this.containerName = "nmap_" + scanId;
    this.arguments = this.argumentsListForDockerChildProcess();
    return scanId;
  }

  async start() {
    await this.handleStandardStream({
      $each: [
        "server: starting nmap docker image...\n",
        "server: starting nmap scan...\n",
        `server: nmap ${this.arguments.slice(4).join(" ")}\n`,
      ],
    });

    this.nmap = new DockerProcess(this.arguments, this.containerName);

    await this.nmap.run();

    this.nmap.on("stdout", this.stdout);
    this.nmap.on("stderr", this.stderr);
    this.nmap.on("exit", this.exit);
    this.nmap.on("close", this.close);

    containers.add(this.containerName, this.scan.id);
    processes.add(this.nmap.docker?.pid, this.nmap);

    await this.updateDb({ processPid: this.nmap.docker?.pid });
  }

  stdout = async (data) => {
    const port = await this.isOpenPort(data);
    await this.handleStandardStream(data, port);
    Logger.NM.info(`scan in progress... [scan id: ${this.scan.id}]`);
  };

  stderr = async (data) => {
    if (data.includes("QUITTING")) {
      this.error = true;
    }
    await this.handleStandardStream(data);
    Logger.NM.error(`stderr: ${data}`);
  };

  exit = async (code, signal) => {
    if (code == null && signal == Nmap.SIGKILL) {
      this.aborted = true;
      await this.handleStandardStream("server: scan aborted by user!");
      await this.nmap.stop();
    }

    this.scan = await this.updateDb({
      status: this.setStatus(),
      endTime: this.setTime(),
    });

    if (this.error) {
      await this.handleStandardStream("server: scan failed!");
    }

    await this.nmap.remove();

    if (!this.error && !this.aborted) {
      await this.handleStandardStream("server: scan completed!");
    }

    containers.remove(this.containerName);
    processes.remove(this.nmap.pid);

    this.sendToast();

    this.error = false;
    this.aborted = false;

    const message =
      code == 0 || code ? "[code " + code + "]" : "[signal " + signal + "]";
    Logger.NM.info(`process exited ${message}`);
  };

  async close(code, signal) {
    Logger.NM.info(`process is closed [code: ${code}]`);
  }

  setStatus() {
    return this.error
      ? Nmap.STATUS.FAILED
      : this.aborted
      ? Nmap.STATUS.ABORTED
      : Nmap.STATUS.DONE;
  }

  setTime() {
    return new Date().toISOString();
  }

  async handleStandardStream(data, port) {
    const updates = { $push: { stdout: data } };
    if (port) {
      updates.$push = { stdout: data, openPorts: port };
    }
    await this.updateDb(updates);
  }

  async updateDb(updates) {
    const doc = await updateDocument(NmapScan, updates, this.scan._id);
    Logger.NM.info(`update scan [id: ${this.scan.id}]`);
    websocketServer.send(doc, this.scan.id);
    websocketServer.updateBySubscriptionType(doc, "nmap-updates");
    return doc;
  }

  sendToast() {
    const wrapper = {
      type: this.setStatus(),
      scan: this.scan,
    };
    websocketServer.sendToAll(wrapper);
  }

  static async sendKill(pid) {
    const process = processes.getResource(pid);
    if (process) {
      process.docker.kill(Nmap.SIGKILL);
      Logger.NM.warn(`user request to abort process [pid: ${pid}]`);
    } else {
      Logger.NM.error(`pid not found [pid: ${pid}]`);
    }
  }

  setScanType() {
    const list = Object.keys(this).filter((arg) => this[arg] === true);
    const type =
      list.find((arg) => Object.keys(scanTypes).includes(arg)) || "-st";
    return scanTypes[type];
  }

  argumentsListForDockerChildProcess() {
    const parsed = this.command
      ? this.command.replace("nmap", "").trim().split(" ")
      : Object.keys(this.args).filter((arg) => this.args[arg] === true);
    const cmd = ["run", "--name", this.containerName, this.imageName];
    return [...cmd, ...(!this.command ? [this.target] : []), ...parsed, "-v"];
  }

  async isOpenPort(stdout) {
    const line = stdout.toString();
    const portInfo = line.includes("Discovered open port")
      ? line
          .split(" ")
          .find((part) => part.includes("/tcp") || part.includes("/udp"))
      : null;
    return portInfo ? parseInt(portInfo) : undefined;
  }
}
