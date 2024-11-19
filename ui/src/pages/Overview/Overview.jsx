import { Container } from "../../components/Container/Container";
import { TotalData } from "./TotalData";
import { RecentScans } from "./RecentScans";
import { NmapScans } from "./NmapScans";
import { ScansStats } from "./ScansStats";
import styles from "./Overview.module.css";

export const Overview = () => {
  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <TotalData />
          <RecentScans />
        </div>

        <div className={styles.right}>
          <NmapScans />
          <ScansStats />
        </div>
      </div>
    </Container>
  );
};
