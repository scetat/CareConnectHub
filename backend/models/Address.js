const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  houseNo: { type: String, required: true },
  Street: { type: String, required: true },
  City: { type: String, required: true },
  ZipCode: { type: String, required: true },
  State: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true }
});

const Address = mongoose.model('Address', AddressSchema);
module.exports = Address;
