export const serverMsg = {
  START_ERROR: "Failed to start server",
  START_SUCCESS: (port) => `HTTP server started on port ${port}`,
  START_SUCCESS_WS: (port) => `Websocket server started on port ${port}`,
  SHUT_DOWN_IN_PROGRESS: "Shutting down server...",
  SHUT_DOWN_COMPLETE: "HTTP Server and Websocket Server closed.",
};

export const databaseMsg = {
  CONNECTION_SUCCESS: "Connected to Database",
  CONNECTION_ERROR: "Failed to connect to Database",
  DISCONNECTION_SUCCESS: "Disconnected from Database",
  DISCONNECTION_ERROR: "Database Error during disconnection",
  RECONNECT_ATTEMPT: "Trying to Reconnect..."
};

export const userMsg = {
  REGISTER_SUCCESS: "User created successfully",
  REGISTER_FAILED: "User registration failed",
  REGISTER_EXISTS: "Email already exists",
  LOGIN_SUCCESS: "Logged in successfully",
  LOGIN_FAILED: "Wrong credentials",
  LOGIN_ERROR: "Error occurred during login"
}