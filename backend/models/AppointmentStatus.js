const mongoose = require('mongoose');

const AppointmentStatusSchema = new mongoose.Schema({
  StatusName: { 
    type: String, 
    required: true, 
    enum: ['pending', 'confirmed', 'canceled'], 
    default: 'pending' 
  }
});

const AppointmentStatus = mongoose.model('AppointmentStatus', AppointmentStatusSchema);
module.exports = AppointmentStatus;
