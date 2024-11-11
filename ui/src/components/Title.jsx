import React from "react";
import styled from "styled-components";

export const Title = ({ text, icon, data = null }) => {
  const IconComponent = icon;
  return (
    <StyledDiv className="input-label title">
      <div className="header">
        <IconComponent className="icon" />
        <div>{text}</div>
      </div>
      {data && <div className="data">{data}</div>}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  text-transform: uppercase;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: white;
  justify-content: space-between;
  flex: 1;
  .header {
    display: flex;
    align-items: center;
    gap: 10px;
    .icon {
      stroke-width: 1.5;
      font-size: 18px;
    }
  }
  .data {
    font-size: 11px;
    color: var(--icon-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 250px;
  }
`;
