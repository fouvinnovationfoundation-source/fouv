import React, { useEffect } from 'react';
import AOS from 'aos';
import HeroImg from '../assets/about1.png';
import Section1Img from '../assets/about2.png';
import Section2Img from '../assets/about1.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function About() {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div>
      <Navbar />

      {/* Hero Banner */}
      <section
        className="py-5 text-white text-center"
        style={{
          background: `url(${HeroImg}) center/cover no-repeat`,
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        data-aos="fade-in"
      >
        <div className="bg-dark bg-opacity-50 w-100 py-5">
          <div className="container">
            <h1 className="display-4 fw-bold">About Fouv Innovation Foundation</h1>
            <h2 className="lead mt-4" style={{fontSize: '2.0rem' }}>Empowering Innovation. Transforming Ideas into Impact.</h2>
          </div>
        </div>
      </section>

      {/* Section 1 - Who We Are */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center flex-column-reverse flex-lg-row" data-aos="fade-right">
            <div className="col-lg-6 mt-4 mt-lg-0 p-4 rounded" style={{ backgroundColor: '#f0f8ff' }}>
              <h2 className="fw-bold">Who are we</h2>
              <p>
                FOUV is not your typical startup incubator. We are a dynamic ecosystem of entrepreneurs,
                mentors, and investors united by a common goal: empowering startups through hands-on,
                ground-level support.
              </p>
              <h2 className="fw-bold mt-4">Our Mission</h2>
              <p>
                We turn entrepreneurial visions into reality by providing practical, comprehensive support
                at every stage of the startup journey. Our focus is on real-world impact, driving innovation,
                economic growth, and positive social change.
              </p>
            </div>
            <div className="col-lg-6 text-center">
              <img
                src={Section1Img}
                alt="Who We Are"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: '450px', filter: 'brightness(90%)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - What We Do */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center" data-aos="fade-left">
            <div className="col-lg-6 text-center mb-4 mb-lg-0">
              <img src={Section2Img} alt="What We Do" className="img-fluid rounded shadow-sm" />
            </div>
            <div className="col-lg-6 "style={{ backgroundColor: '#f0f8ff' }}>
              <h2 className="fw-bold">Ground Level Approach</h2>
              <p>
                We believe in rolling up our sleeves and working alongside you. Our team provides
                on-site consultations, engages with local communities, and offers practical workshops to
                address real-world business challenges.
              </p>
              <h2 className="fw-bold mt-4">Comprehensive Support</h2>
              <ul>
                <li><strong>Resource Access:</strong> Direct connections to funding opportunities, workspace facilities, and exclusive networking events.</li>
                <li><strong>Collaborative Community:</strong> A vibrant ecosystem fostering peer-to-peer learning and shared experiences.</li>
                <li><strong>Tailored Guidance:</strong> Personalized mentorship from industry experts who provide real-time, practical advice.</li>
                <li><strong>Strategic Partnerships:</strong> Facilitated introductions to potential partners, clients, and service providers crucial for your growth.</li>
                <li><strong>Holistic Support:</strong> End-to-end assistance from ideation and validation to scaling and expansion.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="py-5 text-white" style={{ background: 'linear-gradient(135deg, #276a9e, #f36624)' }}>
        <div className="container" data-aos="fade-up">
          <h2 className="fw-bold text-center mb-4">Our Impact</h2>
          <p className="text-center">
            At FOUV, we're not just advisors – we're your partners in the trenches. Our practical,
            ground-level approach has helped numerous startups navigate challenges, seize opportunities,
            and achieve sustainable success.
          </p>
        </div>
      </section>

      {/* Join Fouv Section */}
      <section className="py-5 bg-light">
        <div className="container text-center" data-aos="zoom-in">
          <h2 className="fw-bold mb-4">Join Fouv</h2>
          <p>
            Whether you're at the idea stage or looking to scale, FOUV is here to provide the tangible
            support you need. Join us and experience the difference that real-world, hands-on support
            can make in your entrepreneurial journey.
          </p>
          <a href="/contact" className="btn btn-lg btn-primary">Get Involved</a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
