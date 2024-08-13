import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.user);

  if (loading) return <div>Loading...</div>;
  if (!user.isLoggedIn) return <Navigate to="/login" replace />;
  return children;
};