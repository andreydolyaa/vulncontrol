import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Args } from "./Args";
import { Target } from "./Target";
import {
  TbWorld,
  TbAssembly,
  TbCircleChevronDown,
  TbBolt,
} from "react-icons/tb";
import { InputLabel } from "../../../components/InputLabel";

export const StartForm = ({ start, formData, onFormChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <StyledForm onSubmit={start}>
      <StyledDivTarget>
        <InputLabel text="Target IP Address" icon={TbWorld} />
        <div className="target-button">
          <Target onFormChange={onFormChange} />
          <StyledButton>
            <TbBolt className="icon" />
            <div className="start-button">Start</div>
          </StyledButton>
        </div>
      </StyledDivTarget>
      <StyledDivArgs $isOpen={isOpen}>
        <div
          className="title-args"
          onClick={toggle}
          data-tooltip-id="tooltip1"
          data-tooltip-content="Press to toggle scan arguments"
        >
          <InputLabel text="Scan Arguments" icon={TbAssembly} />
          <StyledIcon $isOpen={isOpen}>
            <TbCircleChevronDown className="icon-toggle" />
          </StyledIcon>
        </div>
        <StyledArgsContent $isOpen={isOpen}>
          <Args formData={formData} onFormChange={onFormChange} />
        </StyledArgsContent>
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

const StyledArgsContent = styled.div`
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  max-height: ${({ $isOpen }) => ($isOpen ? "500px" : "0")};
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  transition: all 0.3s ease-in-out;
`;

const StyledIcon = styled.div`
  transition: transform 0.3s ease-in-out;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(-180deg)" : "rotate(0)")};
  margin-left: 8px;
  .icon-toggle {
    stroke-width: 1.2;
    width: 22px;
    height: 22px;
    color: #ffd900;
  }
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
  .title-args {
    display: flex;
    align-items: flex-start;
    width: fit-content;
    cursor: pointer;
    .title {
      transition: all 0.3s ease-in-out;
      margin-bottom: ${({ $isOpen }) => ($isOpen ? "20px" : "0")};
    }
  }
`;

const start = keyframes`
   0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: rgb(116, 43, 225);
  box-shadow: 1px 1px 1px 2px #510a8b;
  background: linear-gradient(
    108deg,
    rgba(116, 43, 225, 1) 0%,
    rgba(177, 0, 255, 1) 100%
  );
  color: var(--brighter-color);
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  width: 150px;
  margin-left: 20px;
  transition: .3s;
  .icon {
    width: 18px;
    height: 18px;
    margin-right: 3px;
    stroke-width: 1.5;
  }
  &:hover {
    animation: ${start} .4s ease-in-out 1;
  }
`;

