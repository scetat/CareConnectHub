import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Forgot.css";
import logo from "../Assests/logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://careconnecthub-backend.onrender.com/api/auth/forgot-password", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email: email, newPassword: newPassword }),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccess(data.message);
      setError("");
      setTimeout(() => {
        navigate("/login"); // Redirect to login after successful password reset
      }, 2000);
    } else {
      setError(data.error);
      setSuccess("");
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo-container">
        <img src={logo} alt="Logo" className="login-logo" />
      </div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
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
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="New Password"
            className="form-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Reset Password
        </button>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>

      <div className="login-signup-link">
        <p>
          Remembered your password? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
