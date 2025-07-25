const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const nodemailer = require('nodemailer');
const User = require('../models/User');

// -------------------- 🔑 LOGIN ROUTE -------------------- //
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid email or password' });

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// -------------------- 👤 CREATE USER ROUTE -------------------- //
router.post('/create', async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: 'Name, email, and password are required' });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User created', userId: newUser._id });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create user' });
  }
});

// -------------------- 👥 GET ALL USERS (NO PASSWORD) -------------------- //
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// -------------------- ❌ DELETE USER -------------------- //
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

// -------------------- 🔐 FORGOT PASSWORD -------------------- //
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,       // ⬅️ use GMAIL_USER
    pass: process.env.GMAIL_APPPWD      // ⬅️ use GMAIL_APPPWD
  }
});
// 📩 Send reset password link
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email)
    return res.status(400).json({ message: 'Email is required' });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'Email not found' });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${user._id}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Your Password',
      html: `<p>Hi ${user.name},</p>
             <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
             <p>If you did not request this, you can ignore this email.</p>`
    });

    res.status(200).json({ message: 'Reset link sent to your email' });
  } catch (err) {
    console.error('Email sending failed:', err);
    res.status(500).json({ message: 'Failed to send reset email' });
  }
});

// 🔁 Reset password using the reset link
router.post('/reset-password/:id', async (req, res) => {
  const { password } = req.body;

  if (!password || password.length < 6)
    return res.status(400).json({ message: 'Password must be at least 6 characters' });

  try {
    const hashed = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(req.params.id, { password: hashed });

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to reset password' });
  }
});

module.exports = router;
