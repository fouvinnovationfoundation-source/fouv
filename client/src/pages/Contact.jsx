import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactBg from '../assets/contactbg.png';

function Contact() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const result = await res.json();
      if (result.success) {
        alert('✅ Message sent successfully!');
        form.reset();
      } else {
        alert('❌ Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('❌ An error occurred while sending the message.');
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <section
        className="py-5 text-white text-center"
        style={{
          background: `url(${ContactBg}) center/cover no-repeat`,
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        data-aos="fade-in"
      >
        <div className="bg-dark bg-opacity-50 w-100 py-5">
          <div className="container">
            <h1 className="display-4 fw-bold">Contact FOUV Innovation Foundation</h1>
            <p className="lead mt-3">We’re here to help. Let’s connect!</p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-5">

            {/* Contact Information */}
            <div className="col-lg-6" data-aos="fade-right">
              <h2 className="fw-bold text-primary mb-4">Our Contact Information</h2>
              <p><strong>Registered Address:</strong><br />Baghola, Palwal, Haryana 121102</p>
              <p><strong>Facility Centre:</strong><br />2nd Floor, Delhi Mathura Road, Near ICICI Bank, Prithla, Palwal 121102</p>
              <p><strong>Delhi Office:</strong><br />B1/3, Malviya Nagar, New Delhi 110017</p>
              <p><strong>Contact:</strong><br />+91 85880 79757, +91 999105 9757</p>
              <p><strong>Email:</strong><br /><a href="mailto:connect@fouv.org" className="text-decoration-none text-dark">connect@fouv.org</a></p>
            </div>

            {/* Contact Form */}
            <div className="col-lg-6" data-aos="fade-left">
              <h2 className="fw-bold text-primary mb-4">Get in Touch</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="name" name="name" placeholder="Your name" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input type="email" className="form-control" id="email" name="email" placeholder="Your email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea className="form-control" id="message" name="message" rows="5" placeholder="Your message" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 text-center" data-aos="zoom-in">
        <div className="container">
          <h2 className="fw-bold mb-4">Let’s build something amazing together</h2>
          <a href="/programs" className="btn btn-lg btn-outline-primary">Explore Our Programs</a>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contact;
