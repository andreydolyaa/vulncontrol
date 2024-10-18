import React, { useState } from "react";
import styled from "styled-components";

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  width: 0;
  height: 0;
`;

const StyledCheckbox = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid var(--border-color-2);
  border-radius: 5px;
  padding: 4px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-right: 10px; */

  &:after {
    content: "";
    width: 100%;
    height: 100%;
    background: ${(props) =>
      props.checked ? "#8d46ff" : "transparent"};
    border-radius: 2px;
    transition: all 0.3s;
  }
`;

const Label = styled.label`
  margin-left: 8px;
  font-size: 14px;
  font-weight: 500;
`;

export const Checkbox = ({ label, checked, onFormChange }) => {
  return (
    <CheckboxWrapper onClick={onFormChange}>
      <HiddenCheckbox name={label} checked={checked} onChange={onFormChange} />
      <StyledCheckbox name={label} checked={checked} onChange={onFormChange} />
      {label && <Label>{label}</Label>}
    </CheckboxWrapper>
  );
};
