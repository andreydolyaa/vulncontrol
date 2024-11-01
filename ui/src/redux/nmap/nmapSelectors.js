import { createSelector } from "@reduxjs/toolkit";

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
