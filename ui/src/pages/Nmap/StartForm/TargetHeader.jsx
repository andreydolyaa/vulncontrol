import React from "react";
import { InputLabel } from "../../../components/InputLabel";
import { Mode } from "./Mode";
import { TbWorld, TbTerminal2 } from "react-icons/tb";
import { StartScanFormTop } from "./styles";

export const TargetHeader = ({ easyMode }) => {
  return (
    <StartScanFormTop>
      <InputLabel
        text={easyMode ? "Target IP Address" : "Shell Command"}
        icon={easyMode ? TbWorld : TbTerminal2}
      />
      <Mode />
    </StartScanFormTop>
  );
};
