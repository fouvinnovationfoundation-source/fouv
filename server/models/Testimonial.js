const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  quote:     { type: String, required: true },
  name:      { type: String, required: true },
  profession:{ type: String },                 // updated from 'title' to 'profession'
  image:     { type: String },                 // profile image filename (uploaded)
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
