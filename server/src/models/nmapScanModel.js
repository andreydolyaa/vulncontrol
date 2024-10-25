import mongoose from "mongoose";

const NmapScanSchema = new mongoose.Schema(
  {
    stdout: {
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
    // },
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
    command: String,
    openPorts: [Number],
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

export const NmapScan = mongoose.model("NmapScan", NmapScanSchema);
