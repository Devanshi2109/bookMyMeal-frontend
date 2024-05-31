import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-2 text-gray-300 bg-blue-900 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-2 md:mb-0">
            <p className="text-lg font-bold">Rishabh Software</p>
            <p className="text-sm">
              Plot 66, Padra Road, beside Sigil India, Atladara, Vadodara,
              Gujarat 390012
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center mt-2 md:mt-0">
            <Link to="/terms" className="mr-4 hover:text-white">
              Terms &amp; Conditions
            </Link>
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between mt-8">
        <p className="text-xs">
            &copy; 2024 Rishabh Software. All rights reserved.
          </p>
          <div className="text-center md:text-left ">
            <div className="flex justify-center md:justify-end space-x-4 mt-2">
              <a href="https://www.facebook.com/rishabhsoft?mibextid=ZbWKwL" className="hover:text-white">
                <FaFacebook size={20} />
              </a>
              <a href="https://x.com/RishabhSoft?t=NPHG6G2RYIRMWcz-Kd5ByA" className="hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="https://www.instagram.com/rishabhsoft" className="hover:text-white">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/rishabh-software/" className="hover:text-white">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
