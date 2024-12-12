import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/auth/forgot-password", {
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
    <div className="forgot-password-container">
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
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
          <label>New Password</label>
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

        <button type="submit" className="forgot-password-button">
          Reset Password
        </button>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;