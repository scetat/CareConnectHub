import React from 'react';
import '../../css/style.css'

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <div className="event-card__image">
        <img src={event.image} alt={event.title} />
      </div>
      <div className="event-card__content">
        <h3>{event.title}</h3>
        <p>{event.description}</p>
      </div>
    </div>
  );
};

export default EventCard;
