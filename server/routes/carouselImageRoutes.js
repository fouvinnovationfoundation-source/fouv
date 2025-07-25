const express  = require('express');
const router   = express.Router();
const multer   = require('multer');
const fs       = require('fs');
const path     = require('path');
const Carousel = require('../models/CarouselImage');

// ── Multer storage (uploads/carousel) ──────────────────
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = path.join(__dirname, '..', 'uploads', 'carousel');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ── GET  /api/carousel ─────────────────────────────────
router.get('/', async (_req, res) => {
  const imgs = await Carousel.find().sort({ uploadedAt: -1 });
  res.json(
    imgs.map((i) => ({
      ...i.toObject(),
      url: `/uploads/carousel/${i.filename}`, // for frontend
    }))
  );
});

// ── POST /api/carousel (file + meta) ───────────────────
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, subtitle, buttonText, buttonLink } = req.body;
    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });

    const img = await Carousel.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      title,
      subtitle,
      buttonText,
      buttonLink,
    });

    res.status(201).json({
      ...img.toObject(),
      url: `/uploads/carousel/${img.filename}`,
    });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
});

// ── DELETE /api/carousel/:id ───────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const img = await Carousel.findById(req.params.id);
    if (!img) return res.status(404).json({ error: 'Not found' });

    // remove file
    const filePath = path.join(__dirname, '..', 'uploads', 'carousel', img.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await img.deleteOne();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Delete failed', details: err.message });
  }
});

module.exports = router;
