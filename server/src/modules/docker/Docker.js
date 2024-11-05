import { spawn, exec } from "child_process";
import { EventEmitter } from "events";
import { loggerWrapper } from "../../utils/index.js";
import {
  DOCKER_ARG,
  DOCKER_BIN,
  DOCKER_CMD,
  PROC_SIGNAL,
} from "../../constants/processes.js";

// container name constructed of: <module>_<document_id> (nmap_123, sublister_334)

export class Docker extends EventEmitter {
  static processes = new Map();

  constructor(image) {
    super();
    this.image = image;
  }

  static constructContainerName(prefix, name) {
    return prefix + name;
  }

  async run(containerName, scanSettings, containerSettings = []) {
    const dockerArgs = [
      DOCKER_CMD.RUN,
      DOCKER_ARG.RM,
      DOCKER_ARG.NAME,
      containerName,
      ...containerSettings,
      this.image,
    ];

    const scanFlags = [...scanSettings, DOCKER_ARG.VERBOSE];

    try {
      const allArgs = [...dockerArgs, ...scanFlags];
      const process = spawn(DOCKER_BIN, allArgs);

      Docker.processes.set(containerName, process);
      Docker.log(`info: starting process... [${allArgs.join(" ")}]`);
      return process;
    } catch (error) {
      Docker.log(`error: failed to run image [${error}]`);
    }
  }

  static async abort(containerName) {
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
    loggerWrapper("DOCKER | ", msg);
  }
}
