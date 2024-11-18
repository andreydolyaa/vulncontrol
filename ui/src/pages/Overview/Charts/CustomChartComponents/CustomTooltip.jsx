import React from "react";
import styles from "./Custom.module.css";

export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { count, nmap, subfinder, status } = payload[0].payload;

    const statuses = () => {
      return (
        <div className={styles["custom-tooltip"]}>
          {count} {status === "done" ? "completed" : status} scans
        </div>
      );
    };

    return status ? (
      statuses()
    ) : (
      <div className={styles["custom-tooltip"]}>
        <p>{count ? `Port: ${label}` : label}</p>
        {nmap >= 0 && <p>Nmap scans: {nmap}</p>}
        {subfinder >= 0 && <p>Subfinder scans: {subfinder}</p>}
        {count && <p>Total found: {count}</p>}
      </div>
    );
  }
};
