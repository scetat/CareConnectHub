import React, { useState, useEffect } from "react";
import "../css/appointments.css";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [sortedAppointments, setSortedAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellationReason, setCancellationReason] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [sortOrder, setSortOrder] = useState("latest"); // New state for sort order

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user.role === "Caregiver") {
          const endpoint = "https://careconnecthub-backend.onrender.com/api/appointments";
          const response = await fetch(endpoint, {
            credentials: "include",
          });

          if (!response.ok) {
            const res = await response.json();
            throw new Error(res.message);
          }

          const data = await response.json();
          setAppointments(data);
          setLoading(false);
        } else {
          throw new Error("Unauthorized! You cannot view this page");
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    const sorted = [...appointments].sort((a, b) => {
      const dateA = new Date(a.Date);
      const dateB = new Date(b.Date);
      if (sortOrder === "latest") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
    setSortedAppointments(sorted);
  }, [appointments, sortOrder]);

  const handleCancel = async () => {
    if (!cancellationReason.trim()) {
      alert("Please provide a cancellation reason.");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const role = user?.role || "guest";
      const cancelEndpoint = `https://careconnecthub-backend.onrender.com/api/appointments/${selectedAppointment}/cancel`;

      const response = await fetch(cancelEndpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cancellationReason }),
        credentials: "include",
      });

      if (!response.ok) {
        const res = await response.json();
        throw new Error(res.message);
      }

      setAppointments((prev) => prev.filter((appointment) => appointment._id !== selectedAppointment));
      alert("Appointment cancelled successfully.");
      setSelectedAppointment(null);
      setCancellationReason("");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="appointments">
      <h1>Your Appointments</h1>

      {/* Sort Dropdown */}
      <div className="sort-container">
        <label htmlFor="sortOrder">Sort by: </label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortChange} className="sort-dropdown">
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {sortedAppointments.length === 0 ? (
        <p className="no-appointments-message">You currently have no appointments scheduled.</p>
      ) : (
        <div className="appointment-cards">
          {sortedAppointments.map((appointment) => (
            <div className="appointment-card" key={appointment._id}>
              <div className="appointment-details">
                <h2>
                  {new Date(appointment.Date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h2>
                {appointment.UserID && (
                  <p>
                    Client Name:{" "}
                    <b>
                      {appointment.UserID.FirstName} {appointment.UserID.LastName}
                    </b>
                  </p>
                )}
                <p>
                  Time:{" "}
                  <b>
                    {new Date(appointment.Date).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </b>
                </p>
                <p>
                  Address:{" "}
                  <b>
                    {appointment.AddressID?.houseNo}, {appointment.AddressID?.Street},{" "}
                    {appointment.AddressID?.City}, {appointment.AddressID?.ZipCode}{" "}
                  </b>
                </p>
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
              <button
                className="cancel-button"
                onClick={() => {
                  setSelectedAppointment(null);
                  setCancellationReason("");
                }}
              >
                Close
              </button>
              <button className="confirm-button-appointments" onClick={handleCancel}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
