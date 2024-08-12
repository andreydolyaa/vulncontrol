import { useSelector } from "react-redux";

const useAuth = () => {
  const { user } = useSelector((state) => state.user);
  return user?.isLoggedIn || null;
};

export default useAuth;
