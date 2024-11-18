import React from "react";
import styles from "./Overview.module.css";
import { BarChartCustom } from "./Charts/BarChartCustom";

export const NmapScans = ({ data }) => {
  return (
    <div className={styles["nmap-scans"]}>
      <BarChartCustom
        data={data}
        title="Common open ports found"
        color="var(--purple)"
      />
    </div>
  );
};
