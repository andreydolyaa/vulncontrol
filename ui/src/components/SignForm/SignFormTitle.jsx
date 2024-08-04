import React from "react";

export const SignFormTitle = ({ isLoginPage }) => {
  return (
    <h1 className="text-4xl text-center font-bold py-6">
      {isLoginPage() ? "Welcome Back!" : "Register"}
    </h1>
  );
};
