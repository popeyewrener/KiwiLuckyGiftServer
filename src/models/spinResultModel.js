// src/models/spinResultModel.js (Example using Mongoose)

const mongoose = require('mongoose');

const spinResultSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  spinResult: { type: String, required: true },
  // Add other fields as needed (e.g., timestamp)
});

module.exports = mongoose.model('SpinResult', spinResultSchema);