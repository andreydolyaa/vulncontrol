import { NmapScan } from "../models/nmap-model.js";
import { SubfinderScan } from "../models/subfinder-model.js";
import logger from "../core/logger.js";
import { Utils } from '../modules/utils/utils.js';

export const getScansStatusData = async (req, res) => {
  const param = req.params.module;
  const module = param === "nmap" ? NmapScan : SubfinderScan;

  const allStatuses = ["live", "done", "failed", "aborted", "deleted"];

  try {
    const counts = await module
      .aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }])
      .exec();

    const statusMap = counts.reduce((acc, { _id, count }) => {
      acc[_id] = count;
      return acc;
    }, {});

    const result = allStatuses.map((status) => ({
      status,
      count: statusMap[status] || 0,
    }));
    await Utils.sleep(2000)
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({ message: "Failed to fetch data", error });
  }
};

export const getRecentScans = async (req, res) => {
  const param = req.params.module;
  const module = param === "nmap" ? NmapScan : SubfinderScan;

  try {
    const scans = await module.find().sort({ startTime: -1 }).limit(6);
    await Utils.sleep(2000)
    return res.status(200).send(scans);
  } catch (error) {
    return res.status(500).send({ message: "Failed to fetch data", error });
  }
};

export const getNmapData = async (req, res) => {
  try {
    const portStats = await NmapScan.aggregate([
      { $unwind: "$openPorts" },
      { $group: { _id: "$openPorts", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    return res.status(200).send(portStats);
  } catch (error) {
    return res.status(500).send({ message: "Failed to fetch data", error });
  }
};

export const getOverviewData = async (req, res) => {
  try {
    const nmapData = await NmapScan.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$startTime" } },
          nmapScans: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const subfinderData = await SubfinderScan.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$startTime" } },
          subfinderScans: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const mergedData = [];

    const allDates = new Set([
      ...nmapData.map((item) => item._id),
      ...subfinderData.map((item) => item._id),
    ]);

    allDates.forEach((date) => {
      const nmapScan = nmapData.find((item) => item._id === date);
      const subfinderScan = subfinderData.find((item) => item._id === date);

      mergedData.push({
        name: date,
        nmap: nmapScan ? nmapScan.nmapScans : 0,
        subfinder: subfinderScan ? subfinderScan.subfinderScans : 0,
      });
    });

    return res.send(mergedData);
  } catch (error) {
    logger.error("Error aggregating scan data:", error);
    return res.status(500).send("Internal Server Error");
  }
};
