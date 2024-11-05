export const DOCKER_IMAGES = {
  NMAP: "instrumentisto/nmap",
  THE_HARVESTER: "followthewhiterabbit/theharvester",
};

export const DOCKER_BIN = "docker";
export const NMAP_BIN = "nmap";
export const NIKTO_BIN = "nikto";
export const THE_HARVESTER_BIN = "the_harvester";

export const DOCKER_CMD = {
  DOCKER: "docker",
  RUN: "run",
  STOP: "stop",
};
export const DOCKER_ARG = {
  RM: "--rm",
  NAME: "--name",
  VERBOSE: "-v",
  INTERACTIVE: "-it",
  PLATFORM_AMD64: "--platform linux/amd64",
};

export const PROC_STATUS = {
  LIVE: "live",
  DONE: "done",
  FAILED: "failed",
  ABORTED: "aborted",
};

export const PROC_STREAM_EVENT = {
  DATA: "data",
  EXIT: "exit",
  CLOSE: "close",
};

export const PROC_SIGNAL = {
  SIGKILL: "SIGKILL",
};

export const NMAP_ARG = {};
export const THE_HARVESTER_ARG = {
  DOMAIN: "-d",
  ALL_DATA_SOURCES: "-b all",
};
