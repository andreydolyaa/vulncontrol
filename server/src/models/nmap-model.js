import mongoose from "mongoose";

const NmapScanSchema = new mongoose.Schema(
  {
    stdout: {
      type: [String],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    target: {
      type: String,
    },
    scanType: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    ipData: [Object],
    geoData: Object,
    command: String,
    openPorts: [Number],
    id: {
      type: String,
      default: function () {
        return this._id;
      },
      index: true,
    },
  },

  {
    versionKey: false,
  }
);

export const NmapScan = mongoose.model("NmapScan", NmapScanSchema);
