import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
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

export const abortScan = createAsyncThunk(
  "nmap/abortScan",
  async (scanId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/nmap/abort/${scanId}`);
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue({ message: "An error occurred" });
    }
  }
);

export const deleteScan = createAsyncThunk(
  "nmap/deleteScan",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/nmap/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue({ message: "An error occurred" });
    }
  }
);

const upsertScan = (scans, newScan) => {
  const index = scans.findIndex((scan) => scan.id === newScan.id);
  if (index !== -1) scans[index] = newScan;
  else scans.unshift(newScan);
  return scans;
};

export const nmapSlice = createSlice({
  name: "nmap",
  initialState: {
    loading: false,
    status: "idle",
    scans: [],
    uiMode: "command",
  },
  reducers: {
    incomingScan: (state, action) => {
      const updatedScan = action.payload;
      const index = state.scans.findIndex((scan) => scan.id === updatedScan.id);
      if (index !== -1) state.scans[index] = updatedScan;
      else state.scans.unshift(updatedScan);
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
        state.scans = upsertScan(state.scans, action.payload.scan);
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
      })
      .addCase(deleteScan.fulfilled, (state, action) => {
        state.scans = state.scans.filter(
          (scan) => scan.id !== action.payload.id
        );
      });
  },
});

// explanation of createSelector (uses memoization)
export const selectScanById = createSelector(
  // 1. First argument: Array of "input selectors"
  [
    // Input selector 1: gets all scans from state
    (state) => state.nmap.scans,

    // Input selector 2: gets scanId from component
    // (_) means we don't use state here, we just want the second argument
    (_, scanId) => scanId,
  ],

  // 2. Second argument: "Result selector"
  // Gets the results from input selectors as arguments
  (scans, scanId) => scans.find((scan) => scan.id === scanId)
);

export const { incomingScan, getScan, setUiMode } = nmapSlice.actions;
export default nmapSlice.reducer;
