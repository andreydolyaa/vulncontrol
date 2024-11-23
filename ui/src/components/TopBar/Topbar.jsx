import React from "react";
import { Logout } from "./Logout";
import { useSelector } from "react-redux";

export const Topbar = () => {
  const { user } = useSelector(state => state.user);
  return <div className="topbar">
    <h1>Logged in as {user.email}</h1>
  </div>;
};
