import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { exec, spawn } from "child_process";
import logger from "../core/logger.js";
import { sendWebsocketMessage } from "../../index.js";
import { NmapScan } from "../models/nmapScanModel.js";

// TODO: split to multiple files
// Remove writing to file as it changed to direct db save
// refactor some

const initNmapScan = (reqBody) => {
  const fileName = "nmap_stdout.txt";
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, "../temp", fileName);

  if (isOutputFileExists(filePath)) {
    logger.info(`File ${fileName} already exists`);
  } else {
    createNewFile(filePath);
    logger.info(`New ${fileName} created`);
  }

  executeChildProcess(reqBody, filePath);
};

const isOutputFileExists = (filePath) => {
  return fs.existsSync(filePath);
};

const createNewFile = (filePath) => {
  return fs.writeFile(filePath, "", (err) => {
    if (err) throw new Error(err);
  });
};

const executeChildProcess = (reqBody, filePath) => {
  const command = "nmap";
  const commandArgs = ["scanme.nmap.org", "-v"]; // temp
  // const commandArgs = ["scanme.nmap.org", "-v", "-p", "80"]; // temp

  const child = spawn(command, commandArgs);

  let output = "";

  child.stdout.on("data", async (data) => {
    console.log("stdout: ", data.toString());
    sendWebsocketMessage(`${data.toString()}`);
    output += data.toString();
    
    // TODO: fix need to write to db during scan for persisting...
    fs.appendFile(filePath, `${data.toString()}`, (err) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Failed to write to nmap file" });
      }
    });
  });

  child.stdout.on("end", async () => {
    console.log("stdout has ended, deleting file...");
    fs.unlink(filePath, (err) => {
      if (err) console.log("failed to delete file");
    });
    // console.log("!!!");
    // try {
    //   await NmapScan.create({ scan: output, byUser: reqBody.userId });
    // } catch (error) {
    //   console.log("error save nmap scan to db");
    // }
    await processScanOutput(output, reqBody.userId);
    output = "";
  });

  child.stderr.on("data", (data) => {
    console.log("stderr: ", data);
  });

  child.on("close", (code) => {
    if (code !== 0) {
      console.log(`child process exited with code ${code}`);
    }
  });
};

const processScanOutput = async (output, userId) => {
  const outputChunks = output.split("\n");
  const newScan = new NmapScan({
    scan: outputChunks,
    byUser: userId,
  });
  try {
    await newScan.save();
  } catch (error) {
    console.log("err saving scan to db");
  }
};

export const startNmapScan = async (req, res) => {
  try {
    // executeChildProcess(req.body);
    // console.log(req.body);

    initNmapScan(req.body);

    return res.status(200).send({ message: "started" });
  } catch (error) {
    return res.status(400).send({ message: "error 44" });
  }
};

export const getLastScan = async (req, res) => {
  try {
    const lastScan = await NmapScan.findOne().sort({ _id: -1 }).exec();
    if (!lastScan) throw new Error();
    // console.log(lastScan, "LAST SCAN!");
    
    return res.status(200).send(lastScan);
  } catch (error) {
    return res.status(400).send({ message: "Could not find last scan", error });
  }
};
