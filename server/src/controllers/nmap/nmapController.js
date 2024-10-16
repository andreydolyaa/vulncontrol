import { NmapScan } from "../../models/nmapScanModel.js";
import { startNmapContainer } from "./nmapDockerProcess.js";


// start new scan
export const startNmapScan = async (req, res) => {
  try {
    const scanId = await startNmapContainer(req.body);
    return res.status(200).send({ message: "Nmap scan started", scanId });
  } catch (error) {
    return res.status(400).send({ message: "Failed to start Nmap scan" });
  }
};

// get all the scans
export const getAllScans = async (req, res) => {
  try {
    const scans = await NmapScan.find({});
    if (!scans) throw new Error();
    return res.status(200).send(scans);
  } catch (error) {
    return res.status(400).send({ message: "No scans found", error });
  }
};

// find scan by id
export const getScanById = async (req, res) => {
  try {
    const scan = await NmapScan.findOne({ _id: req.params.id });
    return res.status(200).send(scan);
  } catch (error) {
    return res.status(400).send({ message: "Could not find user", error });
  }
};
