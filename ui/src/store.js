import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";
import { nmapReducer } from "./redux/nmap";
import { subfinderReducer } from "./redux/subfinder";
import toastReducer from "./redux/toastSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    nmap: nmapReducer,
    subfinder: subfinderReducer,
    toast: toastReducer,
  },
});
