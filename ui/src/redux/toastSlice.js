import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/index";

export const toastSlice = createSlice({
  name: "nmap",
  initialState: {
    toast: null,
  },
  reducers: {
    incomingToast: (state, action) => {
      state.toast = action.payload;
    },
    deleteToast: (state, action) => {
      state.toast = null;
    },
  },
});

export const { incomingToast, deleteToast } = toastSlice.actions;
export default toastSlice.reducer;
