const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  ClientID: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  CaregiverID: { type: mongoose.Schema.Types.ObjectId, ref: 'Caregiver', required: true },
  Date: { type: Date, required: true },
  StatusID: { type: mongoose.Schema.Types.ObjectId, ref: 'AppointmentStatus', required: true },
  Note: { type: String, required: false },
  AddressID: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true }
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;