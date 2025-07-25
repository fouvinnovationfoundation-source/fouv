import React, { useEffect, useState } from 'react';

function Companycard() {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/logos`);
        const data = await res.json();
        setLogos(data);
      } catch (err) {
        console.error('Failed to fetch logos:', err);
      }
    })();
  }, []);

  const styles = `
    /* ─────── Card Base ─────── */
    .company-card {
      transition: transform .3s ease, box-shadow .3s ease;
      border: 1px solid #dee2e6;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0,0,0,.1);
      height: 100%;
      background: #fff;
      display: flex;
      flex-direction: column;

      /* entrance animation */
      transform: translateY(60px);
      opacity: 0;
      animation: slideUp .7s forwards;
    }

    /* hover pop */
    .company-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 25px rgba(0,0,0,.15);
    }

    /* image wrapper */
    .img-container {
      height: 200px;
      background:#f8f9fa;
      position:relative;
      display:flex;
      align-items:center;
      justify-content:center;
    }
    .img-container img{
      max-height:100%;
      max-width:100%;
      object-fit:contain;
    }

    /* gradient overlay on hover */
    .overlay{
      position:absolute;inset:0;
      background:linear-gradient(to right,#276a9e,#f36624);
      opacity:0;transition:opacity .4s;
    }
    .company-card:hover .overlay{opacity:.25;}

    /* heading ↓ */
    .highlight-message{
      color:#276a9e;font-size:3rem;font-weight:600;
    }

    /* slide‑up keyframes */
    @keyframes slideUp{
      to{transform:translateY(0);opacity:1;}
    }
  `;

  return (
    <>
      <style>{styles}</style>

      <div className="container py-5">
        <h1 className="text-center mb-5 fw-bold"style={{ color: '#f36624', fontSize: '3.5rem' }}>Startups Empowered</h1>

        <div className="row g-4">
          {logos.map((logo, idx) => (
            <div className="col-sm-12 col-md-6 col-lg-4" key={logo._id || idx}>
              <div
                className="company-card"
                /* stagger each card by 0.1 s */
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="img-container">
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/uploads/logos/${logo.filename}`}
                    alt={logo.originalName || `logo-${idx}`}
                  />
                  <div className="overlay" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Text */}
        <div className="text-center mt-5">
          <h1 className="highlight-message">30+ Startups are in Early Stage</h1>
        </div>
      </div>
    </>
  );
}

export default Companycard;
