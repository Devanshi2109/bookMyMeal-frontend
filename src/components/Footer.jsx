import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-8 text-gray-300 bg-blue-900">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">Rishabh Software</p>
            <p className="text-sm">
              Plot 66, Padra Road, beside Sigil India, Atladara, Vadodara,
              Gujarat 390012
            </p>
          </div>
          <div className="flex items-center">
            <Link to="/terms" className="mr-4 hover:text-white">
              Terms &amp; Conditions
            </Link>
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="pt-4 mt-8 border-t border-gray-700">
          <p className="text-sm">
            &copy; 2024 Rishabh Software. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
