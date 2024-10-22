export const setupErrorHandler = async (httpServer, logger, shutdown) => {
  logger.info("Global error handler activated");

  process.on("unhandledRejection", (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise}, reason:', ${reason}`);
    shutdown(1);
  });

  process.on("uncaughtException", (error) => {
    logger.error(`Uncaught Exception thrown: ${error}`);
    shutdown(1);
  });

  process.on("SIGINT", () => {
    logger.info("Received SIGINT. Shutting down gracefully...");
    shutdown(0);
  });

  process.on("SIGTERM", () => {
    logger.info("Received SIGTERM. Shutting down gracefully...");
    shutdown(0);
  });
};
