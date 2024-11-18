import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../api/baseUrl";
import { ItemsList } from "./ItemsList";
import styles from "./Overview.module.css";
import { MODULE_TYPE } from "../../constants";

export const RecentScans = () => {
  const [scans, setScans] = useState([]);
  const [scanType, setScanType] = useState(MODULE_TYPE.NMAP);

  const handleScanType = (e) => {    
    setScanType(e.target.value);
  };

  useEffect(() => {
    // TODO: make hook
    fetch(`${BASE_URL}/api/overview/recent-scans/${scanType}`)
      .then((res) => res.json())
      .then((data) => setScans(data));
  }, [scanType]);

  return (
    <div className={styles["recent-scans"]}>
      <ItemsList
        scans={scans}
        title="Recent Scans"
        scanType={scanType}
        handleScanType={handleScanType}
      />
    </div>
  );
};
