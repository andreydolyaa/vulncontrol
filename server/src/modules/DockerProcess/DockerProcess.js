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

  async run() {
    this.docker = spawn("docker", this.args);
    this._attachListeners(this.docker);
    Logger.DK.info(`new process started: docker ${this.args.join(" ")}`);
    return this.docker;
    // TODO: handle main process SIGINT
  }

  async stop() {
    return this._exec("stop");
  }

  async remove() {
    return this._exec("rm");
  }

  _emit(type, data) {
    this.emit(type, data.toString());
  }

  _attachListeners(process, isEmit = true) {
    const p = process;
    const e = isEmit;
    p.stdout.on("data", (data) => e && this._emit("stdout", data));
    p.stderr.on("data", (data) => e && this._emit("stderr", data));
    p.on("exit", (code, signal) => e && this.emit("exit", code, signal));
    p.on("close", (code, signal) => e && this.emit("close", code, signal));
  }

  _exec(command) {
    return new Promise((resolve, reject) => {
      const message =
        command === "stop"
          ? `stopping ${this.name}...`
          : `removing ${this.name}...`;
      Logger.DK.info(message);

      const process = spawn("docker", [command, this.name]);
      this._attachListeners(process, false);

      process.on("close", (code) => {
        if (code === 0) {
          Logger.DK.info(`${command} completed for ${this.name}`);
          resolve();
        } else {
          const error = new Error(
            `failed to ${command} container ${this.name} [code: ${code}]`
          );
          Logger.DK.error(error.message);
          reject(error);
        }
      });
    });
  }
}
