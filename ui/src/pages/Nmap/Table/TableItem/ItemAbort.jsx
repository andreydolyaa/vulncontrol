import React from "react";
import { PiStopCircleLight } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { abortScan } from "../../../../redux/nmap";
import styles from "../Table.module.css";

export const ItemAbort = ({ scan }) => {
  const dispatch = useDispatch();

  return (
    <PiStopCircleLight
      className={`${styles.icon} ${styles["stop-icon"]}`}
      data-tooltip-id="tooltip1"
      data-tooltip-content="Abort Scan"
      onClick={() => dispatch(abortScan(scan.id))}
    />
  );
};
