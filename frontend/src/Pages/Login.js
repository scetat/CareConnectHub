import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import logo from "../Assests/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      navigate("/");
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="login-container">
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
