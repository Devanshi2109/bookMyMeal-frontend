import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
//import { FaArrowLeft } from "react-icons/fa";
import AuthLayout from "./AuthLayout";


const Otp = () => {
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 1;
  const navigate = useNavigate();

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  useEffect(() => {
    let timer;
    if (isResendDisabled) {
      timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setIsResendDisabled(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isResendDisabled]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    if (!otp) {
      toast.error("Please enter the OTP.", { id: "otp-error" });
      return;
    }

    // If validation passes, submit the form
    // Here you can handle the logic to verify the OTP
    // For example, you can make a request to your backend API

    // Assuming a successful verification for demo purposes
    toast.success("OTP Verified successfully!");
  };

  const handleResendOtp = () => {
    if (isResendDisabled) return;
    if (window.confirm("Are you sure you want to resend the OTP?")) {
      // Handle OTP resend logic here
      toast.success("A new OTP has been sent to your registered mobile number/email.", { id: "resend-otp-success" });
      setIsResendDisabled(true);
    }
  };

  return (
    
    <AuthLayout>
      {/* <button
          type="button"
          onClick={() => navigate("/login")}
          className="absolute top-4 text-sm text-blue-600 hover:underline flex items-center"
        >
          <FaArrowLeft className="mr-2" /> 
          Back to Login
        </button>  */}
      
      <div className="relative w-full max-w-sm">
        
        <div className="mb-8 text-center mt-12"> {/* Add margin-top to push content down */}
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
              <button
                type="button"
                onClick={handleResendOtp}
                className={`text-blue-600 hover:underline ${isResendDisabled ? "cursor-not-allowed" : ""}`}
                disabled={isResendDisabled}
              >
                Resend OTP {isResendDisabled && `(${resendTimer}s)`}
              </button>
            </p>
          </div>
        </form>
        <Toaster position="top-right" /> {/* Toaster container */}
      </div>
    </AuthLayout>
  );
};

export default Otp;
