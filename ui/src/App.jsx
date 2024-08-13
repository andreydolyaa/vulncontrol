import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { getLoggedUser } from "./redux/userSlice"; // Assume you have this action

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedUser());
  }, [dispatch]);

  return <RouterProvider router={router} />;
};
