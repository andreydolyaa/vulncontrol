import React, { useState } from "react";
import { ScanWrapper, SubdomainsDiv, TargetsDiv } from "./styles";
import { ScanItem } from "./ScanItem";
import { Title } from "../../components/Title";
import {
  TbWorldSearch,
  TbDeviceIpadHorizontalCheck as Check,
} from "react-icons/tb";

export const ScanList = ({ scans }) => {
  const [selectedTarget, setSelectedTarget] = useState(null);

  const handleTargetSelect = (target) => {
    setSelectedTarget(target);
  };

  return (
    <ScanWrapper>
      <TargetsDiv>
        <Title text="Targets" icon={TbWorldSearch} />
        {scans.map((scan) => {
          return (
            <ScanItem
              key={scan.id}
              scan={scan}
              handleTargetSelect={handleTargetSelect}
            />
          );
        })}
      </TargetsDiv>
      <SubdomainsDiv>
        <Title text="Subdomains" icon={Check} />
        {selectedTarget?.subdomains && selectedTarget.subdomains.map(subdomain => {
          return <div key={subdomain}>{subdomain}</div>
        })}
      </SubdomainsDiv>
    </ScanWrapper>
  );
};
