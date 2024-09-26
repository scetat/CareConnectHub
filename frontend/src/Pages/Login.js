import React from 'react';
import '../css/login.css';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import logo from '../Assests/logo.png';

const Login = () => {
  return (
    <div className="login-container">
      <Header />

      <div className="login-logo-container">
        <img
          src={logo}  
          alt="Care Connect Hub Logo"
          className="login-logo"
        />
        <h1>CARE CONNECT HUB</h1>
      </div>

      <form className="login-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="example@you.com"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            className="form-input"
          />
        </div>

        <button type="submit" className="login-button">
          Log In
        </button>
      </form>

      <div className="login-signup-link">
        <p>Don’t Have an Account? <a href="/signup">Sign Up</a></p>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
