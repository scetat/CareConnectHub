const mongoose = require('mongoose');

const QualificationSchema = new mongoose.Schema({
  QualificationName: { type: String, required: true, unique: true } 
});

const Qualification = mongoose.model('Qualification', QualificationSchema);
module.exports = Qualification;
