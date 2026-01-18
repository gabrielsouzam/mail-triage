import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./app/AppLayout";
import { Home } from "./app/Home";
import { Dashboard } from "./app/Dashboard";

export const router = createBrowserRouter([
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
]);