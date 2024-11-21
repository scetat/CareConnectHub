import React, { useState, useEffect } from "react";
import "../css/appointments.css";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellationReason, setCancellationReason] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const role = user?.role || "guest";
        const endpoint =
          role === "Caretaker"
            ? "http://localhost:8000/api/appointments"
            : "http://localhost:8000/api/appointments/caregiver";

        const response = await fetch(endpoint, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch appointments.");
        }

        const data = await response.json();
        setAppointments(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancel = async () => {
    if (!cancellationReason.trim()) {
      alert("Please provide a cancellation reason.");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const role = user?.role || "guest";
      const cancelEndpoint =
        role === "Caretaker"
          ? `http://localhost:8000/api/appointments/${selectedAppointment}/cancel`
          : `http://localhost:8000/api/appointments/${selectedAppointment}/caregiver-cancel`;

      const response = await fetch(cancelEndpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cancellationReason }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to cancel appointment.");
      }

      setAppointments((prev) => prev.filter((appointment) => appointment._id !== selectedAppointment));
      alert("Appointment cancelled successfully.");
      setSelectedAppointment(null);
      setCancellationReason("");
    } catch (error) {
      alert("Error cancelling appointment.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const user = JSON.parse(localStorage.getItem("user"));
  const isCaretaker = user?.role === "Caretaker";

  return (
    <div className="appointments">
      <h1>Your Appointments</h1>
      {appointments.length === 0 ? (
        <p className="no-appointments-message">You currently have no appointments scheduled.</p>
      ) : (
        <div className="appointment-cards">
          {appointments.map((appointment) => (
            <div className="appointment-card" key={appointment._id}>
              {isCaretaker && appointment.CaregiverID && (
                <img
                  src={
                    appointment.CaregiverID.PhotoURL
                      ? appointment.CaregiverID.PhotoURL
                      : "https://picsum.photos/100"
                  }
                  alt="Caregiver"
                  className="appointment-image"
                />
              )}
              <div className="appointment-details">
                <h2>
                  {new Date(appointment.Date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h2>
                <p>
                  Time:{" "}
                  {new Date(appointment.Date).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>
                  Address: {appointment.AddressID?.houseNo}, {appointment.AddressID?.Street},{" "}
                  {appointment.AddressID?.City}, {appointment.AddressID?.ZipCode}
                </p>
                {appointment.CaregiverID && (
                  <p>
                    Caregiver Name: {appointment.CaregiverID.UserID.FirstName}{" "}
                    {appointment.CaregiverID.UserID.LastName}
                  </p>
                )}
                <button className="cancel-button" onClick={() => setSelectedAppointment(appointment._id)}>
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedAppointment && (
        <div className="cancel-modal">
          <div className="modal-content">
            <h3>Cancel Appointment</h3>
            <textarea
              placeholder="Provide a reason for cancellation"
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
            ></textarea>
            <div className="modal-actions">
              <button className="confirm-button" onClick={handleCancel}>
                Confirm
              </button>
              <button
                className="cancel-button"
                onClick={() => {
                  setSelectedAppointment(null);
                  setCancellationReason("");
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
