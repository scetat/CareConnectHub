import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Moreinfo.css';
import Caregiverimg from '../Assests/images/C2.jpg'; 

const Moreinfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const caregiver = location.state?.caregiver;

  if (!caregiver) {
    return <p>No caregiver information available.</p>;
  }

  const getInitial = (name) => name.charAt(0);

  const handleCancelClick = () => {
    navigate('/caregiver');
  };

  const handleBookAppointmentClick = () => {
    navigate('/AppointmentPage', { state: { caregiver } });
  };

  const handleFeedbackClick = () => {
    navigate('/feedback', { state: { caregiver } });
  };

  return (
    <div className="caregiver-card">
      <div className="card-header">
        <div className="profile-pic">
          <span className="profile-initial">{getInitial(caregiver.UserID.FirstName)}</span>
        </div>
        <div className="profile-details">
          <h3>{caregiver.UserID.FirstName} {caregiver.UserID.LastName}</h3>
          <p>Senior Caregiver</p>
        </div>
      </div>
      <div className="card-body">
        <div className="placeholder-image">
          <img
            src={Caregiverimg}
            alt="Caregiver"
            className="caregiver-main-photo"
          />
        </div>
      </div>
      <div className="card-footer">
        <h4>Information</h4>
        <div className="info-content">
          <p>Experience: {caregiver.Experience} years</p>
          <p>Qualification: {caregiver.Qualification || "N/A"}</p>
          <p>Hourly rate: ${caregiver.HourlyRate}</p>
          <p>Availability: {caregiver.Availability || "N/A"}</p>
          <p>Rating: {"★".repeat(Math.round(caregiver.Rating))}</p>
        </div>
        <div className="card_buttons">
          <button className="cancel_button" onClick={handleCancelClick}>Cancel</button>
          <button className="book-button" onClick={handleBookAppointmentClick}>Book Appointment</button>
          <button className="feedback-button" onClick={handleFeedbackClick}>Leave Feedback</button>
        </div>
      </div>
    </div>
  );
};

export default Moreinfo;
