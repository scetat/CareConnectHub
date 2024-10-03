const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Client = mongoose.model('Client', ClientSchema);
module.exports = Client;
