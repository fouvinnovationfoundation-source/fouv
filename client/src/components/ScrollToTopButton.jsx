import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa'; // Make sure react-icons is installed

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  // Show button after scrolling 300px
  const toggleVisibility = () => {
    setVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      <style>{`
        .scroll-top-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 999;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #f36624;
          color: white;
          border: none;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
          cursor: pointer;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .scroll-top-btn.show {
          opacity: 1;
          pointer-events: auto;
        }

        .scroll-top-btn:hover {
          background-color: #d95415;
        }
      `}</style>

      <button
        className={`scroll-top-btn ${visible ? 'show' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>
    </>
  );
};

export default ScrollToTopButton;
