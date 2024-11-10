import React from "react";
import { ScanItemPre } from "../styles";
import { ScanStatus } from "./ScanStatus";

export const ScanItem = ({ scan, handleScanSelect }) => {
  return (
    <ScanItemPre onClick={() => handleScanSelect(scan)}>
      {scan.domain}
      <ScanStatus status={scan.status}/>
    </ScanItemPre>
  );
};
