import React from "react";

const SignFormItem = ({ inputType = "text", label, placeholder }) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-2">{label}</label>
      <input type={inputType} placeholder={placeholder} />
    </div>
  );
};

export default SignFormItem;
