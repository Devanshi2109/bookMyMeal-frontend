import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pass: '',
    re_pass: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear the error message for the field being changed
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.pass.trim()) {
      errors.pass = 'Password is required';
    }
    if (!formData.re_pass.trim()) {
      errors.re_pass = 'Repeat Password is required';
    } else if (formData.pass.trim() !== formData.re_pass.trim()) {
      errors.re_pass = 'Passwords do not match';
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Form submission logic here
      console.log('Form submitted:', formData);
    }
  };

  return (
    <section className="vh-100" >
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" >
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src="signup-image.jpg" className="img-fluid" alt="Sample image" />
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                          <input type="text" id="form3Example1c" className="form-control"
                            value={formData.name} onChange={handleChange} name="name" />
                          <label className="form-label" htmlFor="form3Example1c">{formData.name ? '' : 'Your Name'}</label>
                          {errors.name && <span className="text-danger">{errors.name}</span>}
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                          <input type="email" id="form3Example3c" className="form-control" 
                            value={formData.email} onChange={handleChange} name="email" />
                          <label className="form-label" htmlFor="form3Example3c">{formData.email ? '' : 'Your Email'}</label>
                          {errors.email && <span className="text-danger">{errors.email}</span>}
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                          <input type="password" id="form3Example4c" className="form-control" 
                            value={formData.pass} onChange={handleChange} name="pass" />
                          <label className="form-label" htmlFor="form3Example4c">{formData.pass ? '' : 'Password'}</label>
                          {errors.pass && <span className="text-danger">{errors.pass}</span>}
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                          <input type="password" id="form3Example4cd" className="form-control" 
                            value={formData.re_pass} onChange={handleChange} name="re_pass" />
                          <label className="form-label" htmlFor="form3Example4cd">{formData.re_pass ? '' : 'Confirm Password'}</label>
                          {errors.re_pass && <span className="text-danger">{errors.re_pass}</span>}
                        </div>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-5">
                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                        <label className="form-check-label" htmlFor="form2Example3">
                          I agree all statements in <a href="#!">Terms of service</a>
                        </label>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Register</button>
                      </div>
                    </form>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
