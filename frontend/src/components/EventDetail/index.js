// src/components/EventDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EventDetail = () => {
  const { id } = useParams(); // Get event ID from URL
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Fetch event details from backend
    fetch(`http://localhost:8000/api/events/${id}`)
      .then((response) => response.json())
      .then((data) => setEvent(data))
      .catch((error) => console.error('Error fetching event details:', error));
  }, [id]);

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <div className="event-detail">
      <img src={event.imageUrl} alt={event.event_name} className="event-detail-image" />
      <h2>{event.event_name}</h2>
      <p>{event.description}</p>
      <h4>Date: {event.date}</h4>
      <h4>Time: {event.time}</h4>
      <h4>Location: {event.address}</h4>
    </div>
  );
};

export default EventDetail;
