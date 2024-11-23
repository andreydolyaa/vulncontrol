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
        <TbArrowLeft className="icon-return" onClick={() => navigate(-1)} />
        {icon && <IconComponent className="icon" />}
        <div className="text">{text}</div>
      </div>
      {enableSearch && (
        <Search onSearch={onSearch} placeholder="Search scans..." />
      )}

      {!enableSearch ? (
        <div className="childrens">{children && children}</div>
      ) : (
        <>{children && children}</>
      )}
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
  animation: appear4 0.2s ease-in-out 1;
  .childrens {
    min-width: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      /* border: 1px solid red; */
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      svg {
        transition: 0.2s;
        font-size: 24px;
        stroke-width: 1.3;
      }
      svg:hover {
        color: var(--action-color-2);
        transform: scale(1.1);
      }
    }
  }
  .text-and-icon {
    display: flex;
    align-items: center;
    .text {
      color: #ffffff;
      font-weight: 600;
      font-size: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 300px;
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
    display: flex;
    min-height: 110px;
    padding: 15px;
    align-items: center;
    flex-direction: column;
    .search {
      width: 100%;
      min-width: 100px;
    }
    .text-and-icon {
      justify-content: space-between;
      width: 100%;
      .icon-return {
        margin: 0;
        margin-right: 10px;
        min-width: 20px;
      }
      .text {
        font-size: 14px;
        text-align: center;
      }
      .icon {
        order: 1;
        height: 18px;
        width: 18px;
        display: none;
      }
    }
  }
`;
