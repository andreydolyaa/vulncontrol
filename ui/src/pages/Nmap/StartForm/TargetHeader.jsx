import React from "react";
import { InputLabel } from "../../../components/InputLabel";
import { Mode } from "./Mode";
import { TbWorld, TbTerminal2 } from "react-icons/tb";

export const TargetHeader = ({ isEasyMode }) => {
  return (
    <div className="top">
      <InputLabel
        text={isEasyMode ? "Target IP Address" : "Shell Command"}
        icon={isEasyMode ? TbWorld : TbTerminal2}
      />
      <Mode />
    </div>
  );
};
