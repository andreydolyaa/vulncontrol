import fs from "fs";
import { Docker } from "../docker/docker.js";
import { Utils } from "../utils/Utils.js";
import { create } from "../db-actions/db-actions.js";
import { TheHarvesterScan } from "../../models/the-harvester-model.js";
import { StreamListener } from "../stream-listener/stream-listener.js";
import {
  DOCKER_ARG,
  DOCKER_IMAGES,
  PROC_STATUS,
  THE_HARVESTER_ARG,
  THE_HARVESTER_BIN,
} from "../../constants/processes.js";
import path from "path";

// TODO: TH is broken, need to replace;

export class TheHarvester extends Docker {
  static containerName = "";

  constructor(request) {
    super(DOCKER_IMAGES.THE_HARVESTER);
    this.process = null;
    this.scan = null;
    this.request = request;
    this.outputDir = path.join(process.cwd(), "reports"); 
    this.outputFile = path.join(this.outputDir, "report.json");

    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
      TheHarvester.log(`Created output directory: ${this.outputDir}`);
    }
  }

  static containerName(id) {
    return Docker.assignContainerName(THE_HARVESTER_BIN, this.scan.id);
  }

  static log(msg) {
    Utils.logWrapper(THE_HARVESTER_BIN, msg);
  }

  async _init() {
    this.scan = await create(TheHarvesterScan, {
      userId: this.request.userId,
      scanType: this.request.scanType,
      status: PROC_STATUS.LIVE,
      startTime: Utils.setCurrentTime(),
      target: Utils.extractDomainAddress(this.request.domain),
    });

    TheHarvester.containerName = Docker.assignContainerName(
      THE_HARVESTER_BIN,
      this.scan.id
    );
  }

  async start() {
    try {
      await this._init();
      // await this._insertServerMsgs([
      //   "starting theharvester docker image...",
      //   "starting theharvester scan...",
      // ]);

      const containerSettings = [
        "-t",
        DOCKER_ARG.PLATFORM,
        DOCKER_ARG.AMD64,
        DOCKER_ARG.MOUNT,
        `${this.outputDir}:/reports`,
      ];

      const scanSettings = [
        THE_HARVESTER_ARG.DOMAIN,
        this.scan.target,
        THE_HARVESTER_ARG.DATA_SOURCE,
        "all",
        // THE_HARVESTER_ARG.OUTPUT,
        // this.outputFile,
      ];

      this.process = await Docker.run(
        DOCKER_IMAGES.THE_HARVESTER,
        TheHarvester.containerName,
        scanSettings,
        containerSettings
      );

      new StreamListener(this.process, {
        stdout: this._stdout.bind(this),
        stderr: this._stderr.bind(this),
        exit: this._exit.bind(this),
        close: this._close.bind(this),
      });

      TheHarvester.log("warn: scan started");
      return this.scan;
    } catch (error) {
      TheHarvester.log(`err: error starting scan [${error}]`);
    }
  }
  async _stdout(data) {
    console.log(data);
  }

  async _stderr(data) {
    console.log(data);
  }

  async _exit(code, signal) {}

  _close(code, signal) {
    console.log(code);
    console.log(signal);
    // fs.readFile(this.outputFile, "utf8", (err, reportData) => {
    //   if (err) {
    //     console.log("ERR", err);
    //     return;
    //   }
    //   console.log(reportData, "!!! REPORT DATA");
    // });
  }
}
