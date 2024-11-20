import { spawn, exec } from "child_process";
import { Utils } from "../utils/utils.js";
import {
  DOCKER_ARG,
  DOCKER_BIN,
  DOCKER_CMD,
  NMAP_BIN,
  PROC_SIGNAL,
} from "../../constants/processes.js";

// container name constructed of: <module>_<document_id> (nmap_123, sublister_334)

export class Docker {
  static processes = new Map();

  constructor() {}

  static assignContainerName(prefix, name) {
    return prefix + "_" + name;
  }

  static async run(image, containerName, scanSettings, containerSettings = []) {
    const dockerArgs = [
      DOCKER_CMD.RUN,
      DOCKER_ARG.RM,
      DOCKER_ARG.NAME,
      containerName,
      "--memory=512m",
      "--cpus=0.5",
      ...containerSettings,
      image,
    ];

    try {
      const allArgs = [...dockerArgs, ...scanSettings];
      const process = spawn(DOCKER_BIN, allArgs);

      process.on("close", (code, signal) => {
        Docker.processes.delete(containerName);
        Docker.log(`info: process closed [${containerName}]`);
      });

      Docker.processes.set(containerName, process);
      Docker.log(`info: starting process... [${allArgs.join(" ")}]`);
      return process;
    } catch (error) {
      Docker.log(`err: failed to run image [${error}]`);
    }
  }

  static async abort(scanId) {
    const containerName = Docker.assignContainerName(NMAP_BIN, scanId);
    const process = Docker.processes.get(containerName);

    if (process) {
      try {
        process.kill(PROC_SIGNAL.SIGKILL);
        await Docker._cmd(DOCKER_CMD.STOP, containerName);
        Docker.processes.delete(containerName);
        Docker.log("warn: process kill requested by user");
      } catch (error) {
        Docker.log("err: failed to kill process");
      }
    } else {
      Docker.log("warn: process not found");
    }
  }

  static _cmd(action, containerName) {
    const command = `${DOCKER_BIN} ${action} ${containerName}`;
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) return reject(`error ${action} container: ${stderr}`);
        resolve(stdout);
      });
    });
  }

  static log(msg) {
    Utils.logWrapper(DOCKER_BIN, msg);
  }
}
