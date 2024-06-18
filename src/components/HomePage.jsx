import React from "react";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomepageCalendar from "./Calendar";
import toast from "react-hot-toast";

const HomePage = () => {
  useEffect(() => {
    const loginSuccess = localStorage.getItem("loginSuccess");
    if (loginSuccess) {
      toast.success("Login successful! Redirecting");
      localStorage.removeItem("loginSuccess");
    }
  }, []);
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
