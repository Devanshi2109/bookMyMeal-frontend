import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views, Navigate } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../index.css";
import DetailsCard from "./DetailsCard";
import QuickBookBtn from "./QuickBookBtn";
import BookAMealBtn from "./BookAMealBtn";
import publicHolidays from "../assest/publicHoliday.json";

moment.locale("en", { week: { dow: 1 } });

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
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/api/bookings/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const bookings = response.data;

      if (Array.isArray(bookings)) {
        const formattedEvents = bookings
          .filter((booking) => !booking.canceled) // Filter out canceled events
          .map((booking) => ({
            id: booking.id,
            title: 'Booked',
            start: moment(booking.date).toDate(),
            end: moment(booking.date).toDate(),
            allDay: true,
            isBooked: !booking.canceled,
            token: booking.token,
            userId: booking.userId,
            userName: booking.userName,
            mealId: booking.mealId,
            date: booking.date,
            isRedeemed: booking.isRedeemed,
          }));

        setEvents(formattedEvents);
      } else {
        console.error("Unexpected response format:", bookings);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = "";

    if (moment(event.start).isBefore(moment(), 'day') || event.isRedeemed) {
      backgroundColor = 'bg-gray-500';
    } else {
      backgroundColor = "bg-green-500";
    }

    return {
      className: backgroundColor + " opacity-80 px-2 text-white",
    };
  };

  const isPublicHoliday = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    return publicHolidays.includes(formattedDate);
  };

  const dayPropGetter = (date) => {
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const isCurrentMonth = moment(date).isSame(date, "month");

    if (!isCurrentMonth) {
      return {
        className: "hidden-day",
      };
    }

    if (isWeekend || isPublicHoliday(date)) {
      return {
        className: "bg-gray-300 text-gray-400 opacity-50 cursor-not-allowed",
      };
    }

    return {};
  };

  const CustomToolbar = ({ onNavigate, label, date }) => {
    const goToBack = () => {
      if (moment(date).isAfter(moment(), "month")) {
        onNavigate(Navigate.PREVIOUS);
      }
    };

    const goToNext = () => {
      if (moment(date).isBefore(moment().add(3, "months"), "month")) {
        onNavigate(Navigate.NEXT);
      }
    };

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button type="button" onClick={goToBack}>
            &lt;
          </button>
          <span className="rbc-toolbar-label">
            {moment(date).format("MMMM YYYY")}
          </span>
          <button type="button" onClick={goToNext}>
            &gt;
          </button>
        </span>
      </div>
    );
  };

  const handleBookingSuccess = (result) => {
    fetchBookings();
    console.log("Booking success!", result);
  };

  const handleCancelBookingSuccess = () => {
    fetchBookings();
    console.log("Booking canceled successfully.");
  };

  return (
    <div className="container flex lg:flex-row p-4 mx-auto">
      <div className="w-full lg:w-2/3 lg:ml-4">
        <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        views={{ month: true }}
        defaultView={Views.MONTH}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={(slotInfo) => setDate(slotInfo.start)}
        onNavigate={(newDate) => setDate(newDate)}
        date={date}
        components={{
          toolbar: CustomToolbar,
        }}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={dayPropGetter}
        style={{ height: "400px", width: "100%" }}
      />
    </div>
    <div className="w-full lg:w-1/2 lg:ml-32">
      <div className="flex mb-4">
        <QuickBookBtn onBookingSuccess={handleBookingSuccess} />
        <BookAMealBtn onBookingSuccess={handleBookingSuccess} />
      </div>  
      <DetailsCard
        selectedEvent={selectedEvent}
        cancelBooking={handleCancelBookingSuccess}
        mealId={selectedEvent?.mealId}
      />
    </div>
  </div>

  );
};

export default HomepageCalendar;
