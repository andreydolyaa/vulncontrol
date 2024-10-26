import logger from "../../core/logger.js";

export class ResourceManager {
  constructor(resourceName) {
    this.resourceName = resourceName;
    this[resourceName] = {};
  }
  add(id, resource) {
    this[this.resourceName][id] = resource;
  }
  remove(id) {
    delete this[this.resourceName][id];
  }
  removeAll() {
    this[this.resourceName] = {};
  }
  getInfo() {
    logger.warn(`ResourceManager | ${JSON.stringify(this[this.resourceName])}`);
  }
}
