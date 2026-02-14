import React, { useState } from 'react';
import './WalkieTalkieSimple.css';

const WalkieTalkieSimple = ({ onActivate, isUsed, showHint, isFocused, focusStyle }) => {
    const [isActive, setIsActive] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Handle click/tap activation
    const handleClick = () => {
        if (isUsed || isActive) return; // Prevent multiple activations

        setIsActive(true);

        // Play static crackle sound
        playStaticSound();

        // Play Mike's voice after a short delay
        setTimeout(() => {
            playVoiceMessage();
        }, 500);

        // Trigger parent callback (success sequence)
        if (onActivate) {
            onActivate();
        }

        // Keep active state for a few seconds
        setTimeout(() => {
            setIsActive(false);
        }, 4000);
    };

    // Placeholder for static crackle sound
    const playStaticSound = () => {
        console.log('🔊 Static crackle sound playing...');

        // Create a simple beep using Web Audio API as placeholder
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 200;
            oscillator.type = 'square';

            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            console.log('Audio not supported');
        }
    };

    // Placeholder for Mike's voice
    const playVoiceMessage = () => {
        console.log('🔊 Mike\'s voice: "El, we need you!"');

        // Create a simple tone as placeholder
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 300;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1.5);
        } catch (error) {
            console.log('Audio not supported');
        }
    };

    return (
        <div
            className={`walkie-talkie-simple ${isActive ? 'active' : ''} ${isUsed ? 'used' : ''} ${isHovered ? 'hovered' : ''} ${showHint && !isUsed && !isActive ? 'hint' : ''}`}
            onClick={handleClick}
            onMouseEnter={() => !isUsed && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                cursor: isUsed ? 'not-allowed' : 'pointer',
                ...(isFocused ? focusStyle : {})
            }}
            aria-label="Activate walkie-talkie to call Eleven"
            aria-describedby="walkie-hint"
            role="button"
            tabIndex={0}
        >
            <div id="walkie-hint" className="sr-only">
                Click to activate Mike's message, or press Enter
            </div>
            <svg
                width="60"
                height="100"
                viewBox="0 0 60 100"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Antenna - Yellow/Orange */}
                <line
                    x1="30"
                    y1="0"
                    x2="30"
                    y2="15"
                    stroke="#FFA500"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="antenna"
                />
                <circle
                    cx="30"
                    cy="0"
                    r="2"
                    fill="#FFD700"
                    className="antenna-tip"
                />

                {/* Main Body - Black/Dark Gray */}
                <rect
                    x="10"
                    y="15"
                    width="40"
                    height="75"
                    rx="5"
                    fill="url(#walkie-body-gradient)"
                    stroke="#1a1a1a"
                    strokeWidth="2"
                />

                {/* Screen/Display Area */}
                <rect
                    x="15"
                    y="22"
                    width="30"
                    height="15"
                    rx="2"
                    fill="#2d3748"
                    opacity="0.8"
                />

                {/* Red Indicator Light */}
                <circle
                    cx="30"
                    cy="45"
                    r="4"
                    fill={isActive ? '#ff0000' : '#4a0000'}
                    className="indicator-light"
                    filter={isActive ? 'url(#red-glow)' : 'none'}
                />

                {/* Speaker Grille Lines */}
                <g className="speaker-grille">
                    {[55, 60, 65, 70, 75].map((y) => (
                        <line
                            key={y}
                            x1="15"
                            y1={y}
                            x2="45"
                            y2={y}
                            stroke="#4a4a4a"
                            strokeWidth="1"
                            opacity="0.6"
                        />
                    ))}
                </g>

                {/* Side Button (PTT - Push To Talk) */}
                <rect
                    x="7"
                    y="40"
                    width="3"
                    height="12"
                    rx="1"
                    fill="#555555"
                />

                {/* Gradient Definitions */}
                <defs>
                    <linearGradient id="walkie-body-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3d3d3d" />
                        <stop offset="50%" stopColor="#2a2a2a" />
                        <stop offset="100%" stopColor="#1a1a1a" />
                    </linearGradient>

                    {/* Red glow filter for active state */}
                    <filter id="red-glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
            </svg>

            {/* Activation Tooltip */}
            {!isUsed && !isActive && (
                <div className="walkie-tooltip">
                    Click to Call! 📻
                </div>
            )}

            {/* Voice Message Display */}
            {isActive && (
                <div className="voice-message">
                    "El, we need you!"
                </div>
            )}
        </div>
    );
};

export default WalkieTalkieSimple;
