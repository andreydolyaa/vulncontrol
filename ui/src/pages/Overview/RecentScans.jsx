import React, { useState } from "react";
import { ItemsList } from "./ItemsList";
import { MODULE_TYPE } from "../../constants";
import { useFetch } from "../../hooks/useFetch";
import styles from "./Overview.module.css";
import { Empty } from "../../components/Empty";
import { LoadingBlink } from "../../components/LoadingBlink";

export const RecentScans = () => {
  const [scanType, setScanType] = useState(MODULE_TYPE.NMAP);
  const { data, loading, error } = useFetch(
    `/overview/recent-scans/${scanType}`,
    []
  );

  const handleScanType = (e) => {
    setScanType(e.target.value);
  };

  const displayData = () => {
    return (
      <ItemsList
        scans={data}
        title="Recent Scans"
        scanType={scanType}
        handleScanType={handleScanType}
      />
    );
  };

  return (
    <div className={styles["recent-scans"]}>
      {loading ? <Empty text={<LoadingBlink />} /> : displayData()}
    </div>
  );
};
