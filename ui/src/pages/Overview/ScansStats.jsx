import React, { useState } from "react";
import { RadarChartCustom } from "./Charts/RadarChartCustom";
import { Title } from "../../components/Title";
import { TbChartCircles } from "react-icons/tb";
import { Select } from "../../components/Select";
import { MODULE_TYPE } from "../../constants";
import { useFetch } from "../../hooks/useFetch";
import { LoadingBlink } from "../../components/LoadingBlink";
import styles from "./Overview.module.css";
import { Empty } from "../../components/Empty";

export const ScansStats = () => {
  const [scanType, setScanType] = useState(MODULE_TYPE.NMAP);
  const { data, loading, error } = useFetch(
    `/overview/scans-status-data/${scanType}`,
    []
  );

  const handleScanTypeChange = (e) => {
    setScanType(e.target.value);
  };

  const displayData = () => {
    return (
      <div className={styles["scans-stats"]}>
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
      </div>
    );
  };

  return (
    <div className={styles["scans-stats"]}>
      {loading ? <Empty text={<LoadingBlink />} /> : displayData()}
    </div>
  );
};
