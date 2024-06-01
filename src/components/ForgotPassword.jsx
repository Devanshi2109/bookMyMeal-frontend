import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import AuthLayout from "./AuthLayout";
import { Link } from "react-router-dom";
import useAuthStore from "../app/authStore";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const setEmailId = useAuthStore((state) => state.setEmailId);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/forgotPassword/verifyMail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
          credentials: "include", // Ensure credentials (cookies) are included in the request if necessary
        }
      );

      if (response.ok) {
        setEmailId(email);
        toast.success("The OTP has been sent to your email.");
        setTimeout(() => {
          navigate("/otp");
        }, 1000);
      } else {
        const contentType = response.headers.get("content-type");
        let errorData;
        if (contentType && contentType.includes("application/json")) {
          errorData = await response.json();
        } else {
          errorData = { message: "Failed to send OTP." };
        }
        toast.error(errorData.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error occurred:", error); // Log the actual error
      toast.error("An error occurred. Please try again later.");
    }
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
