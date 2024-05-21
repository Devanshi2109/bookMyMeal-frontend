import { create } from "zustand";
import axios from "../service/axios";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  token: null,
  user: null,
  login: async (username, password) => {
    try {
      const response = await axios.post("/auth/login", { username, password });
      const token = response.data.token;
      const user = response.data.name;
      set({ isAuthenticated: true, token, user });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return { success: true, user };
    } catch (error) {
      console.error("Login failed", error);
      set({ isAuthenticated: false, token: null, user: null });
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
    set({ isAuthenticated: false, token: null, user: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  },
  checkAuth: () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      set({ isAuthenticated: true, token, user });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  },
}));

export default useAuthStore;
