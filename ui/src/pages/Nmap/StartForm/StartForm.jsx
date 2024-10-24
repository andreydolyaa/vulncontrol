import React, { useState } from "react";
import styled from "styled-components";
import { Args } from "./Args";
import { InputLabel } from "../../../components/InputLabel";
import { TbAssembly, TbCircleChevronDown } from "react-icons/tb";
import { TargetHeader } from "./TargetHeader";
import { StartButton } from "./StartButton";

export const StartForm = ({
  start,
  formData,
  isEasyMode,
  onFormChange,
  onFormChangeCommand,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <StyledForm onSubmit={start}>
      <StyledDivTarget>
        <TargetHeader isEasyMode={isEasyMode} />
        <StartButton
          isEasyMode={isEasyMode}
          onFormChange={onFormChange}
          onFormChangeCommand={onFormChangeCommand}
        />
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