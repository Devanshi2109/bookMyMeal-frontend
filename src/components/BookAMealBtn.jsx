import React, { useState } from "react";

const BookAMealBtn = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [daysSelected, setDaysSelected] = useState(0);

  const handleBookMeal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBookAMealBtn = () => {
    setShowModal(false);
  };

  const handleStartDateChange = (event) => {
    setSelectedStartDate(event.target.value);
    calculateDays(event.target.value, selectedEndDate);
  };

  const handleEndDateChange = (event) => {
    setSelectedEndDate(event.target.value);
    calculateDays(selectedStartDate, event.target.value);
  };

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysSelected(diffDays);
  };

  return (
    <div>
      <button
        className="fixed px-5 py-3 m-2 text-white transform -translate-y-1/2 bg-blue-600 rounded-lg shadow-md hover:bg-navy top-1/4 right-14"
        onClick={handleBookMeal}
      >
        Book a Meal
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="w-full max-w-md p-12 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Book A Meal</h2>
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
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="startDate"
              >
                Start Date:
              </label>
              <input
                type="date"
                id="startDate"
                value={selectedStartDate}
                onChange={handleStartDateChange}
                className="w-full px-4 py-2 border rounded-lg"
                min={new Date().toISOString().split("T")[0]}
                max={
                  selectedEndDate
                    ? selectedEndDate
                    : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
                        .toISOString()
                        .split("T")[0]
                } // Max date is either 90 days from now or the selected end date
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="endDate"
              >
                End Date:
              </label>
              <input
                type="date"
                id="endDate"
                value={selectedEndDate}
                onChange={handleEndDateChange}
                className="w-full px-4 py-2 border rounded-lg"
                min={selectedStartDate ? selectedStartDate : ""}
                max={
                  new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]
                } // Max date is 90 days from now
              />
            </div>
            {daysSelected > 0 && (
              <p className="mb-4">Total Days Selected: {daysSelected}</p>
            )}
            <button
              className="w-full px-5 py-3 m-2 text-white bg-red-600 rounded-lg shadow-md hover:bg-red-800"
              onClick={handleBookAMealBtn}
            >
              Book Meal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAMealBtn;
