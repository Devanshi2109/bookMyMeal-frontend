import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
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
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";

const App = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const routes = [
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
      element: <RedirectIfAuthenticated element={<Login />} />,
    },
    {
      path: "/register",
      element: <RedirectIfAuthenticated element={<Register />} />,
    },
    {
      path: "/forgot-password",
      element: <RedirectIfAuthenticated element={<ForgotPassword />} />,
    },
    {
      path: "/otp",
      element: <RedirectIfAuthenticated element={<Otp />} />,
    },
    {
      path: "/change-password",
      element: <ProtectedRoute element={<ChangePassword />} />,
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default App;
