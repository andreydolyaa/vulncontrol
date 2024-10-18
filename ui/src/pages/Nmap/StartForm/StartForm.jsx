import React from "react";
import styled from "styled-components";
import { Args } from "./Args";
import { Target } from "./Target";
import { TbWorld, TbSquareLetterA } from "react-icons/tb";
import { InputLabel } from "../../../components/InputLabel";

export const StartForm = ({ start, formData, onFormChange }) => {
  return (
    <StyledForm onSubmit={start} className="mt-12">
      <StyledDivTarget>
        <InputLabel text="Target IP Address" icon={TbWorld} />
        <div className="target-button">
          <Target onFormChange={onFormChange} />
          <StyledButton>Start</StyledButton>
        </div>
      </StyledDivTarget>
      <StyledDivArgs>
        <InputLabel text="Scan Arguments" icon={TbSquareLetterA}/>
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
  /* height: 300px; */
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  `;

const StyledDivTarget = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  height: 100%;
  .target-button {
    display: flex;
  }
`;
const StyledDivArgs = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  /* align-items: center; */
  /* justify-content: center; */
  height: 100%;
`;

const StyledButton = styled.button`
  border: 1px dotted rgba(141, 70, 255, 1);;
  background-color: rgba(141, 70, 255, .1);
  color: rgba(141, 70, 255, 1);
  font-size: 18px;
  letter-spacing: 1.5px;
  font-weight: 800;
  text-transform: uppercase;
  width:220px;
  margin-left:20px;
`;
