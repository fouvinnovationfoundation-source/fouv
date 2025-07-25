import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Programs() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/programs`)
      .then(res => res.json())
      .then(setPrograms)
      .catch(err => console.error('Failed to fetch programs:', err));
  }, []);

  const styles = `
    .section-programs {
      background: #fff;
      padding: 4rem 1rem;
    }

    .title-main {
      font: 800 2.5rem 'Poppins', sans-serif;
      color: #0e1a2b;
      text-align: center;
    }

    .subtitle {
      font: 500 1.1rem 'Poppins', sans-serif;
      color: #555;
      text-align: center;
      margin-bottom: 3rem;
    }

    .program-row {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 4rem;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 14px rgba(0,0,0,0.1);
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .program-row:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    }

    .program-row.reverse {
      flex-direction: row-reverse;
    }

    .program-image {
      width: 50%;
      height: 100%;
    }

    .program-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .program-info {
      width: 50%;
      background: #fefefe;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .program-title {
      font: 700 2rem 'Poppins', sans-serif;
      color: #0e1a2b;
      margin-bottom: 0.5rem;
    }

    .program-tagline {
      font: 500 1.2rem 'Poppins', sans-serif;
      color: #f36624;
      margin-bottom: 1rem;
    }

    .program-description {
      font: 400 1rem 'Poppins', sans-serif;
      color: #333;
    }

    .apply-btn {
      margin-top: 1.5rem;
      border: none;
      border-radius: 8px;
      padding: 0.75rem 1.5rem;
      font: 600 1rem 'Poppins', sans-serif;
      background: linear-gradient(to right, #f36624, #ff884d);
      color: #fff;
      text-decoration: none;
      transition: background 0.3s ease;
      width: fit-content;
    }

    .apply-btn:hover {
      background: linear-gradient(to right, #db5a1d, #f17c2a);
      color: #fff;
    }

    @media (max-width: 768px) {
      .program-row,
      .program-row.reverse {
        flex-direction: column;
      }

      .program-image,
      .program-info {
        width: 100%;
      }

      .program-image {
        height: 250px;
      }
    }
  `;

  return (
    <div>
      <Navbar />
      <section className="section-programs">
        <style>{styles}</style>
        <div className="container">
          <h2 className="title-main">Our Programs</h2>
          <p className="subtitle">
            Explore initiatives that empower entrepreneurs, innovators, and changemakers.
          </p>

          {programs.length === 0 ? (
            <p className="text-center text-muted">No programs available yet.</p>
          ) : (
            programs.map((program, index) => {
              const imageUrl = `${API_BASE_URL}/${program.coverImage}`;

              return (
                <Link
                  to={`/programs/${program._id}`}
                  key={program._id}
                  className="text-decoration-none"
                >
                  <div className={`program-row ${index % 2 === 1 ? 'reverse' : ''}`}>
                    <div className="program-image">
                      <img
                        src={imageUrl}
                        alt={program.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
                        }}
                      />
                    </div>
                    <div className="program-info">
                      <h3 className="program-title">{program.title}</h3>
                      <p className="program-tagline">{program.tagline}</p>
                      <p className="program-description">
                        {program.description?.length > 250
                          ? program.description.slice(0, 250) + '…'
                          : program.description}
                      </p>
                      {program.applyLink && (
                        <a
                          href={program.applyLink}
                          className="apply-btn"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Apply Now
                        </a>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
