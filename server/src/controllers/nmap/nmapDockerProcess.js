import { spawn } from "child_process";
import logger from "../../core/logger.js";
import { websocketServer } from "../../../index.js";
import { NmapScan } from "../../models/nmapScanModel.js";

// TODO: refactor this file

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
  let finalResult;

  containers[containerName] = scanId;

  await scanInitialSettings(scanId, { nmapExecCmd: argsList });
  const process = spawn("docker", argsList);
  logger.info(`starting new process: docker ${argsList.join(" ")}`);

  process.stdout.on("data", async (data) => {
    await updateScanLive(scanId, data);

    logger.info(`nmap scan in progress... [scan_id: ${scanId}]`);
  });

  process.stdout.on("end", async () => {
    removeNmapContainer(containerName);
    finalResult = await setScanStatusDone(scanId);
    await quickUpdateSubscribers(finalResult);
    websocketServer.send(finalResult, scanId)
    delete containers[containerName];
    logger.info("nmap scan ended successfully");
  });

  process.stderr.on("data", (data) => {
    logger.error(`stderr: ${data.toString()}`);
  });

  process.on("close", async (code) => {
    logger.info(`docker nmap process is closed [code ${code}]`);
  });

  process.on("exit", async (code) => {
    logger.info(`docker nmap process exited [code ${code}]`);
  });
};

// remove nmap container after scan is done
const removeNmapContainer = (containerName) => {
  const rm = spawn("docker", ["rm", containerName]);

  rm.stdout.on("data", (data) => {
    logger.info(`docker rm ${containerName} stdout: ${data}`);
  });
  rm.stderr.on("data", (data) => {
    logger.error(`docker rm ${containerName} stderr: ${data}`);
  });
  rm.on("close", (code) => {
    logger.info(`docker rm process exited [code ${code}]`);
  });
};

// remove all containers (used on server shutdown)
export const removeAllContainers = () => {
  Object.keys(containers).forEach((container) =>
    removeNmapContainer(container)
  );
  containers = {};
};

// create new scan document in db
const createNewScan = async (reqBody) => {
  const { target, args, userId } = reqBody;
  try {
    const scan = await NmapScan.create({
      target,
      stdout: [],
      status: "live",
      byUser: userId,
      scanType: setScanType(args),
      startTime: new Date().toISOString(),
    });
    return scan._id;
  } catch (error) {
    logger.error("db | failed to create new scan");
  }
};

// TODO: create shared function which will use findOneAndUpdate

// update the scan document on runtime (updates scan stdout and open ports fields)
const updateScanLive = async (scanId, data) => {
  const isPortDetected = checkForOpenPorts(data);

  const updates = {
    $push: { stdout: data.toString() },
  };

  if (isPortDetected) {
    updates.$push = { openPorts: isPortDetected };
  }

  try {
    const updated = await NmapScan.findOneAndUpdate({ id: scanId }, updates, {
      new: true,
    });
    
    websocketServer.send(updated, scanId); // send ws update to specific scan subscribers (/nmap/id)
    await quickUpdateSubscribers(updated); // sends update tp nmap_321 subscribers
    return updated;
  } catch (error) {
    logger.error(`db | failed to update scan ${scanId}`);
  }
};

// update scan status and time when scan finished
const setScanStatusDone = async (scanId) => {
  const updates = {
    status: "done",
    endTime: new Date().toISOString(),
  };
  try {
    const result = await NmapScan.findOneAndUpdate({ id: scanId }, updates, {
      new: true,
    });
    return result;
  } catch (error) {
    logger.error(`db | failed to update scan status ${scanId}`);
  }
};

// convert args list to array of args
const parseArgs = (args) => {
  let newArgsList = [];
  for (const arg in args) {
    if (args[arg] === true) {
      newArgsList.push(arg);
    }
  }
  return newArgsList;
};

// create scan type
const setScanType = (args) => {
  const list = parseArgs(args);
  const types = {
    "-sn": "Network Discovery",
    "-sV": "Version Detection",
    "-p-": "Full Port Scan",
    "-A": "Aggressive Scan",
    "-sS": "Stealth Scan",
    "-sU": "UDP Scan",
    "-T2": "Slow Scan",
    "-F": "Fast Scan",
    "-st": "Standard Scan",
  };
  const type = list.find((arg) => Object.keys(types).includes(arg)) || "-st";
  return types[type];
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

// identify and store open ports which found during scan
const checkForOpenPorts = (stdout) => {
  const line = stdout.toString();
  const searchStr = "Discovered open port";
  if (!line.includes(searchStr)) return;

  const port = line
    .split(" ")
    .find((part) => part.includes("/tcp") || part.includes("/udp"));

  if (!port) return;

  return parseInt(port);
};

const quickUpdateSubscribers = async (scan) => {
  const subscribers = websocketServer.getSubscribers();
  if (Object.keys(subscribers).length === 0 || !scan) return;

  for (const subscriber in subscribers) {
    if (subscriber.includes("nmap-updates")) {
      websocketServer.send(scan, subscriber);
      logger.info(`ws | sent scan update to subscriber: ${subscriber}`);
    }
  }
};

export const scanInitialSettings = async (scanId, settings = {}) => {
  const data = {
    $push: {
      stdout: {
        $each: [
          "server: starting nmap docker image...",
          "server: starting nmap scan...",
          `server: nmap ${settings.nmapExecCmd.slice(4).join(" ")}`,
        ],
      },
    },
  };
  try {
    await NmapScan.findOneAndUpdate(scanId, data);
    return logger.info(`settings initial settings [scan: ${scanId}]`);
  } catch (error) {
    logger.error(`failed to initialize scan [scan: ${scanId}]`);
  }
};
