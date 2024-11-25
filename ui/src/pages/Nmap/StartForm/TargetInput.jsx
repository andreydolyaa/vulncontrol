import React from "react";
import styled from "styled-components";

export const TargetInput = ({ onFormChange, easyMode, formData }) => {
  const placeholderText = () => {
    return easyMode
      ? "Enter IP or domain address (192.168.1.1 / scanme.nmap.org)"
      : "Example: nmap -sV scanme.nmap.org";
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
