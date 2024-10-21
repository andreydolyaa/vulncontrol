import { websocketServer } from "../../../index.js";
import logger from "../../core/logger.js";
import { NmapScan } from "../../models/nmapScanModel.js";

export const updateScanInDb = async (id, updates) => {
  try {
    const scan = await NmapScan.findOneAndUpdate(id, updates, {
      new: true,
    });
    websocketServer.send(scan, id);
    websocketServer.updateBySubscriptionType(scan, "nmap-updates");
    logger.info(
      `ws | update sended to subscriber [${id}] [${JSON.stringify(updates)}]`
    );
    logger.info(`db | scan [${id}] updated [${JSON.stringify(updates)}]`);
    return scan;
  } catch (error) {
    logger.error(`db | failed to updated scan [${id}]`);
  }
};

// create new scan document in db
export const createNewScan = async (reqBody) => {
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

// identify and store open ports which found during scan
export const checkForOpenPorts = (stdout) => {
  const line = stdout.toString();
  const searchStr = "Discovered open port";
  if (!line.includes(searchStr)) return;

  const port = line
    .split(" ")
    .find((part) => part.includes("/tcp") || part.includes("/udp"));

  if (!port) return;

  return parseInt(port);
};

// convert args list to array of args
export const parseArgs = (args) => {
  let newArgsList = [];
  for (const arg in args) {
    if (args[arg] === true) {
      newArgsList.push(arg);
    }
  }
  return newArgsList;
};

export const sendFinalToastMessage = (isError, scan) => {
  const wrapper = {
    type: isError ? "failed" : "done",
    scan,
  };
  websocketServer.sendToAll(wrapper);
};
