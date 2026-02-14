import React, { useState, useEffect, useRef } from 'react';
import './WalkieTalkie.css';

const WalkieTalkie = ({ isActive, onComplete, character, audioSrc, subtitle, persistActive }) => {
    const [status, setStatus] = useState('idle'); // idle, transmitting
    const [currentSubtitle, setCurrentSubtitle] = useState('');
    const [showSubtitle, setShowSubtitle] = useState(false);
    const isMounted = useRef(true);

    // Audio Object Refs
    const voiceAudioRef = useRef(null);
    const clickAudioRef = useRef(null);
    const staticAudioRef = useRef(null);
    const squelchAudioRef = useRef(null);

    useEffect(() => {
        // Preload Voice
        if (audioSrc) {
            voiceAudioRef.current = new Audio(audioSrc);
            voiceAudioRef.current.load();
        }

        // Preload SFX
        clickAudioRef.current = new Audio('/assets/events/audio/walkie-click.mp3');
        clickAudioRef.current.load();

        staticAudioRef.current = new Audio('/assets/events/audio/walkie-static-loop.mp3');
        staticAudioRef.current.loop = true;
        staticAudioRef.current.volume = 0.2;
        staticAudioRef.current.load();

        squelchAudioRef.current = new Audio('/assets/events/audio/walkie-squelch.mp3');
        squelchAudioRef.current.load();

        return () => { isMounted.current = false; };
    }, [audioSrc]);

    useEffect(() => {
        if (isActive) {
            startTransmission();
        }
    }, [isActive]);

    const playAudioRef = (audioRef) => {
        return new Promise((resolve) => {
            const audio = audioRef.current;
            if (!audio) return resolve();

            audio.onended = resolve;
            audio.onerror = () => {
                console.warn(`Audio error/missing`);
                resolve();
            };
            audio.currentTime = 0;
            audio.play().catch(e => {
                console.warn("Audio play failed:", e);
                resolve();
            });
        });
    };

    const typeWriter = async (text) => {
        if (!text) return;
        setShowSubtitle(true);
        setCurrentSubtitle('');
        for (let i = 0; i < text.length; i++) {
            if (!isMounted.current) break;
            setCurrentSubtitle(prev => prev + text.charAt(i));
            await new Promise(r => setTimeout(r, 50)); // Slightly slower typing for readability
        }
        // Hold the text for a moment after typing
        await new Promise(r => setTimeout(r, 1000));
    };

    const startTransmission = async () => {
        setStatus('transmitting');

        try {
            // Sequence:
            // 1. Click
            await playAudioRef(clickAudioRef);

            // 2. Squelch + Static start
            if (staticAudioRef.current) {
                staticAudioRef.current.currentTime = 0;
                staticAudioRef.current.play().catch(() => { });
            }

            await playAudioRef(squelchAudioRef);

            // 3. Voice + Subtitle
            // Run subtitle concurrently with voice, but await BOTH
            await Promise.all([
                typeWriter(subtitle),
                playAudioRef(voiceAudioRef)
            ]);

            // 4. End transmission
            if (isMounted.current) {
                if (!persistActive) {
                    if (staticAudioRef.current) staticAudioRef.current.pause();
                    await playAudioRef(squelchAudioRef); // Squelch out
                }
            }

        } catch (err) {
            console.error("Transmission error:", err);
        }

        if (isMounted.current) {
            if (!persistActive) {
                setStatus('idle');
            }
            if (onComplete) onComplete();
        }
    };

    return (
        <div className={`walkie-talkie-container ${isActive ? 'active' : ''}`}>
            <div className="walkie-body">
                <div className="antenna"></div>
                <div className="signal-bars">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <div className="speaker-grill"></div>
                <div className={`led-indicator ${status === 'transmitting' ? 'on' : ''}`}></div>
                <div className="brand-label">StrangerCom</div>
                <div className={`ptt-button ${status === 'transmitting' ? 'pressed' : ''}`}></div>
            </div>

            {showSubtitle && (
                <div className="transmission-subtitle">
                    <span className="character-name">{character}:</span> {currentSubtitle}
                </div>
            )}
        </div>
    );
};

export default WalkieTalkie;
