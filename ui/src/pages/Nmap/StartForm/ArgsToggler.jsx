import React from "react";
import { InputLabel } from "../../../components/InputLabel";
import { TbAssembly, TbCircleChevronDown } from "react-icons/tb";
import { StartScanAgsTogglerWrapper, ArgsTogglerButton } from "./styles";

export const ArgsToggler = ({ toggle, isOpen }) => {
  return (
    <StartScanAgsTogglerWrapper
      onClick={toggle}
      data-tooltip-id="tooltip1"
      data-tooltip-content="Press to toggle scan arguments"
    >
      <InputLabel text="Scan Arguments" icon={TbAssembly} />
      <ArgsTogglerButton $isOpen={isOpen}>
        <TbCircleChevronDown className="icon-toggle" />
      </ArgsTogglerButton>
    </StartScanAgsTogglerWrapper>
  );
};
