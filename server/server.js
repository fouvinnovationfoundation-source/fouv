// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static File Routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/avatars', express.static(path.join(__dirname, 'uploads/avatars')));
app.use('/uploads/events', express.static(path.join(__dirname, 'uploads/events')));
app.use('/uploads/icons', express.static(path.join(__dirname, 'uploads/icons')));
app.use('/uploads/programs', express.static(path.join(__dirname, 'uploads/programs')));

// API Routes
app.use('/user', require('./routes/userRoutes'));
app.use('/api/images', require('./routes/carouselImageRoutes'));
app.use('/api/logos', require('./routes/logoRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));

// ✅ Fixed Programs Route (Make sure path is correct)
const programsRoutes = require('./routes/programsRoutes');
app.use('/api/programs', programsRoutes);

app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/blog', require('./routes/blogRoutes'));

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

connectDB();
