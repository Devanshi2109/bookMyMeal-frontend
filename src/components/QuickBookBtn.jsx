// QuickBookBtn.jsx
import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import useAuthStore from "../app/authStore";
import publicHolidays from "../assest/publicHoliday.json"; // Import the public holidays JSON file

const QuickBookBtn = ({ onBookingSuccess }) => {
  const [showModal, setShowModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const userId = useAuthStore((state) => state.userId);
  const userName = localStorage.getItem("user");

  useEffect(() => {
    if (!userId) {
      toast.error("User ID is not available. Please log in.");
      setIsDisabled(true);
    }
  }, [userId]);

  const handleQuickBook = () => {
    const now = new Date();
    const cutoffTime = new Date();
    cutoffTime.setHours(20, 0, 0, 0); // 8 PM today

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const isWeekend = tomorrow.getDay() === 0 || tomorrow.getDay() === 6;
    const isPublicHoliday = publicHolidays.some(
      (holiday) => new Date(holiday).toDateString() === tomorrow.toDateString()
    );

    if (now > cutoffTime) {
      setIsDisabled(true);
      toast.error("Quick booking is only available before 8 PM for the next day.");
    } else if (isWeekend || isPublicHoliday) {
      setIsDisabled(true);
      toast.error("Booking is not available for weekends and public holidays.");
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirm = async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split("T")[0];

    const bookingData = {
      userId,
      startDate: formattedDate,
      endDate: formattedDate,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:8080/api/meals", bookingData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const result = response.data;
        toast.success("Meal booked successfully!");
        setShowModal(false);
        onBookingSuccess(result); // Call the onBookingSuccess function
        await createNotification(); // Trigger notification
      } else if (response.status === 403) {
        toast.error("You are not authorized to perform this action.");
      } else {
        const errorData = response.data;
        toast.error(errorData.message || "Booking failed");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  const createNotification = async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split("T")[0];

    const notificationData = {
      userId,
      userName,
      startDate: formattedDate,
      endDate: formattedDate,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:8080/api/notifications", notificationData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Notification sent successfully!");
      } else {
        const errorData = response.data;
        toast.error(errorData.message || "Notification failed");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while sending notification");
    }
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <button
        className="w-40 h-12 px-5 py-3 m-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-navy"
        onClick={handleQuickBook}
        disabled={isDisabled}
      >
        Quick Book
      </button>
      {showModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="w-full max-w-md p-12 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Confirm Quick Booking</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-600 transition duration-300 hover:text-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <h2 className="text-3xl font-bold">New Booking</h2>
            </div>
            <div className="mb-4">
              <h3 className="block mb-2 font-bold text-red-600">Vadodara</h3>
            </div>
            <div className="mb-4">
              <p>Are you sure you want to book for tomorrow?</p>
            </div>
            <button
              className="w-full h-12 px-5 py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-navy"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickBookBtn;
