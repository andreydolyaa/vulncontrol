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
    this.nmap = null;
    this.target = target;
    this.args = args;
    this.userId = userId;
    this.command = command;
    this.uiMode = uiMode;
    this.ipAddress = null;
    this.scan = null;
    this.containerName = null;
    this.error = false;
    this.aborted = false;
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
    await this.updateStdout(data);
    Logger.NM.info(`scan in progress... [scan id: ${this.scan.id}]`);
  };

  stderr = async (data) => {
    if (data.includes("QUITTING")) {
      this.error = true;
    }
    await this.updateStdout(data);
    Logger.NM.error(`stderr: ${data}`);
  };

  exit = async (code, signal) => {
    if (code == null && signal == Nmap.SIGKILL) {
      this.aborted = true;
      await this.updateStdout("server: scan aborted by user!");
      await this.nmap.stop();
    }

    this.scan = await this.updateDb({
      status: this.setStatus(),
      endTime: this.setTime(),
    });

    if (this.error) {
      await this.updateStdout("server: scan failed!");
    }

    await this.nmap.remove();

    if (!this.error && !this.aborted) {
      await this.updateStdout("server: scan completed!");
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
    websocketServer.updateBySubscriptionType(doc, "nmap-updates");
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
    const process = processes.getResource(pid);
    if (process) {
      process.kill(Nmap.SIGKILL);
      Logger.NM.warn(`user request to abort process [pid: ${pid}]`);
    }
    Logger.NM.error(`pid not found [pid: ${pid}]`);
  }
}
