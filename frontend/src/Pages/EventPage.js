
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/style.css';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch events from backend
  useEffect(() => {
    fetch("http://localhost:8000/api/events") // Use the full backend URL with port
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  // Filter events based on the search query
  const filteredEvents = events.filter((event) =>
    event.event_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Search Input */}
      <div style={{ margin: '20px' }}>
        <h1>Events</h1>
        <input
          className='Search-bar'
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Event Cards */}
      <div className="event-page">
        {filteredEvents.map((event) => (
          <div className="event-card" key={event._id}>
            <img src={event.imageUrl} alt={event.event_name} className="event-image" />
            <h3>{event.event_name}</h3>
            <p>{event.description.slice(0, 100)}...</p> {/* Show first 150 characters of description */}
            {/* Link to Event Detail Page */}
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
