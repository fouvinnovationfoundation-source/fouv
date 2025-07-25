const mongoose = require('mongoose');

// Define section schema
const sectionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['text', 'image', 'importantPoints'],
    required: true
  },
  content: {
    type: String,
    required: true // Can be plain text or image path
  }
});

// Define main program schema
const programSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  tagline: String,
  enrollAsLearnerLink: String, // Renamed from applyLink
  enrollAsMentorLink: String,  // 🆕 New field for mentor enrollment
  coverImage: String,          // 📷 Path to cover image
  heroImage: String,           // 🆕 Path to hero image (next to cover)
  sections: [sectionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Program', programSchema);
