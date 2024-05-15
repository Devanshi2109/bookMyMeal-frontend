import React, { useState } from 'react'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform validation
        if (!username || !password) {
            toast.error('Please enter both username and password.');
            return;
        }
        if (!username.trim()) {
            toast.error('Please enter a username.');
            return;
        }
    
        if (!password.trim()) {
            toast.error('Please enter a password.');
            return;
        }
    }

    const handleTogglePassword = () => {
        const passwordField = document.getElementById('password-field');
        passwordField.type === 'password' ? (passwordField.type = 'text') : (passwordField.type = 'password');
      };

  return (
    <div>
      <section className="login-content">
      <div className="login-content-lt"></div>
      <div className="login-content-rt">
        <div className="login-box">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="logo-wrapper">
              <img src="..\src\Components\assests\images\logo.svg" alt="Rishabh Software" />
              <span>Meal Facility</span>
            </div>
            <h3 className="login-head">Sign in to your account</h3>
            <p className="login-text">Enter your credentials to access your account.</p>
            <div className="form-group">
              <label className="control-label">User Name</label>
              <div className="input-addon">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Robert Smith"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="icon-after icon-green">
                  <i className="icon-check"></i>
                </div>
              </div>
              <div className="error-block">{error}</div>
            </div>
            <div className="form-group">
              <label className="control-label">Password</label>
              <div className="input-addon">
                <input
                  id="password-field"
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span onClick={handleTogglePassword} className="icon-eye-close field-icon toggle-password"></span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="form-group mb-0">
                <label className="custom-checkbox mb-0">
                  <span className="checkbox__title">Remember Me</span>
                  <input
                    className="checkbox__input"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="checkbox__checkmark"></span>
                </label>
              </div>
              <div className="form-group mb-0">
                <div className="utility">
                  <p>
                    <a href="#" className="form-link">
                      Forgot Password?
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="form-group btn-container">
              <button type="submit" className="btn btn-xl btn-primary">
                Sign in
              </button>
            </div>
            <div className="form-group mb-0">
            <div className="utility">
              
                  <p>
                    Don't have an account?
                    <a href="#" className="form-link">
                      Register
                    </a>
                  </p>
                  </div>
              </div>
          </form>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Login
