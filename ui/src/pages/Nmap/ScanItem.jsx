import React from "react";
import moment from "moment";
import { TbWindowMaximize, TbFileDownload } from "react-icons/tb";
import { ScanStatus } from "./ScanStatus";

export const ScanItem = ({ scan, onClick }) => {
  const parseDate = (date) => {
    if (!date) return "TBD";
    const time = moment(date);
    return time.format("HH:mm:ss DD/MM/YY");
  };
  return (
    <tr key={scan.id} className="table-body" onClick={onClick}>
      <td>{scan.target}</td>
      <td>{scan.scanType}</td>
      <td>{parseDate(scan.startTime)}</td>
      <td>{parseDate(scan.endTime)}</td>
      <td>{scan.openPorts.length}</td>
      <td>
        <ScanStatus status={scan.status} />
      </td>
      <td className="actions" onClick={(e) => e.stopPropagation()}>
        <div className="icons">
        <TbWindowMaximize
          className="icon"
          data-tooltip-id="tooltip1"
          data-tooltip-content="View"
        />
        <TbFileDownload
          className="icon"
          data-tooltip-id="tooltip1"
          data-tooltip-content="Export"
        />
        </div>
      </td>
    </tr>
  );
};
