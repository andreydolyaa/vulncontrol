import React from "react";
import { Outlet } from "react-router-dom";
import { Topbar } from "../components/TopBar/Topbar";
import { useSelector } from "react-redux";

export const RootLayout = () => {


  return (
    // TODO: add classes
    <div className="root-layout">
      <Topbar />
      <div>sidebar</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
