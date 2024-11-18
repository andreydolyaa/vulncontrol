import React from "react";
import styles from "./Overview.module.css";
import { LineChartCustom } from "./Charts/LineChartCustom";

export const TotalData = ({ data }) => {
  return (
    <div className={styles["total-data"]}>
      <LineChartCustom
        data={data}
        title="Scans count by date"
        colorOne="var(--action-color-3)"
        colorTwo="var(--purple)"
      />
    </div>
  );
};
