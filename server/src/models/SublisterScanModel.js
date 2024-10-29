import mongoose from "mongoose";

const SublisterScanSchema = new mongoose.Schema(
  {
    stdout: [String],
    byUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    target: {
      type: String,
      required: true,
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
    subdomains: [String],
    processPid: Number,
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

export const SublisterScan = mongoose.model(
  "SublisterScan",
  SublisterScanSchema
);
