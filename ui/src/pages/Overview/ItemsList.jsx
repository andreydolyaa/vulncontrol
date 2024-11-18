import React from "react";
import styles from "./Overview.module.css";
import { TbCircleArrowRight, TbWorld } from "react-icons/tb";
import { parseDate } from "../../utils/index";

export const ItemsList = ({ scans, title }) => {
  return (
    <div className={styles["items-list"]}>
      {/* <h1>{title}</h1> */}
      <select name="" id="">
        <option value="">Nmap</option>
        <option value="">Subfinder</option>
      </select>
      {scans.map((scan) => {
        return (
          <div className={styles.item} key={scan.id}>
            <div className={styles.title}>
              <TbWorld className={styles.icon} />
              <p>
                {parseDate(scan.endTime)} - {scan.target}
              </p>
            </div>
            <TbCircleArrowRight
              className={`${styles.icon} ${styles["icon-action"]}`}
            />
          </div>
        );
      })}
    </div>
  );
};
