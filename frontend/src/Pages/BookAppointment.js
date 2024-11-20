import React, { useState } from 'react';
import '../css/BookAppointment.css';

const BookAppointment = () => {
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [address, setAddress] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleConfirmAppointment = () => {
    if (!acceptedTerms) {
      alert("Please accept the terms to proceed.");
      return;
    }
    // Handle appointment confirmation logic here
    console.log("Appointment Confirmed:", { appointmentDate, appointmentTime, address });
  };

  return (
    <div className="appointment-container">
      <div className="caregiver-info">
        <div className="profile-initial">A</div>
        <div>
          <h2>John Doe</h2>
          <p>Senior Caregiver</p>
        </div>
      </div>
      
      <div className="appointment-form">
        <h3>Appointment Information</h3>
        
        <label>Appointment Date</label>
        <input
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />
        
        <label>Appointment Time</label>
        <input
          type="time"
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          required
        />
        
        <label>Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
          required
        />
        
        <div className="terms">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
          <span>I accept the terms <a href="/terms" target="_blank">Read our T&Cs</a></span>
        </div>
        
        <button
          className="confirm-button"
          onClick={handleConfirmAppointment}
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  );
};

export default BookAppointment;
