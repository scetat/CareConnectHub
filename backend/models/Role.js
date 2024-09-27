const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  RoleName: { type: String, required: true, unique: true }
});

const Role = mongoose.model('Role', RoleSchema);
module.exports = Role;
