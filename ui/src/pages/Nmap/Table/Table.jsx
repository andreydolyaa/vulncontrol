import React from "react";
import { TableHead } from "./TableHead";
import { TableBody } from "./TableBody";
import styles from "./Table.module.css";

export const Table = ({ scans }) => {
  const tableItems = [
    "Target",
    "Scan Type",
    "Open Ports",
    "Start Time",
    "End Time",
    "Status",
    "Actions",
  ];
  return (
    <div className={styles["table-wrapper"]}>
      <table className={styles.table}>
        <TableHead />
        <TableBody scans={scans} />
      </table>
    </div>
  );
};
