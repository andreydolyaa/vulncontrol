import React, { useState } from "react";
import { ScanWrapper } from "../styles";
import { Subdomains } from "../Subdomains/Subdomains";
import { ScansList } from "./ScansList";

export const ScanList = ({ scans }) => {
  const [selectedScan, setScanSelect] = useState(null);

  const handleScanSelect = (target) => {
    setScanSelect(target);
  };

  return (
    <ScanWrapper>
      <ScansList scans={scans} handleScanSelect={handleScanSelect} />
      <Subdomains selectedScan={selectedScan} />
    </ScanWrapper>
  );
};
