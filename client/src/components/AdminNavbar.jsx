import React, { useState } from 'react';
import { getUser } from '../utils/storage';
import Fouvlogo from '../assets/Fouvlogo.jpg';

const AdminNavbar = ({ setActiveSection, handleLogout, activeSection }) => {
  const user = getUser();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const styles = `
    .admin-nav-link {
      position: relative;
      font-family: 'sans-serif';
      font-size: 1.1rem;
      font-weight: 600;
      color: #000000;
      background: none;
      border: none;
      outline: none;
      cursor: pointer;
      padding: 4px 0;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .admin-nav-link::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -3px;
      height: 2px;
      width: 0;
      background-color: #f36624;
      transition: width 0.3s ease;
    }

    .admin-nav-link:hover {
      color: #f36624;
    }

    .admin-nav-link:hover::after {
      width: 100%;
    }

    .admin-nav-link.active {
      color: #f36624;
    }

    .admin-nav-link.active::after {
      width: 100%;
    }

    .admin-logout-btn {
      font-family: 'Poppins', sans-serif;
      background-color: #f36624;
      color: white;
      padding: 6px 16px;
      font-weight: 500;
      border-radius: 5px;
      border: none;
    }

    .admin-logout-btn:hover {
      background-color: #d95415;
    }

    .add-user-btn {
      font-family: 'sans-serif';
      border: 2px solid #f36624;
      background: transparent;
      color: #f36624;
      border-radius: 50%;
      width: 38px;
      height: 38px;
      font-size: 1.4rem;
      font-weight: bold;
      line-height: 1;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.3s, color 0.3s;
    }

    .add-user-btn:hover {
      background-color: #f36624;
      color: white;
    }
  `;

  const navItems = [
    ['carousel', 'Carousel'],
    ['logo', 'Logos'],
    ['blog', 'Blog'],
    ['testimonial', 'Testimonials'],
    ['event', 'Events'],
    ['service', 'Services'],
    ['program', 'Programs'],
  ];

  return (
    <>
      <style>{styles}</style>

      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">
        <div className="container-fluid px-4">
          {/* Logo + Brand */}
          <div className="navbar-brand d-flex align-items-center">
            <img src={Fouvlogo} alt="Fouv Logo" width="50" height="50" className="me-2" />
            <span
              className="fs-2"
              style={{
                color: '#03518f',
                fontFamily: 'sans-serif',
                fontWeight: '800',
                letterSpacing: '3px',
              }}
            >
              FOUV Admin
            </span>
          </div>

          {/* Toggler Button for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Content */}
          <div className={`collapse navbar-collapse ${isCollapsed ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto d-flex flex-column flex-lg-row gap-lg-4 align-items-lg-center mt-3 mt-lg-0">
              {navItems.map(([key, label]) => (
                <li className="nav-item" key={key}>
                  <button
                    className={`admin-nav-link ${activeSection === key ? 'active' : ''}`}
                    onClick={() => {
                      setActiveSection(key);
                      setIsCollapsed(false);
                    }}
                  >
                    {label}
                  </button>
                </li>
              ))}

              {/* Conditionally show AddUser only if user is manager */}
              {user?.role === 'manager' && (
                <li className="nav-item mt-2 mt-lg-0 ms-lg-2">
                  <button
                    className="add-user-btn"
                    title="Add User"
                    onClick={() => {
                      setActiveSection('createUser');
                      setIsCollapsed(false);
                    }}
                  >
                    +
                  </button>
                </li>
              )}

              <li className="nav-item mt-2 mt-lg-0 ms-lg-3">
                <button className="admin-logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
