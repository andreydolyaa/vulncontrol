import React from "react";
import styled from "styled-components";

export const TargetInput = ({ onFormChange, easyMode, formData }) => {
  const placeholderText = () => {
    return easyMode
      ? "Enter IPv4, IPv6 or domain address (example: 192.168.1.1 / scanme.nmap.org)"
      : "Enter a valid nmap command (example: nmap -sV scanme.nmap.org)";
  };
  return (
    <StyledInput
      type="text"
      placeholder={placeholderText()}
      name="command"
      onChange={onFormChange}
      value={formData.command || ''}
    ></StyledInput>
  );
};

const StyledInput = styled.input`
  width: 100%;
  &::placeholder {
    color: var(--placeholder-color);
  }
`;
