import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WalkieTalkie from './WalkieTalkie';

const CategoryCard = ({ title, subtitle, route, character, audioSrc, subtitleText, clickAudioSrc, onReadyToNavigate }) => {
  const navigate = useNavigate();
  const [isTransmitting, setIsTransmitting] = useState(false);
  const clickAudioRef = React.useRef(null);

  // Preload audio
  React.useEffect(() => {
    if (clickAudioSrc) {
      clickAudioRef.current = new Audio(clickAudioSrc);
      clickAudioRef.current.load();
    }
  }, [clickAudioSrc]);

  const handleClick = () => {
    if (isTransmitting) return; // Prevent double clicks

    // Play click audio immediately if provided
    if (clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play().catch(error => {
        console.error('Error playing click audio:', error);
      });
    }

    setIsTransmitting(true);

    // Navigate at exactly 7 seconds after clicking
    setTimeout(() => {
      if (onReadyToNavigate) {
        onReadyToNavigate(route);
      } else {
        navigate(route);
      }
    }, 7000);
  };

  const handleTransmissionComplete = () => {
    // No longer handling navigation here as it's now precisely 7s from click
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`category-card ${isTransmitting ? 'transmitting' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      role="button"
      tabIndex={0}
      aria-label={`Navigate to ${title}`}
    >
      <div className="card-content-wrapper">
        <h2 className="category-card-title">{title}</h2>
        <p className="category-card-subtitle">{subtitle}</p>
      </div>

      <WalkieTalkie
        isActive={isTransmitting}
        onComplete={handleTransmissionComplete}
        character={character}
        audioSrc={audioSrc}
        subtitle={subtitleText}
        persistActive={true}
      />
    </div>
  );
};

export default CategoryCard;
