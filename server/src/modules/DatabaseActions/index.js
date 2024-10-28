import { Logger } from "../../core/logger2.js";

export const createDocument = async (model, data = {}) => {
  try {
    return await model.create({ ...data });
  } catch (error) {
    Logger.DB.error(`failed to create new document [error: ${error}]`);
  }
};

export const updateDocument = async (model, data, id) => {
  try {
    return await model.findOneAndUpdate(id, data, { new: true });
  } catch (error) {
    Logger.DB.error(`failed to update document [error: ${error}]`);
  }
};
