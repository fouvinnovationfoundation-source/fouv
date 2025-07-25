import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Companycard from '../components/Companycard';
import ImageCarousel from '../components/ImageCarousel';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { isFuture, isSameDay } from 'date-fns';
import Blog from '../components/Blog';

const API = `${import.meta.env.VITE_API_BASE_URL}/api/events`;

function Home() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        const now = new Date();

        const upcoming = data.filter(
          ev => isFuture(new Date(ev.date)) || isSameDay(new Date(ev.date), now)
        );
        upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));

        if (upcoming.length > 0) {
          setUpcomingEvents(upcoming.slice(0, 3));
        } else {
          const past = data.filter(ev => new Date(ev.date) < now);
          past.sort((a, b) => new Date(b.date) - new Date(a.date));
          setUpcomingEvents(past.slice(0, 1));
        }
      });
  }, []);

  return (
    <div>
      <style>{`
        .vision-card,
        .mission-card {
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          min-height: 320px;
          transition: all 0.5s ease;
          padding: 2rem;
          color: white;
        }
        .vision-card:hover,
        .mission-card:hover {
          background: linear-gradient(to left, #f3662475, #0e1a2b75);
          transform: translateY(-6px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }
        .icon-style {
          font-size: 4rem;
          color: #f36624;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1.2rem;
        }
        @media (max-width: 768px) {
          .icon-style {
            font-size: 3rem;
          }
        }
        .styled-hr {
          border: none;
          height: 2px;
          margin: 4rem auto;
          width: 80%;
          background: linear-gradient(to right, transparent, #f36624, transparent);
          opacity: 0.5;
        }
      `}</style>

      <Navbar />

      <ImageCarousel />

      {/* Vision & Mission Section */}
      <div className="container position-relative" style={{ marginTop: '40px', zIndex: 5 }}>
        <div className="row justify-content-center g-4">
          <div className="col-12 col-md-5">
            <div className="vision-card text-center rounded shadow-sm">
              <div className="icon-style">
                <i className="bi bi-eye"></i>
              </div>
              <h4 className="fw-bold mb-3 fs-3">Our Vision</h4>
              <p className="fs-5">
                To foster a culture of innovation, sustainability, and excellence
                that empowers startups to create meaningful change in society and
                industry.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-5">
            <div className="mission-card text-center rounded shadow-sm">
              <div className="icon-style">
                <i className="bi bi-bullseye"></i>
              </div>
              <h4 className="fw-bold mb-3 fs-3">Our Mission</h4>
              <p className="fs-5">
                To support emerging entrepreneurs by providing strategic guidance,
                technical resources, and a nurturing ecosystem to scale impactful
                innovations.
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className="styled-hr" />

      {/* Events Section */}
      <section className="py-5" style={{ backgroundColor: '#fff' }}>
        <div className="container">
          <h1
            className="fw-bold text-center mb-5"
            style={{ color: '#03518f', fontSize: '3.5rem' }}
          >
            Events
          </h1>

          {upcomingEvents.map(ev => (
            <div key={ev._id} className="row align-items-center mb-5 g-4">
              {/* Image */}
              <div className="col-md-5 text-center">
                {ev.imageUrl && (
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}${ev.imageUrl}`}
                    alt={ev.title}
                    style={{
                      width: '100%',
                      maxWidth: '320px',
                      borderTopRightRadius: '100px',
                      borderBottomLeftRadius: '100px',
                      objectFit: 'cover',
                      height: 'auto'
                    }}
                  />
                )}
                {ev.caption && (
                  <div className="mt-3">
                    <h5 className="fw-bold mb-1" style={{ color: '#0d47a1' }}>
                      {ev.caption.split(',')[0]}
                    </h5>
                    <p className="mb-0" style={{ color: '#03518f', fontSize: '0.95rem' }}>
                      {ev.caption.split(',').slice(1).join(',')}
                    </p>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="col-md-7 text-md-start text-center">
                <h3
                  style={{
                    fontWeight: '900',
                    fontSize: '3.5rem',
                    color: '#f36624',
                    lineHeight: '1.3'
                  }}
                >
                  {ev.title}
                </h3>
                <p className="mt-3 fw-semibold" style={{ color: '#0d47a1' }}>
                  {new Date(ev.date).toLocaleDateString('en-GB', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
                <p style={{ fontSize: '1.1rem' }}>{ev.details}</p>

                {ev.registerLink && (
                  <a
                    href={ev.registerLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary px-4 py-2 mt-2"
                    style={{
                      backgroundColor: '#003366',
                      border: 'none',
                      borderRadius: '999px',
                      fontWeight: 'bold',
                      fontSize: '1rem'
                    }}
                  >
                    Register Now
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      <hr className="styled-hr" />

      <Companycard />
      <hr className="styled-hr" />

      <Blog />

      <TestimonialCarousel />

      <Footer />
    </div>
  );
}

export default Home;
