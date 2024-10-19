import React, { useState } from "react";
import styled from "styled-components";

export const Checkbox = ({ label, checked, onFormChange, isDisabled }) => {
  return (
    <CheckboxWrapper>
      <HiddenCheckbox
        name={label}
        checked={checked}
        onChange={onFormChange}
        disabled={isDisabled}
      />
      <StyledCheckbox
        name={label}
        checked={checked}
        onClick={isDisabled ? null : onFormChange}
        onChange={onFormChange}
        disabled={isDisabled}
      />
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
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

const StyledCheckbox = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid var(--border-color);
  background-color: ${(props) =>
    props.disabled ? "#212121" : "var(--main-background-color)"};
  border-radius: 3px;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

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
`;
