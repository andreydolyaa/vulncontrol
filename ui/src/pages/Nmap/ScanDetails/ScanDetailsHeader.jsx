import React from "react";
import { useParams } from "react-router-dom";
import { ModuleName } from "../../../components/ModuleName";
import { ScanStatus } from "../ScanStatus/ScanStatus";

export const ScanDetailsHeader = ({ scan }) => {
  const { scanId } = useParams();
  return (
    <ModuleName text={`SCAN ${scanId}`} enableSearch={false}>
      <ScanStatus status={scan?.status} />
    </ModuleName>
  );
};
