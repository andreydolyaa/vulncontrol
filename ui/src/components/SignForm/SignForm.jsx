import React from "react";
import { ErrorBox } from "../ErrorBox";
import { SignFormButton } from "./SignFormButton";
import { SignFormTitle } from "./SignFormTitle";
import { SignFormFooter } from "./SignFormFooter";

export const SignForm = ({
  children,
  buttonText,
  onFormSubmit,
  isLoading,
  error,
}) => {
  const isLoginPage = () => buttonText === "Log In";

  return (
    <div className="login-layout h-full full-page-centered">
      <div className="login-container w-[450px] flex justify-center">
        <form
          onSubmit={onFormSubmit}
          className="children-margin bg-white p-10 w-full flex flex-col rounded-xl shadow animate-appear"
        >
          <SignFormTitle isLoginPage={isLoginPage} />
          <ErrorBox error={error} />
          {children}
          <SignFormButton buttonText={buttonText} isLoading={isLoading} />
          <SignFormFooter isLoginPage={isLoginPage} />
        </form>
      </div>
    </div>
  );
};
