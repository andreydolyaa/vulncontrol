import React, { useState } from "react";
import { SignForm } from "../components/SignForm/SignForm";
import SignFormItem from "../components/SignForm/SignFormItem";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitLoginForm = (e) => {
    e.preventDefault();
    console.log(formData, "ready form");

    // redux action to submit to server here
  };
  return (
    <SignForm buttonText={"Log In"} onFormSubmit={submitLoginForm}>
      <SignFormItem
        inputType={"email"}
        label={"Work Email"}
        placeholder={"Enter your work email"}
        name={"email"}
        onFormChange={onFormChange}
      />

      <SignFormItem
        inputType={"password"}
        label={"Password"}
        placeholder={"Enter your password"}
        name={"password"}
        onFormChange={onFormChange}
      />
    </SignForm>
  );
};
