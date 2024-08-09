import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootLayout } from "../../layout/RootLayout";

export const PrivateRoute = () => {
  const { user } = useSelector((state) => state.user);
  return user?.isLoggedIn ? <RootLayout /> : <Navigate to="/login" />;
};
