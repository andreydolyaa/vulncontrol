import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Sidebar } from "../components/Sidebar/Sidebar";

export const RootLayout = () => {
  const { user, loading } = useSelector((state) => state.user);

  if (loading) return <div>Loading...</div>;

  if (!user.isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="root-layout">
      <Sidebar />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
};
