import React, { useState } from 'react';

export const Otp = () => {
  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    if (!otp) {
      setError('Please enter the OTP.');
      return;
    }

    // If validation passes, submit the form
    // Here you can handle the logic to verify the OTP
    // For example, you can make a request to your backend API

    // Assuming a successful verification for demo purposes
    alert('OTP Verified successfully!');
  };

  return (
    <section className="otp-verification-content">
      <div className="otp-verification-box">
        <img src="signup-image.jpg" alt="OTP Verification" className="otp-image" />
        <h3 className="otp-verification-head">OTP Verification</h3>
        <form className="otp-verification-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="control-label">Enter OTP</label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            />
            {error && <div className="error-block">{error}</div>}
          </div>
          <div className="form-group btn-container">
            <button type="submit" className="btn btn-xl btn-primary">
              Verify OTP
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Otp;
