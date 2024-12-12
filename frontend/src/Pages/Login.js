import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import logo from "../Assests/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode((prevMode) => !prevMode);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://careconnecthub-backend.onrender.com/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("isLoggedIn", data.user.isLoggedIn);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "Admin") {
        window.location = "/admin";
      } else {
        window.location = "/";
      }
    } else {
      setError(data.message);
    }
  };

  return (
    <div className={`login-container ${isDarkMode ? "dark-theme" : "light-theme"}`}>
      <div className="theme-toggle-container">
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? "Light" : "Dark"}
        </button>
      </div>

      <div className="login-logo-container">
        <img src={logo} alt="Care Connect Hub Logo" className="login-logo" />
        <h1>SIGN IN</h1>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@you.com"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p>
            <a href="/forgot-passwprd ">Forgot Password? </a>
          </p>
        </div>

        <button type="submit" className="login-button">
          Log In
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>

      <div className="login-signup-link">
        <p>
          Don’t Have an Account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
