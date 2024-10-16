import { exec, spawn } from "child_process";
import logger from "../../core/logger.js";
import { sendWebsocketMessage } from "../../../index.js";
import { NmapScan } from "../../models/nmapScanModel.js";

// "instrumentisto/nmap",
// "scanme.nmap.org",

export const startNmapContainer = async (reqBody) => {
  const { target, instance } = reqBody.data;
  const scanId = await saveScanInDB(reqBody.userId);
  handleNmapProcess(scanId, target, instance);
  return scanId;
};

const handleNmapProcess = async (scanId, target, uniqueContainerName) => {
  const containerName = `nmap_${uniqueContainerName}`;
  const nmapImage = "instrumentisto/nmap";
  const args = ["run", "--name", containerName, nmapImage, target, "-v"];
  const process = spawn("docker", args);

  process.stdout.on("data", async (data) => {
    logger.info(`nmap stdout: ${data.toString()}`);
    sendWebsocketMessage(`${data.toString()}`);
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

const saveScanInDB = async (userId) => {
  try {
    const scan = await NmapScan.create({ scan: [], byUser: userId });
    return scan._id;
  } catch (error) {
    logger.error("failed to create new scan in db");
  }
};

const updateScanLive = async (scanId, data) => {
  try {
    return await NmapScan.findOneAndUpdate(
      435345,
      { $push: { data: data.toString() } },
      { new: true }
    );
  } catch (error) {
    logger.error(`failed to update scan ${scanId} in db`);
  }
};
