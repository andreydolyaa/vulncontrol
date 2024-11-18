import React, { useEffect, useState } from "react";
import styles from "./Overview.module.css";
import { RadarChartCustom } from "./Charts/RadarChartCustom";
import { BASE_URL } from "../../api/baseUrl";
import { Title } from "../../components/Title";
import { TbChartCircles } from "react-icons/tb";
import { Select } from "../../components/Select";
import { MODULE_TYPE } from "../../constants";

export const ScansStats = () => {
  const [data, setData] = useState([]);
  const [scanType, setScanType] = useState(MODULE_TYPE.NMAP);

  const handleScanTypeChange = (e) => {
    setScanType(e.target.value);
  };

  useEffect(() => {
    fetch(`${BASE_URL}/api/overview/scans-status-data/${scanType}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [scanType]);

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
