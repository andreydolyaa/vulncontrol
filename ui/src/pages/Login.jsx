import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignForm } from "../components/SignForm/SignForm";
import SignFormItem from "../components/SignForm/SignFormItem";
import { getLoggedUser, login } from "../redux/userSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const { message, loading, status } = useSelector((state) => state.user);
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
    dispatch(login(formData))
      .unwrap()
      .then(() => dispatch(getLoggedUser()))
      .then(() => setFormData({ email: "", password: "" }))
      .catch(() => null);
  };

  return (
    <SignForm
      buttonText={"Log In"}
      onFormSubmit={submitLoginForm}
      loading={loading}
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
