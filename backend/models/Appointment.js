const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  CaregiverID: { type: mongoose.Schema.Types.ObjectId, ref: 'Caregiver', required: true },
  Date: { type: String, required: true },
  Time: { type: String, required: true },
  StatusID: { 
    type: String, 
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
    required: true 
  },
  Note: { type: String, default: '' },
  AddressID: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true }
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;
