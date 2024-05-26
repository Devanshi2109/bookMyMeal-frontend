import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthLayout from "./AuthLayout";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.newPassword.trim()) {
      toast.error("New password is required");
      return;
    }
    if (!formData.confirmPassword.trim()) {
      toast.error("Confirm password is required");
      return;
    }
    if (formData.newPassword.trim() !== formData.confirmPassword.trim()) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/forgotPassword/changePassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: formData.newPassword,
            repeatPassword: formData.confirmPassword,
          }),
        }
      );

      if (response.ok) {
        toast.success("Password changed successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.message || "Failed to change password. Please try again."
        );
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <AuthLayout>
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold">Create Your New Password</h1>
        <p className="mb-4 text-gray-500">Enter your new password below.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <div className="relative">
            <input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              className="block w-full px-4 py-3 mt-1 text-sm border border-gray-300 rounded form-input"
              value={formData.newPassword}
              onChange={handleChange}
              name="newPassword"
            />
            <span
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm New Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="block w-full px-4 py-3 mt-1 text-sm border border-gray-300 rounded form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-3 text-sm text-white bg-orange-600 rounded-md hover:bg-orange-700"
          >
            Change Password
          </button>
        </div>
      </form>
      <Toaster position="top-right" />
    </AuthLayout>
  );
};

export default UpdatePassword;
