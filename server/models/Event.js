const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  date:         { type: Date,   required: true },
  details:      { type: String, required: true },
  caption:      { type: String },
  registerLink: { type: String },
  recordedSession: { type: String }, // ✅ New field added
  image:        { type: String },
  createdAt:    { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', eventSchema);
