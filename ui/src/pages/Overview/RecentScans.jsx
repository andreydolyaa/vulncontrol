import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../api/baseUrl";
import { ItemsList } from "./ItemsList";
import styles from "./Overview.module.css";
import { MODULE_TYPE } from "../../constants";
import { useFetch } from "../../hooks/useFetch";

export const RecentScans = () => {
  const [scanType, setScanType] = useState(MODULE_TYPE.NMAP);
  const { data, loading, error } = useFetch(
    `/overview/recent-scans/${scanType}`,
    []
  );

  const handleScanType = (e) => {
    setScanType(e.target.value);
  };

  return (
    <div className={styles["recent-scans"]}>
      <ItemsList
        scans={data}
        title="Recent Scans"
        scanType={scanType}
        handleScanType={handleScanType}
      />
    </div>
  );
};
