const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  EventName: { type: String, required: true },
  Description: { type: String, required: true },
  Date: { type: Date, required: true },
  Time: { type: String, required: true },
  AddressID: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  Capacity: { type: Number, required: true },
  PhotoURL: { type: String, required: false }
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
