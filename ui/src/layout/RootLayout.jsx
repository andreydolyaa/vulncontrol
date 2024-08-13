import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Topbar } from "../components/Topbar/Topbar";
import { useEffect } from "react";
import { getLoggedUser } from "../redux/userSlice";

export const RootLayout = () => {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getLoggedUser());
  }, [dispatch]);

  // if (!!user) return <pre>{JSON.stringify(user)}</pre>
  // else return <div>no user <pre>{JSON.stringify(user)}</pre></div>
  // console.log(user);

  // return <pre>{JSON.stringify(user)}</pre>
  if (loading) return <div>Loading...</div>;

  // if (!user) {
  //   console.log("!USER");

  //   return <Navigate to="/login" replace />;
  // }

  return (
    <div className="root-layout">
      <Topbar />
      <Sidebar />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
};
