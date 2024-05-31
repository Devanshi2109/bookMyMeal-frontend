// ViewBookBtn.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views, Navigate } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../index.css';

moment.locale('en', { week: { dow: 1 } });

const localizer = momentLocalizer(moment);

const ViewBookBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (isModalOpen) {
      fetchBookings();
    }
  }, [isModalOpen]);

  const fetchBookings = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/api/bookings/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const bookings = response.data;

      if (Array.isArray(bookings)) {
        const formattedEvents = bookings.map((booking) => ({
          title: 'Booked Meal',
          start: moment(booking.date).toDate(),
          end: moment(booking.date).toDate(),
          allDay: true,
          isBooked: booking.canceled === null,
          isCanceled: booking.canceled !== null,
        }));

        setEvents(formattedEvents);
      } else {
        console.error('Unexpected response format:', bookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const getTotalDaysBooked = () => {
    const startOfMonth = moment(date).startOf('month');
    const endOfMonth = moment(date).endOf('month');
    return events.filter(event =>
      moment(event.start).isBetween(startOfMonth, endOfMonth) &&
      event.isBooked
    ).reduce((total, event) => {
      const start = moment.max(moment(event.start), startOfMonth);
      const end = moment.min(moment(event.end), endOfMonth);
      return total + end.diff(start, 'days') + 1;
    }, 0);
  };

  const handleMonthChange = (event) => {
    const newDate = new Date(date.getFullYear(), event.target.value);
    setDate(newDate);
  };

  const handleYearChange = (event) => {
    const newDate = new Date(event.target.value, date.getMonth());
    setDate(newDate);
  };

  const handleViewClick = () => {
    setIsModalOpen(true);
  };

  const CustomToolbar = ({ onNavigate, label, date }) => {
    const goToBack = () => {
      onNavigate(Navigate.PREVIOUS);
    };

    const goToNext = () => {
      onNavigate(Navigate.NEXT);
    };

    const goToToday = () => {
      onNavigate(Navigate.TODAY);
    };

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button type="button" onClick={goToBack}>&lt;</button>
          <button type="button" onClick={goToToday}>Today</button>
          <button type="button" onClick={goToNext}>&gt;</button>
        </span>
        <span className="rbc-toolbar-label">{moment(date).format('MMMM YYYY')}</span>
      </div>
    );
  };

  const dayPropGetter = (date) => {
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    if (isWeekend) {
      return {
        className: 'bg-gray-300 text-gray-400 opacity-50 cursor-not-allowed',
      };
    }
    return {};
  };

  return (
    <div className="flex justify-center items-center">
      <button
        className="w-40 h-12 px-5 py-3 m-2 text-white bg-blue-800 rounded-lg shadow-md hover:bg-blue-900"
        onClick={handleViewClick}
      >
        View Booking
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50" onClick={() => setIsModalOpen(false)}>
          <div className="relative bg-white p-5 border shadow-lg rounded-md w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-0 right-0 mt-4 mr-4 text-2xl text-gray-600"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <div className="flex justify-center mb-4">
              <div>
                <select
                  value={date.getMonth()}
                  onChange={handleMonthChange}
                  className="p-2 border rounded"
                >
                  {moment.months().map((month, idx) => (
                    <option key={idx} value={idx}>{month}</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={date.getFullYear()}
                  onChange={handleYearChange}
                  className="p-2 border rounded"
                >
                  {Array.from({ length: 10 }, (_, i) => moment().year() - 5 + i).map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              views={{ month: true }}
              defaultView={Views.MONTH}
              date={date}
              onNavigate={setDate}
              components={{
                toolbar: CustomToolbar,
              }}
              dayPropGetter={dayPropGetter}
              style={{ height: 400 }}
            />
            <p className="text-center mt-4">Total Days Booked: {getTotalDaysBooked()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBookBtn;
