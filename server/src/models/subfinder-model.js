import mongoose from "mongoose";

const SubfinderScanSchema = new mongoose.Schema(
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
    subdomains: {
      type: [String],
    },
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

export const SubfinderScan = mongoose.model(
  "SubfinderScan",
  SubfinderScanSchema
);
