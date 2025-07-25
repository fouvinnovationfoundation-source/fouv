import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/blog`)
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error('Error fetching blogs:', err));
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -350 : 350,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="container py-5">
      <style>{`
        .scroll-container {
          display: flex;
          overflow-x: auto;
          scroll-behavior: smooth;
          padding: 20px 0;
          gap: 2rem;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none;  /* IE 10+ */
        }

        .scroll-container::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }

        .video-card {
          min-width: 360px;
          max-width: 360px;
          height: 500px;
          border: 1px solid #ddd;
          border-radius: 12px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 0 10px rgba(0,0,0,0.08);
          transition: transform 0.3s;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .video-card:hover {
          transform: translateY(-5px);
        }

        .video-frame {
          width: 100%;
          height: 60%;
          overflow: hidden;
        }

        .video-frame iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        .video-title {
          padding: 0.75rem 1rem 0.5rem;
          font-weight: 600;
          font-size: 1rem;
          color: #333;
        }

        .video-label {
          position: absolute;
          bottom: 10px;
          left: 16px;
          background-color: #f36624;
          color: white;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .scroll-btn {
          position: absolute;
          top: 40%;
          background: rgba(255, 255, 255, 0.95);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          font-size: 1.5rem;
          font-weight: bold;
          cursor: pointer;
          z-index: 1;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }

        .scroll-btn.left {
          left: -20px;
        }

        .scroll-btn.right {
          right: -20px;
        }
      `}</style>

      <h3 className="mb-4 text-center" style={{ color: '#f36624', fontWeight: '600', fontSize:'2.5rem'}}>
        Latest Video Blogs
      </h3>

      {/* Scrollable Cards Section */}
      <div className="position-relative">
        <button className="scroll-btn left" onClick={() => scroll('left')}>&#10094;</button>
        <div className="scroll-container" ref={scrollRef}>
          {blogs.map((blog, index) => (
            <div className="video-card" key={index}>
              <div className="video-frame">
                <iframe
                  src={blog.youtubeUrl.replace('watch?v=', 'embed/')}
                  title={blog.title}
                  allowFullScreen
                ></iframe>
              </div>
              <div className="video-title">{blog.title}</div>
              <div className="video-label">Videos</div>
            </div>
          ))}
        </div>
        <button className="scroll-btn right" onClick={() => scroll('right')}>&#10095;</button>
      </div>
    </div>
  );
};

export default Blog;
