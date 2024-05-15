import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import otpImg from "../assest/images/signup-image.jpg";

const Otp = () => {
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    // If validation passes, submit the form
    // Here you can handle the logic to verify the OTP
    // For example, you can make a request to your backend API

    // Assuming a successful verification for demo purposes
    toast.success("OTP Verified successfully!");
  };

  return (
    <div className="flex h-screen">
      <div className="hidden w-2/3 bg-center bg-cover md:block">
        <img src={otpImg} alt="OTP Verification" />
      </div>
      <div className="flex items-center justify-center w-full p-8 md:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <h1 className="mb-4 text-3xl font-bold">OTP Verification</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                Enter OTP
              </label>
              <input
                id="otp"
                type="text"
                className="block w-full px-4 py-3 mt-1 text-sm border border-gray-300 rounded form-input"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
              />
              {error && <span className="text-red-500">{error}</span>}
            </div>
            <div className="flex items-center justify-between mb-4">
              <button
                type="submit"
                className="w-full px-4 py-3 text-sm text-white bg-orange-600 rounded-md hover:bg-orange-700"
              >
                Verify OTP
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm">
                Didn't receive OTP?{" "}
                <Link
                  to="/resend-otp"
                  className="text-blue-600 hover:underline"
                >
                  Resend OTP
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Toaster position="top-right" /> {/* Toaster container */}
    </div>
  );
};

export default Otp;
