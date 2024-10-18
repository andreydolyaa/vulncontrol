import React from "react";
import moment from "moment";
import { Status } from "../../components/Status";
import { TbAlignBoxLeftBottom, TbFileExport } from "react-icons/tb";

export const ScanItem = ({ scan, onClick }) => {
  const parseDate = (date) => {
    if (!date) return "TBD";
    const time = moment(date);
    return time.format("hh:mm:ss A DD/MM/YY");
  };

  const checkStatus = (status) => {
    return status === "done" ? "rgba(255, 8, 173,.1)" : "rgba(8, 255, 139,.1)";
  };

  // className={`table-body ${scan.status === "live" ? "animate-pulse" : ""}`}

  return (
    <tr key={scan.id} className={`table-body`} onClick={onClick}>
      <td>{scan.target}</td>
      <td>{scan.scanType}</td>
      <td>{parseDate(scan.startTime)}</td>
      <td>{parseDate(scan.endTime)}</td>
      <td>{scan.openPorts.length}</td>
      <td>
        <Status
          text={scan.status}
          background={checkStatus(scan.status)}
          spin={scan.status === "live" ? true : false}
        />
      </td>
      <td className="actions text-center" onClick={(e) => e.stopPropagation()}>
        <TbAlignBoxLeftBottom
          className="icon"
          data-tooltip-id="tooltip1"
          data-tooltip-content="View"
        />
        <TbFileExport
          className="icon"
          data-tooltip-id="tooltip1"
          data-tooltip-content="Export"
        />{" "}
      </td>
    </tr>
  );
};
