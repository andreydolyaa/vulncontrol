import React from "react";
import { TableItem } from "./TableItem/TableItem";
import { useNavigate } from "react-router-dom";

export const TableBody = ({ scans }) => {
  const navigate = useNavigate();

  const navigateToScan = (scanId) => {
    navigate(`/nmap/${scanId}`);
  };

  return (
    <tbody>
      {scans.map((scan) => {
        return (
          <TableItem
            key={scan.id}
            scan={scan}
            onClick={() => navigateToScan(scan.id)}
          />
        );
      })}
    </tbody>
  );
};
