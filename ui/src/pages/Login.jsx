import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignForm } from "../components/SignForm/SignForm";
import SignFormItem from "../components/SignForm/SignFormItem";
import { getLoggedUser, login } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { status, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      .unwrap()
      .then(() => {
        setFormData({
          email: "",
          password: "",
        });
      })
      .then(() => dispatch(getLoggedUser()))
      .then(() => navigate("/"))
      .catch(() => null);
  };

  const isLoading = () => status === "loading";

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
        value={formData.email}
        onFormChange={onFormChange}
      />

      <SignFormItem
        inputType={"password"}
        label={"Password"}
        placeholder={"Enter your password"}
        name={"password"}
        value={formData.password}
        onFormChange={onFormChange}
      />
    </SignForm>
  );
};
