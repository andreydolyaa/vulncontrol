import React from "react";
import { Navigate } from "react-router-dom";
import { RootLayout } from "../../layout/RootLayout";
import useAuth from "../../hooks/useAuth";

export const PrivateRoute = () => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? <RootLayout /> : <Navigate to="/login" replace />;
};
