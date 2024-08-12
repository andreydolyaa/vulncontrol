import React from "react";
import { Logout } from "./Logout";

export const Topbar = () => {
  return <div className=" flex w-full h-9 border border-gray-800">
    <h1>Topbar</h1>
    <Logout />
  </div>;
};
