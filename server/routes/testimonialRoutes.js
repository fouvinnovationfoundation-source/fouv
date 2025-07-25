
const express  = require('express');
const router   = express.Router();

const multer   = require('multer');
const path     = require('path');
const fs       = require('fs');

const Testimonial = require('../models/Testimonial');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = path.join(__dirname, '..', 'uploads', 'avatars');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get('/', async (_req, res) => {
  try {
    const all = await Testimonial.find().sort({ createdAt: -1 });
    res.json(
      all.map(t => ({
        ...t.toObject(),
        imageUrl: t.image ? `/uploads/avatars/${t.image}` : null,
      }))
    );
  } catch (err) {
    res.status(500).json({ error: 'Failed to load testimonials', details: err.message });
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { quote, name, profession } = req.body;
    if (!quote || !name) {
      return res.status(400).json({ error: 'Quote and Name are required' });
    }

    const imageFilename = req.file ? req.file.filename : null;

    const testimonial = new Testimonial({
      quote,
      name,
      profession,
      image: imageFilename,
    });

    await testimonial.save();

    res.status(201).json({
      ...testimonial.toObject(),
      imageUrl: imageFilename ? `/uploads/avatars/${imageFilename}` : null,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add testimonial', details: err.message });
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { quote, name, profession } = req.body;
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' });

    if (req.file) {
      // Remove old image
      if (testimonial.image) {
        const oldPath = path.join(__dirname, '..', 'uploads', 'avatars', testimonial.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      testimonial.image = req.file.filename;
    }

    testimonial.quote = quote;
    testimonial.name = name;
    testimonial.profession = profession;

    await testimonial.save();

    res.json({
      ...testimonial.toObject(),
      imageUrl: testimonial.image ? `/uploads/avatars/${testimonial.image}` : null,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update testimonial', details: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const t = await Testimonial.findById(req.params.id);
    if (!t) return res.status(404).json({ error: 'Testimonial not found' });

    if (t.image) {
      const filePath = path.join(__dirname, '..', 'uploads', 'avatars', t.image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await t.deleteOne();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete testimonial', details: err.message });
  }
});

module.exports = router;
