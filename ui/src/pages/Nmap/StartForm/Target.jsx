import React from "react";
import { TargetHeader } from "./TargetHeader";
import { TargetInput } from "./TargetInput";
import { StartButton } from "./StartButton";
import { TargetWrapper } from "./styles";

export const Target = ({ easyMode, onFormChange, formData }) => {
  return (
    <>
      <TargetHeader easyMode={easyMode} />
      <TargetWrapper>
        <TargetInput easyMode={easyMode} onFormChange={onFormChange} formData={formData} />
        <StartButton easyMode={easyMode} onFormChange={onFormChange} />
      </TargetWrapper>
    </>
  );
};
