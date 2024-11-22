import React from "react";
import { TableHead } from "./TableHead";
import { TableBody } from "./TableBody";
import styles from "./Table.module.css";

export const Table = ({ scans }) => {
  return (
    <div className={styles["table-wrapper"]}>
      <table className={styles.table}>
        <TableHead />
        <TableBody scans={scans} />
      </table>
    </div>
  );
};
