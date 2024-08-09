import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignForm } from "../components/SignForm/SignForm";
import SignFormItem from "../components/SignForm/SignFormItem";
import { login } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { status, message, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(status);

    if (status === "succeeded" && user.isLoggedIn) {
      navigate("/");
    }
  }, [status, user]);

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitLoginForm = (e) => {
    e.preventDefault();
    dispatch(login(formData));
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
