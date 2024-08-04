import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignForm } from "../components/SignForm/SignForm";
import SignFormItem from "../components/SignForm/SignFormItem";
import { login } from "../redux/userSlice";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { user, status, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
    dispatch(login(formData));
  };

  const isLoading = () => status === "loading";

  return (
    <SignForm
      buttonText={"Log In"}
      onFormSubmit={submitLoginForm}
      isLoading={isLoading}
      error={error}
    >
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
