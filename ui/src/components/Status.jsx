import React from "react";
import styled from "styled-components";
import { capitalize, changeRgbaAlpha } from "../utils";
import {
  TbRefresh,
  TbCircleX,
  TbCircleCheck,
  TbExclamationCircle,
} from "react-icons/tb";

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

  const checkText = (text) => (text === "aborted" ? "halted" : text);

  return (
    <StyledDiv $background={background}>
      <IconComponent />
      <div>{capitalize(checkText(text))}</div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  width: 95px;
  height: 26px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  background-color: ${({ $background }) => $background};
  color: ${({ $background }) => changeRgbaAlpha($background, 1)};
  font-weight: 500;
  text-transform: uppercase;
  .icon {
    font-size: 14px;
    stroke-width: 1.5;
  }
`;
