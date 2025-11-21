import { User } from "../utils/types";
import api from "./api";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await api.post<AuthResponse>("/auth/login/", credentials);
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    return data;
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";
  },

  getUser: async (): Promise<User | null> => {
    try {
      const { data } = await api.get<User>("/users/me/");
      return data;
    } catch {
      return null;
    }
  },
};
