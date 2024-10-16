import { exec, spawn } from "child_process";
import logger from "../../core/logger.js";
// import { sendWebsocketMessage } from "../../../index.js";
import { websocketServer } from "../../../index.js";
import { NmapScan } from "../../models/nmapScanModel.js";

// "instrumentisto/nmap",
// "scanme.nmap.org",

// initiate new scan
export const startNmapContainer = async (reqBody) => {
  const { target, instance } = reqBody.data;
  const scanId = await createNewScan(reqBody.userId);
  handleNmapProcess(scanId, target, instance);
  return scanId;
};

// start nmap container and nmap scan & handle stdout and stderr
const handleNmapProcess = async (scanId, target, uniqueContainerName) => {
  const containerName = `nmap_${uniqueContainerName}`;
  const nmapImage = "instrumentisto/nmap";
  const args = [
    "run",
    "--name",
    containerName,
    nmapImage,
    target,
    "-v",
    // "-p-",
    "-T2",
  ];
  const process = spawn("docker", args);

  process.stdout.on("data", async (data) => {
    logger.info(`nmap stdout: ${data.toString()}`);
    websocketServer.send(data.toString(), scanId);
    await updateScanLive(scanId, data);
  });

  process.stdout.on("end", async () => {
    logger.info("nmap scan ended successfully");
    removeNmapContainer(containerName);
  });

  process.stderr.on("data", (data) => {
    logger.error("stderr: ", data.toString());
  });

  process.on("close", (code) => {
    if (code !== 0) {
      logger.info(`child process exited with code ${code}`);
    }
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
    logger.info(`docker rm process exited with code ${code}`);
  });
};

// create new scan document in db
const createNewScan = async (userId) => {
  try {
    const scan = await NmapScan.create({ scan: [], byUser: userId });
    return scan._id;
  } catch (error) {
    logger.error("failed to create new scan in db");
  }
};

// update the scan document on runtime
const updateScanLive = async (scanId, data) => {
  const item = { $push: { scan: data.toString() } };
  try {
    return await NmapScan.findOneAndUpdate(scanId, item, { new: true });
  } catch (error) {
    logger.error(`failed to update scan ${scanId} in db`);
  }
};
