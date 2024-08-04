import React from "react";
import { SignForm } from "../components/SignForm/SignForm";
import SignFormItem from "../components/SignForm/SignFormItem";

export const Register = () => {
  return (
    <SignForm buttonText={"Register"}>
      <SignFormItem
        label={"First Name"}
        placeholder={"Enter your first name"}
      />

      <SignFormItem 
        label={"Last Name"} 
        placeholder={"Enter your last name"} 
      />

      <SignFormItem 
        label={"Email"} 
        placeholder={"Enter your work email"} 
      />
      
      <SignFormItem
        inputType={"password"}
        label={"Password"}
        placeholder={"Enter your password"}
      />
    </SignForm>
  );
};
