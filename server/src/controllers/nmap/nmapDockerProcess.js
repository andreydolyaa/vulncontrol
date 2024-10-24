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
  const argsList = createArgsList(args, containerName, target, command, uiMode);
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

  containers[containerName] = scanId;
  processes[scanId] = process;

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
    const scan = await updateScanInDb(scanId, {
      status: isError ? "failed" : "done",
      endTime: new Date().toISOString(),
    });
    await removeDockerContainer(containerName);
    delete containers[containerName];
    delete processes[containerName];
    sendFinalToastMessage(isError, scan);
    isError = false;
    logger.info("nmap scan ended successfully");
  });

  process.stderr.on("data", async (data) => {
    const message = data.toString();
    console.log(message, "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ 444444");
    
    if (message.includes("QUITTING")) {
      isError = true;
    }
    await updateScanInDb(scanId, {
      $push: { stdout: message },
    });
    logger.error(`stderr: ${message}`);
  });

  process.on("exit", (code, signal) => {
    logger.info(`docker nmap process exited [code ${code}]`);
  });

  process.on("close", async (code) => {
    logger.info(`docker nmap process is closed [code ${code}]`);
  });

  process.on("SIGINT", async () => {
    logger.warn(`docker process | caught interrupt signal (CTRL+C)`);
    containers = await removeAllContainers(containers);
  });

  process.stdin.on("data", data => {
    logger.warn(`received stdin: ${data}`)
  })
};

// handle docker and nmap arguments
const createArgsList = (args, containerName, target, command, uiMode) => {
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

export const sendKillProcess = async (scanId) => {
  const process = processes[scanId];
  if (!process) {
    return `Failed to kill process`;
  }
  process.kill("SIGTERM");
  logger.warn(`cp | user request to abort process ${scanId}`);
  // TODO: need to update db




  // const updates = {
  //   status: "aborted",
  //   $push: {
  //     stdout: "server: scan aborted by user!\n",
  //   },
  // };
  // const scan = await updateScanInDb(scanId, updates);
  // sendFinalToastMessage(isError, scan);
  // delete processes[scanId];
};
