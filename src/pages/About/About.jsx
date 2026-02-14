import React, { useState, useEffect } from "react";
import "./About.css";
import AboutCIT from "./components/AboutCIT";
import AboutIntellina from "./components/AboutIntellina";
import DomeGallery from "./components/DomeGallery";
import SpotlightCard from "./components/SpotlightCard";

// Floating Particles Component
function FloatingParticles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 80; i++) {
      const isBlue = Math.random() > 0.5;
      const size = Math.random() * 12 + 8; // Bigger particles: 8-20px
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: size,
        duration: Math.random() * 8 + 6, // Faster motion: 6-14s
        delay: Math.random() * 5,
        color: isBlue ? '51, 102, 204' : '255, 51, 51',
        moveX: (Math.random() - 0.5) * 100, // Random horizontal movement
        moveY: (Math.random() - 0.5) * 100, // Random vertical movement
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, rgba(${particle.color}, 0.9), rgba(${particle.color}, 0.4) 50%, transparent)`,
            boxShadow: `0 0 ${particle.size * 4}px rgba(${particle.color}, 0.8), 0 0 ${particle.size * 2}px rgba(${particle.color}, 0.6)`,
            animation: `float-particle-big ${particle.duration}s ${particle.delay}s ease-in-out infinite`,
            '--move-x': `${particle.moveX}px`,
            '--move-y': `${particle.moveY}px`,
          }}
        />
      ))}
    </div>
  );
}

export default function About() {
  return (
    <div className="page-about">
      <FloatingParticles />
      <div className="about-container">
        <div className="about-header">
          <h1>Our Journey</h1>
        </div>

        <AboutCIT />

        {/* About the Department Section */}
        <div className="department-section">
          <h2 className="department-heading">About the Department</h2>
          <div className="vision-mission-container">
            <div className="about-box-half">
              <div className="about-box-inner">
                <h2 className="stat-number">Our Vision</h2>
                <div className="about-content">
                  <p>
                    The vision for AI and Data Science (AI&DS) centers on creating autonomous, ethical systems that drive real-world value through scalable intelligence, hyper-personalization, and data-driven transformation across industries. By 2026 and beyond, this field aims to integrate AI factories, agentic systems, and quantum-enhanced analytics to surpass human-scale problem-solving while prioritizing governance and fairness
                  </p>
                </div>
              </div>
            </div>
            <div className="about-box-half">
              <div className="about-box-inner">
                <h2 className="stat-number">Our Mission</h2>
                <div className="about-content">
                  <p>
                    Our mission in AI and Data Science (AI&DS) is to empower innovative learners and developers with cutting-edge tools, ethical frameworks, and practical skills for building transformative solutions in healthcare, security, and beyond. In Coimbatore and globally, we cultivate hands-on expertise in ML engineering, hackathon projects, and real-world AI applications to foster data-literate innovators driving equitable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Intellina Overview */}
        <div className="section-heading-container">
          <h2 className="section-heading">Intellina Overview</h2>
        </div>

        <AboutIntellina />

        {/* Top Event Features */}
        <div className="section-heading-container">
          <h2 className="section-heading">Top Event Features</h2>
        </div>

        <div className="event-features-container">
          <SpotlightCard spotlightColor="rgba(255, 42, 26, 0.3)">
            <h3>National-level technical symposium</h3>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(255, 42, 26, 0.3)">
            <h3><span style={{ color: '#4a90e2' }}>20+</span> technical and non-technical events</h3>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(255, 42, 26, 0.3)">
            <h3>Industry experts as judges and speakers</h3>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(255, 42, 26, 0.3)">
            <h3>Prize pool of <span style={{ color: '#4a90e2' }}>100K</span></h3>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(255, 42, 26, 0.3)">
            <h3>Last year participants of <span style={{ color: '#4a90e2' }}>5K</span></h3>
          </SpotlightCard>
        </div>

        {/* Gallery Section */}
        <div className="section-heading-container" style={{ marginTop: '4rem' }}>
          <h2 className="section-heading">Our Gallery</h2>
        </div>
        <div style={{ height: '600px', position: 'relative', margin: '2rem 0' }}>
          <DomeGallery grayscale={false} />
        </div>
      </div>
      <style>{`
        @keyframes float-particle-big {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 0.5;
          }
          25% {
            transform: translate(var(--move-x), calc(var(--move-y) * 0.5)) scale(1.3) rotate(90deg);
            opacity: 0.8;
          }
          50% {
            transform: translate(calc(var(--move-x) * -0.7), var(--move-y)) scale(0.9) rotate(180deg);
            opacity: 1;
          }
          75% {
            transform: translate(calc(var(--move-x) * 0.5), calc(var(--move-y) * -0.8)) scale(1.2) rotate(270deg);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}
