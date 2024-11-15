import React, { useEffect, useState } from "react";
import { Title } from "../../../components/Title";
import { TbWorldSearch } from "react-icons/tb";
import { ScanItem } from "./ScanItem";
import { Empty } from "../../../components/Empty";
import { useSelector } from "react-redux";
import startFormStyles from "../StartForm/StartForm.module.css";
import styles from "../Subdomains/Subdomains.module.css";

export const ScansList = ({ scans }) => {
  const { selectedScan } = useSelector((state) => state.subfinder);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  useEffect(() => {
    if (selectedScan && selectedScan.status === "live") {
      return selectScanItemIndex(0);
    }
    if (selectedScan && selectedScan.status === "done") {
      const index = scans.findIndex((x) => x.id === selectedScan.id);
      setSelectedItemIndex(index);
    }
  }, [selectedScan]);

  const selectScanItemIndex = (index) => {
    setSelectedItemIndex(index);
  };

  return (
    <div className={`${startFormStyles.base} ${styles.list}`}>
      <div className={styles.header}>
        <Title
          text="Domains"
          icon={TbWorldSearch}
          data={`${scans.length} Targets`}
        />
      </div>
      {!scans.length ? (
        <Empty customHeight text="No scans yet" />
      ) : (
        <div>
          {scans.map((scan, index) => {
            return (
              <ScanItem
                key={scan.id}
                scan={scan}
                onClick={() => selectScanItemIndex(index)}
                selected={selectedItemIndex === index}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
