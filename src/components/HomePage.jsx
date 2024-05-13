import Navbar from "./Navbar";
// import Footer from "./Footer";
import BookAMealBtn from "./BookAMealBtn";
import CancelAMealBtn from "./CancelAMealBtn";
import QuickBookBtn from "./QuickBookBtn";
import ViewBookBtn from "./ViewBookBtn";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex space-x-4">
        <CancelAMealBtn />
        <BookAMealBtn />
        <ViewBookBtn />
        <QuickBookBtn />
      </div>
    </div>
  );
};

export default HomePage;
