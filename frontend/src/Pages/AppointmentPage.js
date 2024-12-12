import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../css/AppointmentPage.css";

const AppointmentPage = () => {
  const location = useLocation();
  const caregiver = location.state?.caregiver;

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    houseNo: "",
    street: "",
    city: "",
    zipCode: "",
    state: "",
    termsAccepted: false,
  });

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userID, setUserID] = useState(null);

  // Fetch logged-in user ID from local storage on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      setUserID(user.id);
    } else {
      alert("User not logged in. Please log in first.");
      window.location = "/login";
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }

    if (!userID) {
      alert("User ID is missing. Please try again.");
      return;
    }

    const payload = {
      UserID: userID,
      CaregiverID: caregiver._id,
      Date: formData.date,
      Time: formData.time,
      houseNo: formData.houseNo,
      street: formData.street,
      city: formData.city,
      zipCode: formData.zipCode,
      stateName: formData.state,
      Note: "",
    };

    try {
      const response = await fetch("https://careconnecthub-backend.onrender.com/api/appointment/create", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        alert("Appointment confirmed!");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Failed to book the appointment. Please try again.");
    }
  };

  return (
    <div className={`appointment-page ${isDarkMode ? "dark-theme" : "light-theme"}`}>
      <div className="theme-toggle-container">
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? "Light" : "Dark"}
        </button>
      </div>
      <h1>Book Appointment</h1>
      <div className="appointment-card">
        <form className="appointment-form" onSubmit={handleSubmit}>
          <div className="caregiver-info">
            <div className="profile-initial">{caregiver && caregiver.UserID.FirstName.charAt(0)}</div>
            <div className="caregiver-details">
              <h3>{caregiver ? `${caregiver.UserID.FirstName} ${caregiver.UserID.LastName}` : "Unknown"}</h3>
              <p>Senior Caregiver</p>
            </div>
          </div>
          <h3>Appointment Information</h3>
          <label>
            Appointment Date
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </label>
          <label>
            Appointment Time
            <input type="time" name="time" value={formData.time} onChange={handleChange} required />
          </label>
          <h3>Address Information</h3>
          <label>
            House Number
            <input type="text" name="houseNo" value={formData.houseNo} onChange={handleChange} required />
          </label>
          <label>
            Street
            <input type="text" name="street" value={formData.street} onChange={handleChange} required />
          </label>
          <label>
            City
            <input type="text" name="city" value={formData.city} onChange={handleChange} required />
          </label>
          <label>
            Zip Code
            <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
          </label>
          <label>
            State
            <input type="text" name="state" value={formData.state} onChange={handleChange} required />
          </label>
          <div className="terms">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            <span>
              I accept the terms <a href="/terms">Read our T&Cs</a>
            </span>
          </div>
          <button type="submit" className="confirm-button">
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentPage;
