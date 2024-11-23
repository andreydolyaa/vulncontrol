export const DOCKER_IMAGES = {
  NMAP: "instrumentisto/nmap",
  SUBFINDER: "projectdiscovery/subfinder",
};

export const DOCKER_BIN = "docker";
export const NMAP_BIN = "nmap";
export const NIKTO_BIN = "nikto";
export const SUBFINDER_BIN = "subfinder";
export const GEO_IP = "geo-ip";

export const DOCKER_CMD = {
  DOCKER: "docker",
  RUN: "run",
  STOP: "stop",
  MOUNT: "-v",
};
export const DOCKER_ARG = {
  RM: "--rm",
  NAME: "--name",
  MOUNT: "-v",
  INTERACTIVE: "-i",
  TTY: "-t",
  PLATFORM: "--platform",
  AMD64: "linux/amd64",
};

export const PROC_STATUS = {
  LIVE: "live",
  DONE: "done",
  FAILED: "failed",
  ABORTED: "aborted",
  DELETED: "deleted"
};

export const PROC_STREAM_EVENT = {
  DATA: "data",
  EXIT: "exit",
  CLOSE: "close",
};

export const PROC_SIGNAL = {
  SIGKILL: "SIGKILL",
};

export const NMAP_ARG = {
  VERBOSE: "-v",
};

export const SUBFINDER_ARG = {
  DOMAIN: "-d",
  VERBOSE: "-v",
  OUTPUT_JSON: "-json",
  OUTPUT_FILE: "-output",
  SILENT: "-silent"
};
