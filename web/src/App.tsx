import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./contexts/AuthContext";
import { router } from "./routes";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!GOOGLE_CLIENT_ID) {
  throw new Error("VITE_GOOGLE_CLIENT_ID is not defined in environment variables");
}

export function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Toaster richColors theme="light" position="bottom-right" />
        <RouterProvider router={router} />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
