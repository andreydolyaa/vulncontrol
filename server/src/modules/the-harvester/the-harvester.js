import { Docker } from "../docker/docker.js";
import { create } from "../db-actions/db-actions.js";
import { TheHarvesterScan } from "../../models/the-harvester-model.js";
import { extractDomain, loggerWrapper } from "../../utils/index.js";
import {
  DOCKER_ARG,
  DOCKER_IMAGES,
  PROC_STATUS,
  THE_HARVESTER_ARG,
} from "../../constants/processes.js";
// docker run -it --rm --platform linux/amd64
//   --name tH followthewhiterabbit/theharvester -d somesite.co.il -b all

export class TheHarvester extends Docker {
  constructor(request) {
    super(DOCKER_IMAGES.THE_HARVESTER);
    this.process = null;
    this.scan = null;
    this.request = request;
  }

  static containerName(id) {
    return Docker.constructContainerName("the_harvester_", id);
  }

  static log(msg) {
    loggerWrapper("THE_HARVESTER | ", msg);
  }

  async _init() {
    this.scan = await create(TheHarvesterScan, {
      userId: this.request.userId,
      scanType: this.request.scanType,
      status: PROC_STATUS.LIVE,
      startTime: this._setTime(),
      target: extractDomain(this.request.domain),
    });
  }

  async start() {
    try {
      await this._init();
      // await this._insertServerMessage("starting the-harvester docker image...");
      // await this._insertServerMessage("starting the-harvester scan...");

      const containerSettings = [
        DOCKER_ARG.INTERACTIVE,
        DOCKER_ARG.PLATFORM_AMD64,
      ];

      const scanSettings = [
        THE_HARVESTER_ARG.DOMAIN,
        this.scan.target,
        THE_HARVESTER_ARG.ALL_DATA_SOURCES,
      ];

      this.process = await this.run(
        TheHarvester.containerName(this.scan.id),
        scanSettings,
        containerSettings
      );
      TheHarvester.log("warn: scan started");
    } catch (error) {
      TheHarvester.log(`err: error starting scan [${error}]`);
    }
  }
  _setTime() {
    return new Date().toISOString();
  }
}
