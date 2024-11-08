import React from "react";
import styled from "styled-components";

export const Title = ({ text, icon }) => {
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
  gap: 10px;
  font-size: 16px;
  color: white;
  .icon {
    stroke-width: 1.5;
    font-size: 20px;
  }
`;
