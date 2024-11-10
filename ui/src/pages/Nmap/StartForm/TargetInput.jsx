import React from "react";
import styled from "styled-components";

export const TargetInput = ({ onFormChange, easyMode }) => {
  const placeholderText = () => {
    return easyMode
      ? "Enter IPv4 or IPv6 address (example: 192.168.1.1)"
      : "Enter a valid nmap command (example: nmap -sV scanme.nmap.org)";
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
  &::placeholder {
    color: var(--placeholder-color);
  }
`;
