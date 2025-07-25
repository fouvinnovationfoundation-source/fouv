const mongoose = require('mongoose');

const carouselImageSchema = new mongoose.Schema({
  filename:     { type: String, required: true }, // stored file name
  originalName: { type: String },                 // original file name
  title:        { type: String },                 // main heading
  subtitle:     { type: String },                 // sub‑heading
  buttonText:   { type: String },                 // CTA label
  buttonLink:   { type: String },                 // CTA href
  uploadedAt:   { type: Date,   default: Date.now },
});

module.exports = mongoose.model('CarouselImage', carouselImageSchema);
