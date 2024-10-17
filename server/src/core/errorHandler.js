export const setupErrorHandler = async (
  httpServer,
  logger,
  shutdown
) => {
  logger.info("Global error handler activated");

  process.on("unhandledRejection", (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise}, reason:', ${reason}`);
    shutdown(1);
  });

  process.on("uncaughtException", (error) => {
    logger.error(`Uncaught Exception thrown: ${error}`);
    shutdown(1);
  });

  process.on("exit", (code) => {
    logger.info(`Process exited with code: ${code}`);
    shutdown(0);
  });

  httpServer.on("error", (error) => {
    logger.error(`HTTP Server error occurred: ${error}`);
    shutdown(1);
  });
};
