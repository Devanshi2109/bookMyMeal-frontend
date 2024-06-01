import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Footer from "./Footer";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center p-4 text-white bg-navy">
        <button onClick={() => navigate("/")} className="flex items-center">
          <FaArrowLeft size={24} className="mr-2" />
        </button>
        <h1 className="flex-grow font-bold text-center">
          Terms and Conditions
        </h1>
      </header>
      <main className="flex-grow p-4">
        <ol className="list-decimal list-inside">
          <li>
            <strong>Use of Facilities:</strong> The meal facility is provided
            for the exclusive use of Rishabh Software
            employees/clients/residents and their authorized guests. All users
            must comply with facility rules and regulations posted on-site.
          </li>
          <li>
            <strong>Meal Services:</strong> Meals provided are for consumption
            on the premises only and may not be taken off-site. Users are
            responsible for adhering to any dietary restrictions or allergies
            and should inform staff of any special dietary needs.
          </li>
          <li>
            <strong>Reservation and Cancellation:</strong> Reservations for meal
            services are recommended and subject to availability. Cancellations
            must be made at least 15 hours/days in advance to avoid cancellation
            fees.
          </li>
          <li>
            <strong>Payment:</strong> Payment for meals and services must be
            made in accordance with the facility's payment policy. Unauthorized
            removal of food or non-payment may result in additional charges or
            suspension of meal privileges.
          </li>
          <li>
            <strong>Conduct:</strong> Users are expected to conduct themselves
            in a respectful manner and refrain from disruptive behavior. Any
            damage to facility property caused by misuse or negligence will be
            the responsibility of the user.
          </li>
          <li>
            <strong>Health and Safety:</strong> Users must comply with all
            health and safety protocols, including hand hygiene and social
            distancing measures. Users experiencing symptoms of illness should
            refrain from using the facility to prevent the spread of illness to
            others.
          </li>
          <li>
            <strong>Liability:</strong> Rishabh Software is not liable for any
            loss, damage, or injury incurred on the premises, except in cases of
            gross negligence or willful misconduct. Users participate in
            facility activities at their own risk and are encouraged to obtain
            appropriate insurance coverage.
          </li>
          <li>
            <strong>Termination of Services:</strong> Rishabh Software reserves
            the right to terminate meal services or deny access to the facility
            to any individual who violates these terms and conditions or behaves
            inappropriately.
          </li>
        </ol>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
