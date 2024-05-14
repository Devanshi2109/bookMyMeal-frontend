import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-bootstrap/Modal';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewBookingsModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookings, setBookings] = useState([
    // sample bookings data
    { startDate: '2024-05-10', endDate: '2024-05-15' },
    { startDate: '2024-05-20', endDate: '2024-05-22' },
  ]);

  const handleOpenModal = () => {
    setShowModal(true);
    setShowCalendar(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleView = () => {
    const newDate = new Date(selectedYear, selectedMonth);
    setSelectedDate(newDate);
    setShowCalendar(true); 
  };

  const isBookedDate = (date) => {
    return bookings.some(booking => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      return date >= start && date <= end;
    });
  };

  const calculateBookedDays = () => {
    return bookings.filter(booking => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      const startMonth = start.getMonth();
      const startYear = start.getFullYear();
      return startMonth === selectedMonth && startYear === selectedYear;
    }).length;
  };

  const totalBookedDays = calculateBookedDays();

  return (
    <>
      <button className="absolute px-5 py-3 m-2 text-white transform -translate-y-1/2 bg-blue-600 rounded-lg  hover:bg-blue-900 shadow-md top-1/4 left-12" onClick={handleOpenModal}>
        View Booking
      </button>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>View Bookings</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center">
          <div className="d-flex justify-content-center mb-3">
            <select
              className="mr-2"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
            >
              {Array.from({ length: 5 }, (_, i) => (
                <option key={i} value={new Date().getFullYear() + i}>
                  {new Date().getFullYear() + i}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary mb-3" onClick={handleView}>
            View
          </button>
          {showCalendar && (
            <div>
              <Calendar
                value={selectedDate}
                tileClassName={({ date, view }) =>
                  view === 'month' && isBookedDate(date) ? 'highlight' : null
                }
              />
              <div className="mt-3">Total Booked Days: {totalBookedDays}</div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewBookingsModal;
