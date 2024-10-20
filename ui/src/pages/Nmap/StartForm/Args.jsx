import React from "react";
import styled from "styled-components";
import { Checkbox } from "../../../components/Checkbox";
import { argsDescriptionMap } from "../../../utils";

export const Args = ({ formData, onFormChange }) => {
  const isDisabled = (label) => label === "--packet-trace";

  const handleCheckboxChange = (arg) => {
    onFormChange({
      target: { name: arg, type: "checkbox", checked: !formData.args[arg] },
    });
  };

  return (
    <StyledDiv>
      {Object.keys(formData.args).map((arg) => {
        return (
          <div key={arg} className="checkbox-wrapper-custom">
            <Checkbox
              label={`${argsDescriptionMap[arg]} [${arg}]`}
              checked={formData.args[arg]}
              onFormChange={() => handleCheckboxChange(arg)}
              name={arg}
              isDisabled={isDisabled(arg)}
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
  flex-wrap: wrap;
  .checkbox-wrapper-custom {
    width: 235px;
    margin-bottom: 7px;
  }
`;
