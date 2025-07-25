const mongoose = require('mongoose');

const logoSchema = new mongoose.Schema({
  filename: { type: String, required: true },        // stored file name
  originalName: String,                              // original file name
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Logo', logoSchema);
