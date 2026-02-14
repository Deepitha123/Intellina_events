import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import EventCard from './components/EventCard';
import DiceRoller from './components/DiceRoller';
import ParticlesBackground from './components/ParticlesBackground';
import BackButton from './components/BackButton';
import './events.css';

const Flagship = () => {
  const navigate = useNavigate();

  const flagshipEvents = [
    {
      name: 'GPTathon',
      tagline: 'The Ultimate Challenge: Where Legends Are Made',
      prize: '₹ 8,000 *',
      image: '/assets/events/images/GPTathon.jpeg',
      slug: 'gptathon'
    },
    {
      name: 'Rapid Chess',
      tagline: 'Test Your Strategic Thinking & Speed In The Ultimate Chess Battle',
      prize: 'As per announcement *',
      image: '/assets/events/images/RapidChess.jpeg',
      slug: 'rapid-chess'
    },
    {
      name: 'Object Odyssey',
      tagline: 'A thrilling hunt for hidden objects that sharpens your mind.',
      prize: '₹ 1,500 *',
      image: '/assets/events/images/ObjectOdyssey.jpeg',
      slug: 'object-odyssey'
    },
    {
      name: 'E-Sports',
      tagline: 'Battle In Virtual Arenas, Prove Your Gaming Supremacy',
      prize: '₹ 7,000 *',
      image: '/assets/events/images/E-sports.jpeg',
      slug: 'esports'
    }
  ];

  const handleEventClick = (slug) => {
    navigate(`/events/flagship/${slug}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
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

        <DiceRoller category="flagship" />


        <div className="event-list-container">
          <motion.div
            className="event-list-header"
            initial="hidden"
            animate="visible"
            variants={headerVariants}
          >
            <h1 className="event-list-title stranger-font">FLAGSHIP EVENTS</h1>
            <p className="event-list-description">The Main Gate.</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '40px',
              maxWidth: '1500px',
              margin: '60px auto',
            }}
          >
            {flagshipEvents.map((event, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
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

export default Flagship;
