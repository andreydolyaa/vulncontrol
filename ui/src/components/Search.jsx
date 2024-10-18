import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  height: 40px;
  min-width: 220px;
  background: none;
  font-size: 14px;
  background-color: var(--main-background-color);
  &::placeholder {
    font-size: 14px;
    color: gray;
  }
`;

export const Search = ({ placeholder }) => {
  return <StyledInput type="text" placeholder={placeholder} />;
};
