const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }

  // Setup transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APPPWD
    }
  });

  // Email options
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.GMAIL_USER,
    subject: 'New Contact Form Message - FOUV Website',
    html: `
      <h2>Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Email Error:', error);
    return res.status(500).json({ success: false, error: 'Failed to send email.' });
  }
});

module.exports = router;
