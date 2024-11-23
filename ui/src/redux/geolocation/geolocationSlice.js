import { createSlice } from "@reduxjs/toolkit";
import { getGeolocationPoints } from "./geolocationThunks";
// import { upsertScan, deleteScanFromState } from "../nmap/nmapSlice";
// import {
//   startSubfinderScan,
//   getScans,
//   deleteSubfinderScan,
// } from "./subfinderThunks";

const geolocationSlice = createSlice({
  name: "geolocation",
  initialState: {
    loading: true,
    status: "idle",
    geolocationPoints: [],
    coords: [],
  },
  reducers: {
    setMapCoords: (state, action) => {
      state.coords = action.payload;
    },
    // updateSubfinder: (state, action) => {
    //   const updatedScan = action.payload.data;
    //   state.scans = upsertScan(state.scans, updatedScan);
    // },
    // setSelectedScan: (state, action) => {
    //   state.selectedScan = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGeolocationPoints.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGeolocationPoints.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        // state.scans = upsertScan(state.scans, action.payload.data);

        state.geolocationPoints = action.payload;
      })
      .addCase(getGeolocationPoints.rejected, (state) => {
        state.status = "failed";
        state.loading = false;
      });
    // .addCase(getScans.pending, (state) => {
    //   if (!state.scans.length) state.loading = true;
    // })
    // .addCase(getScans.fulfilled, (state, action) => {
    //   state.status = "succeeded";
    //   state.loading = false;
    //   state.scans = action.payload.scans;
    // })
    // .addCase(getScans.rejected, (state) => {
    //   state.status = "failed";
    //   state.loading = false;
    // })
    // .addCase(deleteSubfinderScan.fulfilled, (state, action) => {
    //   const scanId = action.payload.id;
    //   state.scans = deleteScanFromState(state.scans, scanId);
    // });
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

export const { setMapCoords } = geolocationSlice.actions;
export default geolocationSlice.reducer;
