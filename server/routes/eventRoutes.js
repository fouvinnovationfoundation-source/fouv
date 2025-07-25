const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const fs      = require('fs');
const path    = require('path');
const Event   = require('../models/Event');

/* ---------- Multer storage (uploads/events) ---------- */
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = path.join(__dirname, '..', 'uploads', 'events');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

/* ---------- GET all events ---------- */
router.get('/', async (_req, res) => {
  const events = await Event.find().sort({ date: -1 });
  res.json(events.map(e => ({
    ...e.toObject(),
    imageUrl: e.image ? `/uploads/events/${e.image}` : null,
  })));
});

/* ---------- POST create event ---------- */
router.post('/', upload.single('image'), async (req, res) => {
  const { title, date, details, caption, registerLink, recordedSession } = req.body;
  if (!title || !date || !details)
    return res.status(400).json({ error: 'Title, Date, Details required' });

  const event = await Event.create({
    title,
    date,
    details,
    caption,
    registerLink,
    recordedSession,
    image: req.file ? req.file.filename : null,
  });
  res.status(201).json({ ...event.toObject(), imageUrl: event.image ? `/uploads/events/${event.image}` : null });
});

/* ---------- PUT update event ---------- */
router.put('/:id', upload.single('image'), async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ error: 'Event not found' });

  const { title, date, details, caption, registerLink, recordedSession } = req.body;
  Object.assign(event, { title, date, details, caption, registerLink, recordedSession });

  if (req.file) {
    if (event.image) {
      const old = path.join(__dirname, '..', 'uploads', 'events', event.image);
      if (fs.existsSync(old)) fs.unlinkSync(old);
    }
    event.image = req.file.filename;
  }

  await event.save();
  res.json({ ...event.toObject(), imageUrl: event.image ? `/uploads/events/${event.image}` : null });
});

/* ---------- DELETE event ---------- */
router.delete('/:id', async (req, res) => {
  const evt = await Event.findById(req.params.id);
  if (!evt) return res.status(404).json({ error: 'Not found' });

  if (evt.image) {
    const file = path.join(__dirname, '..', 'uploads', 'events', evt.image);
    if (fs.existsSync(file)) fs.unlinkSync(file);
  }
  await evt.deleteOne();
  res.sendStatus(204);
});

module.exports = router;
