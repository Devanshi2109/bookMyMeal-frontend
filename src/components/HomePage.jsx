import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomepageCalendar from "./Calendar";

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen min-h-screen overflow-scroll hide-scrollbar bg-slate-100">
      <Navbar />
      <div className="container flex-grow px-4 mx-auto">
        <div className="flex flex-wrap gap-4 my-4 ml-2">
        </div>
        <div className="flex flex-col items-start lg:flex-row">
          <HomepageCalendar />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
