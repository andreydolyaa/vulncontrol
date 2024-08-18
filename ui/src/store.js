import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";
import nmapReducer from "./redux/nmapSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    nmap: nmapReducer,
  },
});
