import React from "react";
import moment from "moment";
import { TbWindowMaximize, TbFileDownload } from "react-icons/tb";
import { ScanStatus } from "./ScanStatus";
import { useNavigate } from "react-router-dom";

export const ScanItem = ({ scan, onClick }) => {
  const navigate = useNavigate();

  const parseDate = (date) => {
    if (!date) return "TBD";
    const time = moment(date);
    return time.format("HH:mm:ss DD/MM");
  };

  const goToScan = (id) => navigate(`/nmap/${id}`);

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
      <td className="actions" onClick={(e) => e.stopPropagation()}>
        <div className="icons">
          <TbWindowMaximize
            className="icon"
            data-tooltip-id="tooltip1"
            data-tooltip-content="View"
            onClick={() => goToScan(scan.id)}
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
