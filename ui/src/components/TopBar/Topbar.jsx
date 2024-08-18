import React from "react";
import { Logout } from "./Logout";
import { useSelector } from "react-redux";

export const Topbar = () => {
  const { user } = useSelector(state => state.user);
  return <div className="topbar flex w-full h-9 shadow-md bg-white p-5">
    {/* <h1>hi, {user && user?.firstName} !</h1>
    <Logout /> */}
    <h1>Logged in as {user.firstName} {user.lastName}</h1>
  </div>;
};
