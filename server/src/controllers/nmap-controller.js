import { moduleWrapper } from "../constants/wrappers.js";
import { NmapScan } from "../models/nmap-model.js";
import { Nmap } from "../modules/nmap/nmap.js";
import { NMAP_BIN, PROC_STATUS } from "../constants/processes.js";
import { HttpActions } from "../modules/actions/http-actions.js";
import { subscriptionPaths } from "../constants/common.js";
import { Docker } from "../modules/docker/docker.js";
import logger from "../core/logger.js";

export const startNmap = async (req, res) => {
  const { args, userId, scanType = "default" } = req.body;

  try {
    if (Docker.processes.size >= process.env.MAX_IMAGES) {
      const msg = `Cannot run more then ${process.env.MAX_IMAGES} scans`;
      HttpActions.notify(subscriptionPaths.NMAP_ALL, { error: msg }, "toast");
      throw new Error(msg);
    }
    const nmap = new Nmap({ args, userId, scanType });
    const scan = await nmap.start();
    return res
      .status(200)
      .send({ message: "Nmap scan started", ...moduleWrapper(NMAP_BIN, scan) });
  } catch (error) {
    logger.error(`Error starting nmap scan: [${error}]`);
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
    const scans = await NmapScan.find({ ...searchQuery, userId: req.userId })
      .skip(skip)
      .limit(limit)
      .sort({ startTime: -1 });

    if (!scans) throw new Error();

    const totalScans = await NmapScan.countDocuments({
      ...searchQuery,
      userId: req.userId,
    });
    const totalPages = Math.ceil(totalScans / limit);
    const responseData = {
      scans,
      totalPages,
      currentPage: page,
    };

    return res.status(200).send(moduleWrapper(NMAP_BIN, responseData));
  } catch (error) {
    return res.status(400).send({ message: "No scans found", error });
  }
};

// find scan by id
export const getScanById = async (req, res) => {
  try {
    const scan = await NmapScan.findOne({ _id: req.params.id });
    return res.status(200).send(moduleWrapper(NMAP_BIN, scan));
  } catch (error) {
    return res.status(400).send({ message: "Could not find user", error });
  }
};

export const abortScan = async (req, res) => {
  const scanId = req.params.id;
  try {
    await Nmap.abortScan(scanId);
    return res.status(200).send({ message: "Process aborted" });
  } catch (error) {
    return res.status(400).send({ message: "Failed to abort process", error });
  }
};

export const deleteScan = async (req, res) => {
  try {
    const scan = await NmapScan.findOneAndDelete(req.params.id);
    scan.status = PROC_STATUS.DELETED;
    HttpActions.notify(subscriptionPaths.NMAP_ALL, scan, "toast");
    return res.status(200).send({ message: "Scan deleted", id: req.params.id });
  } catch (error) {
    return res.status(400).send({ message: "Failed to delete scan", error });
  }
};
