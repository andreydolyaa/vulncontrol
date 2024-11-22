import React from "react";
import styles from "./Table.module.css";

export const TableHead = () => {
  const tableItems = [
    "Status",
    "Target",
    "Open Ports",
    "Start Time",
    "End Time",
    "Scan Type",
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
