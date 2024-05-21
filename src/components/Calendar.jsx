import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views, Navigate } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../index.css'; // Custom CSS for additional styling

moment.locale('en', { week: { dow: 1 } }); // Set the start of the week to Monday

const localizer = momentLocalizer(moment);

const CalendarComponent = ({ viewMode }) => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([
    
    {
      title: 'Booked Meal',
      start: moment().subtract(1, 'days').toDate(),
      end: moment().subtract(1, 'days').toDate(),
      allDay: true,
      isBooked: true,
    },
    
    {
      title: 'Booking',
      start: moment().add(1, 'days').toDate(),
      end: moment().add(1, 'days').toDate(),
      allDay: true,
      isBooked: false,
    },
    
  ]);

  const handleSelectSlot = ({ start }) => {
    console.log("Selected Date: ", start);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = '';
    
    if (moment(event.start).isBefore(moment(), 'day')) {
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
    const isHoliday = false; // Add logic to determine if the date is a public holiday
    if (isWeekend || isHoliday) {
      return {
        className: "bg-gray-200 text-gray-500 opacity-50 cursor-not-allowed",
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
      if (moment(date).isBefore(moment().add(2, 'months'), 'month')) {
        onNavigate(Navigate.NEXT);
      }
    };

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button type="button" onClick={goToBack} disabled={moment(date).isSameOrBefore(moment(), 'month')}>&lt;</button>
          <span className="rbc-toolbar-label">{moment(date).format('MMMM YYYY')}</span>
          <button type="button" onClick={goToNext} disabled={moment(date).isSameOrAfter(moment().add(3, 'months'), 'month')}>&gt;</button>
        </span>
      </div>
    );
  };

  return (
    <div className={`relative ${viewMode === 'homepage' ? 'w-full md:w-3/4 lg:w-1/2' : 'w-full'} max-w-4xl mx-auto md:ml-0 lg:ml-12`}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        views={{ month: true }}
        defaultView={Views.MONTH}
        onSelectSlot={handleSelectSlot}
        onNavigate={(newDate) => setDate(newDate)}
        date={date}
        components={{
          toolbar: CustomToolbar,
        }}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={dayPropGetter}
        style={{ height: '500px' }}
      />
    </div>
  );
};

const HomepageCalendar = () => {
  return <CalendarComponent viewMode="homepage" />;
};

const ViewBookingCalendar = () => {
  return <CalendarComponent viewMode="booking" />;
};

export default HomepageCalendar;
export { ViewBookingCalendar };
