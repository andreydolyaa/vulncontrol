import React, { useEffect } from "react";
import { ListBodyDiv, ListDiv, ListHeaderDiv } from "../styles";
import { Title } from "../../../components/Title";
import { TbDeviceIpadHorizontalCheck as Check } from "react-icons/tb";
import { Subdomain } from "./Subdomain";
import { Empty } from "../../../components/Empty";
import { LoadingBlink } from "../../../components/LoadingBlink";
import { useSelector } from "react-redux";
import { setSelectedScan } from "../../../redux/subfinder/subfinderSlice";

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
      <ListBodyDiv>
        {selectedScan?.subdomains &&
          selectedScan.subdomains.map((subdomain, index) => {
            return <Subdomain key={index} subdomain={subdomain} />;
          })}
      </ListBodyDiv>
    );
  };

  const titleData = () => {
    return `${selectedScan?.subdomains.length} subdomains for ${selectedScan?.target}`;
  };

  return (
    <ListDiv>
      <ListHeaderDiv>
        <Title
          text="Subdomains"
          icon={Check}
          data={selectedScan && titleData()}
        />
      </ListHeaderDiv>

      {!selectedScan
        ? noSelectedScan()
        : isLive
        ? liveScan()
        : !foundSubdomains
        ? noSubdomainsFound()
        : list()}
    </ListDiv>
  );
};
