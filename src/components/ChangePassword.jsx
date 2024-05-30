import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const userId = localStorage.getItem("userId");
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
    try {
      const response = await fetch(
        "http://localhost:8080/api/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            id: userId,
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          }),
        }
      );

      const responseText = await response.text();
      console.log("Raw Response:", responseText); // Log the raw response

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        if (response.ok) {
          toast.success("Password changed successfully");
          setFormData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          // Redirect to home page after 1 second
          setTimeout(() => {
            navigate("/");
          }, 1000);
          return;
        } else {
          toast.error("An error occurred: Invalid JSON response");
          console.error("JSON parsing error:", jsonError);
          return;
        }
      }

      if (response.ok) {
        toast.success(data.message || "Password changed successfully");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        // Redirect to home page after 1 second
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <AuthLayout>
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold">Change Your Password</h1>
        <p className="mb-4 text-gray-500">
          Enter your current and new password to change your password.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Current Password
          </label>
          <div className="relative">
            <input
              id="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              className="block w-full px-4 py-3 mt-1 text-sm border border-gray-300 rounded form-input"
              value={formData.currentPassword}
              onChange={handleChange}
              name="currentPassword"
            />
            <span
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            >
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
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
      <div className="mt-4 text-center">
        <p className="text-sm">
          Remembered your password?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </p>
      </div>
      <Toaster position="top-right" />
    </AuthLayout>
  );
};

export default ChangePassword;
