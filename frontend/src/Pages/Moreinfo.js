import React from 'react';
import '../css/Moreinfo.css';

const Moreinfo = () => {
  //Found First letter of name
  const getInitial = (name) => name.charAt(0);

  return (
    <div className="caregiver-card">
      <div className="card-header">
        <div className="profile-pic">
          <span className="profile-initial">{getInitial("John Doe")}</span>
        </div>
        <div className="profile-details">
          <h3>John Doe</h3>
          <p>Senior Caregiver</p>
        </div>
      </div>
      <div className="card-body">
        <div className="placeholder-image">
          <img
            src=""//Image URL
            alt="Caregiver"
            className="caregiver-main-photo"
          />
        </div>
      </div>
      <div className="card-footer">
        <h4>Information</h4>
        <div className="info-content">
          <p>Experience: 5 years</p>
          <p>Qualification: PSW</p>
          <p>Hourly rate: $27</p>
          <p>Availability: Weekdays 8am - 8pm</p>
          <p>Rating: ★★★★☆</p>
        </div>
        <div className="card-buttons">
          <button className="cancel-button">Cancel</button>
          <button className="book-button">Book Appointment</button>
        </div>
      </div>
    </div>
  );
};

export default Moreinfo;