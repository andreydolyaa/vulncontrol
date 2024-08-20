import mongoose from "mongoose";

const NmapScanSchema = new mongoose.Schema(
  {
    scan: {
      type: [String],
    },
    byUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export const NmapScan = mongoose.model("NmapScan", NmapScanSchema);
