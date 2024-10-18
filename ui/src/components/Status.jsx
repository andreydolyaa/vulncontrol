import React from "react";
import styled from "styled-components";
import { capitalize, changeRgbaAlpha } from "../utils";
import { TbRefresh } from "react-icons/tb";

const StyledDiv = styled.div`
  width: 80px;
  height: 24px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  background-color: ${(props) => props.background};
  color: ${(props) => changeRgbaAlpha(props.background, 1)};
  font-weight: 500;
`;

const StyledSphere = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${(props) => changeRgbaAlpha(props.background, 0.8)};
`;

export const Status = ({ text, background, spin = false }) => {
  return (
    <StyledDiv background={background}>
      {spin ? (
        <TbRefresh className="animate-spin mr-2 " />
      ) : (
        <StyledSphere background={background} />
      )}
      <div>{capitalize(text)}</div>
    </StyledDiv>
  );
};
