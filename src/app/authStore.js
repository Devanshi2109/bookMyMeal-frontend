import { create } from "zustand";
import axiosInstance from "../service/axios";
import { jwtDecode } from "jwt-decode";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  token: null,
  user: null,
  userId: null,
  emailId: null,
  logoutTimeout: null,

  login: async (email, password) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const data = response.data;

      const token = data.jwt;
      const user = data.name;
      const userId = data.userId;
      const emailId = data.email;

      // Decode token to get expiration time
      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp * 1000;

      set({
        isAuthenticated: true,
        token,
        user,
        userId,
        emailId,
      });

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", userId);
      localStorage.setItem("emailId", emailId);

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      // Set timeout for logout
      const timeout = setTimeout(() => {
        set({ logoutTimeout: null });
        useAuthStore.getState().logout();
      }, expiresAt - Date.now());

      set({ logoutTimeout: timeout });

      return { success: true, user, userId, emailId };
    } catch (error) {
      console.error("Login failed", error);
      set({
        isAuthenticated: false,
        token: null,
        user: null,
        userId: null,
        emailId: null,
        logoutTimeout: null,
      });
      return { success: false, message: "Login failed" };
    }
  },

  register: async (name, email, password, confirmPassword) => {
    try {
      await axiosInstance.post("/auth/signup1", {
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
    set({
      isAuthenticated: false,
      token: null,
      user: null,
      userId: null,
      emailId: null,
      logoutTimeout: null,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("emailId");
    delete axiosInstance.defaults.headers.common["Authorization"];

    // Clear any existing logout timeout
    const { logoutTimeout } = useAuthStore.getState();
    if (logoutTimeout) {
      clearTimeout(logoutTimeout);
    }
  },

  checkAuth: () => {
    const token = localStorage.getItem("token");
    const userJson = localStorage.getItem("user");
    const userId = localStorage.getItem("userId");
    const emailId = localStorage.getItem("emailId");
    const user = userJson ? JSON.parse(userJson) : null;

    if (token && user && userId && emailId) {
      // Decode token to get expiration time
      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp * 1000;

      // Set timeout for logout
      const timeout = setTimeout(() => {
        set({ logoutTimeout: null });
        useAuthStore.getState().logout();
      }, expiresAt - Date.now());

      set({
        isAuthenticated: true,
        token,
        user,
        userId,
        emailId,
        logoutTimeout: timeout,
      });

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    }
  },

  setEmailId: (email) => {
    set({ emailId: email });
    localStorage.setItem("emailId", email);
  },
}));

export default useAuthStore;
