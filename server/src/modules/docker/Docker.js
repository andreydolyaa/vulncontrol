import { spawn, exec } from "child_process";
import logger from "../../core/logger.js";
import { EventEmitter } from "events";

// container name constructed of: <module>_<document_id> (nmap_123, sublister_334)

export class Docker extends EventEmitter {
  static processes = new Map();

  constructor(image) {
    super();
    this.image = image;
  }

  async run(args, containerName) {
    try {
      const options = [
        "run",
        "--rm",
        "--name",
        containerName,
        this.image,
        ...args,
        "-v",
      ];

      const process = spawn("docker", options);
      Docker.processes.set(containerName, process);

      logger.info(`DOCKER | starting process... [${options.join(" ")}]`);
      return process;
    } catch (error) {
      logger.error(`DOCKER | failed to run image [${error}]`);
    }
  }

  static async abort(containerName) {
    const process = Docker.processes.get(containerName);

    if (process) {
      try {
        process.kill("SIGKILL");
        await Docker._cmd("stop", containerName);
        Docker.processes.delete(containerName);
        logger.warn(`DOCKER | process kill by user`);
      } catch (error) {
        logger.error(`DOCKER | failed to kill process`);
      }
    } else {
      logger.warn(`DOCKER | process not found`);
    }
  }

  static _cmd(action, containerName) {
    const command = `docker ${action} ${containerName}`;
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) return reject(`error ${action} container: ${stderr}`);
        resolve(stdout);
      });
    });
  }
}
