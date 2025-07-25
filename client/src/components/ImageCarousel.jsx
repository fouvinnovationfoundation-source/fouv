import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';

function ImageCarousel() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/images`); 
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error('Error fetching images:', err);
      }
    };
    fetchImages();
  }, []);

  const styles = `
    .carousel-image {
      height: 700px;
      object-fit: cover;
      width: 100%;
      transform: scale(1);
      transition: transform 10s ease-in-out;
    }

    .carousel-item.active .carousel-image {
      transform: scale(1.1);
    }

    .caption-popup {
      position: absolute;
      top: 30%;
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
      font-size: 3.5rem;
      font-weight: bold;
      color:#f36624;
      text-shadow: 2px 2px 12px rgba(0,0,0,0.7);
    }

    .caption-popup p {
      font-size: 2.5rem;
      margin-top: 2rem;
      text-shadow: 1px 1px 8px rgba(0,0,0,0.6);
    }

    .caption-popup a.btn {
      margin-top: 1rem;
      background-color: #f36624;
      border: none;
      padding: 0.5rem 1rem;
      font-weight: 600;
      color: white;
    }

    .caption-popup a.btn:hover {
      background-color: #d2541e;
    }

    /* Override Bootstrap carousel indicators to be dots */ 
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
        height: 300px;
      }
      .caption-popup h1 {
        font-size: 1.8rem;
      }
      .caption-popup p {
        font-size: 0.95rem;
      }
    }
  `;

  return (
    <div className="w-100" style={{ overflowX: 'hidden', position: 'relative' }}>
      <style>{styles}</style>

      {images.length > 0 ? (
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
