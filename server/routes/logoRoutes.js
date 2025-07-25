const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const Logo    = require('../models/Logo');

// ── Multer storage config ───────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '..', 'uploads', 'logos');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ── GET all logos ───────────────────────────────────────
router.get('/', async (_req, res) => {
  const logos = await Logo.find().sort({ uploadedAt: -1 });
  // prepend static path so frontend can render
  const mapped = logos.map(l => ({
    ...l.toObject(),
    url: `/uploads/logos/${l.filename}`,
  }));
  res.json(mapped);
});

// ── POST upload new logo ────────────────────────────────
router.post('/', upload.single('logo'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const newLogo = await Logo.create({
    filename: req.file.filename,
    originalName: req.file.originalname,
  });
  res.status(201).json({
    _id: newLogo._id,
    url: `/uploads/logos/${newLogo.filename}`,
    originalName: newLogo.originalName,
  });
});

// ── DELETE logo ────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  const logo = await Logo.findById(req.params.id);
  if (!logo) return res.status(404).json({ error: 'Logo not found' });

  // remove file
  const filePath = path.join(__dirname, '..', 'uploads', 'logos', logo.filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  await logo.deleteOne();
  res.sendStatus(204);
});

module.exports = router;
