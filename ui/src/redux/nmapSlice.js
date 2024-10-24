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
  async ({ currentPage, limit, search }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/api/nmap/scans?page=${currentPage}&limit=${limit}&search=${encodeURIComponent(
          search
        )}`
      );
      // return response.data;
      return {
        scans: response.data.scans,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage,
      };
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
    uiMode: "easy",
  },
  reducers: {
    incomingScan: (state, action) => {
      const updatedScan = action.payload;
      state.scans = state.scans.filter((scan) => scan.id !== updatedScan.id);
      state.scans.unshift(updatedScan);
    },
    setUiMode: (state, action) => {
      state.uiMode = action.payload;
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
        if (!state.scans.length) state.loading = true;
      })
      .addCase(getScans.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.scans = action.payload.scans;
      })
      .addCase(getScans.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
      });
  },
});

export const getScanById = (state, scanId) => {
  return state.nmap.scans.find((scan) => scan.id === scanId);
};

export const { incomingScan, getScan, setUiMode } = nmapSlice.actions;
export default nmapSlice.reducer;
