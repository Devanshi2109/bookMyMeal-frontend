// HomepageCalendar.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views, Navigate } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../index.css';
import DetailsCard from './DetailsCard';
import QuickBookBtn from './QuickBookBtn'; // Import QuickBookBtn component
import publicHolidays from "../assest/publicHoliday.json";
import BookAMealBtn from './BookAMealBtn';

moment.locale('en', { week: { dow: 1 } });

const localizer = momentLocalizer(moment);

const HomepageCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, [date]);

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
        const filteredEvents = bookings.filter((booking) => {
          const bookingDate = moment(booking.date);
          return bookingDate.isBetween(moment(), moment().add(90, 'days'), 'day', '[]');
        });

        const formattedEvents = filteredEvents.map((booking) => ({
          title: 'Booked Meal',
          start: moment(booking.date).toDate(),
          end: moment(booking.date).toDate(),
          allDay: true,
          isBooked: booking.canceled === null,
          isCanceled: booking.canceled !== null,
          token: booking.token,
          userId: booking.userId,
          userName: booking.userName,
        }));

        setEvents(formattedEvents);
      } else {
        console.error('Unexpected response format:', bookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = '';

    if (event.isCanceled) {
      backgroundColor = 'bg-red-500';
    } else if (moment(event.start).isBefore(moment(), 'day')) {
      backgroundColor = 'bg-gray-500';
    } else {
      backgroundColor = 'bg-green-500';
    }

    return {
      className: backgroundColor + ' opacity-80 px-2 text-white',
    };
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

  const CustomToolbar = ({ onNavigate, label, date }) => {
    const goToBack = () => {
      if (moment(date).isAfter(moment(), 'month')) {
        onNavigate(Navigate.PREVIOUS);
      }
    };

    const goToNext = () => {
      if (moment(date).isBefore(moment().add(3, 'months'), 'month')) {
        onNavigate(Navigate.NEXT);
      }
    };

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button type="button" onClick={goToBack}>&lt;</button>
          <span className="rbc-toolbar-label">{moment(date).format('MMMM YYYY')}</span>
          <button type="button" onClick={goToNext}>&gt;</button>
        </span>
      </div>
    );
  };

  // Define the handleBookingSuccess function here
  const handleBookingSuccess = (result) => {
    // Update the UI or fetch updated data after successful booking
    console.log("Booking success!", result);
    // Assuming you want to fetch updated bookings after successful booking
    fetchBookings();
  };

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="flex flex-col lg:flex-row w-full lg:w-3/4">
        <div className="w-full lg:w-2/3">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            views={{ month: true }}
            defaultView={Views.MONTH}
            onSelectEvent={handleSelectEvent}
            onNavigate={(newDate) => setDate(newDate)}
            date={date}
            components={{
              toolbar: CustomToolbar,
            }}
            eventPropGetter={eventStyleGetter}
            dayPropGetter={dayPropGetter}
            style={{ height: '400px', width: '100%' }} // Adjust the height and width here
          />
        </div>
        <div className="w-full lg:w-1/3 mt-4 lg:mt-0 lg:ml-4">
          <QuickBookBtn onBookingSuccess={handleBookingSuccess} />
          <BookAMealBtn onBookingSuccess={handleBookingSuccess} />
          <DetailsCard selectedEvent={selectedEvent} />
        </div>
      </div>
    </div>
  );
};

export default HomepageCalendar;
