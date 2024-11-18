import { Container } from "../../components/Container/Container";
import styles from "./Overview.module.css";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../api/baseUrl";
import { TotalData } from "./TotalData";
import { RecentScans } from "./RecentScans";
import { NmapScans } from "./NmapScans";
import { SubfinderScans } from "./SubfinderScans";

export const Overview = () => {
  const [overviewData, setOverviewData] = useState([]);
  const [nmapData, setNmapData] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/overview`)
      .then((res) => res.json())
      .then((overviewData) => {
        setOverviewData(overviewData);
      });
    fetch(`${BASE_URL}/api/overview/nmap`)
      .then((res) => res.json())
      .then((nmapData) => {
        setNmapData(nmapData);
      });
  }, []);

  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <TotalData data={overviewData} />
          <RecentScans />
        </div>

        <div className={styles.right}>
          <NmapScans data={nmapData} />
          <SubfinderScans />
        </div>
      </div>
    </Container>
  );
};
