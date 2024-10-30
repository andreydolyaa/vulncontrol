import { spawn } from "child_process";
import logger from "../../core/logger.js";
import { EventEmitter } from "events";

export class Docker extends EventEmitter {
  constructor(image) {
    super();
    this.process = null;
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
      this.process = spawn("docker", options);
      logger.info(`docker | starting process... [${options.join(" ")}]`);
      return this.process;
    } catch (error) {
      logger.error(`docker | failed to run image [${error}]`);
    }
  }
}
