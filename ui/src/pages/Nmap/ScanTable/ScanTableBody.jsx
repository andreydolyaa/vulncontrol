import React from "react";
import { ScanItem } from "./ScanTableItem/ScanTableItem";
import { useNavigate } from "react-router-dom";

export const ScansTableBody = ({ scans }) => {
  const navigate = useNavigate();

  const navigateToScan = (scanId) => {
    navigate(`/nmap/${scanId}`);
  };

  return (
    <tbody>
      {scans.map((scan) => {
        return (
          <ScanItem
            key={scan.id}
            scan={scan}
            onClick={() => navigateToScan(scan.id)}
          />
        );
      })}
    </tbody>
  );
};
