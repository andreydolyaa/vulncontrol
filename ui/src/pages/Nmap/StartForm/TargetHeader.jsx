import React from "react";
import { InputLabel } from "../../../components/InputLabel";
import { Mode } from "./Mode";
import { TbWorld, TbTerminal2 } from "react-icons/tb";

export const TargetHeader = ({ easyMode }) => {
  return (
    <div className="top">
      <InputLabel
        text={easyMode ? "Target IP Address" : "Shell Command"}
        icon={easyMode ? TbWorld : TbTerminal2}
      />
      <Mode />
    </div>
  );
};
