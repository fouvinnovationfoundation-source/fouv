import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Fouvlogo from "../assets/Fouvlogo.jpg";

function Navbar() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [showProgramsDropdown, setShowProgramsDropdown] = useState(false);
  const [showContactDropdown, setShowContactDropdown] = useState(false);

  const location = useLocation();
  const links = ["home", "about", "events", "programs", "contact"];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/programs`)
      .then((res) => res.json())
      .then((data) => setPrograms(data))
      .catch((err) => console.error("Failed to fetch programs", err));
  }, []);

  return (
    <>
      {/* Dropdown hover styling */}
      <style>
        {`
          .custom-dropdown-menu {
            background-color: #fff;
            transition: background-color 0.3s ease;
          }

          .custom-dropdown-menu:hover {
            background-color: #e6f0ff;
          }

          .custom-dropdown-menu .dropdown-item:hover {
            background-color: #d0e8ff;
            color: #03518f;
          }
        `}
      </style>

      <nav
        className="navbar navbar-expand-lg navbar-light sticky-top py-2"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.27)", // transparent white
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
           boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Optional
        }}
      >
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center ps-3" to="/">
            <img
              src={Fouvlogo}
              alt="Logo"
              height="65"
              width="65"
              className="me-3"
            />
            <span
              className="fs-1"
              style={{
                fontFamily: "sans-serif",
                color: "#03518f",
                fontWeight: "800",
                letterSpacing: "3px",
              }}
            >
              FOUV
            </span>
          </Link>

          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ backgroundColor: "#f36624" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Nav Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto me-3 gap-4 position-relative">
              {links.map((link) => {
                const path = link === "home" ? "/" : `/${link}`;
                const isActive = location.pathname === path;
                const isHovered = hoveredLink === link;
                const isPrograms = link === "programs";
                const isContact = link === "contact";

                return (
                  <li
                    className="nav-item"
                    key={link}
                    onMouseEnter={() => {
                      setHoveredLink(link);
                      if (isPrograms) setShowProgramsDropdown(true);
                      if (isContact) setShowContactDropdown(true);
                    }}
                    onMouseLeave={() => {
                      setHoveredLink(null);
                      if (isPrograms) setShowProgramsDropdown(false);
                      if (isContact) setShowContactDropdown(false);
                    }}
                    style={{ position: "relative" }}
                  >
                    <Link
                      to={path}
                      className="nav-link fs-5 fw-medium"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        color: isActive || isHovered ? "#f36624" : "#276a9e",
                        position: "relative",
                        display: "inline-block",
                        paddingBottom: "4px",
                        transition: "color 0.3s ease",
                        textDecoration: "none",
                      }}
                    >
                      {link.charAt(0).toUpperCase() + link.slice(1)}
                      <span
                        style={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          width: isActive || isHovered ? "100%" : "0%",
                          height: "2px",
                          backgroundColor: "#f36624",
                          transition: "width 0.3s ease",
                        }}
                      ></span>
                    </Link>

                    {/* Dropdown for Programs */}
                    {isPrograms && showProgramsDropdown && (
                      <ul
                        className="dropdown-menu custom-dropdown-menu show mt-0 shadow-sm"
                        style={{
                          display: "block",
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          zIndex: 1000,
                          minWidth: "220px",
                          borderRadius: "10px",
                          overflow: "hidden",
                        }}
                      >
                        {programs.map((program) => (
                          <li key={program._id}>
                            <Link
                              to={`/programs/${program._id}`}
                              className="dropdown-item"
                              style={{
                                fontFamily: "Poppins, sans-serif",
                                padding: "10px 16px",
                                color: "#0e1a2b",
                                fontWeight: 500,
                                textDecoration: "none",
                              }}
                            >
                              {program.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Dropdown for Contact → FAQs */}
                    {isContact && showContactDropdown && (
                      <ul
                        className="dropdown-menu custom-dropdown-menu show mt-0 shadow-sm"
                        style={{
                          display: "block",
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          zIndex: 1000,
                          minWidth: "180px",
                          borderRadius: "10px",
                          overflow: "hidden",
                        }}
                      >
                        <li>
                          <Link
                            to="/faqs"
                            className="dropdown-item"
                            style={{
                              fontFamily: "Poppins, sans-serif",
                              padding: "10px 16px",
                              color: "#0e1a2b",
                              fontWeight: 500,
                              textDecoration: "none",
                            }}
                          >
                            FAQs
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
