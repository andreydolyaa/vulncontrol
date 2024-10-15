import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { exec, spawn } from "child_process";
import logger from "../core/logger.js";
import { sendWebsocketMessage } from "../../index.js";
import { NmapScan } from "../models/nmapScanModel.js";
import { User } from "../models/userModel.js";

// TODO: split to multiple files
// Remove writing to file as it changed to direct db save
// refactor some

const executeChildProcess = async (reqBody) => {
  const command = "docker";
  const commandArgs = ["run", "instrumentisto/nmap", "scanme.nmap.org", "-v"]; // temp
  // const commandArgs = ["scanme.nmap.org", "-v", "-p", "31337"]; // temp
  const child = spawn(command, commandArgs);
  let newScan;

  // console.log(child);

  try {
    newScan = await NmapScan.create({ scan: [], byUser: reqBody.userId });
    // res.status(200).send(newScan._id)
  } catch (error) {
    throw new Error(error);
  }

  child.stdout.on("data", async (data) => {
    console.log("stdout: ", data.toString());
    sendWebsocketMessage(`${data.toString()}`);
    try {
      await NmapScan.findOneAndUpdate(
        newScan._id,
        { $push: { scan: data.toString() } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  });

  child.stdout.on("end", async () => {
    console.log("stdout has ended");
  });

  child.stderr.on("data", (data) => {
    console.log("stderr: ", data);
  });

  child.on("close", (code) => {
    if (code !== 0) {
      console.log(`child process exited with code ${code}`);
    }
  });

  return newScan._id;
};

export const startNmapScan = async (req, res) => {
  try {
    const scanId = await executeChildProcess(req.body);
    return res.status(200).send({ message: "Nmap scan started", scanId });
  } catch (error) {
    return res.status(400).send({ message: "Failed to start Nmap scan" });
  }
};

export const getLastScan = async (req, res) => {
  try {
    const lastScan = await NmapScan.findOne().sort({ _id: -1 }).exec();
    if (!lastScan) throw new Error();
    return res.status(200).send(lastScan);
  } catch (error) {
    return res.status(400).send({ message: "Could not find last scan", error });
  }
};

export const getAllScans = async (req, res) => {
  try {
    const scans = await NmapScan.find({});
    if (!scans) throw new Error();
    return res.status(200).send(scans);
  } catch (error) {
    return res.status(400).send({ message: "No scans found", error });
  }
};

export const getScanById = async (req, res) => {
  try {
    const scan = await NmapScan.findOne({ _id: req.params.id});
    return res.status(200).send(scan);
  } catch (error) {
    return res.status(400).send({ message: "Could not find user", error });
  }
};
