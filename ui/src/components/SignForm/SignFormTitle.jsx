import React from "react";
import { PiVirus } from "react-icons/pi";

export const SignFormTitle = ({ isLoginPage }) => {
  return (
    <h1 className="text-4xl text-center font-bold py-6">
      {isLoginPage() ? (
        <div className="reg">
          <PiVirus className="logo-svg text-3xl m-0 lg:mr-3 " />
          <h1 className="ml-3">VulnControl</h1>
        </div>
      ) : (
        "Register"
      )}
    </h1>
  );
};
