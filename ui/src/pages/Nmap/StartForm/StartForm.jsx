import React, { useState } from "react";
import { Args } from "./Args";
import { InputLabel } from "../../../components/InputLabel";
import { TbAssembly, TbChevronDown } from "react-icons/tb";
import {
  ArgsContainer,
  ArgsToggler,
  ArgsTogglerIcon,
  ArgsWrapper,
  StartScanForm,
} from "./styles";
import { Target } from "./Target";

export const StartForm = ({
  start,
  easyMode,
  onFormChange,
  selectedArgs,
  handleCheckboxChange,
  formData
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <StartScanForm onSubmit={start}>
      <Target easyMode={easyMode} onFormChange={onFormChange} formData={formData}/>

      {easyMode && (
        <ArgsContainer $isOpen={isOpen}>
          <ArgsToggler
            $isOpen={isOpen}
            onClick={toggle}
            data-tooltip-id="tooltip1"
            data-tooltip-content="Press to toggle scan arguments"
          >
            <InputLabel text="Scan Arguments" icon={TbAssembly} />
            <ArgsTogglerIcon $isOpen={isOpen}>
              <TbChevronDown className="icon-toggle" />
            </ArgsTogglerIcon>
          </ArgsToggler>
          <ArgsWrapper $isOpen={isOpen}>
            <Args
              selectedArgs={selectedArgs}
              handleCheckboxChange={handleCheckboxChange}
            />
          </ArgsWrapper>
        </ArgsContainer>
      )}
    </StartScanForm>
  );
};
