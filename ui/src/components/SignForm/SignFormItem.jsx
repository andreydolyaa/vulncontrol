import React from "react";

const SignFormItem = ({
  inputType = "text",
  name,
  label,
  placeholder,
  onFormChange,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-2">{label}</label>
      <input
        type={inputType}
        name={name}
        onChange={onFormChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default SignFormItem;
