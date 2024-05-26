import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1>About Us</h1>
        <p>Rishabh Software was founded in the year 2000 by Mr. & Mrs. Raju Shah with a simple vision: to deliver exceptional value to global customers. From the beginning, our goal has been to empower businesses with world-class software solutions. We achieved this by tapping into local talent in Gujarat, creating a platform for budding software developers to grow and nurture their careers.</p>
        <p>At Rishabh, we provide your business with exceptional enterprise-grade applications and go above and beyond. With over 1200 successful projects and a process-driven mindset, we are committed to your success. Our repeat clientele speaks volumes about our values and ethics in all our dealings, whether it’s software development across web, mobile, analytics, cloud, or through our engineering and BPO services. We believe in doing the best for our clients because WE CARE.</p>
        <p>Our mission is to leverage the latest digital technologies to power the business transformation of our clients, resulting in sustained long-term growth. Our success is defined by our core values of commitment to clients, ethics, and society through sustained collaboration, honesty, and opportunity creation partnerships.</p>
        <p>Our leadership team, including visionary founder Mr. Raju Shah, strategic leader Saumil Shah, and technologist Balaji, has been instrumental in shaping Rishabh’s transformational journey. Their combined experience and expertise have driven our company’s growth and success.</p>
        <p>We have been recognized as a ‘Dream Company to Work For’ and were also bestowed with ‘National Best Employer Brand’ in 2019, ‘Gujarat Best Employer Brand,’ and ‘Employer of the Year’ in 2018. These accolades reflect our commitment to creating a positive and rewarding work environment for our employees.</p>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
