import React from 'react';
import { Link } from 'react-router-dom';
import FouvLogo from '../assets/Fouvlogo.png';
import FooterBg from '../assets/footerbg.jpg';

function Footer() {
  const footerStyle = {
    backgroundImage: `url(${FooterBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    minHeight: '220px', // Reduced height
    zIndex: 1,
    overflow: 'hidden',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 2,
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 3,
    color: '#ffffff',
  };

  const hoverCSS = `
    .footer-link {
      position: relative;
      color: white;
      text-decoration: none;
      padding-bottom: 2px;
      transition: color 0.3s ease;
    }

    .footer-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      width: 0%;
      background-color: #f36624;
      transition: width 0.4s ease-in-out;
    }

    .footer-link:hover {
      color: #f36624 !important;
    }

    .footer-link:hover::after {
      width: 100%;
    }

    .social-icon {
      font-size: 1.2rem;
      margin-right: 10px;
      color: #fff;
      transition: color 0.3s;
    }

    .social-icon:hover {
      color: #f36624;
    }
  `;

  return (
    <>
      <style>{hoverCSS}</style>

      <footer style={footerStyle} className="mt-auto d-flex align-items-center">
        <div style={overlayStyle}></div>

        <div className="container py-4" style={contentStyle}>
          <div className="row justify-content-between align-items-start">
            {/* Left: Contact & Social */}
            <div className="col-sm-6 col-md-5 col-lg-4 mb-4 mb-md-0">
              <h5 className="mb-3">Find us</h5>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                <strong>Address:</strong> Baghola, Palwal, Haryana 121102<br />
                <strong>Email:</strong>{' '}
                <a href="mailto:connect@fouv.org" className="footer-link">connect@fouv.org</a><br />
                <strong>Phone:</strong> +91 85880 79757, +91 9991059757
              </p>

              <div className="mt-3">
                <a href="https://www.linkedin.com/company/fouv/?originalSubdomain=in" target="_blank" rel="noreferrer" className="social-icon">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href="https://www.instagram.com/fouvinnovationfoundation/" target="_blank" rel="noreferrer" className="social-icon">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="https://www.facebook.com/p/FOUV-Innovation-Foundation-100093858640773/" target="_blank" rel="noreferrer" className="social-icon">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="https://x.com/FouvInnovation" target="_blank" rel="noreferrer" className="social-icon">
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="https://www.youtube.com/@FOUVInnovationFoundation" target="_blank" rel="noreferrer" className="social-icon">
                  <i className="bi bi-collection-play"></i>
                </a>
              </div>
            </div>

            {/* Right: Navigation */}
            <div className="col-sm-6 col-md-6 col-lg-4">
              <h5 className="mb-3">Quick Links</h5>
              <ul className="list-unstyled mb-2">
                <li className="mb-1"><Link to="/about" className="footer-link">About Us</Link></li>
                <li className="mb-1"><Link to="/services" className="footer-link">Services</Link></li>
                <li className="mb-1"><Link to="/programs" className="footer-link">Programs</Link></li>
                <li className="mb-1"><Link to="/faqs" className="footer-link">FAQs</Link></li>
                <li className="mb-1"><Link to="/contact" className="footer-link">Contact</Link></li>
              </ul>
            </div>
          </div>

          <hr className="mt-4 border-light" />

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div className="d-flex align-items-center mb-2 mb-md-0">
              <img src={FouvLogo} alt="Fouv Logo" height="36" className="me-2" />
              <small>© {new Date().getFullYear()} Fouv Innovation Foundation</small>
            </div>
            <div>
              
              <Link to="/contact" className="footer-link">Contact Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
