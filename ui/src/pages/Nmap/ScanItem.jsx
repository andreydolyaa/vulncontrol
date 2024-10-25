import React, { useState } from "react";
import moment from "moment";
import { TbAlignBoxLeftMiddle, TbFileDownload } from "react-icons/tb";
import { PiStopCircleLight } from "react-icons/pi";

import { ScanStatus } from "./ScanStatus";
import { useNavigate } from "react-router-dom";
import { downloadBlob } from "../../utils";
import { useDispatch } from "react-redux";
import { abortScan } from "../../redux/nmapSlice";

export const ScanItem = ({ scan, onClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const parseDate = (date) => {
    if (!date) return "TBD";
    const time = moment(date);
    return time.format("HH:mm:ss DD/MM");
  };

  const exportScan = (scan) => {
    const fileName = `scan_${scan.id}_${scan.startTime}.txt`;
    const content =
      `Scan ID: ${scan.id}\n` +
      `Executed by: ${scan.byUser}\n` +
      `Started: ${scan.startTime}\n` +
      `Ended: ${scan.endTime}\n` +
      `Status: ${scan.status}\n` +
      `Executed command: ${scan.command}\n` +
      `Target: ${scan.target}\n` +
      `Found Ports: ${scan.openPorts.length ? scan.openPorts : "None"}\n` +
      `\nstdout:\n\n${scan.stdout.join("")}`;
    downloadBlob(content, fileName);
  };

  const goToScan = (id) => navigate(`/nmap/${id}`);

  const abort = (pid) => {
    dispatch(abortScan(pid));
  };

  const isLive = () => scan.status === "live";

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
          {isLive() && (
            <PiStopCircleLight
              className="icon stop-icon"
              data-tooltip-id="tooltip1"
              data-tooltip-content="Abort Scan"
              onClick={() => abort(scan.processPid)}
            />
          )}
          <TbAlignBoxLeftMiddle
            className="icon"
            data-tooltip-id="tooltip1"
            data-tooltip-content="View"
            onClick={() => goToScan(scan.id)}
          />
          {!isLive() && (
            <TbFileDownload
              className="icon"
              data-tooltip-id="tooltip1"
              data-tooltip-content="Export"
              onClick={() => exportScan(scan)}
            />
          )}
        </div>
      </td>
    </tr>
  );
};
