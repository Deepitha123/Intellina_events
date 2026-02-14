import React, { useState } from 'react';
import './Timeline.css';

// Import sub-components
import AshParticles from './components/AshParticles';
import TimelineHeader from './components/TimelineHeader';
import TimelineClock from './components/TimelineClock';
import TimelineEvent from './components/TimelineEvent';

// Import assets
import vecnaBg from '../../assets/timeline/images/timeline/vecna-bg.png';
import upsideDownBg from '../../assets/timeline/images/timeline/st_upsidedown.jpeg';

const timelineData = {
    day1: [
        {
            time: '10:00 AM - 05:00 PM',
            title: 'Paper presentation',
            description: 'Unveiling the blueprints of the unknown. Present your research on the fringes of reality.',
            icon: 'description',
            mainIcon: 'article'
        },
        {
            time: '10:00 AM - 05:00 PM',
            title: 'Hackathon',
            description: 'Code your way through the darkness. 7 hours to build something that defies the laws of nature.',
            icon: 'terminal',
            mainIcon: 'code'
        },
        {
            time: '10:30 AM - 01:30 PM',
            title: 'GPT-athon',
            description: 'Harness the power of artificial minds to solve challenges beyond human comprehension.',
            icon: 'smart_toy',
            mainIcon: 'psychology'
        },
        {
            time: '10:30 AM - 03:00 PM',
            title: 'RRR Coding',
            description: 'Rapid, Relentless, Resourceful. Only the fastest minds will survive this rhythmic coding challenge.',
            icon: 'speed',
            mainIcon: 'timer'
        },
        {
            time: '11:00 AM - 03:00 PM',
            title: 'Treasure Hunt',
            description: 'Follow the shadows. Find the artifacts before they find you.',
            icon: 'explore',
            mainIcon: 'map'
        },
        {
            time: '02:00 PM - 05:00 PM',
            title: 'Rapid chess',
            description: 'A game of strategy where every second feels like an eternity. Checkmate the void.',
            icon: 'grid_view',
            mainIcon: 'playing_cards'
        },
        {
            time: '02:00 PM - 05:00 PM',
            title: 'Big Boss',
            description: 'The ultimate leadership challenge. Who will emerge as the master of this domain?',
            icon: 'visibility',
            mainIcon: 'eye_tracking'
        },
        {
            time: '03:00 PM - 05:00 PM',
            title: 'Murder Mystery',
            description: 'There has been a breach. Find the imposter before the gate closes.',
            icon: 'search',
            mainIcon: 'mystery'
        },
        {
            time: '03:00 PM - 05:00 PM',
            title: 'Object Odyssey',
            description: 'Navigate through a collection of anomalous objects. Every item tells a story of the other side.',
            icon: 'category',
            mainIcon: 'inventory_2'
        },
        {
            time: '05:00 PM - 08:00 PM',
            title: 'E-Sports',
            description: 'The final battle for supremacy in the digital arena. Victory is your only escape.',
            icon: 'sports_esports',
            mainIcon: 'stadia_controller',
            isSpecial: true
        }
    ],
    day2: [
        {
            time: '09:00 AM - 12:00 PM',
            title: 'Project Expo',
            description: 'Showcasing the fruits of your labor. Proof that we are not alone in our curiosity.',
            icon: 'rocket_launch',
            mainIcon: 'campaign'
        },
        {
            time: '09:00 AM - 12:00 PM',
            title: 'Connections',
            description: 'Linking minds across the divide. How well do you know your fellow travelers?',
            icon: 'hub',
            mainIcon: 'share_reviews'
        },
        {
            time: '09:00 AM',
            title: 'IPL Auction',
            description: 'A high-stakes bidding war for the ultimate team. Fortune favors the bold.',
            icon: 'gavel',
            mainIcon: 'bid_landscape'
        },
        {
            time: '02:00 PM - 04:00 PM',
            title: 'Worst Design',
            description: 'Embrace the chaos. Create something so intentionally flawed it becomes a masterpiece.',
            icon: 'design_services',
            mainIcon: 'brush'
        },
        {
            time: '02:00 PM - 04:00 PM',
            title: 'Web Design',
            description: 'Crafting the interfaces of the future. Portals to new worlds, built with code.',
            icon: 'html',
            mainIcon: 'lan'
        },
        {
            time: '02:00 PM - 04:00 PM',
            title: 'Snap_sense',
            description: 'Capture the fleeting moments between realities. The lens never lies.',
            icon: 'photo_camera',
            mainIcon: 'camera',
            isSpecial: true
        }
    ]
};

const Timeline = () => {
    const [activeDay, setActiveDay] = useState('day1');
    const [isAnimating, setIsAnimating] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [ashParticles, setAshParticles] = useState([]);

    // Initialize ash particles
    React.useEffect(() => {
        const particles = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 3 + 1}px`,
            duration: `${Math.random() * 10 + 10}s`,
            delay: `${Math.random() * 10}s`,
            opacity: Math.random() * 0.3 + 0.1
        }));
        setAshParticles(particles);

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    React.useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                } else {
                    entry.target.classList.remove('reveal-visible');
                }
            });
        }, observerOptions);

        const cards = document.querySelectorAll('.reveal-hidden');
        cards.forEach(card => observer.observe(card));

        return () => observer.disconnect();
    }, [activeDay, isAnimating]);

    const handleDayChange = (day) => {
        if (day === activeDay || isAnimating) return;
        setIsAnimating(true);
        // Add reality shift class to body or a wrapper
        document.getElementById('timeline-wrapper')?.classList.add('reality-shift');

        setTimeout(() => {
            setActiveDay(day);
            setIsAnimating(false);
            setTimeout(() => {
                document.getElementById('timeline-wrapper')?.classList.remove('reality-shift');
            }, 600);
        }, 650);
    };

    return (
        <div className="page-timeline">
            <div id="timeline-wrapper" className="relative">
                <div className="fixed inset-0 z-0 bg-black">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-ken-burns opacity-80"
                        style={{
                            backgroundImage: activeDay === 'day1' ? `url(${vecnaBg})` : `url(${upsideDownBg})`,
                            transform: `scale(${1 + scrollY * 0.0001}) translateY(${scrollY * 0.05}px)`,
                            transition: 'background-image 0.8s ease-in-out'
                        }}
                    ></div>
                    <div className={`absolute inset-0 mix-blend-overlay animate-pulse-slow ${activeDay === 'day1' ? 'bg-red-900/20' : 'bg-blue-900/40'}`}></div>
                </div>

                <AshParticles ashParticles={ashParticles} activeDay={activeDay} />

                <div className="fixed inset-0 pointer-events-none z-50 animate-shadow-breathe mix-blend-multiply"></div>
                <div className="fixed inset-0 pointer-events-none z-20 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_50%,rgba(0,0,0,0.6)_100%)] mix-blend-multiply"></div>
                <div className="shadow-breathing-vignette"></div>
                <div className="fog-layer"></div>
                <div className="smoke-layer"></div>

                <div className="fixed inset-0 pointer-events-none z-0 opacity-20 mix-blend-hard-light">
                    <svg className="w-full h-full animate-pulse-slow" xmlns="http://www.w3.org/2000/svg">
                        <filter id="tendrilNoise">
                            <feTurbulence baseFrequency="0.008" numOctaves="4" stitchTiles="stitch" type="fractalNoise"></feTurbulence>
                            <feColorMatrix result="coloredNoise" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 15 -7"></feColorMatrix>
                        </filter>
                        <rect filter="url(#tendrilNoise)" height="100%" opacity="0.6" width="100%"></rect>
                    </svg>
                </div>

                <div className="spore w-1 h-1 top-1/4 left-1/4 animate-spores" style={{ animationDelay: '0s' }}></div>
                <div className="spore w-0.5 h-0.5 top-3/4 left-1/2 animate-spores" style={{ animationDelay: '2s' }}></div>
                <div className="spore w-1.5 h-1.5 top-1/2 left-3/4 animate-spores" style={{ animationDelay: '1s' }}></div>
                <div className="spore w-0.5 h-0.5 top-10 left-10 animate-spores" style={{ animationDelay: '4s' }}></div>
                <div className="spore w-1 h-1 bottom-1/4 right-10 animate-spores" style={{ animationDelay: '5s' }}></div>

                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vw] max-w-[800px] max-h-[800px] opacity-10 pointer-events-none z-0 mix-blend-overlay">
                    <svg className="w-full h-full animate-spin-slow" style={{ animationDuration: '240s' }} viewBox="0 0 200 200">
                        <circle cx="100" cy="100" fill="none" r="90" stroke="#5c1616" strokeDasharray="10 5" strokeWidth="1"></circle>
                        <path d="M100 0 L100 200 M0 100 L200 100 M29 29 L171 171 M29 171 L171 29" opacity="0.5" stroke="#5c1616" strokeWidth="0.5"></path>
                        <circle cx="100" cy="100" fill="none" r="50" stroke="#3d0000" strokeDasharray="2 4" strokeWidth="20"></circle>
                    </svg>
                </div>

                <div className="relative z-10 min-h-screen flex flex-col items-center">
                    <TimelineHeader />

                    <div className="w-full max-w-md pt-8 pb-4 px-2 sm:px-4 flex flex-col items-center relative perspective-1000">
                        <TimelineClock activeDay={activeDay} scrollY={scrollY} />

                        <div className="text-center z-10 relative mt-6 mb-8">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-outlined font-normal text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-100 to-gray-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-flicker">
                                THE SCHEDULE IS SET
                            </h2>
                            <p className="text-red-400 text-xs font-benguiat tracking-[0.4em] uppercase mt-3 animate-pulse">Time is running out</p>
                            <div className="flex justify-center gap-6 mt-8">
                                <button
                                    onClick={() => handleDayChange('day1')}
                                    className={`px-8 py-2 font-benguiat text-lg tracking-[0.2em] transition-all duration-500 border-b-2 ${activeDay === 'day1'
                                        ? 'text-primary-light border-primary drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]'
                                        : 'text-gray-600 border-transparent hover:text-gray-400'
                                        }`}
                                >
                                    DAY 1
                                </button>
                                <button
                                    onClick={() => handleDayChange('day2')}
                                    className={`px-8 py-2 font-benguiat text-lg tracking-[0.2em] transition-all duration-500 border-b-2 ${activeDay === 'day2'
                                        ? 'text-blue-400 border-blue-500 drop-shadow-[0_0_8px_rgba(0,100,255,0.5)]'
                                        : 'text-gray-600 border-transparent hover:text-gray-400'
                                        }`}
                                >
                                    DAY 2
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={`w-full max-w-4xl px-2 sm:px-4 pb-40 relative transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                        <div className={`absolute left-[24px] sm:left-[28px] md:left-1/2 top-0 bottom-0 w-[3px] ml-[-1.5px] z-0 transition-colors duration-1000 ${activeDay === 'day1' ? 'bg-[#1a0505] border-l border-red-900/50 shadow-[0_0_10px_rgba(102,0,0,0.3)]' : 'bg-[#05051a] border-l border-blue-900/50 shadow-[0_0_10px_rgba(0,0,102,0.3)]'}`}>
                            <div className={`absolute inset-0 opacity-60 transition-all duration-1000 ${activeDay === 'day1' ? 'bg-gradient-to-b from-primary via-primary-dark to-transparent' : 'bg-gradient-to-b from-blue-600 via-blue-900 to-transparent'}`}></div>
                        </div>

                        {timelineData[activeDay].map((event, index) => (
                            <TimelineEvent key={index} event={event} index={index} activeDay={activeDay} />
                        ))}

                        <div className={`w-full h-48 bg-gradient-to-t transition-all duration-1000 ${activeDay === 'day1' ? 'from-black via-[#1a0505] to-transparent' : 'from-black via-[#05051a] to-transparent'} flex items-end justify-center pb-12 relative z-10`}>
                            <div className="flex flex-col items-center gap-4">
                                <span className="material-symbols-outlined text-red-900/40 text-4xl animate-spin-slow">hourglass_empty</span>
                                <p className="text-red-800/40 text-xs font-benguiat tracking-[0.6em] uppercase animate-pulse">
                                    {activeDay === 'day1' ? 'THE RIFT IS OPENING' : 'BEYOND THE INTELLINA'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timeline;
