import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthLayout from "./AuthLayout.jsx";
import logo from "../assest/images/logo.svg";
import useAuthStore from "../app/authStore.js";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }
    if (!username.trim()) {
      toast.error("Please enter a username.");
      return;
    }
    if (!password.trim()) {
      toast.error("Please enter a password.");
      return;
    }
    console.log("Username: ", username);
    console.log("Password:", password);
    await login(username, password);
    if (isAuthenticated) {
      navigate("/");
    } else {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <AuthLayout>
      <div className="mb-8 text-center">
        <div className="flex items-start justify-start mx-auto text-left mb-10">
          <img src={logo} alt="Rishabh Software" className="mr-4 h-12" />
          <h2 className="text-3xl font-bold text-red-500">Meal Facility</h2>
        </div>
        <p className="mb-2 text-2xl font-bold text-left">
          Sign in to your account
        </p>
        <p className="text-left text-gray-500">
          Enter your credentials to access your account
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            User Name
          </label>
          <input
            id="username"
            type="text"
            className="block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded form-input"
            placeholder="Robert Smith"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password-field"
              type={showPassword ? "text" : "password"}
              placeholder="*********"
              className="block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-600">Remember Me</span>
          </label>
          <div>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <div className="mb-2">
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm text-white bg-orange-600 rounded-md hover:bg-orange-700"
          >
            Sign in
          </button>
        </div>
        <div>
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </form>
      <Toaster position="top-right" />
    </AuthLayout>
  );
};

export default Login;
