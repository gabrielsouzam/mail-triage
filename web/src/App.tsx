import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

export function App() {
  return (
    <>
      <Toaster richColors theme="light" position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}
