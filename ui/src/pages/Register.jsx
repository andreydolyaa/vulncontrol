import { useState } from "react";
import { SignForm } from "../components/SignForm/SignForm";
import SignFormItem from "../components/SignForm/SignFormItem";

export const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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

  const submitRegisterForm = (e) => {
    e.preventDefault();
    console.log(formData, "ready form");

    // redux action to submit to server here
  };
  return (
    <SignForm buttonText={"Register"} onFormSubmit={submitRegisterForm}>
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
