import React from "react";
import styled from "styled-components";

export const TargetInput = ({ onFormChange, easyMode }) => {

  const placeholderText = () => {
    return easyMode
      ? "Enter IPv4 or IPv6 address..."
      : "Enter a valid nmap command (example: nmap -sV -A -p 3000,445,80 <ip>)";
  };
  return (
    <StyledInput
      type="text"
      placeholder={placeholderText()}
      name="command"
      onChange={onFormChange}
    ></StyledInput>
  );
};

const StyledInput = styled.input`
  width: 100%;
`;
