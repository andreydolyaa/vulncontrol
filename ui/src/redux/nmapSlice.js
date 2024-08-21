import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/index";

export const startScan = createAsyncThunk(
  "nmap/startScan",
  async ({ data, userId }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/nmap", { data, userId });
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue({ message: "An error occurred" });
    }
  }
);

export const getLastScan = createAsyncThunk(
  "nmap/getLastScan",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/nmap/last");
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue({ message: "An error occurred" });
    }
  }
);

export const nmapSlice = createSlice({
  name: "nmap",
  initialState: {
    scan: null,
    loading: false,
    status: "idle",
    messages: [],
    scanId: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startScan.pending, (state) => {
        state.loading = true;
      })
      .addCase(startScan.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.scanId = action.payload.scanId;
      })
      .addCase(startScan.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
      })
      .addCase(getLastScan.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLastScan.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.messages = action.payload.scan;
      })
      .addCase(getLastScan.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
      });
  },
});

export const { addMessage, clearMessages } = nmapSlice.actions;
export default nmapSlice.reducer;
