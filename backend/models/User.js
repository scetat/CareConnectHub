const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Phone: { type: String, required: true },
  Password: { type: String, required: true },
  Role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }, 
  Address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: false } 
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('Password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;