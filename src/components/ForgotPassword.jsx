import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }

    // Your logic for sending reset password instructions
    // For demonstration purposes, we'll simulate a successful request
    setTimeout(() => {
      toast.success('Password reset instructions have been sent to your email.');
    }, 1000);
  };

  return (
    <section className="forgot-password-content">
      <div className="forgot-password-content-lt">
        <img src="signup-image.jpg" className="img-fluid" alt="Forgot Password" />
      </div>
      <div className="forgot-password-content-rt">
        <div className="forgot-password-box">
          <form className="forgot-password-form" onSubmit={handleSubmit}>
            <h3 className="forgot-password-head">Forgot Your Password?</h3>
            <p className="forgot-password-text">Enter your email address to reset your password.</p>
            <div className="form-group">
              <label className="control-label">Email Address</label>
              <input
                className="form-control"
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group btn-container">
              <button type="submit" className="btn btn-xl btn-primary">
                Reset Password
              </button>
            </div>
            <div className="form-group mb-0">
              <div className="utility">
                <p>
                  Remember your password? <a href="#" className="form-link">Sign in</a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Toaster position="top-right" /> {/* Toaster container */}
    </section>
  );
};

export default ForgotPassword;
