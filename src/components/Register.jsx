import React, { useState } from "react";
import { Link } from "react-router-dom";
import signUpImg from "../assest/images/signup-image.jpg";
import { toast } from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass: "",
    re_pass: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Email is invalid");
      return;
    }
    if (!formData.pass.trim()) {
      toast.error("Password is required");
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
    console.log("Registering user:", formData);
  };

  return (
    <div className="flex h-screen">
      <div className="hidden w-2/3 bg-center bg-cover md:block">
        <img src={signUpImg} alt="" />
      </div>
      <div className="flex items-center justify-center w-full p-8 md:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <div className="flex items-start justify-start mx-auto text-left mb-14">
              {/* Your logo and title */}
            </div>
            <p className="mb-4 text-3xl font-bold text-left">Sign up</p>
            <p className="mb-4 text-left text-gray-500">
              Create your account to get started.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                className="block w-full px-4 py-3 mt-1 text-sm border border-gray-300 rounded form-input"
                value={formData.name}
                onChange={handleChange}
                name="name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="block w-full px-4 py-3 mt-1 text-sm border border-gray-300 rounded form-input"
                value={formData.email}
                onChange={handleChange}
                name="email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="pass"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="pass"
                type="password"
                className="block w-full px-4 py-3 mt-1 text-sm border border-gray-300 rounded form-input"
                value={formData.pass}
                onChange={handleChange}
                name="pass"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="re_pass"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="re_pass"
                type="password"
                className="block w-full px-4 py-3 mt-1 text-sm border border-gray-300 rounded form-input"
                value={formData.re_pass}
                onChange={handleChange}
                name="re_pass"
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
                />
                <label
                  htmlFor="terms"
                  className="block ml-2 text-sm text-gray-900"
                >
                  I agree to the{" "}
                  <Link to="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                  </Link>
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 text-sm text-white bg-orange-600 rounded-md hover:bg-orange-700"
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
        </div>
      </div>
    </div>
  );
};

export default Register;
