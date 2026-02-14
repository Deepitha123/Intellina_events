import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { eventsData } from './data/eventsData';
import './EventDescription.css';

const EventDescription = () => {
  const { category, eventId } = useParams();
  const navigate = useNavigate();

  // Fetch event details dynamically
  const eventDetails = eventsData[category]?.[eventId];

  const handleClose = () => {
    navigate(-1);
  };

  // Handle back button visibility
  useEffect(() => {
    document.body.classList.add('modal-active');
    return () => {
      document.body.classList.remove('modal-active');
    };
  }, []);

  // ESC key support
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Safety fallback
  if (!eventDetails) {
    return (
      <div className="event-desc-overlay">
        <div className="event-desc-card">
          <h2 style={{ color: '#fff' }}>Event not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="event-desc-overlay">
      <div className="event-desc-card">

        {/* Close Button */}
        <button className="close-btn" onClick={handleClose}>
          X
        </button>

        <div className="event-desc-layout">

          {/* LEFT COLUMN */}
          <div className="event-desc-left">
            <h1 className="event-desc-title" data-text={eventDetails.title}>
              {eventDetails.title}
            </h1>

            <p className="event-desc-hero-text">
              {eventDetails.description}
            </p>

            {/* Glowing Prize Section - VISIBLE BELOW DESCRIPTION */}
            <div className="premium-prize-card">
              <div className="prize-glitch-bg"></div>
              <div className="prize-content">
                <div className="prize-header">
                  <div className="trophy-icon">🏆</div>
                  <span className="prize-label">GRAND PRIZE POOL</span>
                </div>
                <div className="prize-amount-3d">
                  <span className="currency-symbol">₹</span>
                  <span className="amount-digit">{eventDetails.prizes}</span>
                  <span className="asterisk">*</span>
                </div>
                <div className="prize-aura"></div>
              </div>
            </div>

            {/* QUICK INFO GRID - Date, Timing, Team Size */}
            <div className="event-quick-info-grid">
              <div className="info-card schedule-card">
                <div className="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <div className="info-text">
                  <span className="info-label">SCHEDULE</span>
                  <span className="info-value">{eventDetails.day}- {eventDetails.time}</span>
                </div>
              </div>

              <div className="info-card team-card">
                <div className="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <div className="info-text">
                  <span className="info-label">TEAM SIZE</span>
                  <span className="info-value">{eventDetails.teamSize}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="event-actions">
              <button className="register-btn">
                SECURE YOUR SPOT NOW
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="event-desc-right">
            <div className="event-media-container">
              <img
                src={eventDetails.poster}
                alt={eventDetails.title}
                className="event-media"
              />
              <div className="media-overlay"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventDescription;
