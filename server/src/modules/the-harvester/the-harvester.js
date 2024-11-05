import { Docker } from "../docker/docker";
import { create } from "../db-actions/db-actions";
import { TheHarvesterScan } from "../../models/the-harvester-model";
import { extractDomain } from "../../utils";
import {
  DOCKER_ARG,
  DOCKER_BIN,
  DOCKER_CMD,
  DOCKER_IMAGES,
  PROC_STATUS,
} from "../../constants/processes";
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

  async _init() {
    this.scan = await create(TheHarvesterScan, {
      userId: this.request.userId,
      scanType: this.request.scanType,
      status: PROC_STATUS.LIVE,
      startTime: this._setTime(),
      target: extractDomain(args),
    });
  }

  async start() {
    try {
      await this._init();
      await this._insertServerMessage("starting the-harvester docker image...");
      await this._insertServerMessage("starting the-harvester scan...");

      this.process = await this.run()
    } catch (error) {}
    const args = [
      DOCKER_BIN,
      DOCKER_CMD.RUN,
      DOCKER_ARG.RM,
      DOCKER_ARG.PLATFORM_AMD64,
      DOCKER_ARG.NAME,
      TheHarvester.containerName(),
    ];
  }
}
