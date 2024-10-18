import React from "react";
import styled from "styled-components";
import { Search } from "./Search";

export const ModuleName = ({ text, icon }) => {
  const IconComponent = icon;
  return (
    <StyledDiv>
      <div className="text-and-icon">
        <IconComponent className="icon" />
        <div className="text">{text}</div>
      </div>
      <Search placeholder="Search scans..." />
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  padding: 0 20px;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  border-radius: var(--radius);
  .text-and-icon {
    display: flex;
    align-items: center;
    .text {
      color: white;
      font-weight: 600;
      /* font-family: ""; */
      font-size: 24px;
    }
    .icon {
      stroke-width: 1.5;
      height: 24px;
      width: 24px;
      color: white;
      margin-right: 5px;
    }
  }
`;
