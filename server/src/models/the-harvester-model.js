import mongoose from "mongoose";

const TheHarvesterScanSchema = new mongoose.Schema(
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
    data: {
      autonomousSystemNumbers: [String],
      urls: [String],
      ips: [String],
      hosts: [String],
      twitterUsers: [String],
      linkedInUsers: [String],
      trelloUsers: [String],
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

export const TheHarvesterScan = mongoose.model(
  "TheHarvesterScan",
  TheHarvesterScanSchema
);
