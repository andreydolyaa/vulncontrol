import { exec, spawn } from "child_process";

const executeChildProcess = (args) => {
  // TODO: handle args
  // output xml file
  // convert to json
  // store in db
  // remove xml & json files
  // OR save the complete stdout as str in db
  const command = "nmap";
  const commandArgs = ["scanme.nmap.org", "-v"]; // temp

  const child = spawn(command, commandArgs);

  
  child.stdout.on("data", (data) => {
    console.log("stdout: ", data.toString());
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
    executeChildProcess(req.body);

    return res.status(200).send({ message: "started" });
  } catch (error) {
    return res.status(400).send({ message: "error 44" });
  }
};
