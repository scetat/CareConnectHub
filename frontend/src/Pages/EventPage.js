
import React, { useEffect, useState } from 'react';
import '../css/style.css'


const EventPage = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from backend
  useEffect(() => {
    fetch('http://localhost:8000/api/events') // Use the full backend URL with port
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);
  
  

  return (
    
    <div className="event-page">
      {events.map((event) => (
        <div className="event-card" key={event._id}>
          <img src={event.imageUrl} alt={event.name} className="event-image" />
          <h3>{event.event_name}</h3>
          <p>{event.description}</p>
          <h4> Date : {event.date}</h4>
          <h4>Time : {event.time}</h4>
          <h4>Location : {event.address}</h4>
          
        </div>
      ))}
    </div>
  );
};

export default EventPage;