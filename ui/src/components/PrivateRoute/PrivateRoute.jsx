import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootLayout } from "../../layout/RootLayout";

export const PrivateRoute = () => {
  
  // TODO watch routes and restrict access

  const { user } = useSelector((state) => state.user);
  return user ? <RootLayout /> : <Navigate to="/login" />;
};
