import { exec, spawn } from "child_process";
import { parseArguments } from "../../controllers/nmap/nmapDockerProcess.js";
import {
  checkForOpenPorts,
  setScanType,
} from "../../controllers/nmap/nmapHelpers.js";
import { Logger } from "../../core/logger2.js";
import { NmapScan } from "../../models/nmapScanModel.js";
import { extractIP } from "../../utils/index.js";
import { DatabaseActions } from "../DatabaseActions/DatabaseActions.js";
import { DockerProcess } from "../DockerProcess/DockerProcess.js";
import { containers, processes, websocketServer } from "../../../index.js";

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

  constructor(target, args, userId, command, uiMode) {
    this.nmapProcess = null;
    this.target = target;
    this.args = args;
    this.userId = userId;
    this.command = command;
    this.uiMode = uiMode;
    this.ipAddress = null;
    this.scan = null;
    this.containerName = null;
    this.isError = false;
    this.isAborted = false;
    this.arguments = null;

    if (this.command) {
      this.ipAddress = extractIP(this.command);
    }
  }

  async createNewScan() {
    this.scan = await DatabaseActions.createNewDocument(NmapScan, {
      target: this.ipAddress ? this.ipAddress : this.target,
      stdout: [],
      status: Nmap.STATUS.LIVE,
      byUser: this.userId,
      scanType: this.command ? Nmap.TYPE.SHELL : setScanType(this.args),
      startTime: this.setTime(),
      command: this.command ? this.command : "X",
    });
    const scanId = this.scan._id.toString();
    this.containerName = "nmap_" + scanId;
    this.arguments = parseArguments(
      this.args,
      this.containerName,
      this.target,
      this.command,
      this.uiMode
    );
    return scanId;
  }

  async startProcess() {
    const data = {
      $push: {
        stdout: {
          $each: [
            "server: starting nmap docker image...\n",
            "server: starting nmap scan...\n",
            `server: nmap ${this.arguments.slice(4).join(" ")}\n`,
          ],
        },
      },
    };
    await this.updateDb(data);

    this.nmapProcess = new DockerProcess(this.arguments, this.containerName);

    await this.nmapProcess.create();
    await this.nmapProcess.run();

    this.nmapProcess.on("stdout", this.handleStdout);
    this.nmapProcess.on("stdout-end", this.handleStdoutEnd);
    this.nmapProcess.on("stderr", this.handleStderr);
    this.nmapProcess.on("exit", this.handleExit);
    this.nmapProcess.on("close", this.handleClose);

    containers.add(this.containerName, this.scan.id);
    processes.add(this.nmapProcess.pid, this.nmapProcess);

    await this.updateDb({ processPid: this.nmapProcess.pid });
  }

  handleStdout = async (data) => {
    await this.updateStdout(data);
    Logger.NM.info(`scan in progress... [scan id: ${this.scan.id}]`);
  };

  handleStdoutEnd = async () => {
    Logger.NM.info(`scan ended successfully`);
  };

  handleStderr = async (data) => {
    if (data.includes("QUITTING")) {
      this.isError = true;
    }
    await this.updateDb(data);
    Logger.NM.error(`stderr: ${data}`);
  };

  handleExit = async (code, signal) => {
    if (code == null && signal == Nmap.SIGKILL) {
      this.isAborted = true;
    }

    this.scan = await this.updateDb({
      status: this.setStatus(),
      endTime: this.setTime(),
    });

    if (this.isAborted) {
      await this.updateDb({
        $push: { stdout: "server: scan aborted by user!" },
      });
    }

    await this.nmapProcess.stop();

    if (this.isError) {
      await this.updateDb({ $push: { stdout: "server: scan failed!" } });
    }

    await this.nmapProcess.remove();

    containers.remove(this.containerName);
    processes.remove(this.nmapProcess.pid);

    this.sendToast();

    this.isError = false;
    this.isAborted = false;

    const message = code ? "[code " + code + "]" : "[signal " + signal + "]";
    Logger.NM.info(`process exited ${message}`);
  };

  async handleClose(code) {
    Logger.NM.info(`process is closed [code: ${code}]`);
  }

  setStatus() {
    return this.isError
      ? Nmap.STATUS.FAILED
      : this.isAborted
      ? Nmap.STATUS.ABORTED
      : Nmap.STATUS.DONE;
  }

  setTime() {
    return new Date().toISOString();
  }

  async updateStdout(data) {
    const updates = { $push: { stdout: data } };
    const port = await this.isOpenPort(data);
    if (port) {
      updates.$push = { stdout: data, openPorts: port };
    }
    await this.updateDb(updates);
  }

  async updateDb(updates) {
    const doc = await DatabaseActions.updateDocument(
      NmapScan,
      updates,
      this.scan._id
    );
    Logger.NM.info(`update scan [id: ${this.scan.id}]`);
    websocketServer.send(doc, this.scan.id);
    websocketServer.updateBySubscriptionType(doc, "nmap_updates");
    return doc;
  }

  async isOpenPort(data) {
    return await checkForOpenPorts(data);
  }

  sendToast() {
    const wrapper = {
      type: this.setStatus(),
      scan: this.scan,
    };
    websocketServer.sendToAll(wrapper);
  }

  static async sendKill(pid) {
    const process = processes[pid];
    if (process) {
      process.kill(Nmap.SIGKILL);
      Logger.NM.warn(`user request to abort process [pid: ${pid}]`);
    }
    Logger.NM.error(`pid not found [pid: ${pid}]`);
  }
}
