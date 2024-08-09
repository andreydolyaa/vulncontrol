import { RouterProvider, useLocation, useNavigate } from "react-router-dom";
import { router } from "./routes";

export const App = () => {
  return <RouterProvider router={router} />;
};
