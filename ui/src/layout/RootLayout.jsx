import React from "react";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    // TODO: add classes
    <div>
      <div>topbar</div>
      <div>sidebar</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
