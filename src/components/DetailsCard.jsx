// DetailsCard.js
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';
import menuItems from './menuItems.json';
import useAuthStore from '../app/authStore';
import CancelAMealBtn from './CancelAMealBtn';

const DetailsCard = ({ selectedEvent, cancelBooking }) => {
  const [showQR, setShowQR] = useState(false);
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
            toast.error('QR code is now invalid.');
            setShowQR(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [showQR]);

  const handleShowQR = () => {
    setQrCode(selectedEvent.token);
    setShowQR(true);
    setTimeLeft(60); // Reset timer
  };

  const dayOfWeek = selectedEvent ? moment(selectedEvent.start).format('dddd') : moment().format('dddd');
  const menu = menuItems[dayOfWeek] || [];
  const isToday = selectedEvent && moment(selectedEvent.start).isSame(moment(), 'day');
  const displayDate = selectedEvent ? moment(selectedEvent.start).format('dddd, MMMM Do YYYY') : moment().format('dddd, MMMM Do YYYY');
  const isPast = selectedEvent && moment(selectedEvent.start).isBefore(moment(), 'day');

  return (
    <div className="bg-blue-500 text-white rounded-lg shadow-md p-6">
      <Toaster position="top-right" />
      <h2 className="text-xl font-bold mb-4">
        {displayDate} {isToday && <span className="text-sm text-gray-300">(Today)</span>}
      </h2>
      <p className="text-gray-200 mb-6">Menu for the day:</p>
      <ul className="list-disc list-inside">
        {menu.map((item, index) => (
          <li key={index} className="text-gray-100">
            {item}
          </li>
        ))}
      </ul>
      {selectedEvent && !isPast && (
        <button
          className="mt-4 bg-white text-blue-500 px-4 py-2 rounded shadow"
          onClick={handleShowQR}
        >
          Show QR
        </button>
      )}
      {selectedEvent && !isPast && (
        <CancelAMealBtn mealId={selectedEvent.id} bookingDate={selectedEvent.start} onCancelSuccess={cancelBooking} />
      )}
      {showQR && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-5 border shadow-lg rounded-md w-full max-w-md text-black">
            <button
              className="absolute top-0 right-0 mt-4 mr-4 text-2xl text-gray-600"
              onClick={() => setShowQR(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Booking Details</h2>
            <p className="mb-2"><strong>User Name:</strong> {userName}</p>
            <p className="mb-4"><strong>Booking Date:</strong> {moment(selectedEvent.start).format('MMMM Do YYYY')}</p>
            <div className="flex justify-center mb-4">
              <QRCode value={`UserId: ${selectedEvent.userId}, UserName: ${userName}, BookingDate: ${moment(selectedEvent.start).format('MMMM Do YYYY')}, Token: ${qrCode}`} />
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

