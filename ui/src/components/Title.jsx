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
  position: fixed;
  border:1px solid red;
  /* border-bottom: 1px solid var(--border-color); */
  /* padding: 0 0 20px 0; */
  text-transform: uppercase;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  /* margin: 0 0 20px 0; */
  font-size: 16px;
  color: white;
  /* flex:1; */
  /* width:100%; */
  .icon {
    stroke-width: 1.5;
    font-size: 20px;
  }
`;
