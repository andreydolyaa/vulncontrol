import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects/Projects";
import { Tasks } from "./pages/Tasks/Tasks";
import { Error } from "./pages/Error/Error";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";


export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <PrivateRoute />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/tasks",
        element: <Tasks />,
      },
    ],
  },
]);
