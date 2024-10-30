import logger from "../../core/logger.js";
import { NmapScan } from "../../models/nmap-model.js";
// import { Nmap } from "../../modules/Nmap/Nmap.js";
import { sleep } from "../../utils/index.js";

// start new scan TEST
export const startNmap = async (req, res) => {
  const { target, args, userId, command = null } = req.body;
  try {
    // const nmap = new Nmap(target, args, userId, command);
    // const scanId = await nmap.init();
    // await nmap.start();
    return res.status(200).send({ message: "Nmap scan started", scanId });
  } catch (error) {
    logger.error(`Failed to start nmap scan: ${error}`);
    return res
      .status(400)
      .send({ message: "Failed to start Nmap scan", error });
  }
};

// get all the scans
export const getAllScans = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skip = (page - 1) * limit;

  const searchQuery = {};

  if (req.query.search) {
    const searchRegex = { $regex: req.query.search, $options: "i" };
    searchQuery.$or = [
      { target: searchRegex },
      { scanType: searchRegex },
      { states: searchRegex },
    ];
  }

  try {
    const scans = await NmapScan.find(searchQuery)
      .skip(skip)
      .limit(limit)
      .sort({ startTime: -1 });
    if (!scans) throw new Error();
    const totalScans = await NmapScan.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalScans / limit);
    const responseData = {
      scans,
      totalPages,
      currentPage: page,
    };
    // await sleep(2000)
    return res.status(200).send(responseData);
  } catch (error) {
    logger.error(`Failed to get scans: ${error}`);
    return res.status(400).send({ message: "No scans found", error });
  }
};

// find scan by id
export const getScanById = async (req, res) => {
  try {
    const scan = await NmapScan.findOne({ _id: req.params.id });
    return res.status(200).send(scan);
  } catch (error) {
    logger.error(`Failed to get scan by id: ${error}`);
    return res.status(400).send({ message: "Could not find user", error });
  }
};

export const abortScan = async (req, res) => {
  try {
    await Nmap.sendKill(req.params.pid);
    return res.status(200).send({ message: "Process aborted" });
  } catch (error) {
    return res.status(400).send({ message: "Failed to abort process", error });
  }
};

export const deleteScan = async (req, res) => {
  try {
    const scan = await NmapScan.findOneAndDelete(req.params.id);
    return res.status(200).send({ message: "Scan deleted", id: scan.id });
  } catch (error) {
    logger.error(`Failed to delete scan: ${error}`);
    return res.status(400).send({ message: "Failed to delete scan", error });
  }
};
