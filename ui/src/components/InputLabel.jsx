import React from "react";
import styled from "styled-components";

export const InputLabel = ({ text, icon }) => {
  const IconComponent = icon;
  return (
    <StyledDiv className="input-label title">
      <IconComponent className="icon" />
      <div>{text}</div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  text-transform: uppercase;
  font-weight: 500;
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;
  gap:10px;
  font-size: 12px;
  .icon {
    font-size: 16px;
    color:var(--icon-color);
  }
`;
