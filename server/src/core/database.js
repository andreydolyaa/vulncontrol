import mongoose from "mongoose";
import logger from "./logger.js";
import { databaseMsg } from "../constants/messages.js";
import { sleep } from "../utils/index.js";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    logger.info(databaseMsg.CONNECTION_SUCCESS);
  } catch (error) {
    logger.error(databaseMsg.CONNECTION_ERROR);
    await disconnectFromDatabase();
    logger.info(databaseMsg.RECONNECT_ATTEMPT);
    await sleep(3000);
    await connectToDatabase();
  }
};

const disconnectFromDatabase = async () => {
  try {
    await mongoose.disconnect();
    logger.warn(databaseMsg.DISCONNECTION_SUCCESS);
  } catch (error) {
    logger.error(databaseMsg.DISCONNECTION_ERROR);
  }
};
