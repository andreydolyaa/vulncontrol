import React from "react";

export const Select = ({ options, handleChange }) => {
  return (
    <select onChange={handleChange}>
      {Object.keys(options).map((key) => {
        return (
          <option key={key} value={key}>
            {options[key]}
          </option>
        );
      })}
    </select>
  );
};
