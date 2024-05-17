import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import AuthLayout from "./AuthLayout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    // Your logic for sending reset password instructions
    // For demonstration purposes, we'll simulate a successful request
    setTimeout(() => {
      toast.success(
        "Password reset instructions have been sent to your email."
      );
    }, 1000);
  };

  return (
    <AuthLayout>
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold">Forgot Your Password?</h1>
        <p className="mb-4 text-gray-500">
          Enter your email address to reset your password.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email" 
            className="block text-sm font-medium text-gray-700"
            >
              Email Address
          </label>
          <input 
            id="email" 
            type="email" 
            className="block w-full px-4 py-3 mt-1 text-sm border border-gray-300 rounded form-input" 
            placeholder="Your Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            type="submit" 
            className="w-full px-4 py-3 text-sm text-white bg-orange-600 rounded-md hover:bg-orange-700"
            >
              Reset Password
            </button>
        </div>
        <div className="mb-0 text-center">
          <p className="text-sm">
            Remember your password? 
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </form>
      <Toaster position="top-right" />
    </AuthLayout>
  );
};

export default ForgotPassword;
