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

const Navbar = ({ loggedInUser }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const Navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };
  const handleLogout = () => {
    logout();
    Navigate("/login");
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
    <nav className="bg-navy text-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-xl font-bold">
          <NavLink to="/">
            <img src={logo} alt="Logo" className="h-8" />
          </NavLink>
        </div>
        <div className="hidden md:flex space-x-4">
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
            to="/about"
            className={({ isActive }) =>
              `hover:text-gray-300 ${
                isActive ? "font-bold border-b-2 border-white" : ""
              }`
            }
          >
            About
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
                className="absolute right-0 top-full mt-2 bg-white text-gray-800 rounded-md shadow-lg z-10 w-48"
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
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                >
                  <FaSignOutAlt className="mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="md:hidden flex items-center">
          <NotificationIcon />
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-800">
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
            to="/about"
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
              onClick={toggleDropdown}
            >
              <FaUserCircle className="mr-2" />
              {user ? user : staticUserName}
              <FaCaretDown className="ml-1" />
            </button>
            {isDropdownOpen && (
              <div className="bg-blue-700 text-white">
                <NavLink
                  to="/change-password"
                  className="block px-4 py-2 hover:bg-blue-600"
                  onClick={toggleMobileMenu}
                >
                  Change Password
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-blue-600 flex items-center"
                >
                  <FaSignOutAlt className="mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
