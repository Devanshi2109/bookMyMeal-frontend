import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Calendar from "./Calendar";
import BookAMealBtn from "./BookAMealBtn";
import CancelAMealBtn from "./CancelAMealBtn";
import QuickBookBtn from "./QuickBookBtn";
import ViewBookBtn from "./ViewBookBtn";
import { Toaster } from "react-hot-toast";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-start justify-center flex-grow p-4">
        <div className="flex-1 mt-16 ">
          <Calendar />
        </div>
        <div>
          <QuickBookBtn />
          <ViewBookBtn />
          <BookAMealBtn />
          <CancelAMealBtn />
        </div>
      </div>
      <Toaster />
      <Footer />
    </div>
  );
};

export default HomePage;
