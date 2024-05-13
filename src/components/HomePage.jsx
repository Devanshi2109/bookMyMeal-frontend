import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Calendar from './Calendar';
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="mx-auto flex flex-col justify-center items-center p-4" >
        <Calendar />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
