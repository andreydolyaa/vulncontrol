import EventEmitter from "events";
import { exec, spawn } from "child_process";
import { Logger } from "../../core/logger2.js";

export class DockerProcess extends EventEmitter {
  constructor(args, name) {
    super();
    this.docker = null;
    this.args = args;
    this.name = name;
  }
  async create() {
    Logger.DK.info(`new process created`);
    this.docker = spawn("docker", this.args);
    return this.docker;
  }

  async run() {

    Logger.DK.info(`new process started: docker ${this.args.join(" ")}`);
    this.docker.stdout.on("data", (data) => this.emit("stdout", this.s(data)));
    this.docker.stdout.on("end", () => this.emit("stdout-end"));
    this.docker.stderr.on("data", (data) => this.emit("stderr", this.s(data)));
    this.docker.on("exit", (code, signal) => this.emit("exit", (code, signal)));
    this.docker.on("close", (code, signal) => this.emit("close", code));
    // TODO: handle main process SIGINT
  }

  async stop() {
    return new Promise((resolve, reject) => {
      const stop = spawn("docker", ["stop", this.name]);

      stop.stdout.on("data", (data) => {
        
        Logger.DK.info(`stop ${this.name} [stdout: ${data}]`);
      });
      
      stop.stderr.on("data", (data) => {
        Logger.DK.error(`stop ${this.name} [stderr: ${data}]`);
      });

      stop.on("close", (code) => {
        if (code === 0) {
          Logger.DK.info(`stop process completed [${this.name}] code: ${code}`);
          resolve();
        } else {
          reject(
            new Error(`failed to stop container ${this.name} code: ${code}`)
          );
        }
      });
    });
  }

  async remove() {
    return new Promise((resolve, reject) => {
      const rm = spawn("docker", ["rm", this.name]);

      rm.stdout.on("data", (data) => {
        Logger.DK.info(`rm ${this.name} [stdout: ${data}]`);
      });

      rm.stderr.on("data", (data) => {
        Logger.DK.error(`rm ${this.name} [stderr: ${data}]`);
      });

      rm.on("close", (code) => {
        if (code === 0) {
          Logger.DK.info(
            `rm process completed for ${this.name} [code ${code}]`
          );
          resolve();
        } else {
          reject(
            new Error(`failed to remove container ${this.name} [code ${code}]`)
          );
        }
      });
    });
  }

  s(data) {
    return data.toString();
  }
}
