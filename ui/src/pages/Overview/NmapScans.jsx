import React from "react";
import styles from "./Overview.module.css";
import { BarChartCustom } from "./Charts/BarChartCustom";
import { Display } from "../../components/Display";
import { useFetch } from "../../hooks/useFetch";

export const NmapScans = () => {
  const { data, loading, error } = useFetch(`/overview/nmap`);

  return (
    <Display loading={loading} error={error} className={styles["nmap-scans"]}>
      <BarChartCustom
        data={data}
        title="Common open ports found"
        color="var(--purple)"
      />
    </Display>
  );
};
