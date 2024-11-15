import { LineChartCustom } from "./Charts/LineChartCustom";
import { Container } from "../../components/Container/Container";
import styles from "./Overview.module.css";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../api/baseUrl";
import { BarChartCustom } from "./Charts/BarChartCustom";

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
          <div className={styles["total-data"]}>
            <LineChartCustom
              data={overviewData}
              title="Scans count by date"
              colorOne="var(--action-color-3)"
              colorTwo="var(--purple)"
            />
          </div>
          <div className={styles["recent-scans"]}></div>
        </div>

        <div className={styles.right}>
          <div className={styles["nmap-scans"]}>
            <BarChartCustom data={nmapData} title="Common open ports found" color="var(--purple)" />
          </div>
          <div className={styles["subfinder-scans"]}></div>
        </div>
      </div>
    </Container>
  );
};
