import React, { useEffect, useState } from "react";
import "../css/style.css";
import "../css/AdminEvent.css";

const AdminEvent = () => {
  const [eventData, setEventData] = useState({
    event_name: "",
    description: "",
    date: "",
    time: "",
    address: "",
    imageUrl: "",
  });

  const [events, setEvents] = useState([]); // State to hold the fetched events
  const [isDarkTheme, setIsDarkTheme] = useState(false); // State to handle dark theme

  // Toggle dark theme
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  // Fetch events from the admin route
  useEffect(() => {
    fetch("http://localhost:8000/api/admin/events") // Use the new admin route
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []); // Empty dependency array to run on mount

  // Handle the input change for the add event form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle add event
  const handleAddEvent = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/admin/events/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Event added successfully!");
        setEventData({
          event_name: "",
          description: "",
          date: "",
          time: "",
          address: "",
          imageUrl: "",
        });
        // Refresh the events list after adding
        fetchEvents();
      } else {
        alert(data.message || "Error adding event");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  };

  // Handle event deletion
  const handleDeleteEvent = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/admin/events/delete/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) {
        alert("Event deleted successfully!");
        // Refresh the events list after deleting
        fetchEvents();
      } else {
        alert(data.message || "Error deleting event");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  };

  // Fetch events function
  const fetchEvents = () => {
    fetch("http://localhost:8000/api/admin/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  };

  return (
    <div className={isDarkTheme ? "admin-event dark-theme" : "admin-event"}>
      {/* Theme toggle */}
      <button onClick={toggleTheme} id="theme-toggle-btn">
        {isDarkTheme ? "Light" : "Dark"}
      </button>

      <h2 id="add-event-heading">Add Event</h2>
      <form onSubmit={handleAddEvent} id="add-event-form">
        <div>
          <label htmlFor="event_name">Event Name:</label>
          <input
            type="text"
            name="event_name"
            id="event-name-input"
            placeholder="Enter event name"
            value={eventData.event_name}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description-textarea"
            placeholder="Enter event description"
            value={eventData.description}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="text"
            name="date"
            id="date-input"
            placeholder="Enter event date (e.g., 2024-12-31)"
            value={eventData.date}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="time">Time:</label>
          <input
            type="text"
            name="time"
            id="time-input"
            placeholder="Enter event time (e.g., 18:00)"
            value={eventData.time}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            id="address-input"
            placeholder="Enter event address"
            value={eventData.address}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            name="imageUrl"
            id="image-url-input"
            placeholder="Enter image URL"
            value={eventData.imageUrl}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" id="add-event-btn">
          Add Event
        </button>
      </form>

      {/* Display existing events */}
      <h2 id="existing-events-heading">Existing Events</h2>
      <div className="event-list" id="event-list">
        {events.length === 0 ? (
          <p id="no-events-msg">No events available.</p>
        ) : (
          events.map((event) => (
            <div key={event._id} className="event-item" id={`event-${event._id}`}>
              <h3 id={`event-name-${event._id}`}>{event.event_name}</h3>
              <p id={`event-desc-${event._id}`}>{event.description.slice(0, 100)}...</p>
              <img
                id={`event-image-${event._id}`}
                src={event.imageUrl}
                alt={event.event_name}
                style={{ width: "200px" }}
              />
              <button
                id={`delete-event-btn-${event._id}`}
                className="delete"
                onClick={() => handleDeleteEvent(event._id)}
              >
                Delete Event
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminEvent;
