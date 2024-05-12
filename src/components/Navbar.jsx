import React from "react";
import useUserStore from "../app/store";
import { MdOutlineLogout } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar = () => {
  const userName = useUserStore((state) => state.userName);

  return (
    <nav className="bg-blue-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-white text-xl font-bold">
            Hi, {userName}
            <div className="text-gray-200 text-sm">Book your favorite meal</div>
          </div>

          {/* Navigation Links */}
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white hover:text-blue-200 active">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-blue-200 ">
                About
              </Link>
            </li>
            <li>
              <button className="flex items-center text-white hover:text-blue-200">
                <IoMdNotificationsOutline className="w-6 h-6" />
              </button>
            </li>
            <li>
              {/* Logout Button with Icon */}
              <button className="flex items-center text-white hover:text-blue-200">
                <MdOutlineLogout className="w-6 h-6" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
