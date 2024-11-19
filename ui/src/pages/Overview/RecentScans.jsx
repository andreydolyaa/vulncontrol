import React, { useState } from "react";
import { ItemsList } from "./ItemsList";
import { MODULE_TYPE } from "../../constants";
import { useFetch } from "../../hooks/useFetch";
import { Display } from "../../components/Display";
import styles from "./Overview.module.css";

export const RecentScans = () => {
  const [scanType, setScanType] = useState(MODULE_TYPE.NMAP);
  const { data, loading, error } = useFetch(
    `/overview/recent-scans/${scanType}`
  );

  const handleScanType = (e) => {
    setScanType(e.target.value);
  };

  return (
    <Display loading={loading} error={error} className={styles["recent-scans"]}>
      <ItemsList
        scans={data}
        title="Recent Scans"
        scanType={scanType}
        handleScanType={handleScanType}
      />
    </Display>
  );
};
