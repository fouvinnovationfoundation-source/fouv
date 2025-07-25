const express = require('express');
const multer = require('multer');
const path = require('path');
const Program = require('../models/Program');

const router = express.Router();

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/programs/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_'));
  }
});

const upload = multer({ storage });

// Prepare fields for dynamic sections and base images
const sectionFields = Array.from({ length: 30 }).map((_, i) => ({ name: `imageSection${i}` }));
const baseImageFields = [
  { name: 'coverImage', maxCount: 1 },
  { name: 'heroImage', maxCount: 1 },
];

// CREATE Program
router.post('/', upload.fields([...baseImageFields, ...sectionFields]), async (req, res) => {
  try {
    const { title, tagline, enrollAsLearnerLink, enrollAsMentorLink } = req.body;
    const sections = JSON.parse(req.body.sections || '[]');

    const resolvedSections = sections.map(section => {
      if (section.type === 'image' && section.content.startsWith('__file__')) {
        const fieldName = section.content.replace('__file__', '');
        const file = req.files[fieldName]?.[0];
        if (!file) throw new Error(`Missing uploaded file for ${fieldName}`);
        return { type: 'image', content: file.path };
      }
      return section;
    });

    const program = new Program({
      title,
      tagline,
      enrollAsLearnerLink,
      enrollAsMentorLink,
      coverImage: req.files.coverImage?.[0]?.path || '',
      heroImage: req.files.heroImage?.[0]?.path || '',
      sections: resolvedSections
    });

    const saved = await program.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save program' });
  }
});

// UPDATE Program
router.put('/:id', upload.fields([...baseImageFields, ...sectionFields]), async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ message: 'Program not found' });

    const { title, tagline, enrollAsLearnerLink, enrollAsMentorLink } = req.body;
    const sections = JSON.parse(req.body.sections || '[]');

    const resolvedSections = sections.map(section => {
      if (section.type === 'image' && section.content.startsWith('__file__')) {
        const fieldName = section.content.replace('__file__', '');
        const file = req.files[fieldName]?.[0];
        if (!file) throw new Error(`Missing uploaded file for ${fieldName}`);
        return { type: 'image', content: file.path };
      }
      return section;
    });

    program.title = title;
    program.tagline = tagline;
    program.enrollAsLearnerLink = enrollAsLearnerLink;
    program.enrollAsMentorLink = enrollAsMentorLink;

    if (req.files.coverImage?.[0]) {
      program.coverImage = req.files.coverImage[0].path;
    }

    if (req.files.heroImage?.[0]) {
      program.heroImage = req.files.heroImage[0].path;
    }

    program.sections = resolvedSections;

    const updated = await program.save();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed' });
  }
});

// GET ALL
router.get('/', async (req, res) => {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch programs' });
  }
});

// GET BY ID
router.get('/:id', async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ message: 'Not found' });
    res.json(program);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Program.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete' });
  }
});

module.exports = router;
