import React from "react";
import styles from "./Table.module.css";

export const TableHead = () => {
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
    <thead>
      <tr className={styles["table-header-row"]}>
        {tableItems.map((item) => (
          <th className={styles["table-header-cell"]} key={item}>
            {item}
          </th>
        ))}
      </tr>
    </thead>
  );
};
