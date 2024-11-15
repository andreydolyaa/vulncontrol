import { NmapScan } from "../models/nmap-model.js";
import { SubfinderScan } from "../models/subfinder-model.js";

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

    return res.json(mergedData);
  } catch (error) {
    console.error("Error aggregating scan data:", error);
    return res.status(500).send("Internal Server Error");
  }
};
