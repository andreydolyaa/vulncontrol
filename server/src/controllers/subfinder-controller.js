import { SubfinderScan } from "../models/subfinder-model.js";
import { Subfinder } from "../modules/subfinder/subfinder.js";

export const startSubfinder = async (req, res) => {
  const { userId, scanType = "subdomains", domain } = req.body;
  try {
    const subfinder = new Subfinder({ userId, scanType, domain });
    const scan = await subfinder.start();
    return res.status(200).send({ message: "subfinder scan started", scan });
  } catch (error) {
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
    searchQuery.$or = [
      { target: searchRegex },
      { scanType: searchRegex },
      { states: searchRegex },
    ];
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
    
    return res.status(200).send(responseData);
  } catch (error) {
    return res.status(400).send({ message: "No scans found", error });
  }
};