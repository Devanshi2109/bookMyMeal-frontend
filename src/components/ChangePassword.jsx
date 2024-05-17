import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthLayout from "./AuthLayout";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.currentPassword.trim()) {
      toast.error("Current password is required");
      return;
    }
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
    console.log("Changing password:", formData);
    // Add the password change logic
  };

  return (
    <AuthLayout>
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold">Change Your Password</h1>
        <p className="mb-4 text-gray-500">Enter your current and new password to change your password.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
          <div className="relative">
            <input
              id="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              className="block w-full px-4 py-3 mt-1 text-sm border border-gray-300 rounded form-input"
              value={formData.currentPassword}
              onChange={handleChange}
              name="currentPassword"
            />
            <span onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
          <div className="relative">
            <input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              className="block w-full px-4 py-3 mt-1 text-sm border border-gray-300 rounded form-input"
              value={formData.newPassword}
              onChange={handleChange}
              name="newPassword"
            />
            <span onClick={() => setShowNewPassword(!showNewPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="block w-full px-4 py-3 mt-1 text-sm border border-gray-300 rounded form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
            />
            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div>
          <button type="submit" className="w-full px-4 py-3 text-sm text-white bg-orange-600 rounded-md hover:bg-orange-700">Change Password</button>
        </div>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm">
          Remembered your password?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
        </p>
      </div>
      <Toaster position="top-right" />
    </AuthLayout>
  );
};

export default ChangePassword;
