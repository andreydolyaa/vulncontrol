import { LineChartCustom } from "./Charts/LineChartCustom";
import { Container } from "../../components/Container/Container";
import styles from "./Overview.module.css";

export const Overview = () => {
  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles["total-data"]}>
            <LineChartCustom />
          </div>
          <div className={styles["recent-scans"]}></div>
        </div>

        <div className={styles.right}>
          <div className={styles["nmap-scans"]}></div>
          <div className={styles["subfinder-scans"]}></div>
        </div>
      </div>
    </Container>
  );
};
