import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaBell, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const NotificationIcon = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/notifications?userId=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        setNotifications(data);
        setUnreadCount(
          data.filter((notification) => !notification.read).length
        );
      } else {
        console.error("Failed to fetch notifications");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, [token, userId]);

  const clearNotifications = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/notifications?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 204) {
        console.log("Notifications cleared");
        setNotifications([]);
        setUnreadCount(0);
      } else if (response.status === 403) {
        console.error(
          "Access forbidden: Invalid token or insufficient permissions."
        );
      } else {
        console.error("Failed to clear notifications");
      }
    } catch (error) {
      console.error("Error clearing notifications:", error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/notifications/${notificationId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 204) {
        console.log(`Notification ${notificationId} deleted`);
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification.id !== notificationId
          )
        );
        setUnreadCount((prevCount) => prevCount - 1);
      } else {
        console.error("Failed to delete notification");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchNotifications(); // Fetch notifications on component mount
    const interval = setInterval(fetchNotifications, 10000); // Polling every minute
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  return (
    <div className="relative">
      <button
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
        className="relative flex items-center hover:text-gray-300"
        onClick={toggleDropdown}
      >
        <FaBell className="mr-4" />
        {unreadCount > 0 && (
          <span
            className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-600 rounded-full"
            style={{ top: "-8px", right: "8px" }}
          >
            {unreadCount}
          </span>
        )}
      </button>
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 z-10 w-64 mt-2 text-gray-800 bg-white border rounded-md shadow-lg"
        >
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <span className="font-bold">Notifications</span>
            <button
              onClick={clearNotifications}
              className="text-gray-500 hover:text-gray-700"
            >
              Clear All
            </button>
          </div>
          <div className="p-4 overflow-y-auto max-h-64">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center justify-between p-2 my-1 transition-colors duration-300 bg-gray-200 rounded-md"
                >
                  <p
                    className={`text-gray-800 ${
                      !notification.read ? "font-bold" : ""
                    }`}
                  >
                    {notification.message}
                  </p>
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No new notifications</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
