import React, { useState } from "react";
import { getUser, clearUser } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import LogoManager from "../components/LogoManager";
import CarouselManager from "../components/CarouselManager";
import TestimonialAdmin from "../components/TestimonialAdmin";
import EventAdmin from "../components/EventAdmin";
import ServiceManager from "../components/ServiceManager";
import ProgramManager from "../components/ProgramManager";
import AddUser from "../components/AddUser";
import AdminAddBlog from "../components/AdminAddBlog";

const NewHome = () => {
  const user = getUser();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("carousel");

  const handleLogout = () => {
    clearUser();
    navigate("/login");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "carousel":
        return <CarouselManager />;
      case "logo":
        return <LogoManager />;
      case 'blog':
        return <AdminAddBlog/>
      case "testimonial":
        return <TestimonialAdmin />;
      case "event":
        return <EventAdmin />;
      case "service":
        return <ServiceManager />;
      case "program":
        return <ProgramManager />;
      case 'createUser':
        return <AddUser/>
      default:
        return <CarouselManager />;
    }
  };

  return (
    <div style={{ backgroundColor: "#374350", minHeight: "100vh" }}>
      <AdminNavbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        handleLogout={handleLogout}
      />
      <div className="container mt-4">
        <h2
          className="mb-4"
          style={{
            fontFamily: "sans-serif",
            color: "#f36624",
          }}
        >
          Welcome, {user?.name}
        </h2>
        {renderSection()}
      </div>
    </div>
  );
};

export default NewHome;
