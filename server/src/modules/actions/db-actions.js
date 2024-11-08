import logger from "../../core/logger.js";

export async function create(model, data = {}) {
  try {
    const document = await model.create(data);
    logger.info(`DB | document created`);
    return document;
  } catch (error) {
    logger.error(`DB | error creating document [${error}]`);
  }
}

export async function update(model, data = {}, id) {
  try {
    const updated = await model.findOneAndUpdate(id, data, { new: true });
    logger.info(`DB | document updated [${id}]`);
    return updated;
  } catch (error) {
    logger.error(`DB | error updating document [${id}] [${error}]`);
  }
}

export async function remove(model, id) {
  try {
    const updated = await model.deleteOne({ _id: id });
    logger.info(`DB | document deleted [${id}]`);
    return updated;
  } catch (error) {
    logger.error(`DB | error deleting document [${id}] [${error}]`);
  }
}

export async function removeAll(model) {
  try {
    const updated = await model.deleteMany({});
    logger.info(`DB | all documents deleted`);
    return updated;
  } catch (error) {
    logger.error(`DB | error deleting all documents`);
  }
}
