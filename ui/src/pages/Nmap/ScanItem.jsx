import React from "react";
import moment from "moment";
import { capitalize } from "../../utils/index";

export const ScanItem = ({ scan, onClick }) => {
  const parseDate = (date) => {
    if (!date) return "TBD";
    const time = moment(date);
    return time.format("hh:mm:ss A DD/MM/YY");
  };

  return (
    <tr key={scan.id} className="table-body" onClick={onClick}>
      <td>{scan.target}</td>
      <td>{scan.scanType}</td>
      <td>{parseDate(scan.startTime)}</td>
      <td>{parseDate(scan.endTime)}</td>
      <td>{scan.openPorts.length}</td>
      <td>{capitalize(scan.status)}</td>
      <td className="text-center">
        <button>view</button>
        <button>export</button>
      </td>
    </tr>
  );
};
