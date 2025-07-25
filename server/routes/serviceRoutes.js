const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Service = require('../models/Service');

// Set up Multer for icon upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '..', 'uploads', 'icons');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// GET all services
router.get('/', async (_req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(
      services.map(s => ({
        ...s.toObject(),
        iconUrl: s.icon ? `/uploads/icons/${s.icon}` : null,
      }))
    );
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// POST add service
router.post('/', upload.single('icon'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const icon = req.file ? req.file.filename : null;

    const service = new Service({ title, description, icon });
    await service.save();
    res.status(201).json({ ...service.toObject(), iconUrl: icon ? `/uploads/icons/${icon}` : null });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add service' });
  }
});

// PUT update service
router.put('/:id', upload.single('icon'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });

    // Delete old icon if new one is uploaded
    if (req.file && service.icon) {
      const oldPath = path.join(__dirname, '..', 'uploads', 'icons', service.icon);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      service.icon = req.file.filename;
    }

    service.title = title;
    service.description = description;
    await service.save();

    res.json({ ...service.toObject(), iconUrl: service.icon ? `/uploads/icons/${service.icon}` : null });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update service' });
  }
});

// DELETE service
router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });

    if (service.icon) {
      const filePath = path.join(__dirname, '..', 'uploads', 'icons', service.icon);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await service.deleteOne();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

module.exports = router;
