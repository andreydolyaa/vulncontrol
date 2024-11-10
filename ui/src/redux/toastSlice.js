import { createSlice } from "@reduxjs/toolkit";

export const toastSlice = createSlice({
  name: "nmap",
  initialState: {
    toast: null,
    customToast: null,
  },
  reducers: {
    incomingToast: (state, action) => {
      state.toast = action.payload.data;
    },
    incomingCustomToast: (state, action) => {
      state.customToast = action.payload.data;
    },
    deleteToast: (state, action) => {
      state.toast = null;
      state.customToast = null;
    },
  },
});

export const { incomingToast, incomingCustomToast, deleteToast } =
  toastSlice.actions;
export default toastSlice.reducer;
