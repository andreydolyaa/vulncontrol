import { Subdomains } from "../Subdomains/Subdomains";
import { ScansList } from "./ScansList";
import styles from "./Scans.module.css";

export const Scans = ({ scans }) => {
  return (
    <div className={styles.wrapper}>
      <ScansList scans={scans} />
      <Subdomains />
    </div>
  );
};
