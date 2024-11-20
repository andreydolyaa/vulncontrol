import React from "react";
import { useParams } from "react-router-dom";
import { ModuleName } from "../../../components/ModuleName";
import { NmapStatus } from "../NmapStatus";

export const TerminalHeader = ({ scan }) => {
  return (
    <ModuleName text={scan?.target} enableSearch={false}>
      <NmapStatus status={scan?.status} />
    </ModuleName>
  );
};
