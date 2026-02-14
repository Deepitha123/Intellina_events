import CategoryCard from './components/CategoryCard';

import { useNavigate } from 'react-router-dom';
import './events.css';

const Events = () => {
  const navigate = useNavigate();

  const voiceLines = {
    technical: {
      character: 'Dustin',
      audio: '/assets/events/audio/Dustin_Technical_audio.mpeg',
      subtitle: 'Check out our Technical Events. Over!'
    },
    nontech: {
      character: 'Max',
      audio: '/assets/events/audio/Max_Nontechnical_audio.mpeg',
      subtitle: 'Non-Tech Events - jump right in. Over!'
    },
    flagship: {
      character: 'Steve',
      audio: '/assets/events/audio/Steve_Flagship_audio.mpeg',
      subtitle: 'Flagship Events - don\'t miss these. Over!'
    }
  };

  return (
    <div className="page-events">
      <div
        className="events-container"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.9) 100%), url('/assets/events/images/events-bg.jpeg')"
        }}
      >
        {/* Upside Down Atmosphere */}
        <div className="upside-down-particles">
          <div className="spore"></div>
          <div className="spore"></div>
          <div className="spore"></div>
          <div className="spore"></div>
          <div className="spore"></div>
          <div className="spore"></div>
          <div className="spore"></div>
          <div className="spore"></div>
          <div className="spore"></div>
          <div className="spore"></div>
          <div className="spore"></div>
          <div className="spore"></div>
          <div className="spore"></div>
          <div className="spore"></div>
          <div className="spore"></div>
          <div className="spore"></div>
        </div>
        <div className="fog-layer"></div>

        {/* Overlay Content */}
        <div className="events-landing">
          <h1 className="events-landing-title stranger-font typing">
            Choose Your Gateway
          </h1>

          <div className="category-grid">
            <CategoryCard
              title="TECHNICAL EVENTS"
              subtitle="Innovate. Build. Compete."
              route="/events/technical"
              character={voiceLines.technical.character}
              audioSrc={voiceLines.technical.audio}
              subtitleText={voiceLines.technical.subtitle}
              clickAudioSrc="/assets/events/audio/Dustin_Technical_audio.mpeg"
            />
            <CategoryCard
              title="FLAGSHIP EVENTS"
              subtitle="The Main Gate."
              route="/events/flagship"
              character={voiceLines.flagship.character}
              audioSrc={voiceLines.flagship.audio}
              subtitleText={voiceLines.flagship.subtitle}
              clickAudioSrc="/assets/events/audio/Steve_Flagship_audio.mpeg"
            />
            <CategoryCard
              title="NON-TECH EVENTS"
              subtitle="Think. Play. Survive."
              route="/events/non-tech"
              character={voiceLines.nontech.character}
              audioSrc={voiceLines.nontech.audio}
              subtitleText={voiceLines.nontech.subtitle}
              clickAudioSrc="/assets/events/audio/Max_Nontechnical_audio.mpeg"
            />


          </div>

        </div>
      </div>
    </div>
  );
};

export default Events;
