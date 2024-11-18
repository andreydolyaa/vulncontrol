import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../api/baseUrl";
import { ItemsList } from "./ItemsList";
import styles from "./Overview.module.css";

export const RecentScans = () => {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    // TODO: make hook
    fetch(`${BASE_URL}/api/overview/recent-scans/NmapScan`)
      .then((res) => res.json())
      .then((data) => setScans(data));
  }, []);

  return (
    <div className={styles["recent-scans"]}>
      <ItemsList scans={scans} title="Recent Nmap Scans" />
    </div>
  );
};
