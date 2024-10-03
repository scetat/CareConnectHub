const mongoose = require('mongoose');

const CaregiverAvailabilitySchema = new mongoose.Schema({
  CaregiverID: { type: mongoose.Schema.Types.ObjectId, ref: 'Caregiver', required: true },
  DayofWeek: { type: String, required: true },
  StartTime: { type: String, required: true },
  EndTime: { type: String, required: true }
});

const CaregiverAvailability = mongoose.model('CaregiverAvailability', CaregiverAvailabilitySchema);
module.exports = CaregiverAvailability;
