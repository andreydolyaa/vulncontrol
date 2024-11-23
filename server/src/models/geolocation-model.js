import mongoose from "mongoose";

const GeolocationIPSchema = new mongoose.Schema(
  {
    data: Object,
    scanCount: {
      type: Number,
      default: 0,
    },
    ip: String,
    target: String,
    scanId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "scanModel",
      required: true,
      index: true,
    },
    scanModel: {
      type: String,
      required: true,
      enum: ["Nmap", "Subfinder"],
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export const GeolocationIP = mongoose.model(
  "GeolocationIP",
  GeolocationIPSchema
);
