import logger from "../core/logger.js";

export const httpLoggerMiddleware = (req, res, next) => {
  const { method, originalUrl, headers } = req;

  res.on("finish", () => {
    const { statusCode } = res;
    logger.info(
      `HTTP | Incoming [${method}] Request; Status: [${statusCode}]; To Path: [${originalUrl}]; Payload: ${JSON.stringify(
        req?.body || "None"
      )} Headers: ${JSON.stringify(headers)}`
    );
  });

  next();
};
