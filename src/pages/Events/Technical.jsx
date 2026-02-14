import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import EventCard from './components/EventCard';
import DiceRoller from './components/DiceRoller';
import ParticlesBackground from './components/ParticlesBackground';
import BackButton from './components/BackButton';
import './events.css';

const Technical = () => {
  const navigate = useNavigate();
  const events = [
    {
      name: 'Paper Presentation',
      slug: 'paper-presentation',
      tagline: 'Present Your Research & Ideas To The World Of Innovation',
      prize: '₹ 5,000 *',
      image: '/assets/events/images/paperpresentation.jpg'
    },
    {
      name: 'Hackathon',
      slug: 'hackathon',
      tagline: 'Code Through The Night, Build The Future In 24 Hours',
      prize: '₹ 25,000 *',
      image: '/assets/events/images/Hackathon.jpeg'
    },
    {
      name: 'RRR',
      slug: 'rrr',
      tagline: 'React, Respond & Resolve: The Ultimate Tech Quiz',
      prize: '₹ 5,000 *',
      image: '/assets/events/images/RRR.jpeg'
    },
    {
      name: 'Project Expo',
      slug: 'project-expo',
      tagline: 'Showcase Your Innovation & Engineering Excellence',
      prize: '₹ 8,000 *',
      image: '/assets/events/images/ProjectExpo.jpeg'
    },
    {
      name: 'Worst UI',
      slug: 'worst-ui',
      tagline: 'Create The Most Hilariously Terrible User Interface',
      prize: '₹ 5,000 *',
      image: '/assets/events/images/WorstUI.jpeg'
    },
    {
      name: 'Web Design',
      slug: 'web-design',
      tagline: 'Craft Digital Experiences That Captivate & Connect',
      prize: '₹ 5,000 *',
      image: '/assets/events/images/WebDesign.jpeg'
    }
  ];

  const handleEventClick = (slug) => {
    navigate(`/events/technical/${slug}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "backOut" }
    }
  };

  return (
    <div className="page-events">
      <div
        className="events-container events-transparent-bg"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.9) 100%), url('/assets/events/images/events-bg.jpeg')"
        }}
      >
        <BackButton />
        <ParticlesBackground />

        <DiceRoller category="technical" />


        <div className="event-list-container">
          <motion.div
            className="event-list-header"
            initial="hidden"
            animate="visible"
            variants={headerVariants}
          >
            <h1 className="event-list-title stranger-font">TECHNICAL EVENTS</h1>
            <p className="event-list-description">Innovate. Build. Compete.</p>
          </motion.div>

          <motion.div
            className="event-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {events.map((event, index) => (
              <motion.div key={index} variants={itemVariants}>
                <EventCard
                  name={event.name}
                  tagline={event.tagline}
                  prize={event.prize}
                  image={event.image}
                  onClick={() => handleEventClick(event.slug)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Technical;
