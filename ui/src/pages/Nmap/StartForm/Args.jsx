import React from "react";
import styled from "styled-components";
import { Checkbox } from "../../../components/Checkbox";

export const Args = ({ formData, onFormChange }) => {
  const handleCheckboxChange = (arg) => {
    onFormChange({
      target: { name: arg, type: "checkbox", checked: !formData.args[arg] },
    });
  };

  return (
    <StyledDiv>
      {Object.keys(formData.args).map((arg) => {
        return (
          <div className="checkbox-wrapper-custom">
            <Checkbox
              key={arg}
              label={arg}
              checked={formData.args[arg]}
              onFormChange={() => handleCheckboxChange(arg)}
              name={arg}
            />
          </div>
        );
      })}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  .checkbox-wrapper-custom {
    /* border: 1px solid red; */
    /* margin-bottom:10px; */
    width: 160px;
    /* padding: 0 0 10px 0; */
    margin-bottom: 10px;
  }
`;
