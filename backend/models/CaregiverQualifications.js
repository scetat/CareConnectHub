const mongoose = require('mongoose');

const CaregiverQualificationsSchema = new mongoose.Schema({
  CaregiverID: { type: mongoose.Schema.Types.ObjectId, ref: 'Caregiver', required: true },
  QualificationID: { type: mongoose.Schema.Types.ObjectId, ref: 'Qualification', required: true }
});

const CaregiverQualifications = mongoose.model('CaregiverQualifications', CaregiverQualificationsSchema);
module.exports = CaregiverQualifications;
