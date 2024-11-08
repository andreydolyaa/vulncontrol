import React from "react";

export const ScanItem = ({ scan, handleScanSelect }) => {
  return <div onClick={() => handleScanSelect(scan)}>{scan.domain}</div>;
};
