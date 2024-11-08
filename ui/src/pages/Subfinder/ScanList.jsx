import React from "react";
import { ScanWrapper, Subdomains, Targets } from "./styles";

export const ScanList = () => {
  return (
    <ScanWrapper>
      <Targets></Targets>
      <Subdomains></Subdomains>
    </ScanWrapper>
  );
};
