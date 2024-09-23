import React from 'react';
import '../css/login.css';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 


const Login = () => {
  return (
    <div className="login-container">
      <Header />

      <div className="logo-container">
        <h1>CARE CONNECT HUB</h1>
      </div>

      
      <div className="signup-link">
        <p>Don’t Have an Account? <a href="/signup">Sign Up</a></p>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
