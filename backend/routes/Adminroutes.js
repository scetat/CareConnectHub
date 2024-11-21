const express = require("express");
const Event = require("../models/Event"); // Import your Event model
const router = express.Router();

// Get all events (Admin specific route)
router.get("/", async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events", error: err });
  }
});

// Add a new event (Admin specific route)
router.post("/add", async (req, res) => {
  const { event_name, description, date, time, address, imageUrl } = req.body;

  const newEvent = new Event({
    event_name,
    description,
    date,
    time,
    address,
    imageUrl,
  });

  try {
    const savedEvent = await newEvent.save(); // Save new event
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: "Error adding event", error: err });
  }
});

// Delete an event (Admin specific route)
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id); // Delete event by ID
    if (deletedEvent) {
      res.status(200).json({ message: "Event deleted successfully" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting event", error: err });
  }
});

module.exports = router;
