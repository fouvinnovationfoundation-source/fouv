import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProgramDetails() {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/programs/${id}`)
      .then((res) => res.json())
      .then((data) => setProgram(data))
      .catch((err) => {
        console.error(err);
        setError('Failed to load program details.');
      });
  }, [id]);

  if (error) return <p className="text-center text-danger mt-5">{error}</p>;
  if (!program) return <p className="text-center mt-5">Loading...</p>;

  const btnBaseStyle = {
    padding: '0.75rem 2.5rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block',
  };

  const learnerBtnStyle = {
    ...btnBaseStyle,
    background: 'linear-gradient(45deg, #2980b9, #3498db)',
  };

  const mentorBtnStyle = {
    ...btnBaseStyle,
    background: 'linear-gradient(45deg, #16a085, #1abc9c)',
  };

  return (
    <div>
      <Navbar />

      {/* Hero Image */}
      <div style={{ position: 'relative', height: '75vh', overflow: 'hidden' }}>
        <img
          src={`${API_BASE_URL}/${program.heroImage}`}
          alt="Hero"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(60%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '8%',
            transform: 'translateY(-50%)',
            color: 'white',
          }}
        >
          <h1 className="display-4 fw-bold mb-3">{program.title}</h1>
          {program.tagline && (
            <p className="lead fw-semibold text-warning" style={{ fontSize: '1.25rem' }}>
              {program.tagline}
            </p>
          )}

          <div className="d-flex gap-3 mt-3 flex-wrap">
            {program.enrollAsLearnerLink && (
              <a
                href={program.enrollAsLearnerLink}
                target="_blank"
                rel="noopener noreferrer"
                style={learnerBtnStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = 'linear-gradient(45deg, #2471a3, #2e86c1)')
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = 'linear-gradient(45deg, #2980b9, #3498db)')
                }
              >
                Enroll as Learner
              </a>
            )}

            {program.enrollAsMentorLink && (
              <a
                href={program.enrollAsMentorLink}
                target="_blank"
                rel="noopener noreferrer"
                style={mentorBtnStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = 'linear-gradient(45deg, #138d75, #17a589)')
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = 'linear-gradient(45deg, #16a085, #1abc9c)')
                }
              >
                Enroll as Mentor
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Sections */}
      <section className="container my-5">
        <div className="row g-5">
          {program.sections?.map((section, idx) => {
            if (section.type === 'text') {
              return (
                <div className="col-md-6" key={idx}>
                  <div className="bg-white p-4 shadow-sm rounded h-100 border-start border-4 border-info">
                    <p className="fw-bold text-dark">{section.content.split('\n')[0]}</p>
                    <p style={{ fontSize: '1.1rem', color: '#555' }}>
                      {section.content.split('\n').slice(1).join('\n')}
                    </p>
                  </div>
                </div>
              );
            }

            if (section.type === 'importantPoints') {
              const points = section.content
                .split(/\n|(?=\d+\.)/)
                .map((p) => p.trim())
                .filter(Boolean);

              return (
                <div className="col-md-6" key={idx}>
                  <div className="bg-light border-start border-4 border-success p-4 rounded shadow-sm h-100">
                    <h5 className="text-success fw-bold mb-3">Key Highlights</h5>
                    <ul className="list-unstyled">
                      {points.map((point, i) => (
                        <li key={i} className="mb-2 d-flex align-items-start">
                          <span
                            className="me-3"
                            style={{
                              width: '28px',
                              height: '28px',
                              backgroundColor: '#28a745',
                              color: 'white',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                            }}
                          >
                            ✓
                          </span>
                          <span style={{ fontSize: '1rem', lineHeight: '1.5', color: '#155724' }}>
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }

            if (section.type === 'image') {
              return (
                <div className="col-md-6 text-center" key={idx}>
                  <img
                    src={`${API_BASE_URL}/${section.content}`}
                    alt={`Section ${idx}`}
                    className="img-fluid rounded shadow-sm"
                    style={{
                      maxHeight: '300px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* Enroll Buttons at Bottom */}
        {(program.enrollAsLearnerLink || program.enrollAsMentorLink) && (
          <div className="text-center mt-5 d-flex justify-content-center gap-3 flex-wrap">
            {program.enrollAsLearnerLink && (
              <a
                href={program.enrollAsLearnerLink}
                target="_blank"
                rel="noopener noreferrer"
                style={learnerBtnStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = 'linear-gradient(45deg, #2471a3, #2e86c1)')
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = 'linear-gradient(45deg, #2980b9, #3498db)')
                }
              >
                Enroll as Learner →
              </a>
            )}
            {program.enrollAsMentorLink && (
              <a
                href={program.enrollAsMentorLink}
                target="_blank"
                rel="noopener noreferrer"
                style={mentorBtnStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = 'linear-gradient(45deg, #138d75, #17a589)')
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = 'linear-gradient(45deg, #16a085, #1abc9c)')
                }
              >
                Enroll as Mentor →
              </a>
            )}
          </div>
        )}

        {/* Back Button */}
        <div className="text-center mt-4">
          <Link to="/programs" className="btn btn-outline-secondary">
            ← Back to Programs
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
