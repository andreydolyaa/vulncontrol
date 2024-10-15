import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";
// import { Topbar } from "../components/Topbar/Topbar";
import { Topbar } from "../components/TopBar/Topbar"

export const CustomOutlet = () => {
  return (
    <div className="root-layout">
      <Topbar />
      <Sidebar />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
};
