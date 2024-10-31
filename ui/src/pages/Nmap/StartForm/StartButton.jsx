import React from "react";
import styled, { keyframes } from "styled-components";
import { Target } from "./Target";
import { TbBolt } from "react-icons/tb";

export const StartButton = ({
  isEasyMode,
  onFormChange,
}) => {
  return (
    <div
      className="target-button"
      style={{ margin: !isEasyMode ? "0px 0 20px 0" : "0px" }}
    >
      <Target
        onFormChange={onFormChange}
        isEasyMode={isEasyMode}
      />
      <StyledButton>
        <TbBolt className="icon" />
        <div className="start-button-text">Start</div>
      </StyledButton>
    </div>
  );
};

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
    height: 50px;
  }
`;
