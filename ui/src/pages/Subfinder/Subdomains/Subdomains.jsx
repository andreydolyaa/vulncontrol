import React from "react";
import { ListBodyDiv, ListDiv, ListHeaderDiv } from "../styles";
import { Title } from "../../../components/Title";
import { TbDeviceIpadHorizontalCheck as Check } from "react-icons/tb";
import { Subdomain } from "./Subdomain";
import { Empty } from "../../../components/Empty";
import { LoadingBlink } from "../../../components/LoadingBlink";

export const Subdomains = ({ selectedScan }) => {
  const isLive = selectedScan?.status === "live";
  const foundSubdomains = selectedScan?.subdomains.length > 0;

  const liveScan = () => {
    const message = `Scan in progress`;
    return <Empty customHeight text={<LoadingBlink text={message} />} />;
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

  return (
    <ListDiv>
      <ListHeaderDiv>
        <Title text="Subdomains" icon={Check} />
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
