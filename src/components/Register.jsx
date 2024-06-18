import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthLayout from "./AuthLayout";
import useAuthStore from "../app/authStore";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass: "",
    re_pass: "",
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const Navigate = useNavigate();
  const register = useAuthStore((state) => state.register);

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!validateEmail(formData.email)) {
      toast.error("Email is invalid");
      return;
    }
    if (!formData.pass.trim()) {
      toast.error("Password is required");
      return;
    }
    if (!validatePassword(formData.pass)) {
      toast.error("Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }
    if (!formData.re_pass.trim()) {
      toast.error("Repeat Password is required");
      return;
    }
    if (formData.pass.trim() !== formData.re_pass.trim()) {
      toast.error("Passwords do not match");
      return;
    }
    if (!formData.terms) {
      toast.error("You must agree to the Terms and Conditions and Privacy Policy");
      return;
    }
    const { name, email, pass: password, re_pass: confirmPassword } = formData;
    const result = await register(name, email, password, confirmPassword);
    if (result.success) {
      localStorage.setItem("registrationSuccess", "true");
      Navigate("/login"); 
    } else {
      toast.error("Something went wrong...!");
    }
    console.log("Registering user:", formData);
  };

  return (
    <AuthLayout>
      <div className="mb-8 text-center">
        <p className="mb-2 text-2xl font-bold text-left">Sign up</p>
        <p className="text-left text-gray-500">
          Create your account to get started.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            className="block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded form-input"
            value={formData.name}
            onChange={handleChange}
            name="name"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded form-input"
            value={formData.email}
            onChange={handleChange}
            name="email"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="pass"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="pass"
              type={showPassword ? "text" : "password"}
              className="block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded form-input"
              value={formData.pass}
              onChange={handleChange}
              name="pass"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="mb-2">
          <label
            htmlFor="re_pass"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="re_pass"
              type={showRePassword ? "text" : "password"}
              className="block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded form-input"
              value={formData.re_pass}
              onChange={handleChange}
              name="re_pass"
            />
            <span
              onClick={() => setShowRePassword(!showRePassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            >
              {showRePassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
              checked={formData.terms}
              onChange={handleChange}
            />
            <label htmlFor="terms" className="block ml-2 text-sm text-gray-900">
              I agree to the{" "}
              <Link to="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm text-white bg-orange-600 rounded-md hover:bg-orange-700"
          >
            Sign Up
          </button>
        </div>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
      <Toaster position="top-right" />
    </AuthLayout>
  );
};

export default Register;