const mongoose = require('mongoose');

const CaregiverSchema = new mongoose.Schema({
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  Experience: { type: String, required: true },
  HourlyRate: { type: mongoose.Types.Decimal128, required: true },
  Rating: { type: mongoose.Types.Decimal128, default: 0.0 },
  PhotoURL: { type: String, required: false }
});

const Caregiver = mongoose.model('Caregiver', CaregiverSchema);
module.exports = Caregiver;
