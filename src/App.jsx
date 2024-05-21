import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import useAuthStore from "./app/authStore";
import HomePage from "./components/HomePage";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import Otp from "./components/Otp";
import ChangePassword from "./components/ChangePassword";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute element={<HomePage />} />,
    },
    {
      path: "/terms",
      element: <ProtectedRoute element={<Terms />} />,
    },
    {
      path: "/privacy",
      element: <ProtectedRoute element={<Privacy />} />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/otp",
      element: <Otp />,
    },
    {
      path: "/change-password",
      element: <ChangePassword />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
