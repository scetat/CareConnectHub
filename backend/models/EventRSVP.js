const mongoose = require('mongoose');

const EventRSVPSchema = new mongoose.Schema({
  EventID: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  RSVPStatusID: { type: mongoose.Schema.Types.ObjectId, ref: 'RSVPStatus', required: true }
});

const EventRSVP = mongoose.model('EventRSVP', EventRSVPSchema);
module.exports = EventRSVP;
