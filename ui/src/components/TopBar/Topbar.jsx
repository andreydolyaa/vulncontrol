import React from "react";
import { Logout } from "./Logout";
import { useSelector } from "react-redux";
import {  TbUser } from "react-icons/tb";

export const Topbar = () => {
  const { user } = useSelector(state => state.user);
  return <div className="topbar">
    <div className="icon"><TbUser /></div>
    <h1>{user.email}</h1>
  </div>;
};
