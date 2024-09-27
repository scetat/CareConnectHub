const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema({
  StateName: { type: String, required: true },
  Country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true } 
});

const State = mongoose.model('State', StateSchema);
module.exports = State;
