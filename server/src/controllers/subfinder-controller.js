import { subscriptionPaths } from "../constants/common.js";
import {
  NMAP_BIN,
  PROC_STATUS,
  SUBFINDER_BIN,
} from "../constants/processes.js";
import { moduleWrapper } from "../constants/wrappers.js";
import logger from "../core/logger.js";
import { SubfinderScan } from "../models/subfinder-model.js";
import { HttpActions } from "../modules/actions/http-actions.js";
import { Docker } from "../modules/docker/docker.js";
import { Subfinder } from "../modules/subfinder/subfinder.js";

export const startSubfinder = async (req, res) => {
  const { userId, scanType = "subdomains", domain } = req.body;
  try {
    if (Docker.processes.size >= process.env.MAX_IMAGES) {
      const msg = `Cannot run more then ${process.env.MAX_IMAGES} scans`;
      HttpActions.notify(
        subscriptionPaths.SUBFINDER_ALL,
        { error: msg },
        "toast"
      );
      throw new Error(msg);
    }
    const subfinder = new Subfinder({ userId, scanType, domain });
    const scan = await subfinder.start();
    return res.status(200).send({
      message: "subfinder scan started",
      ...moduleWrapper(SUBFINDER_BIN, scan),
    });
  } catch (error) {
    logger.error(`Error starting nmap scan: [${error}]`);
    return res
      .status(400)
      .send({ message: "failed to start subfinder scan", error });
  }
};

export const getAllScans = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skip = (page - 1) * limit;

  const searchQuery = {};

  if (req.query.search) {
    const searchRegex = { $regex: req.query.search, $options: "i" };
    searchQuery.$or = [{ target: searchRegex }, { domain: searchRegex }];
  }

  try {
    const scans = await SubfinderScan.find(searchQuery)
      .skip(skip)
      .limit(limit)
      .sort({ startTime: -1 });

    if (!scans) throw new Error();

    const totalScans = await SubfinderScan.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalScans / limit);
    const responseData = {
      scans,
      totalPages,
      currentPage: page,
    };

    return res.status(200).send(moduleWrapper(SUBFINDER_BIN, responseData));
  } catch (error) {
    return res.status(400).send({ message: "No scans found", error });
  }
};

export const deleteScan = async (req, res) => {
  try {
    const scan = await SubfinderScan.findOneAndDelete({ id: req.params.id });
    scan.status = PROC_STATUS.DELETED;
    HttpActions.notify(subscriptionPaths.SUBFINDER_ALL, scan, "toast");
    return res.status(200).send({ message: "Scan deleted", id: req.params.id });
  } catch (error) {
    return res.status(400).send({ message: "Failed to delete scan", error });
  }
};
