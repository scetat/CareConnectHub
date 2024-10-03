const mongoose = require('mongoose');

const RSVPStatusSchema = new mongoose.Schema({
  StatusName: { type: String, required: true, unique: true }
});

const RSVPStatus = mongoose.model('RSVPStatus', RSVPStatusSchema);
module.exports = RSVPStatus;
