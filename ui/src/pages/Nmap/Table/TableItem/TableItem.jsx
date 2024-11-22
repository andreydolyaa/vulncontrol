import React from "react";
import { ItemActions } from "./ItemActions";
import { parseDate } from "../../../../utils";
import { NmapStatus } from "../../NmapStatus";
import styles from "../Table.module.css";

export const TableItem = ({ scan, onClick }) => {
  return (
    <tr className={styles["table-row"]} key={scan.id} onClick={onClick}>
      <td>
        <NmapStatus status={scan.status} />
      </td>
      <td>{scan.target}</td>
      <td>{scan.openPorts.length}</td>
      <td>{parseDate(scan.startTime)}</td>
      <td>{parseDate(scan.endTime)}</td>
      <td>{scan.scanType}</td>
      <td className="table-actions" onClick={(e) => e.stopPropagation()}>
        <ItemActions scan={scan} />
      </td>
    </tr>
  );
};
