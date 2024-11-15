import React, { useEffect } from "react";
import { Title } from "../../../components/Title";
import { TbDeviceIpadHorizontalCheck as Check } from "react-icons/tb";
import { Subdomain } from "./Subdomain";
import { Empty } from "../../../components/Empty";
import { LoadingBlink } from "../../../components/LoadingBlink";
import { useSelector } from "react-redux";
import { setSelectedScan } from "../../../redux/subfinder/subfinderSlice";
import styles from "./Subdomains.module.css";
import startFormStyles from "../StartForm/StartForm.module.css";

export const Subdomains = () => {
  const { selectedScan } = useSelector((state) => state.subfinder);
  const isLive = selectedScan?.status === "live";
  const foundSubdomains = selectedScan?.subdomains.length > 0;

  useEffect(() => {
    if (selectedScan) setSelectedScan(selectedScan);
  }, []);

  const liveScan = () => {
    const message = `Scan in progress`;
    return (
      <Empty
        customHeight
        text={<LoadingBlink text={message} color="#08ff8c" />}
      />
    );
  };

  const noSubdomainsFound = () => {
    return <Empty text={"no subdomains for this target"} customHeight />;
  };

  const noSelectedScan = () => {
    return <Empty text={"Select domain to view subdomains"} customHeight />;
  };

  const list = () => {
    return (
      <div>
        {selectedScan?.subdomains &&
          selectedScan.subdomains.map((subdomain, index) => {
            return <Subdomain key={index} subdomain={subdomain} />;
          })}
      </div>
    );
  };

  const titleData = () => {
    return `${selectedScan?.subdomains.length} subdomains for ${selectedScan?.target}`;
  };

  return (
    <div className={`${startFormStyles.base} ${styles.list}`}>
      <div className={styles.header}>
        <Title
          text="Subdomains"
          icon={Check}
          data={selectedScan && titleData()}
        />
      </div>

      {!selectedScan
        ? noSelectedScan()
        : isLive
        ? liveScan()
        : !foundSubdomains
        ? noSubdomainsFound()
        : list()}
    </div>
  );
};
