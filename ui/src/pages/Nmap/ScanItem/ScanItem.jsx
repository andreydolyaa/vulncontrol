import React from "react";
import { ScanActions } from "./ScanActions";
import { parseDate } from "../../../utils";
import { ScanStatus } from "../ScanStatus";

export const ScanItem = ({ scan, onClick }) => {
  return (
    <tr key={scan.id} className="table-body" onClick={onClick}>
      <td>{scan.target}</td>
      <td>{scan.scanType}</td>
      <td className="ports">{scan.openPorts.length}</td>
      <td>{parseDate(scan.startTime)}</td>
      <td>{parseDate(scan.endTime)}</td>
      <td>
        <ScanStatus status={scan.status} />
      </td>
      <td onClick={(e) => e.stopPropagation()}>
        <ScanActions scan={scan} />
      </td>
    </tr>
  );
};
