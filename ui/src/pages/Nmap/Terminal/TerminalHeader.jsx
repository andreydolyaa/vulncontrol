import React from "react";
import { useParams } from "react-router-dom";
import { ModuleName } from "../../../components/ModuleName";
import { NmapStatus } from "../NmapStatus";

export const TerminalHeader = ({ scan }) => {
  const { scanId } = useParams();
  return (
    <ModuleName text={`SCAN ${scanId}`} enableSearch={false}>
      <NmapStatus status={scan?.status} />
    </ModuleName>
  );
};
