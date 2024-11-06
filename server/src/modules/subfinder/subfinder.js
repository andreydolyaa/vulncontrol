import { Docker } from "../docker/docker.js";
import { Utils } from "../utils/Utils.js";
import { create } from "../db-actions/db-actions.js";
import { SubfinderScan } from "../../models/subfinder-model.js";
import { StreamListener } from "../stream-listener/stream-listener.js";
import {
  DOCKER_ARG,
  DOCKER_IMAGES,
  PROC_STATUS,
  SUBFINDER_ARG,
  SUBFINDER_BIN,
} from "../../constants/processes.js";
import path from "path";

// TODO: TH is broken, need to replace;
// docker run --rm projectdiscovery/subfinder -d egged.co.il

export class Subfinder extends Docker {
  static containerName = "";

  constructor(request) {
    super();
    this.process = null;
    this.scan = null;
    this.request = request;
  }

  static containerName(id) {
    return Docker.assignContainerName(SUBFINDER_BIN, this.scan.id);
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

      const outputFilePath = path.join(
        path.dirname(import.meta.url),
        `${this.scan.id}.json`
      );

      console.log(outputFilePath, "!!!!!!!!!!! !!!!!!!!!!! !!!!!!!!!");
      

      const scanSettings = [
        SUBFINDER_ARG.DOMAIN,
        this.scan.target,
        SUBFINDER_ARG.VERBOSE,
        SUBFINDER_ARG.OUTPUT_JSON,
        SUBFINDER_ARG.OUTPUT_FILE,
        outputFilePath,
      ];

      this.process = await Docker.run(
        DOCKER_IMAGES.SUBFINDER,
        Subfinder.containerName,
        scanSettings
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
    try {
      Subfinder.log(`info: JSON output saved to `);
    } catch (error) {
      Subfinder.log(`err: error handling _exit [${error}]`);
    }
  
  }

  _close(code, signal) {
    console.log(code);
    console.log(signal);
  }
}
