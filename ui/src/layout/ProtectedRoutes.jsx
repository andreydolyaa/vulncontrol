import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { CustomOutlet } from "./CustomOutlet";

export const ProtectedRoutes = () => {
  const { user } = useSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <CustomOutlet />;
};
