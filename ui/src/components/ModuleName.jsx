import React from "react";
import styled from "styled-components";
import { Search } from "./Search";

export const ModuleName = ({ text, icon, enableSearch = true, onSearch, children }) => {
  const IconComponent = icon;
  return (
    <StyledDiv>
      <div className="text-and-icon">
        {icon && <IconComponent className="icon" />}
        <div className="text">{text}</div>
      </div>
      {enableSearch && <Search onSearch={onSearch} placeholder="Search scans..." />}
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
  padding: var(--padding);
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  border-radius: var(--radius);
  .text-and-icon {
    display: flex;
    align-items: center;
    .text {
      color: #ffffff;
      font-weight: 600;
      font-size: 20px;
    }
    .icon {
      stroke-width: 1.5;
      height: 20px;
      width: 20px;
      color: white;
      margin-right: 5px;
    }
  }
  @media (max-width: 570px) {
    .search {
      width: 100%;
      min-width: 100px;
    }
    .text-and-icon {
      margin-right: 10px;
      .text {
        font-size: 18px;
      }
      .icon {
        height: 18px;
        width: 18px;
      }
    }
  }
`;
