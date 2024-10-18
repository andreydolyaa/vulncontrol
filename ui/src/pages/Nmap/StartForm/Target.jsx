import React from "react";

export const Target = ({ onFormChange }) => {
  return (
    <input
      type="text"
      placeholder="Target"
      className="w-full"
      name="target"
      onChange={onFormChange}
    />
  );
};
