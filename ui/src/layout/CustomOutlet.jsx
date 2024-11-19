import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Topbar } from "../components/TopBar/Topbar";
import { Modal } from "../components/Modal/Modal";
import { Toast } from "../components/Toast";
import { Tooltip } from "react-tooltip";

export const CustomOutlet = () => {
  return (
    <div className="root-layout">
      <>
        <Tooltip id="tooltip" className="tooltip lg:hidden" />
        <Tooltip id="tooltip1" className="tooltip" />
        <Toast />
        <Modal />
      </>
      <Topbar />
      <Sidebar />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
};
