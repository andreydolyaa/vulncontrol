import React from "react";
import SignFormItem from "./SignFormItem";

export const SignForm = ({ children, buttonText, onSignFormSubmit }) => {
  const isLoginPage = () => buttonText === "Log In";

  return (
    <div className="login-layout h-full full-page-centered">
      <div className="login-container w-[450px] flex justify-center">
        <form className="children-margin bg-white p-10 w-full flex flex-col rounded-xl shadow">
          <h1 className="text-4xl text-center font-bold py-6">
            {isLoginPage() ? "Welcome Back!" : "Register"}
          </h1>

          {children}

          <button className="py-5 font-bold bg-purpleBg border-none text-white">
            {buttonText}
          </button>

          <div className="login-divider flex items-center mb-4">
            <span className="text-gray-400 mx-3">OR</span>
          </div>

          <div className="text-gray-400 text-center underline">
            <a href={isLoginPage() ? "/register" : "/login"}>
              {isLoginPage() ? "Register New Account" : "Log In"}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};