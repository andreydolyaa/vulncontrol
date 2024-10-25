import { spawn } from "child_process";
import logger from "../../core/logger.js";

export const removeAllContainers = async (containers) => {
  try {
    for (const container of Object.keys(containers)) {
      await stopDockerContainer(container);
      await removeDockerContainer(container);
    }
    return {};
  } catch (error) {
    logger.error(`error removing containers ${error}`);
  }
};

export const stopDockerContainer = (containerName) => {
  return new Promise((resolve, reject) => {
    const stop = spawn("docker", ["stop", containerName]);

    stop.stdout.on("data", (data) => {
      logger.info(`docker stop ${containerName} | stdout: ${data}`);
    });
    stop.stderr.on("data", (data) => {
      logger.error(`docker stop ${containerName} | stderr: ${data}`);
    });
    stop.on("close", (code) => {
      if (code === 0) {
        logger.info(
          `docker stop process completed [${containerName}] code: ${code}`
        );
        resolve();
      } else {
        reject(
          new Error(`failed to stop container ${containerName} code: ${code}`)
        );
      }
    });
  });
};

export const removeDockerContainer = (containerName) => {
  return new Promise((resolve, reject) => {
    const rm = spawn("docker", ["rm", containerName]);

    rm.stdout.on("data", (data) => {
      logger.info(`docker rm ${containerName} stdout: ${data}`);
    });
    rm.stderr.on("data", (data) => {
      logger.error(`docker rm ${containerName} stderr: ${data}`);
    });
    rm.on("close", (code) => {
      if (code === 0) {
        logger.info(
          `docker rm process completed for ${containerName} [code ${code}]`
        );
        resolve();
      } else {
        reject(
          new Error(
            `failed to remove container ${containerName} [code ${code}]`
          )
        );
      }
    });
  });
};
