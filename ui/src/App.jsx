import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLoggedUser } from "./redux/userSlice";

export const App = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getLoggedUser());
  // }, []);

  return <RouterProvider router={router} />;
};
