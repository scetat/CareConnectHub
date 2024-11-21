import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/AppointmentPage.css';

const AppointmentPage = () => {
  const location = useLocation();
  const caregiver = location.state?.caregiver;

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    address: '',
    termsAccepted: false,
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.termsAccepted) {
      alert('Appointment confirmed!');
    } else {
      alert('Please accept the terms and conditions.');
    }
  };

  return (
    <div className={`appointment-page ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className="theme-toggle-container">
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? 'Light' : 'Dark'}
        </button>
      </div>
      <h1>Book Appointment</h1>
      <div className="appointment-card">
        <div className="caregiver-info">
          <div className="profile-initial">
            {caregiver && caregiver.UserID.FirstName.charAt(0)}
          </div>
          <div className="caregiver-details">
            <h3>
              {caregiver
                ? `${caregiver.UserID.FirstName} ${caregiver.UserID.LastName}`
                : 'Unknown'}
            </h3>
            <p>Senior Caregiver</p>
          </div>
        </div>
        <form className="appointment-form" onSubmit={handleSubmit}>
          <h3>Appointment Information</h3>
          <label>
            Appointment Date
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Appointment Time
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Address
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
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
