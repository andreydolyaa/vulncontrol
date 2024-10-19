import React, { useState } from "react";
import styled from "styled-components";

export const Checkbox = ({ label, checked, onFormChange }) => {
  return (
    <CheckboxWrapper>
      <HiddenCheckbox name={label} checked={checked} onChange={onFormChange} />
      <StyledCheckbox name={label} checked={checked} onClick={onFormChange} onChange={onFormChange} />
      {label && <Label>{label}</Label>}
    </CheckboxWrapper>
  );
};

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
  border: 1px solid var(--border-color);
  background-color: var(--main-background-color);
  border-radius: 3px;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:after {
    content: "";
    width: 100%;
    height: 100%;
    background: ${(props) =>
      props.checked ? "rgb(116, 43, 225)" : "transparent"};
    border-radius: 1px;
    transition: all 0.4s;
  }
`;

const Label = styled.label`
  margin-left: 8px;
  /* font-size: 12px; */
  /* font-weight: 500; */
`;
