import type { User } from "../@types/Auth";
import { api } from "../lib/axios";

export async function loginWithGoogle(googleToken: string) {
  try {
    const response = await api.post("/auth/google", {
      token: googleToken,
    });

    if (response.status === 200) {
      return { data: response.data.user as User, type: "success" };
    }

    return { type: "error" };
  } catch (error) {
    console.error("Login error:", error);
    return { type: "error" };
  }
}

export async function getCurrentUser() {
  try {
    const response = await api.get("/auth/me");

    if (response.status === 200) {
      return { data: response.data, type: "success" };
    }

    return { type: "error" };
  } catch (error) {
    console.error("Get user error:", error);
    return { type: "error" };
  }
}

export async function logout() {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error("Logout error:", error);
  }
}
