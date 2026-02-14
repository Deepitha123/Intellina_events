import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MagicBento } from '../../utils/MagicBento';
import { TornPaperEffect } from '../../utils/TornPaperEffect';
import { initParticles } from '../../utils/Particle';
import { FuzzyText } from '../../utils/FuzzyText';
import { Countdown } from '../../utils/Countdown';
import { ParticleRing } from '../../utils/ParticleRing';
import bgLights from '../../assets/images/home/bg-lights.png';
import './Home.css';

const Home = () => {
    const homePageRef = useRef(null);
    const tornPaperRef = useRef(null);
    const fuzzyTitleRef = useRef(null);
    const fuzzySubtitleRef = useRef(null);
    const countdownRef = useRef(null);
    const heroRingRef = useRef(null);
    const heroCountdownRef = useRef(null);
    // const bentoRef = useRef(null); // Commented out in original

    useEffect(() => {
        let particlesCleanup;
        let fuzzyTitle;
        let fuzzySubtitle;
        let tornPaper;
        let countdown;
        let heroRing;
        let heroCountdown;

        // Clear refs manually before init as a safety measure
        if (fuzzyTitleRef.current) fuzzyTitleRef.current.innerHTML = '';
        if (fuzzySubtitleRef.current) fuzzySubtitleRef.current.innerHTML = '';
        if (tornPaperRef.current) tornPaperRef.current.innerHTML = '';
        if (countdownRef.current) countdownRef.current.innerHTML = '';
        if (heroRingRef.current) heroRingRef.current.innerHTML = '';
        if (heroCountdownRef.current) heroCountdownRef.current.innerHTML = '';

        // 0. Initialize Particles Background
        if (homePageRef.current) {
            particlesCleanup = initParticles(homePageRef.current);
        }

        // 1. Initialize Fuzzy Text Effect
        if (fuzzyTitleRef.current) {
            fuzzyTitle = new FuzzyText(fuzzyTitleRef.current, {
                text: 'INTELLINA',
                fontSize: 'clamp(4rem, 12vw, 10rem)',
                fontWeight: 900,
                color: '#fff',
                glitchMode: true,
                fuzzRange: 15,
                baseIntensity: 0.1,
                hoverIntensity: 0.4
            });
        }

        if (fuzzySubtitleRef.current) {
            fuzzySubtitle = new FuzzyText(fuzzySubtitleRef.current, {
                text: '2K26',
                fontSize: 'clamp(2rem, 6vw, 5rem)',
                fontWeight: 700,
                color: '#ff0033',
                glitchMode: true,
                fuzzRange: 20,
                baseIntensity: 0.2,
                hoverIntensity: 0.6,
                className: 'transform -rotate-2 font-mono'
            });
        }

        // 1. Initialize Torn Paper Effect on BACKGROUND
        if (tornPaperRef.current) {
            tornPaper = new TornPaperEffect(tornPaperRef.current, {
                particleCount: 50,
                glowColor: '255, 255, 255', // White color
                enableUpsideDown: true,
                speed: 0.3 // Slower speed
            });
        }

        // 2. Initialize Premium Countdown with Custom Component
        if (countdownRef.current) {
            countdown = new Countdown(countdownRef.current, '2026-03-06T09:30:00');
        }

        // 3. Initialize Hero Section Enhancements (Particle Ring + Small Countdown)
        if (heroRingRef.current) {
            heroRing = new ParticleRing(heroRingRef.current, {
                particleCount: 2000,
                minRadius: 100,
                maxRadius: 250,
                depth: 100,
                leftColor: [255, 0, 51], // Red
                rightColor: [100, 0, 0]  // Dark Red
            });
        }

        if (heroCountdownRef.current) {
            heroCountdown = new Countdown(heroCountdownRef.current, '2026-03-06T09:30:00');
        }

        // Cleanup function
        return () => {
            if (particlesCleanup) particlesCleanup();
            if (fuzzyTitle) fuzzyTitle.destroy();
            if (fuzzySubtitle) fuzzySubtitle.destroy();
            if (tornPaper) tornPaper.destroy();
            if (countdown) countdown.stop();
            if (heroRing) heroRing.destroy();

            // Final safety clear of InnerHTML
            if (fuzzyTitleRef.current) fuzzyTitleRef.current.innerHTML = '';
            if (fuzzySubtitleRef.current) fuzzySubtitleRef.current.innerHTML = '';
            if (tornPaperRef.current) tornPaperRef.current.innerHTML = '';
            if (countdownRef.current) countdownRef.current.innerHTML = '';
            if (heroRingRef.current) heroRingRef.current.innerHTML = '';
        };
    }, []);

    return (
        <div ref={homePageRef} className="page-home relative min-h-screen w-full bg-black scroll-smooth overflow-x-hidden">

            {/* BACKGROUND: Torn Paper Effect Container */}
            <div id="torn-paper-background" ref={tornPaperRef} className="fixed inset-0 z-0 opacity-60 pointer-events-none"></div>

            {/* BACKGROUND: Magic Bento Grid (Revolving) */}
            <div id="magic-bento-background" className="fixed inset-0 z-0 opacity-40 pointer-events-none perspective-1000 overflow-visible">
                <div className="absolute inset-0 flex items-center justify-center transform-style-3d animate-slow-rotate">
                    {/* Generating abstract bento shapes for background */}
                    <div className="magic-bento-card absolute w-64 h-64 bg-st-red/10 border border-st-red/20 rounded-xl" style={{ top: '10%', left: '20%', transform: 'translateZ(-100px)' }}></div>
                    <div className="magic-bento-card absolute w-80 h-56 bg-st-red/5 border border-white/10 rounded-xl" style={{ top: '60%', left: '70%', transform: 'translateZ(50px)' }}></div>
                    <div className="magic-bento-card absolute w-48 h-48 bg-st-red/10 border border-st-red/30 rounded-xl" style={{ top: '30%', left: '80%', transform: 'translateZ(-200px) rotate(45deg)' }}></div>
                    <div className="magic-bento-card absolute w-96 h-64 bg-st-red/5 border border-white/10 rounded-xl" style={{ top: '70%', left: '10%', transform: 'translateZ(100px)' }}></div>
                    <div className="magic-bento-card absolute w-56 h-56 bg-st-red/5 border border-white/5 rounded-xl" style={{ top: '15%', left: '50%', transform: 'translateZ(0px)' }}></div>
                    <div className="magic-bento-card absolute w-72 h-40 bg-st-red/10 border border-st-red/20 rounded-xl" style={{ bottom: '20%', right: '40%', transform: 'translateZ(-50px)' }}></div>
                </div>
                {/* Fog/Lights Overlay */}
                <div className="absolute inset-0 bg-cover bg-center mix-blend-screen opacity-50" style={{ backgroundImage: `url(${bgLights})` }}></div>
            </div>

            {/* Main Content Split - Note: Navbar is now in Layout */}
            <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-32 pb-12 min-h-screen flex flex-col justify-center pointer-events-none">
                {/* Pointer events re-enabled on interactive children */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-32">

                    {/* Left Column: Redesigned Hero Typography */}
                    <div className="w-full lg:w-[50%] flex flex-col items-center text-center space-y-8 animate-slide-up opacity-0 pointer-events-auto" style={{ animationFillMode: 'forwards', animationDelay: '0.2s' }}>
                        <div className="flex flex-col space-y-2 items-center">
                            <span className="text-st-red text-base md:text-lg font-bold tracking-wide" style={{ textShadow: '0 0 20px rgba(255,0,51,0.6)' }}>DEPARTMENT OF ARTIFICIAL INTELLIGENCE & DATA SCIENCE</span>
                            <span className="text-white text-sm md:text-base font-semibold tracking-widest uppercase italic">Proudly Presents</span>
                            <span className="text-gray-400 text-sm md:text-base font-bold tracking-wide uppercase">National Level Technical Symposium</span>
                        </div>

                        <div className="relative w-full flex justify-center mb-8">
                            <div className="relative inline-block overflow-visible">
                                {/* Fuzzy Text Containers - Restored Overlapping Layout */}
                                <div id="fuzzy-title" ref={fuzzyTitleRef} className="relative z-10 leading-none"></div>
                                <div id="fuzzy-subtitle" ref={fuzzySubtitleRef} className="absolute bottom-[-1.5rem] right-[-1rem] md:right-[-2.5rem] mix-blend-screen z-20 pointer-events-none opacity-90 leading-none"></div>
                            </div>
                        </div>

                        {/* Netflix-style Info Bar - More Spacing */}
                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8 text-sm md:text-base font-bold">
                            <span className="text-green-500">99% Match</span>
                            <span className="text-white">2026</span>
                            <span className="text-st-red">9.9/10 ★ C.I.T.</span>
                            <span className="text-gray-400">Technical Symposium</span>
                        </div>

                        {/* Animated Quote - Word by Word from Bottom */}
                        <div className="hero-description mx-auto text-2xl md:text-3xl font-black tracking-wider mb-6 flex gap-2 justify-center items-center">
                            {['Innovate', 'Inspire', 'Integrate'].map((word, index) => (
                                <React.Fragment key={word}>
                                    <span
                                        className="inline-block animate-slide-up-word opacity-0"
                                        style={{
                                            animationDelay: `${0.6 + index * 0.2}s`,
                                            animationFillMode: 'forwards',
                                            textShadow: '0 0 20px rgba(255,0,51,0.8)',
                                            background: 'linear-gradient(to right, #fff, #ff0033, #fff)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text'
                                        }}
                                    >
                                        {word}
                                    </span>
                                    {index < 2 && (
                                        <span
                                            className="text-st-red opacity-0 animate-slide-up-word"
                                            style={{
                                                animationDelay: `${0.7 + index * 0.2}s`,
                                                animationFillMode: 'forwards'
                                            }}
                                        >
                                            .
                                        </span>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        {/* Date and Location Info Boxes - Unique Design */}
                        <div className="flex flex-wrap justify-center gap-6 mb-8">
                            {/* Date Box - Glassmorphic with Glow - Links to Google Calendar */}
                            <a
                                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Intellina+2K26+-+National+Level+Technical+Symposium&dates=20260306/20260308&details=Department+of+Artificial+Intelligence+%26+Data+Science+presents+Intellina+2K26&location=Coimbatore+Institute+of+Technology,+Coimbatore"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative px-8 py-5 rounded-2xl border-2 border-st-red/50 bg-gradient-to-br from-black/60 to-st-red/10 backdrop-blur-xl min-w-[200px] transition-all duration-500 hover:scale-110 hover:border-st-red hover:shadow-[0_0_40px_rgba(255,0,51,0.6)] cursor-pointer"
                            >
                                {/* Animated Background Glow */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-st-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                                <div className="relative z-10 flex flex-col items-center gap-2">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-st-red" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-300 text-xs uppercase tracking-[0.2em] font-semibold">Event Date</span>
                                    </div>
                                    <span className="text-white text-xl font-black tracking-wide group-hover:text-st-red transition-colors duration-300">March 6 & 7</span>
                                </div>
                            </a>

                            {/* Location Box - Glassmorphic with Glow - Links to Google Maps */}
                            <a
                                href="https://www.google.com/maps/search/Coimbatore+Institute+of+Technology"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative px-8 py-5 rounded-2xl border-2 border-st-red/50 bg-gradient-to-br from-black/60 to-st-red/10 backdrop-blur-xl min-w-[200px] transition-all duration-500 hover:scale-110 hover:border-st-red hover:shadow-[0_0_40px_rgba(255,0,51,0.6)] cursor-pointer"
                            >
                                {/* Animated Background Glow */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-st-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                                <div className="relative z-10 flex flex-col items-center gap-2">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-st-red" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-300 text-xs uppercase tracking-[0.2em] font-semibold">Location</span>
                                    </div>
                                    <span className="text-white text-xl font-black tracking-wide group-hover:text-st-red transition-colors duration-300">C.I.T</span>
                                </div>
                            </a>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6 pt-4">
                            {/* Register Button - Premium Design with Pulse Effect */}
                            <button className="group relative flex items-center gap-3 px-12 py-4 bg-gradient-to-r from-white via-gray-100 to-white text-black font-black text-xl rounded-xl overflow-hidden transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:shadow-[0_0_50px_rgba(255,255,255,0.8)]">
                                {/* Animated Background Shine */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                                {/* Pulsing Border Effect */}
                                <div className="absolute inset-0 rounded-xl border-2 border-st-red/0 group-hover:border-st-red/50 transition-all duration-500"></div>

                                <svg className="relative z-10 w-7 h-7 fill-current group-hover:animate-pulse" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                <span className="relative z-10 tracking-wider">REGISTER</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Hero Visual */}
                    <div className="w-full lg:w-[45%] flex justify-center lg:justify-end animate-slide-up opacity-0 pointer-events-auto" style={{ animationFillMode: 'forwards', animationDelay: '0.4s' }}>
                        <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
                            {/* Particle Ring Background moved/removed or kept for robot? User said "below robot". I'll keep the rings around robot. */}
                            <div ref={heroRingRef} className="absolute inset-0 z-0 pointer-events-none"></div>

                            {/* Holographic Rings */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border-2 border-st-red/15 rounded-full animate-spin-slow pointer-events-none" style={{ boxShadow: '0 0 40px rgba(255,0,51,0.2)' }}></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-dashed border-st-red/25 rounded-full animate-spin-reverse pointer-events-none"></div>

                            <div className="st-robot-container group/robot relative z-10 w-full h-full overflow-visible">
                                <div className="robot-speech-bubble">
                                    <span>Hi! Do register for<br />Intellina</span>
                                </div>
                                <div className="st-robot-wrapper w-full h-full relative">
                                    <iframe src='https://my.spline.design/genkubgreetingrobot-fzWnKIUrSKa0RwHGiBYduZeq/' frameBorder='0' width='100%' height='100%'></iframe>
                                    {/* Spline Watermark Hider Overlay */}
                                    <div className="absolute bottom-0 right-0 w-32 h-12 bg-black z-50 pointer-events-auto cursor-default" title="Spline Watermark Hider"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Countdown Timer Section */}
            <div id="countdown-section" className="relative z-10 container mx-auto px-6 py-16 pb-24">
                <div className="flex flex-col items-center justify-center space-y-8 animate-slide-up opacity-0 pointer-events-auto" style={{ animationFillMode: 'forwards', animationDelay: '0.8s' }}>
                    <div className="text-center space-y-3">
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-wider" style={{ textShadow: '0 0 30px rgba(255,0,51,0.6)' }}>
                            EVENT COUNTDOWN
                        </h2>
                        <p className="text-gray-400 text-lg font-medium tracking-wide">
                            Time Until Intellina 2K26 Begins
                        </p>
                    </div>

                    <div className="relative w-full max-w-4xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-st-red/20 via-st-red/30 to-st-red/20 rounded-2xl blur-2xl opacity-60 animate-pulse-slow"></div>
                        <div className="relative glass-premium glass-premium--red rounded-2xl p-8 md:p-12 border-2 border-st-red/40 overflow-hidden group/timer">
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,0,51,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,51,0.3) 1px, transparent 1px)', backgroundSize: '20px 20px', animation: 'grid-move 20s linear infinite' }}></div>
                            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-st-red rounded-tl-2xl opacity-60"></div>
                            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-st-red rounded-tr-2xl opacity-60"></div>
                            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-st-red rounded-bl-2xl opacity-60"></div>
                            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-st-red rounded-br-2xl opacity-60"></div>
                            <div id="premium-countdown" ref={countdownRef} className="st-countdown-container relative z-10"></div>
                            <div className="relative z-10 mt-8 pt-6 border-t border-st-red/30 flex items-center justify-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-st-red animate-pulse"></div>
                                <span className="text-xs uppercase tracking-[0.3em] text-st-red/80 font-bold">LIVE COUNTDOWN // MARCH 6, 2026</span>
                                <div className="w-2 h-2 rounded-full bg-st-red animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-[20vh]"></div>
        </div>
    );
};

export default Home;
