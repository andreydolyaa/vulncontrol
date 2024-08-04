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
  const { user, status, error } = useSelector((state) => state.user);

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
  };

  const isLoading = () => status === "loading";

  return (
    <SignForm
      buttonText={"Register"}
      onFormSubmit={submitRegisterForm}
      isLoading={isLoading}
    >
      <SignFormItem
        label={"First Name"}
        placeholder={"Enter your first name"}
        name={"firstName"}
        onFormChange={onFormChange}
      />

      <SignFormItem
        label={"Last Name"}
        placeholder={"Enter your last name"}
        name={"lastName"}
        onFormChange={onFormChange}
      />

      <SignFormItem
        label={"Email"}
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
