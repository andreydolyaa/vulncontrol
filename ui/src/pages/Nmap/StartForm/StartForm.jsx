import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { Args } from "./Args";
import { Target } from "./Target";
import { InputLabel } from "../../../components/InputLabel";
import { Mode } from "./Mode";
import { UIModes } from "../../../constants";
import {
  TbWorld,
  TbAssembly,
  TbCircleChevronDown,
  TbBolt,
  TbTerminal2,
} from "react-icons/tb";

export const StartForm = ({
  start,
  formData,
  isEasyMode,
  onFormChange,
  onFormChangeCommand,
}) => {
  const uiMode = useSelector((state) => state.nmap.uiMode);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <StyledForm onSubmit={start}>
      <StyledDivTarget>
        <div className="top">
          <InputLabel
            text={isEasyMode ? "Target IP Address" : "Shell Command"}
            icon={isEasyMode ? TbWorld : TbTerminal2}
          />
          <Mode />
        </div>
        <div
          className="target-button"
          style={{ margin: !isEasyMode ? "0px 0 20px 0" : "0px" }}
        >
          <Target
            onFormChange={isEasyMode ? onFormChange : onFormChangeCommand}
            isEasyMode={isEasyMode}
          />
          <StyledButton>
            <TbBolt className="icon" />
            <div className="start-button-text">Start</div>
          </StyledButton>
        </div>
      </StyledDivTarget>
      {isEasyMode && (
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
      )}
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: var(--padding);
  width: 100%;
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  .top {
    display: flex;
    justify-content: space-between;
    .input-label {
      width: calc(50% - 150px);
    }
    .mode {
      margin-right: auto;
    }
  }
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
    stroke-width: 1.5;
    width: 22px;
    height: 22px;
    color: var(--action-color-2);
  }
`;

const StyledDivTarget = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  .target-button {
    display: flex;
  }
  @media (max-width: 768px) {
    .top {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .input-label {
        width: 100%;
        order: 1;
      }
      .mode {
        margin: 0 0 30px 0;
      }
    }
    .target-button {
      flex-direction: column;
    }
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
  border-radius: var(--radius);
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
  transition: 0.3s;
  .icon {
    width: 18px;
    height: 18px;
    margin-right: 3px;
    stroke-width: 1.5;
  }
  &:hover {
    animation: ${start} 0.4s ease-in-out 1;
  }
  @media (max-width: 768px) {
    margin: 20px 0 0 0;
    width: 100%;
  }
`;
