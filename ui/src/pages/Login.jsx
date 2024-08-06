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
  const { status, message } = useSelector((state) => state.user);
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
    dispatch(login(formData))
  };

  const isLoading = () => status === "loading";

  // TODO: handle redirect to /Home after login
  // TODO: Protect login and register routes after logged in
  // TODO: confirm how should you store the token (localstorage/memory) and handle refresh

  return (
    <SignForm
      buttonText={"Log In"}
      onFormSubmit={submitLoginForm}
      isLoading={isLoading}
      message={message}
      status={status}
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
