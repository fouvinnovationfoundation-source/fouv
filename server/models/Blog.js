const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  youtubeUrl: { type: String, required: true },
}, {
  timestamps: true // adds createdAt and updatedAt
});

module.exports = mongoose.model('Blog', blogSchema);
