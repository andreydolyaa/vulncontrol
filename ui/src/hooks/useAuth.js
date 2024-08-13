import { useSelector } from "react-redux";

const useAuth = () => {
  const { user, status } = useSelector((state) => state.user);
  return {
    isAuthenticated: user?.isLoggedIn || false,
    isLoading: status === "loading",
  };
};

export default useAuth;
