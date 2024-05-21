import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-8 text-gray-300 bg-blue-900 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-lg font-semibold">Rishabh Software</p>
            <p className="text-sm">
              Plot 66, Padra Road, beside Sigil India, Atladara, Vadodara,
              Gujarat 390012
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0">
            <Link to="/terms" className="mr-4 hover:text-white">
              Terms &amp; Conditions
            </Link>
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="pt-4 mt-8 border-t border-gray-700 text-center md:text-left">
          <p className="text-sm">
            &copy; 2024 Rishabh Software. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
