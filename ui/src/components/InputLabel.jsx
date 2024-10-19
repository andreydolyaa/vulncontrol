import React from "react";
import styled from "styled-components";

export const InputLabel = ({ text, icon }) => {
  const IconComponent = icon;
  return (
    <StyledDiv className="title">
      <IconComponent className="icon" />
      <div>{text}</div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  text-transform: uppercase;
  color: var(--brighter-color);
  font-weight: 500;
  /* font-size: 14px; */
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;
  .icon {
    stroke-width: 1.5;
    font-size: 18px;
    margin-right: 6px;
    color:var(--icon-color);
  }
`;
