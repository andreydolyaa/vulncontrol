import React from "react";
import styled from "styled-components";

export const Target = ({ onFormChange }) => {
  return (
    <StyledInput
      type="text"
      placeholder="Enter IPv4 or IPv6 address..."
      name="target"
      onChange={onFormChange}
    ></StyledInput>
  );
};

const StyledInput = styled.input`
  width: 100%;
  height: 50px;
`;
