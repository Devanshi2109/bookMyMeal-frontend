import { create } from "zustand";
import axios from "../service/axios";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  token: null,
  user: null,
  userId: null,

  login: async (email, password) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      // console.log("Login response data:", data);

      const token = data.jwt;
      const user = data.name;
      const userId = data.userId;

      set({
        isAuthenticated: true,
        token,
        user,
        userId,
      });

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", userId);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return { success: true, user, userId };
    } catch (error) {
      console.error("Login failed", error);
      set({
        isAuthenticated: false,
        token: null,
        user: null,
        userId: null,
      });
      return { success: false, message: "Login failed" };
    }
  },

  register: async (name, email, password, confirmPassword) => {
    try {
      await axios.post("/auth/signup1", {
        name,
        email,
        password,
        confirmPassword,
      });
      return { success: true };
    } catch (error) {
      console.error("Registration failed", error);
      return { success: false, message: "Registration failed" };
    }
  },

  logout: () => {
    set({ isAuthenticated: false, token: null, user: null, userId: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    delete axios.defaults.headers.common["Authorization"];
  },

  checkAuth: () => {
    const token = localStorage.getItem("token");
    const userJson = localStorage.getItem("user");
    const userId = localStorage.getItem("userId");
    const user = userJson ? JSON.parse(userJson) : null;

    console.log("Checking auth:", { token, user, userId });

    if (token && user && userId) {
      set({ isAuthenticated: true, token, user, userId });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  },
}));

export default useAuthStore;
