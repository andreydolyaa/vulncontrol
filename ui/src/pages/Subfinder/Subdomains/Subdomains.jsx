import React from "react";
import { ListBodyDiv, ListDiv, ListHeaderDiv } from "../styles";
import { Title } from "../../../components/Title";
import { TbDeviceIpadHorizontalCheck as Check } from "react-icons/tb";
import { Subdomain } from "./Subdomain";

export const Subdomains = ({ selectedScan }) => {
  return (
    <ListDiv>
      <ListHeaderDiv>
        <Title text="Subdomains" icon={Check} />
      </ListHeaderDiv>
      <ListBodyDiv>
        {selectedScan?.subdomains &&
          selectedScan.subdomains.map((subdomain, index) => {
            return <Subdomain key={index} subdomain={subdomain} />;
          })}
      </ListBodyDiv>
    </ListDiv>
  );
};
