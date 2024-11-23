import { GeolocationIP } from "../models/geolocation-model.js";

export const getGeolocationPoints = async (req, res) => {
  try {
    const data = await GeolocationIP.find({}).lean();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send({
      message: "failed to get geolocation points",
      error,
    });
  }
};
