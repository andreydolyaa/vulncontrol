import React from "react";
import styled, { keyframes, css } from "styled-components";
import { capitalize, changeRgbaAlpha } from "../utils";
import {
  TbRefresh,
  TbCircleX,
  TbCircleCheck,
  TbExclamationCircle,
} from "react-icons/tb";
import { LoadingBlink } from "./LoadingBlink";

export const Status = ({ text, background }) => {
  const IconComponent = () => {
    if (text === "live") {
      return <TbRefresh className="icon animate-spin mr-2" />;
    } else if (text === "done") {
      return <TbCircleCheck className="icon mr-2" />;
    } else if (text === "aborted") {
      return <TbExclamationCircle className="icon mr-2" />;
    } else {
      return <TbCircleX className="icon mr-2" />;
    }
  };

  const checkText = (text) => (text === "done" ? "completed" : text);

  return (
    <StyledDiv className="status-cmp" $background={background} $isLoading={!text}>
      {!text ? (
        <div className="placeholder">
          <LoadingBlink text={""} />
        </div>
      ) : (
        <>
          <IconComponent />
          <div>{capitalize(checkText(text))}</div>
        </>
      )}
    </StyledDiv>
  );
};

const blinkAnimation = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

const StyledDiv = styled.div`
  width: 120px;
  height: 26px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  background-color: ${({ $background }) => $background};
  color: ${({ $background }) => changeRgbaAlpha($background, 1)};
  font-weight: 500;
  text-transform: uppercase;

  ${({ $isLoading }) =>
    $isLoading &&
    css`
      .placeholder {
        animation: ${blinkAnimation} 1s ease-in-out infinite;
      }
    `}

  .icon {
    font-size: 14px;
    stroke-width: 1.5;
  }
`;
