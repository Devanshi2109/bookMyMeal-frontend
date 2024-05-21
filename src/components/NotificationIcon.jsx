import React, { useState, useRef, useEffect } from 'react';
import { FaBell, FaTimes } from 'react-icons/fa';

const NotificationIcon = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const clearNotifications = () => {
    // Clear notifications logic here
    console.log('Notifications cleared');
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        className="flex items-center hover:text-gray-300"
        onClick={toggleDropdown}
      >
        <FaBell className="mr-4" />
      </button>
      {isDropdownOpen && (
        <div ref={dropdownRef} className="absolute right-0 mt-2 bg-white text-gray-800 rounded-md shadow-lg z-10 w-64">
          <div className="flex justify-between items-center px-4 py-2 border-b">
            <span className="font-bold">Notifications</span>
            <button onClick={clearNotifications} className="text-gray-500 hover:text-gray-700">
              Clear
            </button>
          </div>
          <div className="p-4">
            {/* Notification content goes here */}
            <p className="text-gray-500">No new notifications</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
