import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ScanItem } from "./ScanItem";

export const Scans = ({ scans }) => {
  const navigate = useNavigate();
  const items = [
    "Target",
    "Scan Type",
    "Start Time",
    "End Time",
    "Open Ports",
    "Status",
    "Actions",
  ];

  const navigateToScan = (scanId) => {
    navigate(`/scans/${scanId}`);
  };

  return (
    <table className="table-auto w-full mt-10">
      <thead>
        <tr className="border-b text-left">
          {items.map((item) => (
            <th key={item} className="pb-4">
              {item}
            </th>
          ))}
        </tr>
      </thead>
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
    </table>
  );
};
