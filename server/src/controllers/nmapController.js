import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { exec, spawn } from "child_process";
import logger from "../core/logger.js";

const initNmapScan = (args) => {
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

  executeChildProcess(args, filePath);
};

const isOutputFileExists = (filePath) => {
  return fs.existsSync(filePath);
};

const createNewFile = (filePath) => {
  return fs.writeFile(filePath, "", (err) => {
    if (err) throw new Error(err);
  });
};

const executeChildProcess = (args, filePath) => {
  const command = "nmap";
  const commandArgs = ["scanme.nmap.org", "-v"]; // temp

  const child = spawn(command, commandArgs);

  child.stdout.on("data", async (data) => {
    console.log("stdout: ", data.toString());
    fs.appendFile(filePath, `${data.toString()}\n`, (err) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Failed to write to nmap file" });
      }
    });
  });

  child.stdout.on("end", () => {
    console.log("stdout has ended.7777777777777777777777777");
    
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

export const startNmapScan = async (req, res) => {
  try {
    // executeChildProcess(req.body);
    initNmapScan(req.body);

    return res.status(200).send({ message: "started" });
  } catch (error) {
    return res.status(400).send({ message: "error 44" });
  }
};
