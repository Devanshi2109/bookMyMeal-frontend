import React from "react";
import useUserStore from "../app/store";
import { MdOutlineLogout } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar = () => {
  const userName = useUserStore((state) => state.userName);

  return (
    <nav className="py-8 bg-navy">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-white">
            Hi, {userName}
            <div className="text-sm text-gray-200">Book your favorite meal</div>
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
