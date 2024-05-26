import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Footer from './Footer';

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div>
      <header className="flex items-center p-4 bg-navy text-white">
        <button onClick={() => navigate('/')} className="flex items-center">
          <FaArrowLeft size={24} className="mr-2" />
        </button>
        <h1 className="flex-grow text-center font-bold">Privacy Policy</h1>
      </header>
      <main className="container mx-auto p-4">
        <p>This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our website.</p>
        <h2 className="font-bold mt-4">Information We Collect</h2>
        <p>We collect information from you when you register on our site, place an order, subscribe to our newsletter, respond to a survey, or fill out a form. The information collected may include your name, email address, mailing address, phone number, credit card information, and other details.</p>
        <h2 className="font-bold mt-4">How We Use Your Information</h2>
        <p>We may use the information we collect from you to process transactions, send periodic emails, improve our website, personalize your experience, and administer contests, promotions, surveys, or other site features.</p>
        <h2 className="font-bold mt-4">Information Sharing</h2>
        <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential.</p>
        <h2 className="font-bold mt-4">Security</h2>
        <p>We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.</p>
        <h2 className="font-bold mt-4">Changes to This Privacy Policy</h2>
        <p>We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website.</p>
        <h2 className="font-bold mt-4">Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;