import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/style.css";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkTheme, setDarkTheme] = useState(false); // Add state for dark theme

  // Fetch events from backend
  useEffect(() => {
    fetch("https://careconnecthub-backend.onrender.com/api/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  // Filter events based on the search query
  const filteredEvents = events.filter((event) =>
    event.event_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle dark theme
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <div className={darkTheme ? "dark-theme" : "light-theme"}>
      <div style={{ margin: "20px" }}>
        <h1>Events</h1>
        <input
          className="Search-bar"
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* Toggle Theme Button */}
        <button onClick={toggleTheme} className="toggle-theme-button">
          {darkTheme ? "Light" : "Dark"}
        </button>
      </div>

      {/* Event Cards */}
      <div className="event-page">
        {filteredEvents.map((event) => (
          <div className="event-card" key={event._id}>
            <img src={event.imageUrl} alt={event.event_name} className="event-image" />
            <h3>{event.event_name}</h3>
            <p>{event.description.slice(0, 100)}...</p>
            <Link to={`/event/${event._id}`}>
              <button className="more-details-button">More Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPage;
