import React from "react";

export const Login = () => {
  return (
    <div className="login-layout border border-red-500 h-full">
      <div className="login-box flex flex-col w-96">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="">login</button>
      </div>
    </div>
  );
};
