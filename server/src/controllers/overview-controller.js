import { NmapScan } from "../models/nmap-model.js";
import { SubfinderScan } from "../models/subfinder-model.js";
import logger from "../core/logger.js";

export const getRecentScans = async (req, res) => {
  const param = req.params.module;
  const module = param === "NmapScan" ? NmapScan : SubfinderScan;

  try {
    const scans = await module.find().sort({ endTime: -1 }).limit(7);
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
