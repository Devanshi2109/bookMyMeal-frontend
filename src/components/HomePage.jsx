import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Calendar from './Calendar';
import BookAMealBtn from "./BookAMealBtn";
import CancelAMealBtn from "./CancelAMealBtn";
import QuickBookBtn from "./QuickBookBtn";
import ViewBookBtn from "./ViewBookBtn";

const HomePage = () => {
  return (
    <div >
      <Navbar />
      <div className="flex-grow flex justify-center items-start p-4">
        <div className="flex-1 mt-4">
          <Calendar />
        </div>
        <div>
          <QuickBookBtn />
          <ViewBookBtn />
          <BookAMealBtn />
          <CancelAMealBtn />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;