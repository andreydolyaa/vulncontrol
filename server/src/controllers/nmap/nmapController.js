import logger from "../../core/logger.js";
import { NmapScan } from "../../models/nmapScanModel.js";
import { startNmapContainer } from "./nmapDockerProcess.js";

// start new scan
export const startNmap = async (req, res) => {
  try {
    const scanId = await startNmapContainer(req.body);
    return res.status(200).send({ message: "Nmap scan started", scanId });
  } catch (error) {
    logger.error(`Failed to start nmap scan: ${error}`);
    return res.status(400).send({ message: "Failed to start Nmap scan" });
  }
};

// get all the scans
export const getAllScans = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skip = (page - 1) * limit;
  try {
    const scans = await NmapScan.find()
      .skip(skip)
      .limit(limit)
      .sort({ endTime: 1 });
    if (!scans) throw new Error();
    const totalScans = await NmapScan.countDocuments();
    const totalPages = Math.ceil(totalScans / limit);
    const responseData = {
      scans,
      totalPages,
      currentPage: page,
    };
    return res.status(200).send(responseData);
  } catch (error) {
    logger.error(`Failed to get scans: ${error}`);
    return res.status(400).send({ message: "No scans found" });
  }
};

// find scan by id
export const getScanById = async (req, res) => {
  try {
    const scan = await NmapScan.findOne({ _id: req.params.id });
    return res.status(200).send(scan);
  } catch (error) {
    logger.error(`Failed to get scan by id: ${error}`);
    return res.status(400).send({ message: "Could not find user" });
  }
};
