import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomepageCalendar from "./Calendar";
import BookAMealBtn from "./BookAMealBtn";
import CancelAMealBtn from "./CancelAMealBtn";
import QuickBookBtn from "./QuickBookBtn";
import ViewBookBtn from "./ViewBookBtn";
import DetailsCard from "./DetailsCard"; 

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 my-8">
          <ViewBookBtn />
          <QuickBookBtn />
          <div className="w-full sm:w-auto"></div>
          <CancelAMealBtn />
          <BookAMealBtn />
        </div>
        <div className="flex flex-col lg:flex-row items-start">
          <HomepageCalendar /> 
          <DetailsCard
            title="Meal of the Day"
            description="No Booking found for selected Date!"
            menuItems={["Tuvar Ringan", "Dum Aloo", "Kadhi", "Khichadi", "Tawa Chapati", "Butter Milk"]}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
