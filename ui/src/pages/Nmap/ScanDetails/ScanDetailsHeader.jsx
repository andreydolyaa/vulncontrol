import React from "react";
import { ModuleName } from "../../../components/ModuleName";
import { ScanStatus } from "../ScanStatus";

export const ScanDetailsHeader = ({ scan }) => {

  return (
    scan && (
      <ModuleName text={`SCAN ${scan.id}`} enableSearch={false}>
        <ScanStatus status={scan.status} />
      </ModuleName>
    )
  );
};
