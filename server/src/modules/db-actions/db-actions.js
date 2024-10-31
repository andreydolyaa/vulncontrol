import logger from "../../core/logger.js";

export async function create(model, data = {}) {
  try {
    const document = await model.create(data);
    logger.info(`db | document created`);
    return document;
  } catch (error) {
    logger.error(`db | error creating document [${error}]`);
  }
}

export async function update(model, data = {}, id) {
  try {
    const updated = await model.findOneAndUpdate(id, data);
    logger.info(`db | document updated [${id}]`);
    return updated;
  } catch (error) {
    logger.error(`db | error updating document [${id}] [${error}]`);
  }
}

export async function remove(model, id) {
  try {
    const updated = await model.deleteOne({ _id: id });
    logger.info(`db | document deleted [${id}]`);
    return updated;
  } catch (error) {
    logger.error(`db | error deleting document [${id}] [${error}]`);
  }
}

export async function removeAll(model) {
  try {
    const updated = await model.deleteMany({});
    logger.info(`db | all documents deleted`);
    return updated;
  } catch (error) {
    logger.error(`db | error deleting all documents`);
  }
}
