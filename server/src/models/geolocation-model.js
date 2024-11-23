import mongoose from "mongoose";

const GeolocationIPSchema = new mongoose.Schema(
  {
    data: Object,
    scanCount: {
      type: Number,
      default: 0,
    },
    ip: String,
    scanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nmap",
      required: true,
      index: true,
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
