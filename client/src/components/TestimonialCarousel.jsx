import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API = `${import.meta.env.VITE_API_BASE_URL}/api/testimonials`;

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(err => console.error('Error fetching testimonials:', err));
  }, []);

 const settings = {
  ltr: false,           
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 3,      
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 5000,
  responsive: [
    { breakpoint: 3000, settings: { slidesToShow: 3 } },
    { breakpoint: 990, settings: { slidesToShow: 2 } },
    { breakpoint: 480,  settings: { slidesToShow: 1 } }
  ]
};

  const styles = `
    .testimonial-section {
      background-color: #000000c0;
      color: #fff;
      padding: 3rem 1rem;
      direction: ltr;
    }

    .testimonial-title {
      text-align: center;
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    .underline {
      width: 70px;
      height: 4px;
      background-color: #f36624;
      border-radius: 2px;
      margin: 0 auto 2rem;
    }

    .testimonial-card {
      padding: 1rem;
      height: 100%;
      transform: translateY(60px);
      opacity: 0;
      animation: slideUp 0.7s ease-in-out forwards;
    }

    @keyframes slideUp {
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .card-content {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 450px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.4);
      transition: transform 0.4s, background 0.4s;
      position: relative;
      overflow: hidden;
    }

    .card-content:hover {
      transform: translateY(-10px);
     
    }

    .quote-icon {
      background-color: #3b82f6;
      color: white;
      font-size: 3.5rem;
      width: 70px;
      height: 70px;
      display: grid;
      place-items: center;
      margin: 20px auto 1.5rem auto;
      border-radius: 50%;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    .testimonial-quote {
      font-size: 1.5rem;
      color: #000000;
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .testimonial-footer {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      justify-content: center;
      margin-top: auto;
    }

    .testimonial-image {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: 2px solid white;
      object-fit: cover;
    }

    .testimonial-name {
      font-weight: 600;
      color: #f36523;
      margin: 0;
    }

    .testimonial-profession {
      color: #03518f;
      font-size: 0.85rem;
      margin: 0;
    }

    .slick-slide > div {
      display: flex;
      height: 100%;
    }

    .slick-prev:before, .slick-next:before {
      color: #f36624;
      font-size: 28px;
    }

    .slick-dots li button:before {
      font-size: 10px;
      color: #f36624;
    }

    .slick-dots li.slick-active button:before {
      color: #f36624;
    }
  `;

  return (
    <div className="testimonial-section">
      <style>{styles}</style>
      <p className="text-center fw-bold" style={{ color: '#f36624', fontSize: '2rem' }}>Testimonials</p>
      <h2 className="testimonial-title">The opinions of our esteemed guests</h2>
      <div className="underline" />

      <div className="container px-2">
        <Slider {...settings}>
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t._id}>
              <div className="card-content">
                <div>
                  <div className="quote-icon">❞</div>
                  <p className="testimonial-quote">{t.quote}</p>
                </div>

                <div className="testimonial-footer">
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/uploads/avatars/${t.image}`}
                    alt={t.name}
                    className="testimonial-image"
                  />
                  <div>
                    <p className="testimonial-name">{t.name}</p>
                    <p className="testimonial-profession">{t.profession}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
