import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./app/layouts/AppLayout";
import { ProtectedLayout } from "./app/layouts/ProtectedLayout";
import { Home } from "./app/Home";
import { Dashboard } from "./app/Dashboard";
import { Login } from "./app/Login";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);