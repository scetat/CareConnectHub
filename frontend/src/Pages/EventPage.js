import React from 'react';
import '../css/style.css'
import Header from '../components/Header';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard/EventCard'; 
import events from '../data/eventData';// Import your EventCard component

const EventPage = () => {
  return (
    <div className="event-page">
      <h1>Upcoming Events</h1>
      <div className="event-list">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventPage;