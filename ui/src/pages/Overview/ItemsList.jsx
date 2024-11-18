import React from "react";
import styles from "./Overview.module.css";
import { TbAB, TbCircleArrowRight, TbWorld } from "react-icons/tb";
import { parseDate } from "../../utils/index";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedScan } from "../../redux/subfinder/subfinderSlice";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { MODULE_TYPE } from "../../constants";

export const ItemsList = ({ scans, title, scanType, handleScanType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToScan = (scan) => {
    if (scanType === MODULE_TYPE.NMAP) {
      navigate(`/nmap/${scan.id}`);
    } else {
      dispatch(setSelectedScan(scan));
      navigate("/subfinder");
    }
  };
  return (
    <div className={styles["items-list"]}>
      <div className={styles["items-title"]}>
        <Title text={title} icon={TbAB} />
        <Select
          options={{
            nmap: MODULE_TYPE.NMAP,
            subfinder: MODULE_TYPE.SUBFINDER,
          }}
          handleChange={handleScanType}
        />
      </div>
      {scans && scans.map((scan) => {
        return (
          <div
            className={styles.item}
            key={scan.id}
            onClick={() => navigateToScan(scan)}
          >
            <div className={styles.title}>
              <TbWorld className={styles.icon} />
              <p>
                <span>{parseDate(scan.endTime)} - </span>{scan.target}
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
