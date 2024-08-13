import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Error } from "./pages/Error/Error";
import { Overview } from "./pages/Overview/Overview";
import { Nmap } from "./pages/Nmap/Nmap";
import { Nikto } from "./pages/Nikto/Nikto";
import { WPScan } from "./pages/WPScan/WPScan";
import { Settings } from "./pages/Settings/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/overview",
        element: <Overview />,
      },
      {
        path: "/nmap",
        element: <Nmap />,
      },
      {
        path: "/nikto",
        element: <Nikto />,
      },
      {
        path: "/wpscan",
        element: <WPScan />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     errorElement: <Error />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "/overview",
//         element: <Overview />,
//       },
//       {
//         path: "/nmap",
//         element: <Nmap />,
//       },
//       {
//         path: "/nikto",
//         element: <Nikto />,
//       },
//       {
//         path: "/wpscan",
//         element: <WPScan />,
//       },
//       {
//         path: "/settings",
//         element: <Settings />,
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
// ]);
