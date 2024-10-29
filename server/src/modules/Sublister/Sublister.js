import { containers, processes } from "../../..";
import { createDocument } from "../DatabaseActions.js";
import { DockerProcess } from "../DockerProcess/DockerProcess.js";

class Sublister {
  constructor(target) {
    this.target = target;
    this.arguments = null;
    this.scan = null;
    this.sublister = null;
    this.error = null;
    this.aborted = null;
    this.containerName = null;
    this.imageName = "opendevsecops/sublist3r";
  }

  async init() {
    this.scan = await createDocument(SublisterSc);
  }

  async start() {
    this.sublister = DockerProcess(this.arguments, this.containerName);

    // await this.sublister.run();

    this.nmap.on("stdout", this.stdout);
    this.nmap.on("stderr", this.stderr);
    this.nmap.on("exit", this.exit);
    this.nmap.on("close", this.close);

    containers.add(this.containerName, this.scan.id);
    processes.add(this.sublister.docker?.pid, this.sublister);
  }
}
