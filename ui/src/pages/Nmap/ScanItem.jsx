import React from "react";
import moment from "moment";
import { capitalize } from "../../utils/index";

export const ScanItem = ({ scan, onClick }) => {
  const showPorts = () =>
    scan.openPorts.map((port, index) => <span key={index}>{port} </span>);

  const parseDate = (date) => {
    if (!date) return "TBD";
    const time = moment(date);
    return time.format("hh:mm:ss A DD/MM/YY");
  };

  return (
    <tr key={scan.id} className="cursor-pointer" onClick={onClick}>
      <td>{scan.target}</td>
      <td>{scan.scanType}</td>
      <td>{parseDate(scan.startTime)}</td>
      <td>{parseDate(scan.endTime)}</td>
      <td>{showPorts()}</td>
      <td>{capitalize(scan.status)}</td>
      <td>
        <button>view</button>
        <button>export</button>
      </td>
    </tr>
  );
};
