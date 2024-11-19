import React, { useState } from "react";
import { RadarChartCustom } from "./Charts/RadarChartCustom";
import { Title } from "../../components/Title";
import { TbChartCircles } from "react-icons/tb";
import { Select } from "../../components/Select";
import { MODULE_TYPE } from "../../constants";
import { useFetch } from "../../hooks/useFetch";
import { Display } from "../../components/Display";
import styles from "./Overview.module.css";

export const ScansStats = () => {
  const [scanType, setScanType] = useState(MODULE_TYPE.NMAP);
  const { data, loading, error } = useFetch(
    `/overview/scans-status-data/${scanType}`
  );

  const handleScanTypeChange = (e) => {
    setScanType(e.target.value);
  };


  return (
    <Display loading={loading} error={error} className={styles["scans-stats"]}>
      <div className={styles.title}>
        <Title text="Scan Completion Rates" icon={TbChartCircles} />
        <Select
          options={{
            nmap: MODULE_TYPE.NMAP,
            subfinder: MODULE_TYPE.SUBFINDER,
          }}
          handleChange={handleScanTypeChange}
        />
      </div>
      <RadarChartCustom data={data} />
    </Display>
  );
};
