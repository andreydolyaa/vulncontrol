import React from "react";
import styled from "styled-components";
import { Search } from "./Search";
import { TbArrowLeft } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export const ModuleName = ({
  text,
  icon,
  enableSearch = true,
  onSearch,
  children,
}) => {
  const navigate = useNavigate();
  const IconComponent = icon;
  return (
    <StyledDiv>
      <div className="text-and-icon">
        <TbArrowLeft
          className="icon-return"
          onClick={() => navigate(-1)}
        />
        {icon && <IconComponent className="icon" />}
        <div className="text">{text}</div>
      </div>
      {enableSearch && (
        <Search onSearch={onSearch} placeholder="Search scans..." />
      )}
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
      height: 20px;
      width: 20px;
      color: white;
      margin-right: 5px;
    }
    .icon-return {
      color: var(--action-color-2);
      width: 20px;
      height: 20px;
      margin-right: 20px;
      cursor: pointer;
      transition: 0.3s;
    }
    .icon-return:hover {
      transform: scale(1.1);
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
