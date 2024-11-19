import React from "react";
import styles from "./Overview.module.css";
import { LineChartCustom } from "./Charts/LineChartCustom";
import { useFetch } from "../../hooks/useFetch";
import { Display } from "../../components/Display";

export const TotalData = () => {
  const { data, loading, error } = useFetch(`/overview`);
  
  return (
    <Display loading={loading} error={error} className={styles["total-data"]}>
      <LineChartCustom
        data={data}
        title="Scans count by date"
        colorOne="var(--action-color-3)"
        colorTwo="var(--purple)"
      />
    </Display>
  );
};
