import React from "react";
import styled from "styled-components";
import { Search } from "./Search";

export const ModuleName = ({ text, icon, enableSearch = true, children }) => {
  const IconComponent = icon;
  return (
    <StyledDiv>
      <div className="text-and-icon">
        {icon && <IconComponent className="icon" />}
        <div className="text">{text}</div>
      </div>
      {enableSearch && <Search placeholder="Search scans..." />}
      {children && children}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  padding: 20px;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  border-radius: var(--radius);
  .text-and-icon {
    display: flex;
    align-items: center;
    .text {
      color: white;
      font-weight: 600;
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
