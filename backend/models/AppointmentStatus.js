const mongoose = require('mongoose');

const AppointmentStatusSchema = new mongoose.Schema({
  StatusName: { type: String, required: true, unique: true }
});

const AppointmentStatus = mongoose.model('AppointmentStatus', AppointmentStatusSchema);
module.exports = AppointmentStatus;
