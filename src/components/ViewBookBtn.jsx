import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const ViewBookBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

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
    setEvents([
      
      {
        title: 'Booked',
        start: new Date(2024, date.getMonth(), 10),
        end: new Date(2024, date.getMonth(), 15), 
        allDay: true,
        isBooked: true,
      },
      {
        title: 'Booked',
        start: new Date(2024, date.getMonth(), 20), 
        end: new Date(2024, date.getMonth(), 22), 
        allDay: true,
        isBooked: true,
      },
      
    ]);
    setIsModalOpen(true);
  };

  return (
    <div className="flex justify-center items-center">
      <button
        className="w-40 h-12 px-5 py-3 m-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-navy"
        onClick={handleViewClick}
      >
        View Booking
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-5 border shadow-lg rounded-md w-full max-w-md">
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
