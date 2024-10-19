import React from "react";
import styled from "styled-components";
import { Args } from "./Args";
import { Target } from "./Target";
import { TbWorld, TbSquareLetterA } from "react-icons/tb";
import { InputLabel } from "../../../components/InputLabel";

export const StartForm = ({ start, formData, onFormChange }) => {
  return (
    <StyledForm onSubmit={start}>
      <StyledDivTarget>
        <InputLabel text="Target IP Address" icon={TbWorld} />
        <div className="target-button">
          <Target onFormChange={onFormChange} />
          <StyledButton>Start</StyledButton>
        </div>
      </StyledDivTarget>
      <StyledDivArgs>
        <InputLabel text="Scan Arguments" icon={TbSquareLetterA} />
        <Args formData={formData} onFormChange={onFormChange} />
      </StyledDivArgs>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
`;

const StyledDivTarget = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  .target-button {
    display: flex;
  }
`;
const StyledDivArgs = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  height: 100%;
`;

const StyledButton = styled.button`
  border: 1px solid var(--border-color);
  /* background-color: var(--action-color); */
  background: rgb(116,43,225);
  background: linear-gradient(108deg, rgba(116,43,225,1) 0%, rgba(177,0,255,1) 100%);
  color: var(--brighter-color);
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  width: 150px;
  margin-left: 20px;
`;
