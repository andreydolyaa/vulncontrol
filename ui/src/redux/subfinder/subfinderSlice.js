import { createSlice } from "@reduxjs/toolkit";
import { upsertScan, deleteScanFromState } from "../nmap/nmapSlice";
import {
  startSubfinderScan,
  getScans,
  deleteSubfinderScan,
} from "./subfinderThunks";

const subfinderSlice = createSlice({
  name: "subfinder",
  initialState: {
    selectedScan: null,
    loading: true,
    status: "idle",
    scans: [],
  },
  reducers: {
    updateSubfinder: (state, action) => {
      const updatedScan = action.payload.data;
      state.scans = upsertScan(state.scans, updatedScan);
    },
    setSelectedScan: (state, action) => {
      state.selectedScan = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startSubfinderScan.pending, (state) => {
        state.loading = true;
      })
      .addCase(startSubfinderScan.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.scans = upsertScan(state.scans, action.payload.data);
      })
      .addCase(startSubfinderScan.rejected, (state) => {
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
      .addCase(getScans.rejected, (state) => {
        state.status = "failed";
        state.loading = false;
      })
      .addCase(deleteSubfinderScan.fulfilled, (state, action) => {
        const scanId = action.payload.id;
        state.scans = deleteScanFromState(state.scans, scanId);
      });
    // .addCase(getScanById.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(getScanById.fulfilled, (state, action) => {
    //   state.status = "succeeded";
    //   state.loading = false;
    //   state.scans = upsertScan(state.scans, action.payload);
    // })
    // .addCase(getScanById.rejected, (state) => {
    //   state.status = "failed";
    //   state.loading = false;
    // });
  },
});

export const { updateSubfinder, setSelectedScan } = subfinderSlice.actions;
export default subfinderSlice.reducer;
