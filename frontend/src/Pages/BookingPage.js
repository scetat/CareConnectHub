import React, { useEffect, useState } from "react";
import "../css/BookingPage.css";

const BookingPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user?.id;

  const toggleTheme = () => setIsDarkMode((prevMode) => !prevMode);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!userID) {
        alert("User not logged in. Please log in to view your appointments.");
        return;
      }

      try {
        const response = await fetch(`https://careconnecthub-backend.onrender.com/api/appointment/user/${userID}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (data.success) {
          setAppointments(data.appointments);
        } else {
          alert("Failed to fetch appointments.");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        alert("Error loading appointments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userID]);

  const cancelAppointment = async (appointmentId) => {
    try {
      const response = await fetch(`https://careconnecthub-backend.onrender.com/api/appointment/cancel/${appointmentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data.success) {
        alert("Appointment canceled successfully.");
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment._id !== appointmentId)
        );
      } else {
        alert("Failed to cancel the appointment.");
      }
    } catch (error) {
      console.error("Error canceling appointment:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className={`booking-page ${isDarkMode ? "dark-theme" : "light-theme"}`}>
      <div className="theme-toggle-container">
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? "Light" : "Dark"}
        </button>
      </div>
      <h1>Your Bookings</h1>
      {loading ? (
        <p>Loading appointments...</p>
      ) : appointments.length > 0 ? (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Appointment With</th>
              <th>Date</th>
              <th>Time</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>
                  {appointment.CaregiverID?.UserID?.FirstName} {appointment.CaregiverID?.UserID?.LastName}
                </td>
                <td>{appointment.Date}</td>
                <td>{appointment.Time}</td>
                <td>
                  {appointment.AddressID
                    ? `${appointment.AddressID.houseNo}, ${appointment.AddressID.Street}, ${appointment.AddressID.City}, ${appointment.AddressID.State?.StateName}, ${appointment.AddressID.ZipCode}`
                    : "N/A"}
                </td>
                <td>{appointment.StatusID}</td>
                <td>
                  {appointment.StatusID === "pending" && (
                    <button className="cancel-btn" onClick={() => cancelAppointment(appointment._id)}>
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default BookingPage;
