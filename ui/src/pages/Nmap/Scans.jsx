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
    navigate(`/nmap/${scanId}`);
  };

  return (
    <div className="scans">
      <table>
        <thead className="">
          <tr className="table-header">
            {items.map((item) => (
              <th
                key={item}
                className={`${item === "Actions" ? "text-center" : ""}`}
              >
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
    </div>
  );
};
