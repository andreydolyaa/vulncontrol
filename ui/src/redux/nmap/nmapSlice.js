import { createSlice } from "@reduxjs/toolkit";
import { startScan, getScans, deleteScan, getScanById } from "./nmapThunks";

export const upsertScan = (scans, newScan) => {
  const index = scans.findIndex((scan) => scan.id === newScan.id);
  if (index !== -1) scans[index] = newScan;
  else scans.unshift(newScan);
  return scans;
};

export const deleteScanFromState = (scans, scanId) => {
  const index = scans.findIndex((scan) => scan.id === scanId);
  scans.splice(index, 1);
  return scans;
};

const nmapSlice = createSlice({
  name: "nmap",
  initialState: {
    loading: true,
    isLoaded: false,
    status: "idle",
    scans: [],
    uiMode: "cmd",
  },
  reducers: {
    incomingScan: (state, action) => {
      const updatedScan = action.payload.data;
      state.scans = upsertScan(state.scans, updatedScan);
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
        state.scans = upsertScan(state.scans, action.payload.data);
      })
      .addCase(startScan.rejected, (state) => {
        state.status = "failed";
        state.loading = false;
      })
      .addCase(getScans.pending, (state) => {
        // if (!state.scans.length) state.loading = true;
        if (!state.isLoaded) state.loading = true;
      })
      .addCase(getScans.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.isLoaded = true;
        state.scans = action.payload.scans;
        
      })
      .addCase(getScans.rejected, (state) => {
        state.status = "failed";
        state.loading = false;
        state.isLoaded = true;
      })
      .addCase(deleteScan.fulfilled, (state, action) => {
        const scanId = action.payload.id;
        state.scans = deleteScanFromState(state.scans, scanId);
      })
      .addCase(getScanById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getScanById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.scans = upsertScan(state.scans, action.payload.data);
      })
      .addCase(getScanById.rejected, (state) => {
        state.status = "failed";
        state.loading = false;
      });
  },
});

export const { incomingScan, setUiMode } = nmapSlice.actions;
export default nmapSlice.reducer;
