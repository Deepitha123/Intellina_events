import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import EventCard from './components/EventCard';
import DiceRoller from './components/DiceRoller';
import ParticlesBackground from './components/ParticlesBackground';
import BackButton from './components/BackButton';
import './events.css';

const NonTech = () => {
  const navigate = useNavigate();
  // ... events data ...
  const events = [
    {
      name: 'Big Boss',
      slug: 'bigboss',
      tagline: 'Strategy, Survival & Social Dynamics In The Ultimate Reality Challenge',
      prize: '₹ 3,500 *',
      image: '/assets/events/images/Biggboss.jpeg'
    },
    {
      name: 'IPL Auction',
      slug: 'ipl-auction',
      tagline: 'Bid Smart, Build Teams & Dominate The Cricket Empire',
      prize: '₹ 3,000 *',
      image: '/assets/events/images/IPLAuction.jpeg'
    },
    {
      name: 'Treasure Hunt',
      slug: 'treasure-hunt',
      tagline: 'Navigate The Unknown, Crack Codes & Discover Hidden Treasures',
      prize: '₹ 4,000 *',
      image: '/assets/events/images/TreasureHunt.jpeg'
    },
    {
      name: 'Connections',
      slug: 'connections',
      tagline: 'Link The Clues, Find Patterns & Master The Art Of Association',
      prize: '₹ 3,500 *',
      image: '/assets/events/images/Connections.jpeg'
    },
    {
      name: 'Murder Mystery',
      slug: 'murder-mystery',
      tagline: 'Unravel Secrets, Follow Clues & Solve The Enigma',
      prize: '₹ 2,500 *',
      image: '/assets/events/images/Murder Mystery.jpeg'
    },
    {
      name: 'Snap-Sense',
      slug: 'snap-sense',
      tagline: 'Sense the moment, capture the magic, win the game',
      prize: '₹ 2,500 *',
      image: '/assets/events/images/SnapSense.jpeg'
    }
  ];

  const handleEventClick = (slug) => {
    navigate(`/events/non-tech/${slug}`);
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

        <DiceRoller category="non-tech" />


        <div className="event-list-container">
          <motion.div
            className="event-list-header"
            initial="hidden"
            animate="visible"
            variants={headerVariants}
          >
            <h1 className="event-list-title stranger-font">NON-TECH EVENTS</h1>
            <p className="event-list-description">Think. Play. Survive.</p>
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
                  key={index}
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

export default NonTech;
