const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// POST /blog – Add a new blog
router.post('/', async (req, res) => {
  const { title, youtubeUrl } = req.body;
  if (!title || !youtubeUrl) {
    return res.status(400).json({ message: 'Title and YouTube URL required' });
  }

  try {
    const newBlog = new Blog({ title, youtubeUrl });
    await newBlog.save();
    res.status(201).json({ message: 'Blog added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add blog' });
  }
});

// GET /blog – Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch blogs' });
  }
});

// PUT /blog/:id – Update a blog
router.put('/:id', async (req, res) => {
  const { title, youtubeUrl } = req.body;
  if (!title || !youtubeUrl) {
    return res.status(400).json({ message: 'Title and YouTube URL required' });
  }

  try {
    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, youtubeUrl },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Blog not found' });

    res.status(200).json({ message: 'Blog updated successfully', blog: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update blog' });
  }
});

// DELETE /blog/:id – Delete a blog
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Blog not found' });

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete blog' });
  }
});

module.exports = router;
