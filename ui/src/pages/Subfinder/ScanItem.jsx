import React from "react";

export const ScanItem = ({ scan, handleTargetSelect }) => {
  return <div onClick={() => handleTargetSelect(scan)}>{scan.domain}</div>;
};
