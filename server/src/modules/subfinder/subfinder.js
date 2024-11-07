import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Docker } from "../docker/docker.js";
import { Utils } from "../utils/Utils.js";
import { create, update } from "../db-actions/db-actions.js";
import { SubfinderScan } from "../../models/subfinder-model.js";
import { StreamListener } from "../stream-listener/stream-listener.js";
import {
  DOCKER_ARG,
  DOCKER_IMAGES,
  PROC_STATUS,
  SUBFINDER_ARG,
  SUBFINDER_BIN,
} from "../../constants/processes.js";

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
    });

    Subfinder.containerName = Docker.assignContainerName(
      SUBFINDER_BIN,
      this.scan.id
    );
  }

  async start() {
    try {
      await this._init();
      // await this._insertServerMsgs([
      //   "starting Subfinder docker image...",
      //   "starting Subfinder scan...",
      // ]);

      const dockerMountPath = "/app/reports";
      const localMountPath = `${__dirname}/reports`;
      const volumeMap = `${localMountPath}:${dockerMountPath}`;

      const scanSettings = [
        SUBFINDER_ARG.DOMAIN,
        this.scan.target,
        SUBFINDER_ARG.VERBOSE,
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
  async _stdout(data) {
    console.log(data);
  }

  async _stderr(data) {
    console.log(data);
  }

  async _exit(code, signal) {
    fs.readFile(
      Utils.getFilePath(__dirname, this.scan.id),
      "utf8",
      async (err, data) => {
        if (err) {
          Subfinder.log("err: failed to read file");
        } else {
          console.log(data.split("\n"), "@@@");
          await update(
            SubfinderScan,
            { subdomains: data.split("\n") },
            this.scan._id
          );
          fs.unlink(Utils.getFilePath(__dirname, this.scan.id), (err) => {
            if (err) {
              Subfinder.log(`err: failed to delete report file: ${err}`);
            }
          });
        }
      }
    );
  }

  _close(code, signal) {
    console.log(code);
    console.log(signal);
  }
}
