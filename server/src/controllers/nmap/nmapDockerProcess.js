import { exec, spawn } from "child_process";
import logger from "../../core/logger.js";

import {
  updateScanInDb,
  createNewScan,
  parseArgs,
  checkForOpenPorts,
  sendFinalToastMessage,
} from "./nmapHelpers.js";
import {
  removeAllContainers,
  removeDockerContainer,
} from "./nmapStopDocker.js";

let containers = {}; // TODO: find how to cache (redis maybe)

// initiate new scan
export const startNmapContainer = async (reqBody) => {
  const scanId = await createNewScan(reqBody);
  handleNmapProcess(scanId, reqBody);
  return scanId;
};

// start nmap container and nmap scan & handle stdout and stderr
const handleNmapProcess = async (scanId, reqBody) => {
  const { target, args, userId } = reqBody;
  const containerName = `nmap_${scanId.toString()}`;
  const argsList = createArgsList(args, containerName, target);
  let isError = false;

  containers[containerName] = scanId;

  getDockerVersion();

  await updateScanInDb(scanId, {
    $push: {
      stdout: {
        $each: [
          "server: starting nmap docker image...",
          "server: starting nmap scan...",
          `server: nmap ${argsList.slice(4).join(" ")}`,
        ],
      },
    },
  });

  const process = spawn("docker", argsList);
  logger.info(`starting new process: docker ${argsList.join(" ")}`);

  process.stdout.on("data", async (data) => {
    const line = data.toString();

    const updates = {
      $push: { stdout: line },
    };

    const isPortDetected = checkForOpenPorts(data);

    if (isPortDetected) {
      updates.$push = {
        stdout: line,
        openPorts: isPortDetected,
      };
    }
    await updateScanInDb(scanId, updates);
    logger.info(`cp | nmap scan in progress... [scan_id: ${scanId}]`);
  });

  process.stdout.on("end", async () => {
    const scan = await updateScanInDb(scanId, {
      status: isError ? "failed" : "done",
      endTime: new Date().toISOString(),
    });
    await removeDockerContainer(containerName);
    delete containers[containerName];
    sendFinalToastMessage(isError, scan);
    isError = false;
    logger.info("nmap scan ended successfully");
  });

  process.stderr.on("data", async (data) => {
    const message = data.toString();
    if (message.includes("QUITTING")) {
      isError = true;
    }
    await updateScanInDb(scanId, {
      $push: { stdout: message },
    });
    logger.error(`stderr: ${message}`);
  });

  process.on("exit", async (code) => {
    logger.info(`docker nmap process exited [code ${code}]`);
  });

  process.on("close", async (code) => {
    logger.info(`docker nmap process is closed [code ${code}]`);
  });

  process.on("SIGINT", async () => {
    logger.warn(`docker process | caught interrupt signal (CTRL+C)`);
    containers = await removeAllContainers(containers);
  });
};

// handle docker and nmap arguments
const createArgsList = (args, containerName, target) => {
  const userSelectedArgs = parseArgs(args);
  return [
    "run",
    "--name",
    containerName,
    "instrumentisto/nmap",
    target,
    "-v",
    ...userSelectedArgs,
  ];
};

const getDockerVersion = () => {
  exec("docker --version", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }

    // Use a structured log format if needed
    const logMessage = `Docker version: ${stdout.trim()}`;
    logger.warn(logMessage);
  });
};
