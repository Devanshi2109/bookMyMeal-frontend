import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import menuItems from "./menuItems.json";
import useAuthStore from "../app/authStore";
import CancelAMealBtn from "./CancelAMealBtn";

const DetailsCard = ({ selectedEvent, cancelBooking }) => {
  const [showQR, setShowQR] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute timer
  const userName = useAuthStore((state) => state.user);

  useEffect(() => {
    let timer;
    if (showQR) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            toast.error("QR code is now invalid.");
            setShowQR(false);
            cancelBooking(selectedEvent.mealId);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [showQR]);

  const handleShowQR = () => {
    setShowConfirmation(true);
  };

  const confirmShowQR = () => {
    setQrCode(selectedEvent.token);
    setShowQR(true);
    setShowConfirmation(false);
    setTimeLeft(60); // Reset timer
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

  return (
    <div className="p-6 text-white bg-blue-500 rounded-lg shadow-md">
      <Toaster position="top-right" />
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
      {selectedEvent && !isPast && (
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 mt-4 text-sm text-blue-500 bg-white rounded shadow"
            onClick={handleShowQR}
          >
            Show QR
          </button>
          <CancelAMealBtn
            mealId={selectedEvent.mealId}
            onCancelSuccess={cancelBooking}
            className="px-4 py-2 mt-4 text-sm text-white bg-red-500 rounded shadow"
          />
        </div>
      )}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="w-full max-w-sm p-5 text-black bg-white border rounded-md shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Confirm Redemption</h2>
            <p className="mb-4">Are you sure you want to redeem this coupon?</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 mr-2 text-white bg-red-500 rounded"
                onClick={() => setShowConfirmation(false)}
              >
                No
              </button>
              <button
                className="px-4 py-2 text-white bg-green-500 rounded"
                onClick={confirmShowQR}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="relative w-full max-w-md p-5 text-black bg-white border rounded-md shadow-lg">
            <button
              className="absolute top-0 right-0 mt-4 mr-4 text-2xl text-gray-600"
              onClick={() => setShowQR(false)}
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
                value={`UserId: ${
                  selectedEvent.userId
                }, UserName: ${userName}, BookingDate: ${moment(
                  selectedEvent.start
                ).format("MMMM Do YYYY")}, Token: ${qrCode}`}
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
