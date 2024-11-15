import React from "react";
import styles from "./Custom.module.css";

export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { count, nmap, subfinder } = payload[0].payload;

    return (
      <div className={styles["custom-tooltip"]}>
        <p>{count ? `Opened Port: ${label}` : label}</p>
        {nmap >= 0 && <p>Nmap scans: {nmap}</p>}
        {subfinder >= 0 && <p>Subfinder scans: {subfinder}</p>}
        {count && <p>Total found: {count}</p>}
      </div>
    );
  }
};
