import React from "react";
import { MessageBox } from "../MessageBox";
import { SignFormButton } from "./SignFormButton";
import { SignFormTitle } from "./SignFormTitle";
import { SignFormFooter } from "./SignFormFooter";
import { SignFormWrapper } from "./SignFormWrapper";

export const SignForm = ({
  children,
  buttonText,
  onFormSubmit,
  isLoading,
  message,
  status,
}) => {
  const isLoginPage = () => buttonText === "Log In";

  return (
    <SignFormWrapper onFormSubmit={onFormSubmit}>
      <SignFormTitle isLoginPage={isLoginPage} />
      <MessageBox message={message} status={status} />
      {children}
      <SignFormButton buttonText={buttonText} isLoading={isLoading} />
      <SignFormFooter isLoginPage={isLoginPage} />
    </SignFormWrapper>
  );
};
