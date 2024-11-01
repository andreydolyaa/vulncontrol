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
  getResource(id) {    
    return this[this.resourceName][id];
  }
  getInfo() {
    logger.warn(`ResourceManager | ${JSON.stringify(this[this.resourceName])}`);
  }
}
