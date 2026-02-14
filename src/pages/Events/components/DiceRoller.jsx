import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import flattenedEvents from '../data/eventsData';

// Face colors - shuffled 10 red and 10 blue
const FACE_COLORS = {
  1: 'red', 2: 'blue', 3: 'red', 4: 'blue', 5: 'red',
  6: 'blue', 7: 'red', 8: 'blue', 9: 'red', 10: 'blue',
  11: 'red', 12: 'blue', 13: 'red', 14: 'blue', 15: 'red',
  16: 'blue', 17: 'red', 18: 'blue', 19: 'red', 20: 'blue'
};

const DiceRoller = ({ category = 'technical' }) => {
  const navigate = useNavigate();
  const [currentFace, setCurrentFace] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isCentering, setIsCentering] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const timeoutRef = useRef(null);
  const categoryNames = {
    'technical': 'Technical',
    'non-tech': 'Non-Tech',
    'flagship': 'Flagship'
  };

  useEffect(() => {
    // Tooltip prompt every 15 seconds
    const interval = setInterval(() => {
      setShowPrompt(true);
      setTimeout(() => setShowPrompt(false), 5000);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const randomFace = () => {
    return Math.floor(Math.random() * 20) + 1;
  };

  const handleRoll = () => {
    if (isRolling || isCentering) return;

    setIsCentering(true);
    setShowResult(false);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Stage 1: Move to center (0.6s)
    timeoutRef.current = setTimeout(() => {
      setIsCentering(false);
      setIsRolling(true);

      // Stage 2: Roll in center (1s)
      timeoutRef.current = setTimeout(() => {
        const face = randomFace();
        setCurrentFace(face);
        setIsRolling(false);
        setIsCentering(true); // Hold centered

        // Stage 3: Dramatic Reveal Sequence
        timeoutRef.current = setTimeout(() => {
          // Step 1: 3-2-1 Countdown
          setCountdown(3);

          const countdownInterval = setInterval(() => {
            setCountdown(prev => {
              if (prev === 1) {
                clearInterval(countdownInterval);
                // Step 2: Typing Animation
                setTimeout(() => {
                  setCountdown(null);
                  setShowTyping(true);

                  // Step 3: Screen Shake and Reveal
                  setTimeout(() => {
                    setIsShaking(true);
                    setTimeout(() => {
                      setIsShaking(false);
                      setShowTyping(false);
                      setIsCentering(false);

                      // Final Reveal
                      const categoryEvents = flattenedEvents.filter(e => e.category === category);
                      if (categoryEvents.length > 0) {
                        const randomEvent = categoryEvents[Math.floor(Math.random() * categoryEvents.length)];
                        setSelectedEvent(randomEvent);
                        setShowResult(true);
                      }
                    }, 800);
                  }, 2000); // Wait for typing
                }, 1000);
                return 1;
              }
              return prev - 1;
            });
          }, 1000);
        }, 200);
      }, 1000);
    }, 600);
  };

  const handleViewDetails = () => {
    if (selectedEvent) {
      navigate(`/events/${selectedEvent.category}/${selectedEvent.slug}`);
      setShowResult(false);
    }
  };

  useEffect(() => {
    if (showResult) {
      document.body.classList.add('modal-active');
    } else {
      document.body.classList.remove('modal-active');
    }
  }, [showResult]);

  useEffect(() => {
    return () => {
      document.body.classList.remove('modal-active');
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes roll {
          10% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) }
          30% { transform: rotateX(120deg) rotateY(240deg) rotateZ(0deg) translateX(40px) translateY(40px) }
          50% { transform: rotateX(240deg) rotateY(480deg) rotateZ(0deg) translateX(-40px) translateY(-40px) }
          70% { transform: rotateX(360deg) rotateY(720deg) rotateZ(0deg) }
          90% { transform: rotateX(480deg) rotateY(960deg) rotateZ(0deg) }
        }

        @keyframes slowRotate {
          from { transform: rotateX(-30deg) rotateY(0deg); }
          to { transform: rotateX(-30deg) rotateY(360deg); }
        }

        .dice-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 50;
          width: 140px;
          height: 140px;
          perspective: 1200px;
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform: scale(0.65);
          transform-origin: bottom right;
        }

        @media (max-width: 768px) {
          .dice-container {
            bottom: 15px;
            right: 15px;
            transform: scale(0.5);
          }
        }

        @media (max-width: 480px) {
          .dice-container {
            bottom: 10px;
            right: 10px;
            transform: scale(0.45);
          }
        }

        .dice-container.centered {
          bottom: 50%;
          right: 50%;
          transform: translate(50%, 50%) scale(1.2);
          transform-origin: center center;
        }

        .die {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.5s ease-out;
          cursor: pointer;
        }

        .die.idle {
          animation: slowRotate 20s linear infinite;
        }

        .die:hover {
          transform: scale(1.1);
        }

        .die.rolling {
          animation: roll 1s linear infinite;
        }

        .die[data-face="1"] { transform: rotateX(-53deg) rotateY(0deg); }
        .die[data-face="2"] { transform: rotateX(-53deg) rotateY(72deg); }
        .die[data-face="3"] { transform: rotateX(-53deg) rotateY(144deg); }
        .die[data-face="4"] { transform: rotateX(-53deg) rotateY(216deg); }
        .die[data-face="5"] { transform: rotateX(-53deg) rotateY(288deg); }
        
        .die[data-face="6"] { transform: rotateX(-11deg) rotateZ(180deg) rotateY(0deg); }
        .die[data-face="7"] { transform: rotateX(-11deg) rotateZ(180deg) rotateY(72deg); }
        .die[data-face="8"] { transform: rotateX(-11deg) rotateZ(180deg) rotateY(144deg); }
        .die[data-face="9"] { transform: rotateX(-11deg) rotateZ(180deg) rotateY(216deg); }
        .die[data-face="10"] { transform: rotateX(-11deg) rotateZ(180deg) rotateY(288deg); }
        
        .die[data-face="11"] { transform: rotateX(-11deg) rotateY(-36deg); }
        .die[data-face="12"] { transform: rotateX(-11deg) rotateY(36deg); }
        .die[data-face="13"] { transform: rotateX(-11deg) rotateY(108deg); }
        .die[data-face="14"] { transform: rotateX(-11deg) rotateY(180deg); }
        .die[data-face="15"] { transform: rotateX(-11deg) rotateY(252deg); }
        
        .die[data-face="16"] { transform: rotateX(127deg) rotateY(-36deg); }
        .die[data-face="17"] { transform: rotateX(127deg) rotateY(36deg); }
        .die[data-face="18"] { transform: rotateX(127deg) rotateY(108deg); }
        .die[data-face="19"] { transform: rotateX(127deg) rotateY(180deg); }
        .die[data-face="20"] { transform: rotateX(127deg) rotateY(252deg); }

        .face {
          position: absolute;
          left: 50%;
          top: 0;
          margin: 0 -40px;
          border-left: 40px solid transparent;
          border-right: 40px solid transparent;
          width: 0;
          height: 0;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        .face.red {
          border-bottom: 68.8px solid rgba(220, 38, 38, 0.9);
        }

        .face.blue {
          border-bottom: 68.8px solid rgba(29, 78, 216, 0.9);
        }

        .face::before {
          position: absolute;
          top: 17.2px;
          left: -80px;
          color: #fff;
          text-shadow: 2px 2px 4px #000;
          font-size: 34.4px;
          font-weight: bold;
          text-align: center;
          line-height: 61.92px;
          width: 160px;
          height: 68.8px;
        }

        .face-1::before { content: '1'; }
        .face-2::before { content: '2'; }
        .face-3::before { content: '3'; }
        .face-4::before { content: '4'; }
        .face-5::before { content: '5'; }
        .face-6::before { content: '6'; }
        .face-7::before { content: '7'; }
        .face-8::before { content: '8'; }
        .face-9::before { content: '9'; }
        .face-10::before { content: '10'; }
        .face-11::before { content: '11'; }
        .face-12::before { content: '12'; }
        .face-13::before { content: '13'; }
        .face-14::before { content: '14'; }
        .face-15::before { content: '15'; }
        .face-16::before { content: '16'; }
        .face-17::before { content: '17'; }
        .face-18::before { content: '18'; }
        .face-19::before { content: '19'; }
        .face-20::before { content: '20'; }

        /* Face positions - Top ring (1-5) */
        .face-1 { transform: rotateY(0deg) translateZ(26.8px) translateY(-10.32px) rotateX(53deg); }
        .face-2 { transform: rotateY(-72deg) translateZ(26.8px) translateY(-10.32px) rotateX(53deg); }
        .face-3 { transform: rotateY(-144deg) translateZ(26.8px) translateY(-10.32px) rotateX(53deg); }
        .face-4 { transform: rotateY(-216deg) translateZ(26.8px) translateY(-10.32px) rotateX(53deg); }
        .face-5 { transform: rotateY(-288deg) translateZ(26.8px) translateY(-10.32px) rotateX(53deg); }

        /* Middle upper ring (6-10) */
        .face-6 { transform: rotateY(0deg) translateZ(60px) translateY(43.344px) rotateZ(180deg) rotateX(-11deg); }
        .face-7 { transform: rotateY(-72deg) translateZ(60px) translateY(43.344px) rotateZ(180deg) rotateX(-11deg); }
        .face-8 { transform: rotateY(-144deg) translateZ(60px) translateY(43.344px) rotateZ(180deg) rotateX(-11deg); }
        .face-9 { transform: rotateY(-216deg) translateZ(60px) translateY(43.344px) rotateZ(180deg) rotateX(-11deg); }
        .face-10 { transform: rotateY(-288deg) translateZ(60px) translateY(43.344px) rotateZ(180deg) rotateX(-11deg); }

        /* Middle lower ring (11-15) */
        .face-11 { transform: rotateY(-36deg) translateZ(60px) translateY(43.344px) rotateX(-11deg); }
        .face-12 { transform: rotateY(36deg) translateZ(60px) translateY(43.344px) rotateX(-11deg); }
        .face-13 { transform: rotateY(108deg) translateZ(60px) translateY(43.344px) rotateX(-11deg); }
        .face-14 { transform: rotateY(180deg) translateZ(60px) translateY(43.344px) rotateX(-11deg); }
        .face-15 { transform: rotateY(252deg) translateZ(60px) translateY(43.344px) rotateX(-11deg); }

        /* Bottom ring (16-20) */
        .face-16 { transform: rotateY(36deg) translateZ(26.8px) translateY(96.864px) rotateZ(180deg) rotateX(53deg); }
        .face-17 { transform: rotateY(108deg) translateZ(26.8px) translateY(96.864px) rotateZ(180deg) rotateX(53deg); }
        .face-18 { transform: rotateY(180deg) translateZ(26.8px) translateY(96.864px) rotateZ(180deg) rotateX(53deg); }
        .face-19 { transform: rotateY(252deg) translateZ(26.8px) translateY(96.864px) rotateZ(180deg) rotateX(53deg); }
        .face-20 { transform: rotateY(324deg) translateZ(26.8px) translateY(96.864px) rotateZ(180deg) rotateX(53deg); }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes borderPulse {
          0%, 100% { border-color: rgba(255, 43, 43, 0.6); box-shadow: 0 0 30px rgba(255, 0, 0, 0.2); }
          50% { border-color: rgba(255, 43, 43, 1); box-shadow: 0 0 60px rgba(255, 0, 0, 0.5); }
        }
        @keyframes rotateDie {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes portalSwirl {
          from { transform: rotate(0deg) scale(0.8); opacity: 0.3; }
          50% { transform: rotate(180deg) scale(1.1); opacity: 0.6; }
          to { transform: rotate(360deg) scale(0.8); opacity: 0.3; }
        }
        @keyframes shake {
          0%, 100% { transform: translate(0, 0); }
          10%, 30%, 50%, 70%, 90% { transform: translate(-15px, -8px); }
          20%, 40%, 60%, 80% { transform: translate(15px, 8px); }
        }
        @keyframes countdownPop {
          0% { transform: scale(4); opacity: 0; filter: blur(10px); }
          50% { transform: scale(1); opacity: 1; filter: blur(0px); }
          100% { transform: scale(0.2); opacity: 0; filter: blur(5px); }
        }
        @keyframes typing {
          from { width: 0 }
          to { width: 24ch }
        }
        @keyframes blink {
          50% { border-color: transparent }
        }
        @keyframes dieImplode {
          0% { transform: scale(1.5); opacity: 1; }
          100% { transform: scale(4); opacity: 0; filter: blur(20px); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        .countdown-number {
          animation: countdownPop 1s ease-in-out forwards;
        }
        .typing-text {
          overflow: hidden;
          white-space: nowrap;
          /* Removed border-right as per user request to remove red lines */
          animation: typing 1.5s steps(22, end) forwards; /* Adjusted steps to char count approx */
          display: inline-block;
          text-align: center;
          font-size: 30px;
        }

        @media (max-width: 768px) {
          .typing-text {
            font-size: 18px;
            letter-spacing: 0.2em;
          }
        }

        @media (max-width: 480px) {
          .typing-text {
            font-size: 14px;
            letter-spacing: 0.15em;
          }
        }
        .die-implode {
          animation: dieImplode 0.8s ease-out forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
        .modal-border-pulse {
          animation: borderPulse 3s ease-in-out infinite;
        }
        .die-icon-rotate {
          animation: rotateDie 10s linear infinite;
        }
        .portal-swirl {
          animation: portalSwirl 6s linear infinite;
        }
        .energy-charge::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: none;
        }
        .energy-charge:hover::before {
          animation: energyFill 0.8s ease-out forwards;
        }
      `}</style>

      {/* Dice Tooltip Prompt */}
      {(showPrompt || isHovered) && !isRolling && !isCentering && !showResult && countdown === null && !showTyping && (
        <div className="fixed bottom-[130px] md:bottom-[130px] max-md:bottom-[105px] max-sm:bottom-[90px] right-[25px] z-[60] animate-fadeIn pointer-events-none">
          <div className="bg-black text-white px-5 py-3 rounded-xl border border-red-500/50 shadow-[0_0_20px_rgba(255,0,0,0.4)] relative">
            <p className="text-sm font-bold tracking-wider uppercase">Tap Your Lucky Event!</p>
            <div className="absolute bottom-[-8px] right-[40px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-black"></div>
            <div className="absolute bottom-[-9px] right-[40px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-red-500/50 -z-10"></div>
          </div>
        </div>
      )}

      {/* Countdown Overlay */}
      {countdown !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-[110] pointer-events-none">
          <div key={countdown} className="text-[200px] font-black text-[#ff1a1a] countdown-number"
            style={{ fontFamily: "'Orbitron', sans-serif", textShadow: '0 0 50px rgba(255,0,0,0.8)' }}>
            {countdown}
          </div>
        </div>
      )}

      {/* Typing Reveal Overlay */}
      {showTyping && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-[110] pointer-events-none">
          <div className="typing-text text-3xl font-black text-white uppercase tracking-[0.5em] mb-4 shadow-[0_0_30px_rgba(255,0,0,0.3)]"
            style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Your Lucky event is...
          </div>
        </div>
      )}

      {/* Dice in bottom right corner */}
      <div
        className={`dice-container ${(isRolling || isCentering || countdown !== null || showTyping) ? 'centered' : ''} ${isShaking ? 'animate-shake' : ''} ${isShaking ? 'die-implode' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`die ${isRolling ? 'rolling' : 'idle'}`}
          data-face={currentFace}
          onClick={handleRoll}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
            <div
              key={num}
              className={`face face-${num} ${FACE_COLORS[num]}`}
            />
          ))}
        </div>
      </div>

      {/* Result Modal */}
      {showResult && selectedEvent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] animate-fadeIn backdrop-blur-xl">
          {/* Vignette Spotlight Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none"></div>

          <div className="bg-[#080808] rounded-2xl p-6 sm:p-8 max-w-lg w-full mx-4 border-2 border-[#ff2b2b]/60 modal-border-pulse animate-scaleIn relative overflow-hidden">
            {/* Internal Atmospheric Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.1),transparent_70%)] pointer-events-none"></div>

            <div className="text-center relative z-10">
              {/* Rotating/Hover-reactive Die */}
              <div className="relative inline-block mb-4 group/die">
                <div className="absolute inset-0 bg-red-600/20 blur-2xl rounded-full opacity-0 group-hover/die:opacity-100 transition-opacity duration-500"></div>
                <div className="text-5xl sm:text-6xl die-icon-rotate cursor-help transition-transform duration-500 group-hover/die:scale-125 drop-shadow-[0_0_20px_rgba(255,0,0,0.5)]">
                  🎲
                </div>
              </div>

              <h2 className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold mb-3 opacity-70">Sync Complete</h2>

              <h3 className="text-white text-xl sm:text-2xl lg:text-3xl mb-4 uppercase tracking-normal leading-snug px-4"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 900,
                  textShadow: '0 0 20px rgba(255,0,0,0.8), 0 0 40px rgba(255,0,0,0.4)',
                  wordBreak: 'break-word',
                  hyphens: 'auto'
                }}>
                {selectedEvent.title}
              </h3>

              <div className="mb-5">
                <div className="flex items-center justify-between bg-white/5 rounded-lg px-5 py-2.5 border border-white/10">
                  <span className="text-gray-400 text-[10px] uppercase tracking-[0.1em] font-semibold">Event Category</span>
                  <span className="text-[#ff2b2b] font-black uppercase text-xs tracking-wider animate-pulse drop-shadow-[0_0_5px_rgba(255,0,0,0.5)]">{categoryNames[category] || category}</span>
                </div>
              </div>

              <div className="mb-5 px-1">
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed italic border-l-2 border-[#ff2b2b]/40 pl-4 pr-1 text-left font-light">
                  "{selectedEvent.description}"
                </p>
              </div>

              {/* Prize Section (Simplified - Breakdown Removed) */}
              <div className="bg-red-950/10 border border-[#ff2b2b]/30 rounded-xl p-4 mb-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 blur-3xl rounded-full pointer-events-none"></div>

                <div className="relative z-10 text-center">
                  <p className="text-[#ff2b2b] text-[10px] uppercase tracking-[0.2em] mb-1.5 font-bold opacity-90">Total Prizes Worth</p>
                  <p className="text-white text-2xl sm:text-3xl font-black tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    ₹ {selectedEvent.prizes} <span className="text-[#ff2b2b]">*</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-1">
                <button
                  onClick={handleViewDetails}
                  className="flex-[2] relative overflow-hidden bg-[#ff1a1a] text-white font-black uppercase tracking-[0.12em] py-3 px-6 rounded-lg transition-all duration-300 transform group/btn active:scale-95 shadow-[0_0_30px_rgba(255,0,0,0.3)] energy-charge"
                  style={{ fontSize: '11px', letterSpacing: '0.1em' }}
                >
                  {/* Portal Swirl behind button on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="w-48 h-48 bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.4),transparent)] rounded-full portal-swirl blur-sm"></div>
                  </div>
                  <span className="relative z-10 group-hover/btn:scale-110 transition-transform">Enter Portal</span>
                </button>
                <button
                  onClick={() => setShowResult(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white font-bold uppercase tracking-[0.08em] py-3 px-6 rounded-lg transition-all duration-300 border border-white/10"
                  style={{ fontSize: '11px' }}
                >
                  Abort
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DiceRoller;
