import { createContext, useState, useEffect, type ReactNode } from "react";
import { loginWithGoogle, getCurrentUser, logout as logoutService } from "../services/AuthService";
import type { User, AuthContextType } from "../@types/Auth";

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const response = await getCurrentUser();

    if (response.type === "success" && response.data) {
      setUser(response.data);
    }

    setIsLoading(false);
  }

  async function login(googleToken: string) {
    const response = await loginWithGoogle(googleToken);

    if (response.type === "success" && response.data) {
      setUser(response.data);
    } else {
      throw new Error("Login failed");
    }
  }

  async function logout() {
    await logoutService();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token: null,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
