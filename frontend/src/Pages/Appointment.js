import React from 'react';
import '../css/appointments.css'; 

const Appointments = () => {
  const appointments = [
    {
      date: "21st December, 2024",
      caregiverName: "John Ogbu",
      time: "8:00am to 10:00am",
      address: "41 Guelph Ave, Kitchener N2A 7K8, ON"
    },
    {
      date: "30th December, 2024",
      caregiverName: "Ruhi Dart",
      time: "12:00pm to 2:00pm",
      address: "78 Queen Street, Waterloo N3R 9K8, ON"
    },
    {
      date: "31st December, 2024",
      caregiverName: "Monika George",
      time: "4:00pm to 6:00pm",
      address: "452 Jenkin Blvd, Cambridge N2I 9U4, ON"
    }
  ];

  return (
    <div className="appointments-container">
      <h2>Your Appointments</h2>
      <div className="appointments-list">
        {appointments.map((appointment, index) => (
          <div key={index} className="appointment-card">
            <div className="appointment-date">{appointment.date}</div>
            <div className="appointment-details">
              <p><strong>Caregiver Name:</strong> {appointment.caregiverName}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
              <p><strong>Address:</strong> {appointment.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
