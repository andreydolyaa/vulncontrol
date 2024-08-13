import React from "react";
import { Outlet } from "react-router-dom";
import { Topbar } from "../components/TopBar/Topbar";
import { useSelector } from "react-redux";
import { Sidebar } from "../components/Sidebar/Sidebar";

export const RootLayout = () => {
  return (
    <div className="root-layout">
      {/* <Topbar /> */}
      <Sidebar />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
};
