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
    target: {
      type: String,
      required: true,
    },
    scanType: {
      type: String,
      required: true,
    },
    // duration: {
    //   type: String,
    //   required: true,
    // },
    status: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    openPorts: [Number],
  },
  {
    versionKey: false,
  }
);

export const NmapScan = mongoose.model("NmapScan", NmapScanSchema);
