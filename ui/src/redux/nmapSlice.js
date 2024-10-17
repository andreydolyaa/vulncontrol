import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/index";

export const startScan = createAsyncThunk(
  "nmap/startScan",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/nmap", data);
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue({ message: "An error occurred" });
    }
  }
);

export const getScans = createAsyncThunk(
  "nmap/getScans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/nmap/scans");
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
    loading: false,
    status: "idle",
    scans: [],
    // messages: [],
  },
  reducers: {
    // addMessage: (state, action) => {
    //   state.messages.push(action.payload);
    // },
    // clearMessages: (state) => {
    //   state.messages = [];
    // },
    incomingScan: (state, action) => {
      const newScans = JSON.parse(action.payload);
      console.log(newScans, "XX");
      
      newScans.forEach((newScan) => {
        const existingScanIndex = state.scans.findIndex(
          (scan) => scan.id === newScan.id
        );
        if (existingScanIndex >= 0) {
          state.scans[existingScanIndex] = newScan;
        } else {
          state.scans.push(newScan);
        }
      });
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
      })
      .addCase(startScan.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
      })
      .addCase(getScans.pending, (state) => {
        state.loading = true;
      })
      .addCase(getScans.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.scans = action.payload;
      })
      .addCase(getScans.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
      });
  },
});

// export const { addMessage, clearMessages } = nmapSlice.actions;
export const { incomingScan } = nmapSlice.actions;
export default nmapSlice.reducer;
