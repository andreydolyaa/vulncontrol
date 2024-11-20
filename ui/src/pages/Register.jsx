import { useState } from "react";
import { SignForm } from "../components/SignForm/SignForm";
import SignFormItem from "../components/SignForm/SignFormItem";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/userSlice";

export const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { status, message } = useSelector((state) => state.user);

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitRegisterForm = (e) => {
    e.preventDefault();
    dispatch(register(formData));
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  const isLoading = () => status === "loading";

  return (
    <SignForm
      buttonText="Register"
      onFormSubmit={submitRegisterForm}
      isLoading={isLoading}
      message={message}
      status={status}
    >
      <SignFormItem
        label="First Name"
        placeholder="Enter your first name"
        name="firstName"
        value={formData.firstName}
        onFormChange={onFormChange}
      />

      <SignFormItem
        label="Last Name"
        placeholder="Enter your last name"
        name="lastName"
        value={formData.lastName}
        onFormChange={onFormChange}
      />

      <SignFormItem
        label="Email"
        placeholder="Enter your email"
        name="email"
        value={formData.email}
        onFormChange={onFormChange}
      />

      <SignFormItem
        inputType="password"
        label="Password"
        placeholder="Enter your password"
        name="password"
        value={formData.password}
        onFormChange={onFormChange}
      />
    </SignForm>
  );
};
