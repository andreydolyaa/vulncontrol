import React from "react";
import { Register } from "../../pages/Register";

export const SignFormFooter = ({ isLoginPage }) => {
  return (
    <>
      <div className="login-divider flex items-center mb-4">
        <span className="text-gray-400 mx-3">OR</span>
      </div>

      {/* <div className="text-gray-400 text-center underline">
        <a href={isLoginPage() ? "/register" : "/login"}>
          {isLoginPage() ? "Register New Account" : "Log In"}
        </a>
      </div> */}
      <div className="text-gray-600 text-center">
        <p>Registration Temporarily unavailable</p>
      </div>
    </>
  );
};
