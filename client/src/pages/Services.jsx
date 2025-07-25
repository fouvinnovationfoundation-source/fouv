import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API = `${import.meta.env.VITE_API_BASE_URL}/api/services`;

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then(setServices)
      .catch((err) => console.error('Failed to fetch services:', err));
  }, []);

  const styles = `
    .service-card {
      height: 500px;
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border-radius: 16px;
      overflow: hidden;
    }

    .service-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    }

    .service-img {
      height: 250px;
      object-fit: contain;
      padding: 1.5rem;
      background-color: #f1f1f1;
    }

    .card-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 1.5rem;
    }

    .card-body h5 {
      font-size: 1.4rem;
      font-weight: bold;
      margin-bottom: 0.75rem;
    }

    .card-body p {
      color: #555;
      font-size: 1rem;
      margin-bottom: 0;
    }

    @media (max-width: 576px) {
      .service-card {
        height: auto;
      }
      .service-img {
        height: 180px;
      }
    }
  `;

  return (
    <div>
      <Navbar />
      <style>{styles}</style>

      <section className="py-5" style={{ backgroundColor: '#ffeae0' }}>
        <div className="container">
          <h1 className="text-center mb-4 fw-bold" style={{ color: '#f36624',fontSize: '3.5rem' }}>
            Startup Services
          </h1>
          <h2 className="text-center mb-4 fw-bold" style={{ color: '#004174',fontSize: '2.5rem' }}>Fueling Opportunities Upscaling Ventures</h2>
          <div className="row gy-4 gx-4 justify-content-center">
            {services.map((service) => (
              <div key={service._id} className="col-sm-10 col-md-6 col-lg-4">
                <div className="card shadow-sm border-0 service-card">
                  {service.iconUrl && (
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}${service.iconUrl}`}
                      alt={service.title}
                      className="card-img-top service-img"
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title text-primary">{service.title}</h5>
                    <p className="card-text">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
            {services.length === 0 && (
              <p className="text-center text-muted">No services available yet.</p>
            )}
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
