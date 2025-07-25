import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { isSameDay, isPast, isFuture, format } from 'date-fns';
import { Modal, Button, Badge, ListGroup } from 'react-bootstrap';
import Footer from '../components/Footer';

const API = `${import.meta.env.VITE_API_BASE_URL}/api/events`;

export default function Events() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then(setEvents);
  }, []);

  const eventsForSelectedDate = events.filter((ev) =>
    selectedDate ? isSameDay(new Date(ev.date), selectedDate) : false
  );

  const getStatusBadgeVariant = (date) => {
    if (isPast(date) && !isSameDay(date, new Date())) return 'secondary';
    if (isFuture(date)) return 'info';
    return 'success';
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const hasEvent = events.some((ev) => isSameDay(new Date(ev.date), date));
      const isUpcoming = events.some(
        (ev) =>
          isSameDay(new Date(ev.date), date) &&
          (isFuture(new Date(ev.date)) || isSameDay(new Date(ev.date), new Date()))
      );
      return hasEvent && isUpcoming ? 'event-day upcoming-date' : hasEvent ? 'event-day' : null;
    }
  };

  const upcomingEvents = events.filter(
    (ev) => !isPast(new Date(ev.date)) || isSameDay(new Date(ev.date), new Date())
  );

  const completedEvents = events.filter(
    (ev) => isPast(new Date(ev.date)) && !isSameDay(new Date(ev.date), new Date())
  );

  return (
    <div>
      <Navbar />

      <section className="py-5" style={{ background: '#fff' }}>
        <div className="container">
          <h2 className="text-center fw-bold mb-5" style={{ color: '#f36624', fontSize: '2.5rem' }}>
            Upcoming Events
          </h2>

          {upcomingEvents.length > 0 && (
            <div
              className="calendar-section fade-in mb-5 d-flex justify-content-center align-items-center"
              style={{
                background: 'linear-gradient(135deg, #e3f2fd, #ffffff)',
                padding: '4rem 1rem',
                borderTop: '2px solid #f36624',
                borderBottom: '2px solid #f36624',
                width: '100%',
              }}
            >
              <div style={{ maxWidth: '480px', width: '100%' }}>
                <Calendar
                  onClickDay={(value) => {
                    setSelectedDate(value);
                    setShowModal(true);
                  }}
                  tileClassName={tileClassName}
                  minDetail="month"
                  className="custom-calendar shadow"
                />
              </div>
            </div>
          )}

          {upcomingEvents.length === 0 && (
            <h1 className="text-center">No upcoming events.</h1>
          )}

          {upcomingEvents.map((ev) => (
            <div key={ev._id} className="row align-items-center mb-5 g-4">
              <div className="col-md-5 text-center">
                {ev.imageUrl && (
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}${ev.imageUrl}`}
                    alt={ev.title}
                    style={{
                      width: '100%',
                      maxWidth: '320px',
                      borderTopRightRadius: '100px',
                      borderBottomLeftRadius: '100px',
                      objectFit: 'cover',
                      height: 'auto',
                    }}
                  />
                )}
                {ev.caption && (
                  <div className="mt-3">
                    <h5 className="fw-bold mb-1" style={{ color: '#0d47a1' }}>
                      {ev.caption.split(',')[0]}
                    </h5>
                    <p className="mb-0" style={{ color: '#03518f', fontSize: '0.95rem' }}>
                      {ev.caption.split(',').slice(1).join(',')}
                    </p>
                  </div>
                )}
              </div>
              <div className="col-md-7 text-md-start text-center">
                <h3
                  style={{
                    fontWeight: '900',
                    fontSize: '3.5rem',
                    color: '#f36624',
                    lineHeight: '1.3',
                  }}
                >
                  {ev.title}
                </h3>
                <p className="mt-3 fw-semibold" style={{ color: '#0d47a1' }}>
                  {new Date(ev.date).toLocaleDateString('en-GB', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <p style={{ fontSize: '1.1rem' }}>{ev.details}</p>
                {ev.registerLink && (
                  <a
                    href={ev.registerLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary px-4 py-2 mt-2"
                    style={{
                      backgroundColor: '#003366',
                      border: 'none',
                      borderRadius: '999px',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                    }}
                  >
                    Register Now
                  </a>
                )}
              </div>
            </div>
          ))}

          {completedEvents.length > 0 && (
            <>
              <hr className="styled-hr" />
              <h3 className="text-center fw-bold mt-5 mb-4" style={{ color: '#6c757d' }}>
                Completed Events
              </h3>
              {completedEvents.map((ev) => (
                <div key={ev._id} className="row align-items-center mb-5 g-4">
                  <div className="col-md-5 text-center">
                    {ev.imageUrl && (
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}${ev.imageUrl}`}
                        alt={ev.title}
                        style={{
                          width: '100%',
                          maxWidth: '320px',
                          borderTopRightRadius: '100px',
                          borderBottomLeftRadius: '100px',
                          objectFit: 'cover',
                          height: 'auto',
                          filter: 'grayscale(60%)',
                        }}
                      />
                    )}
                  </div>
                  <div className="col-md-7 text-md-start text-center">
                    <h3 style={{ fontWeight: 'bold', fontSize: '3.5rem', color: '#999' }}>
                      {ev.title}
                    </h3>
                    <p className="mt-2" style={{ color: '#888' }}>
                      {new Date(ev.date).toLocaleDateString('en-GB', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                    <p style={{ color: '#666' }}>{ev.details}</p>
                    {ev.recordedSession && (
                      <a
                        href={ev.recordedSession}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline-secondary mt-2"
                      >
                        🎥 Watch Recording
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Modal for date events */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedDate ? format(selectedDate, 'do MMMM yyyy') : 'Events'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {eventsForSelectedDate.length > 0 ? (
              <ListGroup variant="flush">
                {eventsForSelectedDate.map((ev) => (
                  <ListGroup.Item key={ev._id}>
                    <div className="d-flex justify-content-between align-items-start">
                      <div style={{ flex: 1 }}>
                        <strong>{ev.title}</strong>
                        <p className="mb-1 small text-muted">{ev.details}</p>
                        {isPast(new Date(ev.date)) && ev.recordedSession && (
                          <a
                            href={ev.recordedSession}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm btn-outline-secondary mt-1"
                          >
                            🎥 Watch Recording
                          </a>
                        )}
                      </div>
                      <Badge pill bg={getStatusBadgeVariant(new Date(ev.date))}>
                        {isPast(new Date(ev.date)) && !isSameDay(new Date(ev.date), new Date())
                          ? 'Completed'
                          : isFuture(new Date(ev.date))
                          ? 'Upcoming'
                          : 'Today'}
                      </Badge>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p className="text-center mb-0">No events scheduled for this date.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* 🎨 Styles */}
        <style jsx>{`
          .styled-hr {
            border: none;
            height: 2px;
            width: 80%;
            margin: 3rem auto;
            background: linear-gradient(to right, transparent, #f36624, transparent);
            opacity: 0.5;
          }
          .event-day {
            position: relative;
          }
          .event-day::after {
            content: '';
            position: absolute;
            bottom: 6px;
            left: 50%;
            transform: translateX(-50%);
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #f36624;
          }
          .event-day.upcoming-date::after {
            background: #f36624;
          }
          .react-calendar__tile.upcoming-date {
            background: #fff8f0 !important;
            color: #f36624 !important;
            border: 2px dashed #f36624;
            font-weight: bold;
          }
          .custom-calendar {
            border-radius: 12px;
            overflow: hidden;
            background: #f9f9f9;
            padding: 1rem;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            max-width: 420px;
            width: 100%;
          }
          .react-calendar__tile {
            font-size: 1rem;
            padding: 1.2em 0.6em;
            color: #003366;
            background: transparent;
            border-radius: 10px;
            transition: all 0.2s ease-in-out;
          }
          .react-calendar__tile--now {
            background: #eaf4ff !important;
            border-radius: 10px;
            font-weight: bold;
            color: #003366;
            border: 2px solid #f36624;
          }
          .react-calendar__tile--active {
            background: #f36624 !important;
            color: #fff !important;
            font-weight: bold;
            border-radius: 10px;
            border: 2px solid #003366;
          }
          .react-calendar__tile:hover {
            background: #ffe3d4 !important;
            border-radius: 10px;
            color: #000;
          }
          .react-calendar__navigation button {
            font-weight: bold;
            color: #003366;
            font-size: 1.1rem;
            background: none;
          }
          .react-calendar__navigation button:disabled {
            color: #ccc;
          }
          .react-calendar__month-view__weekdays {
            text-align: center;
            text-transform: uppercase;
            font-weight: bold;
            color: #003366;
            font-size: 0.85rem;
            padding-bottom: 0.5rem;
          }
          .fade-in {
            animation: fadeIn 0.6s ease-in-out forwards;
            opacity: 0;
          }
          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }
        `}</style>
      </section>

      <Footer />
    </div>
  );
}
