import { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import logo from "../assest/images/logo.svg";
import loginImg from "../assest/images/signup-image.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
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
  };

  const handleTogglePassword = () => {
    const passwordField = document.getElementById("password-field");
    passwordField.type === "password"
      ? (passwordField.type = "text")
      : (passwordField.type = "password");
  };

  return (
    <div className="flex h-screen">
      <div
        className="hidden w-2/3 bg-center bg-cover md:block"
        style={{ backgroundImage: `url(${loginImg})` }}
      ></div>
      <div className="flex items-center justify-center w-full p-8 md:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <div className="flex items-start justify-start mx-auto text-left mb-14">
              <img src={logo} alt="Rishabh Software" className="mr-4 h-14" />
              <h2 className="text-4xl font-bold text-red-500">Meal Facility</h2>
            </div>

            <p className="mb-4 text-3xl font-bold text-left">
              Sign in to your account
            </p>
            <p className="mb-4 text-left text-gray-500">
              Enter your credentials to access your account
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                User Name
              </label>
              <input
                id="username"
                type="text"
                className="block w-full px-4 py-3 mt-1 text-sm border border-gray-300 rounded form-input md:text-base"
                placeholder="Robert Smith"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password-field"
                  type="password"
                  placeholder="*********"
                  className="block w-full px-4 py-3 mt-1 text-sm border border-gray-300 rounded form-input md:text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <span
                  onClick={handleTogglePassword}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                >
                  <i className="icon-eye-close field-icon"></i>
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
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
            <div className="mb-4">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-orange-600 rounded btn btn-primary hover:bg-orange-700"
                onClick={handleSubmit}
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
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default Login;
