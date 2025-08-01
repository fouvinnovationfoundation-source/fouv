import React, { useEffect, useState } from 'react';
import { Carousel, Spinner } from 'react-bootstrap';

function ImageCarousel() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true); // NEW STATE

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/images`);
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error('Error fetching images:', err);
      } finally {
        setLoading(false); // Stop loading whether success or error
      }
    };
    fetchImages();
  }, []);

  const styles = `
    .carousel-image {
      height: 100vh;
      width: 100%;
      object-fit: cover;
      transform: scale(1);
      transition: transform 10s ease-in-out;
    }

    .carousel-item.active .carousel-image {
      transform: scale(1.1);
    }

    .caption-popup {
      position: absolute;
      top: 25%;
      left: 5%;
      transform: translateY(-50%);
      text-align: left;
      color: white;
      opacity: 0;
      animation: slideUp 1s forwards;
      animation-delay: 0.5s;
      max-width: 90%;
    }

    @keyframes slideUp {
      to {
        transform: translateY(-50%);
        opacity: 1;
      }
    }

    .caption-popup h1 {
      font-size: 4rem;
      font-weight: bold;
      color: #f36624;
      text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.7);
    }

    .caption-popup p {
      font-size: 2.5rem;
      margin-top: 2rem;
      text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.6);
    }

    .caption-popup a.btn {
      margin-top: 1rem;
      background-color: #f36624;
      border: none;
      padding: 0.75rem 1.25rem;
      font-weight: 600;
      font-size: 1.2rem;
      color: white;
    }

    .caption-popup a.btn:hover {
      background-color: #d2541e;
    }

    .carousel-indicators [data-bs-target] {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #ffffff;
      opacity: 0.6;
      border: 1px solid #fff;
    }

    .carousel-indicators .active {
      opacity: 1;
      background-color: #f36624;
    }

    @media (max-width: 768px) {
      .carousel-image {
        height: 100vh;
      }

      .caption-popup {
        top: 20%;
        left: 7%;
      }

      .caption-popup h1 {
        font-size: 2.8rem;
      }

      .caption-popup p {
        font-size: 1.6rem;
        margin-top: 1rem;
      }

      .caption-popup a.btn {
        font-size: 1rem;
        padding: 0.5rem 1rem;
      }
    }

    @media (max-width: 480px) {
      .caption-popup {
        top: 20%;
        left: 6%;
      }

      .caption-popup h1 {
        font-size: 2.3rem;
      }

      .caption-popup p {
        font-size: 1.2rem;
      }

      .caption-popup a.btn {
        font-size: 0.95rem;
      }
    }
  `;

  return (
    <div className="w-100" style={{ overflowX: 'hidden', position: 'relative' }}>
      <style>{styles}</style>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="border" role="status" style={{ width: '4rem', height: '4rem', color: '#f36624' }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : images.length > 0 ? (
        <Carousel fade interval={7000} controls={false} indicators={false} pause={false}>
          {images.map((img, index) => (
            <Carousel.Item key={index}>
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}${img.url}`}
                className="d-block carousel-image"
                alt={`Slide ${index + 1}`}
              />
              <div className="caption-popup">
                {img.title && <h1>{img.title}</h1>}
                {img.subtitle && <p>{img.subtitle}</p>}
                {img.buttonText && img.buttonLink && (
                  <a className="btn" href={img.buttonLink} target="_blank" rel="noreferrer">
                    {img.buttonText}
                  </a>
                )}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <p className="text-center py-5">No images to show</p>
      )}
    </div>
  );
}

export default ImageCarousel;
