import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import useAuthStore from "../app/authStore";
import CancelAMealBtn from "./CancelAMealBtn";
import menuItems from "./menuItems.json";
import axios from "axios";

const DetailsCard = ({
  selectedEvent,
  cancelBooking,
  updateEventStatus,
  onQRModalClose,
}) => {
  const [showQR, setShowQR] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute timer
  const userName = useAuthStore((state) => state.user);

  useEffect(() => {
    let timer;
    if (showQR) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            redeemMeal(); // Make API call when timer expires
            handleCloseQRModal(); // Close the QR modal
            return 60; // Reset timer to 60 seconds
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [showQR]);

  useEffect(() => {
    // Reset showQR state when selectedEvent changes
    setShowQR(false);
    // Reset timer when selectedEvent changes
    setTimeLeft(60);
  }, [selectedEvent]);

  const handleShowQR = () => {
    if (!selectedEvent.isRedeemed) {
      setShowQR(true);
    }
  };

  const handleCloseQRModal = () => {
    setShowQR(false);
    // Notify parent component that QR modal is closed
    onQRModalClose();
  };

  const redeemMeal = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/meals/redeem/${selectedEvent.mealId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      if (data.success) {
        toast.success("Meal redeemed successfully!");
        // Update event status
        updateEventStatus(selectedEvent.id, true);
        // Hide QR modal
        setShowQR(false);
      } else {
        toast.error("Failed to redeem meal. Please try again later.");
      }
    } catch (error) {
      console.error("Error redeeming meal:", error);
      toast.error("Failed to redeem meal. Please try again later.");
    }
  };

  const dayOfWeek = selectedEvent
    ? moment(selectedEvent.start).format("dddd")
    : moment().format("dddd");
  const menu = menuItems[dayOfWeek] || [];
  const isToday =
    selectedEvent && moment(selectedEvent.start).isSame(moment(), "day");
  const displayDate = selectedEvent
    ? moment(selectedEvent.start).format("dddd, MMMM Do YYYY")
    : moment().format("dddd, MMMM Do YYYY");
  const isPast =
    selectedEvent && moment(selectedEvent.start).isBefore(moment(), "day");
  const isBooked = selectedEvent && !isPast && !selectedEvent.isRedeemed;
  const tagText = isBooked ? "Booked" : "Redeemed";
  const tagColor = isBooked ? "bg-green-500" : "bg-orange-500";

  return (
    <div className="relative p-6 text-white bg-blue-500 rounded-lg shadow-md">
      <Toaster position="top-right" />
      <span
        className={`absolute top-0 right-0 px-2 py-1 ${tagColor} rounded-tr-lg rounded-bl-lg text-xs font-bold`}
      >
        {tagText}
      </span>
      <h2 className="mb-4 text-xl font-bold">
        {displayDate}{" "}
        {isToday && <span className="text-sm text-gray-300">(Today)</span>}
      </h2>
      <p className="mb-6 text-gray-200">Menu for the day:</p>
      <ul className="list-disc list-inside">
        {menu.map((item, index) => (
          <li key={index} className="text-gray-100">
            {item}
          </li>
        ))}
      </ul>
      {isBooked && (
        <div className="flex space-x-2">
          <button
            className="w-40 h-12 px-3 py-3 m-2 text-sm text-blue-500 bg-white rounded shadow"
            onClick={handleShowQR}
          >
            Show QR
          </button>
          <CancelAMealBtn
            mealId={selectedEvent.mealId}
            date={selectedEvent.date}
            onCancelSuccess={cancelBooking}
            className="px-4 py-2 mt-4 text-sm text-white bg-red-500 rounded shadow"
          />
        </div>
      )}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="relative w-full max-w-md p-5 text-black bg-white border rounded-md shadow-lg">
            <button
              className="absolute top-0 right-0 mt-4 mr-4 text-2xl text-gray-600"
              onClick={handleCloseQRModal}
            >
              &times;
            </button>
            <h2 className="mb-4 text-xl font-bold">Booking Details</h2>
            <p className="mb-2">
              <strong>User Name:</strong> {userName}
            </p>
            <p className="mb-4">
              <strong>Booking Date:</strong>{" "}
              {moment(selectedEvent.start).format("MMMM Do YYYY")}
            </p>
            <div className="flex justify-center mb-4">
              <QRCode
                value={`UserId: ${selectedEvent.userId}, 
                UserName: ${userName}, 
                BookingDate: ${moment(selectedEvent.start).format(
                  "MMMM Do YYYY"
                )}, 
                Token: ${selectedEvent.token}`}
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-red-500">Time left: {timeLeft} seconds</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsCard;
