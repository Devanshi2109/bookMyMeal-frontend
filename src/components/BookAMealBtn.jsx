import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import useAuthStore from "../app/authStore";

const BookAMealBtn = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [daysSelected, setDaysSelected] = useState(0);
  const [bookingType, setBookingType] = useState("single");
  const userId = useAuthStore((state) => state.userId);

  const handleBookMeal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBookAMealBtn = async () => {
    const bookingData = {
      userId,
      startDate: selectedStartDate,
      endDate: bookingType === "single" ? selectedStartDate : selectedEndDate,
    };
    console.log(bookingData);
    const apiEndpoint =
      bookingType === "single"
        ? "http://localhost:8080/api/meals"
        : "http://localhost:8080/api/bookings";

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        toast.success("Meal booked successfully!");
        setShowModal(false); // Close the modal after successful booking
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Booking failed");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
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
    if (bookingType === "single") {
      setDaysSelected(1);
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    setDaysSelected(diffDays);
  };

  const handleBookingTypeChange = (event) => {
    setBookingType(event.target.value);
    if (event.target.value === "single") {
      setSelectedEndDate("");
      setDaysSelected(1);
    } else {
      calculateDays(selectedStartDate, selectedEndDate);
    }
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <button
        className="w-40 h-12 px-5 py-3 m-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-navy"
        onClick={handleBookMeal}
      >
        Book Meal
      </button>
      {showModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="w-full max-w-md p-12 bg-white rounded-lg shadow-md ">
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
              <label className="block mb-2 font-bold text-gray-700">
                Booking Type:
              </label>
              <div>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="bookingType"
                    value="single"
                    checked={bookingType === "single"}
                    onChange={handleBookingTypeChange}
                  />
                  Single
                </label>
                <label>
                  <input
                    type="radio"
                    name="bookingType"
                    value="multiple"
                    checked={bookingType === "multiple"}
                    onChange={handleBookingTypeChange}
                  />
                  Multiple
                </label>
              </div>
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
                  bookingType === "single"
                    ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
                        .toISOString()
                        .split("T")[0]
                    : selectedEndDate
                    ? selectedEndDate
                    : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
                        .toISOString()
                        .split("T")[0]
                }
              />
            </div>
            <div className="mb-4">
              <label
                className={`block mb-2 font-bold text-gray-700 ${
                  bookingType === "single" ? "text-gray-400" : ""
                }`}
                htmlFor="endDate"
              >
                End Date:
              </label>
              <input
                type="date"
                id="endDate"
                value={selectedEndDate}
                onChange={handleEndDateChange}
                className={`w-full px-4 py-2 border rounded-lg ${
                  bookingType === "single" ? "bg-gray-200" : ""
                }`}
                min={selectedStartDate ? selectedStartDate : ""}
                max={
                  new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]
                }
                disabled={bookingType === "single"}
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
