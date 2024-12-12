import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    event_name: "",
    description: "",
    date: "",
    time: "",
    address: "",
    imageUrl: "",
  });

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://careconnecthub-backend.onrender.com/api/events");
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  // Add event
  const addEvent = async () => {
    try {
      const response = await fetch("https://careconnecthub-backend.onrender.com/api/events/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        const addedEvent = await response.json();
        setEvents((prevEvents) => [...prevEvents, addedEvent]);
        setNewEvent({
          event_name: "",
          description: "",
          date: "",
          time: "",
          address: "",
          imageUrl: "",
        }); // Clear form
      } else {
        console.error("Failed to add event");
      }
    } catch (err) {
      console.error("Error adding event:", err);
    }
  };

  // Delete event
  const deleteEvent = async (id) => {
    try {
      const response = await fetch(`https://careconnecthub-backend.onrender.com/api/events/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
      } else {
        console.error("Failed to delete event");
      }
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Add Event Section */}
      <div>
        <h2>Add Event</h2>
        <input
          type="text"
          value={newEvent.event_name}
          onChange={(e) => setNewEvent({ ...newEvent, event_name: e.target.value })}
          placeholder="Event Name"
        />
        <textarea
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          placeholder="Event Description"
        ></textarea>
        <input
          type="text"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        />
        <input
          type="text"
          value={newEvent.time}
          onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
        />
        <input
          type="text"
          value={newEvent.address}
          onChange={(e) => setNewEvent({ ...newEvent, address: e.target.value })}
          placeholder="Event Address"
        />
        <input
          type="text"
          value={newEvent.imageUrl}
          onChange={(e) => setNewEvent({ ...newEvent, imageUrl: e.target.value })}
          placeholder="Image URL"
        />
        <button onClick={addEvent}>Add Event</button>
      </div>

      {/* Events List Section */}
      <div>
        <h2>Events</h2>
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              <img src={event.imageUrl} alt={event.event_name} width="100" />
              <h3>{event.event_name}</h3>
              <p>{event.description}</p>
              <p>
                {event.date} at {event.time}
              </p>
              <p>{event.address}</p>
              <button onClick={() => deleteEvent(event._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
