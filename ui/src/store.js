import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";
import { nmapReducer } from "./redux/nmap";
import { subfinderReducer } from "./redux/subfinder";
import { geolocationReducer } from "./redux/geolocation";
import toastReducer from "./redux/toastSlice";
import modalReducer from "./redux/modalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    nmap: nmapReducer,
    subfinder: subfinderReducer,
    geolocation: geolocationReducer,
    toast: toastReducer,
    modal: modalReducer,
  },
});
