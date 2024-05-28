// CancelAMealBtn.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CancelAMealBtn = ({ mealId, onCancelSuccess }) => {
  const [showModal, setShowModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleCancel = () => {
    setShowModal(true);
  };

  console.log("mealId:", mealId);

  const handleConfirm = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/bookings/${mealId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        toast.success('Booking canceled.');
        onCancelSuccess(mealId); // Notify parent component about the cancellation
        await axios.post('http://localhost:8080/api/notifications', {
          userId: localStorage.getItem('userId'),
          message: 'Your booking has been canceled.',
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } else {
        toast.error('Failed to cancel booking.');
      }
    } catch (error) {
      toast.error('An error occurred while canceling the booking.');
    }
    setShowModal(false);
  };

  return (
    <>
      <button
        className="w-40 h-12 px-5 py-3 m-2 text-white bg-red-600 rounded-lg shadow-md hover:bg-red-800"
        onClick={handleCancel}
        disabled={isDisabled}
      >
        Cancel Meal
      </button>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 text-black">
            <h2 className="text-xl font-bold mb-4">Confirm Cancellation</h2>
            <p>Are you sure you want to cancel this booking?</p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 mr-2 text-white bg-gray-500 rounded hover:bg-gray-700"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-800"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CancelAMealBtn;
