import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaCaretDown,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "../assest/images/logo-white.svg";
import NotificationIcon from "./NotificationIcon";
import useAuthStore from "../app/authStore";
import LogoutConfirmationModal from "./LogoutConfirmation"; // Import the modal component

const Navbar = ({ loggedInUser }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // State for logout modal
  const location = useLocation();
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileDropdown = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
    if (
      mobileDropdownRef.current &&
      !mobileDropdownRef.current.contains(event.target)
    ) {
      setIsMobileDropdownOpen(false);
    }
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true); // Open the logout confirmation modal
  };

  const confirmLogout = () => {
    logout();
    navigate("/login");
    setIsLogoutModalOpen(false); // Close the modal after logout
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false); // Close the modal without logging out
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (path) => path === location.pathname;

  // Static username for demonstration purposes
  const staticUserName = "Guest User";

  return (
    <nav className="text-white bg-blue-900">
      <div className="container flex items-center justify-between p-4 mx-auto">
        <div className="flex items-center text-xl font-bold">
          <NavLink to="/">
            <img src={logo} alt="Logo" className="h-8" />
          </NavLink>
          <h2 className="ml-4 text-2xl">Meal facility</h2>{" "}
        </div>

        <div className="hidden space-x-4 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-gray-300 ${
                isActive ? "font-bold border-b-2 border-white" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `hover:text-gray-300 ${
                isActive ? "font-bold border-b-2 border-white" : ""
              }`
            }
          >
            About Us
          </NavLink>
          <div className="relative flex">
            <button className="flex items-center text-white hover:text-blue-200">
              <NotificationIcon />
            </button>

            <button
              className="flex items-center hover:text-gray-300"
              onClick={toggleDropdown}
            >
              <FaUserCircle className="mr-2" />
              {user ? user : staticUserName}
              <FaCaretDown className="ml-1" />
            </button>
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 z-10 w-48 mt-2 text-gray-800 bg-white rounded-md shadow-lg top-full"
              >
                <NavLink
                  to="/change-password"
                  className="flex items-center px-4 py-2 hover:bg-gray-200"
                >
                  <FaUserCircle className="mr-2" />
                  Change Password
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-200"
                >
                  <FaSignOutAlt className="mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center md:hidden">
          <NotificationIcon />
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="bg-blue-800 md:hidden">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-4 py-2 hover:bg-blue-700 ${isActive ? "font-bold" : ""}`
            }
            onClick={toggleMobileMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `block px-4 py-2 hover:bg-blue-700 ${isActive ? "font-bold" : ""}`
            }
            onClick={toggleMobileMenu}
          >
            About
          </NavLink>
          <div>
            <button
              className="flex items-center w-full px-4 py-2 hover:bg-blue-700"
              onClick={toggleMobileDropdown}
            >
              <FaUserCircle className="mr-2" />
              {user ? user : staticUserName}
              <FaCaretDown className="ml-1" />
            </button>
            {isMobileDropdownOpen && (
              <div ref={mobileDropdownRef} className="text-white bg-blue-700">
                <NavLink
                  to="/change-password"
                  className="block px-4 py-2 hover:bg-blue-600"
                  onClick={toggleMobileMenu}
                >
                  Change Password
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-left hover:bg-blue-600"
                >
                  <FaSignOutAlt className="mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        onConfirm={confirmLogout}
      />
    </nav>
  );
};

export default Navbar;
