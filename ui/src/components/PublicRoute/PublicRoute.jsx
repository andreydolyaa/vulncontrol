import React from "react";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ element }) => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : element;
};
