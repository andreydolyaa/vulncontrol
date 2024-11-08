import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Docker } from "../docker/docker.js";
import { Utils } from "../utils/Utils.js";
import { create, update } from "../actions/db-actions.js";
import { SubfinderScan } from "../../models/subfinder-model.js";
import { StreamListener } from "../stream-listener/stream-listener.js";
import {
  DOCKER_ARG,
  DOCKER_IMAGES,
  PROC_STATUS,
  SUBFINDER_ARG,
  SUBFINDER_BIN,
} from "../../constants/processes.js";
import { server } from "../../../index.js";
import { subscriptionPaths } from "../../constants/common.js";
import { HttpActions } from "../actions/http-actions.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Subfinder extends Docker {
  static containerName = "";

  constructor(request) {
    super();
    this.process = null;
    this.scan = null;
    this.request = request;
  }

  static log(msg) {
    Utils.logWrapper(SUBFINDER_BIN, msg);
  }

  async _init() {
    this.scan = await create(SubfinderScan, {
      userId: this.request.userId,
      scanType: this.request.scanType,
      status: PROC_STATUS.LIVE,
      startTime: Utils.setCurrentTime(),
      target: Utils.extractDomainAddress(this.request.domain),
      domain: this.request.domain
    });

    Subfinder.containerName = Docker.assignContainerName(
      SUBFINDER_BIN,
      this.scan.id
    );
  }

  async start() {
    try {
      await this._init();

      const dockerMountPath = "/app/reports";
      const localMountPath = `${__dirname}/reports`;
      const volumeMap = `${localMountPath}:${dockerMountPath}`;

      const scanSettings = [
        SUBFINDER_ARG.DOMAIN,
        this.scan.target,
        SUBFINDER_ARG.SILENT,
        SUBFINDER_ARG.OUTPUT_FILE,
        dockerMountPath + "/" + Utils.getFileName(this.scan.id),
      ];

      const containerSettings = [DOCKER_ARG.MOUNT, volumeMap];

      this.process = await Docker.run(
        DOCKER_IMAGES.SUBFINDER,
        Subfinder.containerName,
        scanSettings,
        containerSettings
      );

      new StreamListener(this.process, {
        stdout: this._stdout.bind(this),
        stderr: this._stderr.bind(this),
        exit: this._exit.bind(this),
        close: this._close.bind(this),
      });

      Subfinder.log("warn: scan started");
      return this.scan;
    } catch (error) {
      Subfinder.log(`err: error starting scan [${error}]`);
    }
  }
  async _stdout(data) {}

  async _stderr(data) {}

  async _exit(code, signal) {
    const status = Utils.handleStreamExitStatus(code, signal);
    await this._updateDb({
      endTime: Utils.setCurrentTime(),
      status,
    });
    this._sendToast(status);
    Subfinder.log(`info: scan ${status}`);
  }

  _close(code, signal) {
    this._handleOutputFile();
  }

  _notify(data) {
    HttpActions.notify(subscriptionPaths.SUBFINDER_ALL, data);
  }
  _sendToast(status) {
    const messageWrapper = {
      type: status,
      scan: this.scan,
    };
    this._notify(messageWrapper);
  }

  async _updateDb(data) {
    this.scan = await HttpActions.updateDb(SubfinderScan, data, this.scan._id);
    this._notify(this.scan);
  }

  async _writeServerMessage(data) {
    await HttpActions.writeServerMessage(SubfinderScan, data, this.scan._id);
  }

  async _handleOutputFile() {
    const filePath = Utils.getFilePath(__dirname, this.scan._id);
    fs.readFile(filePath, "utf8", (err, data) =>
      this._readFileAndUpdate(err, data)
    );
    fs.unlink(filePath, (err) => {
      if (err) {
        Subfinder.log(`err: failed to delete file [${err}]`);
      }
    });
  }

  async _readFileAndUpdate(err, data) {
    if (err) {
      return Subfinder.log("err: failed to read file");
    }
    const subdomains = data.trim().split("\n");
    return await update(SubfinderScan, { subdomains }, this.scan._id);
  }
}
