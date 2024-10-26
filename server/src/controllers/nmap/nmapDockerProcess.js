import { exec, spawn } from "child_process";
import logger from "../../core/logger.js";
import mainProcess from "node:process";

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
  stopDockerContainer,
} from "./nmapStopDocker.js";

// TODO: find how to cache (redis maybe)
export let containers = {};
export let processes = {};

// initiate new scan
export const startNmapContainer = async (reqBody) => {
  const scanId = await createNewScan(reqBody);
  handleNmapProcess(scanId, reqBody);
  return scanId;
};

// start nmap container and nmap scan & handle stdout and stderr
const handleNmapProcess = async (scanId, reqBody) => {
  const { target, args, userId, command, uiMode } = reqBody;
  const containerName = `nmap_${scanId.toString()}`;
  const argsList = parseArguments(args, containerName, target, command, uiMode);
  let isError = false;

  getDockerVersion();

  await updateScanInDb(scanId, {
    $push: {
      stdout: {
        $each: [
          "server: starting nmap docker image...\n",
          "server: starting nmap scan...\n",
          `server: nmap ${argsList.slice(4).join(" ")}\n`,
        ],
      },
    },
  });

  const process = spawn("docker", argsList);

  await updateScanInDb(scanId, { processPid: process.pid });

  containers[containerName] = scanId;
  processes[process.pid] = process;

  logger.info(`starting new process: docker ${argsList.join(" ")}`);

  process.stdout.on("data", async (data) => {
    const line = data.toString();

    const updates = {
      $push: { stdout: line },
    };

    const detectedOpenPort = await checkForOpenPorts(data);

    if (detectedOpenPort) {
      updates.$push = {
        stdout: line,
        openPorts: detectedOpenPort,
      };
    }

    await updateScanInDb(scanId, updates);
    logger.info(`cp | nmap scan in progress... [scan_id: ${scanId}]`);
  });

  process.stdout.on("end", async () => {
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

  process.on("exit", async (code, signal) => {
    let isAborted = false;

    if (code === null && signal === "SIGKILL") {
      isAborted = true;
    }

    const scan = await updateScanInDb(scanId, {
      status: isError ? "failed" : isAborted ? "aborted" : "done",
      endTime: new Date().toISOString(),
    });

    if (isAborted) {
      await updateScanInDb(scanId, {
        $push: { stdout: "server: scan aborted by user!" },
      });
      await stopDockerContainer(containerName);
    }

    if (isError) {
      await updateScanInDb(scanId, {
        $push: { stdout: "server: scan failed!" },
      });
    }

    await removeDockerContainer(containerName);
    delete containers[containerName];
    delete processes[process.pid];

    sendFinalToastMessage(isError, isAborted, scan);
    isError = false;
    isAborted = false;

    logger.info(
      `docker nmap process exited ${
        code ? "[code " + code + "]" : "[signal " + signal + "]"
      }`
    );
  });

  process.on("close", async (code, signal) => {
    logger.info(`docker nmap process is closed [code ${code}]`);
  });
};

mainProcess.on("SIGINT", async () => {
  logger.warn(`docker process | caught interrupt signal (CTRL+C)`); // <!--------------------------------------------- use
  containers = await removeAllContainers(containers);
});

// handle docker and nmap arguments
export const parseArguments = (args, containerName, target, command, uiMode) => {  
  if (uiMode === "command" && command) {
    const fullShellCommand = command.replace("nmap", "").trim().split(" ");
    return [
      "run",
      "--name",
      containerName,
      "instrumentisto/nmap",
      ...fullShellCommand,
      "-v",
    ];
  }
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
    const logMessage = `Docker version: ${stdout.trim()}`;
    logger.warn(logMessage);
  });
};

export const sendKillProcess = async (pid) => {
  const process = processes[pid];
  if (process) {
    process.kill("SIGKILL");
    logger.warn(`cp | user request to abort process PID:${pid}`);
  }
  logger.error(`cp | PID not found: ${pid}`);
};
