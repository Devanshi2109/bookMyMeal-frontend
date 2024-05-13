import Navbar from "./Navbar";
import Footer from "./Footer";
import BookAMealBtn from "./BookAMealBtn";
import CancelAMealBtn from "./CancelAMealBtn";
import QuickBookBtn from "./QuickBookBtn";
import ViewBookBtn from "./ViewBookBtn";
import Calendar from './Calendar';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center p-4">
        <div className="flex space-x-4 mb-4">
          <CancelAMealBtn />
          <BookAMealBtn />
          <ViewBookBtn />
          <QuickBookBtn />
        </div>
        <Calendar />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;