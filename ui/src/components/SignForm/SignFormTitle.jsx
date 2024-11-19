import React from "react";
import { Logo } from "../Sidebar/Logo";

export const SignFormTitle = ({ isLoginPage }) => {
  return (
    <h1 className="text-4xl text-center font-bold py-6">
      {isLoginPage() ? <div className="reg"><Logo /> </div>: "Register"}
    </h1>
  );
};
