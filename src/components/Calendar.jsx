import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    return (
        <div className="calendar-container mx-auto ml-4 mt-10">
            <div className="calendar-container mx-auto transform scale-75">
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl 2xl:max-w-5xl bg-white bg-opacity-90 border border-gray-300 font-sans leading-normal shadow-md rounded-lg p-4 transition-colors duration-200 h-auto sm:h-auto md:h-auto lg:h-auto xl:h-auto 2xl:h-auto text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"
                    
                />
            </div>
        </div>
    );
};

export default CalendarComponent;
