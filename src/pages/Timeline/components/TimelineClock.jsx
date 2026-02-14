import React from 'react';

const TimelineClock = ({ activeDay, scrollY }) => {
    return (
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mb-8 group">
            <div className={`absolute inset-0 rounded-full bg-primary/30 blur-[80px] transition-all duration-500 ${scrollY > 100 ? 'opacity-100 scale-110' : 'opacity-40'}`}></div>
            <div className={`absolute inset-0 rounded-full bg-black border-[8px] transition-all duration-1000 ${activeDay === 'day1' ? 'border-[#1a0505] shadow-[inset_0_0_60px_rgba(0,0,0,1),0_0_50px_rgba(102,0,0,0.6)]' : 'border-[#05051a] shadow-[inset_0_0_60px_rgba(0,0,0,1),0_0_50px_rgba(0,50,150,0.6)]'} overflow-hidden`}>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-70 mix-blend-color-dodge"></div>
                <svg className="w-full h-full relative z-10" viewBox="0 0 200 200">
                    <defs>
                        <radialGradient cx="50%" cy="50%" id="clockGradient" r="50%">
                            <stop offset="60%" stopColor="#050000"></stop>
                            <stop offset="100%" stopColor={activeDay === 'day1' ? "#3d0000" : "#00003d"}></stop>
                        </radialGradient>
                        <filter height="140%" id="glow" width="140%" x="-20%" y="-20%">
                            <feGaussianBlur result="blur" stdDeviation="2"></feGaussianBlur>
                            <feComposite in="SourceGraphic" in2="blur" operator="over"></feComposite>
                        </filter>
                    </defs>
                    <circle cx="100" cy="100" fill="url(#clockGradient)" r="95"></circle>
                    <g fill="none" opacity="0.9" stroke="#000" strokeWidth="1.5">
                        <path d="M100 100 L140 60 L145 50 M140 60 L150 65"></path>
                        <path d="M100 100 L50 140 L40 145 M50 140 L45 130"></path>
                        <path d="M100 100 L30 60 L20 55"></path>
                        <path d="M100 100 L120 160 L125 170"></path>
                        <path d="M100 20 Q 110 50 90 90 T 100 100 T 130 150" filter="url(#glow)" opacity="0.8" stroke="#000" strokeWidth="2"></path>
                    </g>
                    <path d="M100 100 L70 40 M100 100 L140 130 M100 100 L60 120" opacity="0.8" stroke="#000" strokeWidth="2"></path>
                    <g fill={activeDay === 'day1' ? "#8a1c1c" : "#1c3a8a"} fontFamily="Benguiat, serif" fontSize="12" fontWeight="900" style={{ textShadow: '0 0 5px rgba(0,0,0,0.8)' }} textAnchor="middle">
                        <text className="animate-pulse" filter="url(#glow)" x="100" y="32">XII</text>
                        <text fillOpacity="0.3" x="138" y="45">I</text>
                        <text fillOpacity="0.3" x="165" y="72">II</text>
                        <text filter="url(#glow)" x="175" y="105">III</text>
                        <text fillOpacity="0.3" x="165" y="138">IV</text>
                        <text fillOpacity="0.3" x="138" y="165">V</text>
                        <text filter="url(#glow)" x="100" y="178">VI</text>
                        <text fillOpacity="0.3" x="62" y="165">VII</text>
                        <text fillOpacity="0.3" x="35" y="138">VIII</text>
                        <text filter="url(#glow)" x="25" y="105">IX</text>
                        <text fillOpacity="0.3" x="35" y="72">X</text>
                        <text fillOpacity="0.3" x="62" y="45">XI</text>
                    </g>
                    <circle cx="100" cy="100" fill="none" r="85" stroke={activeDay === 'day1' ? "#2a0505" : "#05052a"} strokeWidth="2"></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center animate-spin-slow" style={{
                    animationDuration: '21600s',
                    transform: `rotate(${scrollY * 0.1}deg)`
                }}>
                    <div className="w-2 h-[28%] bg-gradient-to-t from-[#3d0000] to-black absolute bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom shadow-lg clip-path-polygon">
                        <div className="w-full h-full border-x border-[#5c1616]"></div>
                    </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center animate-spin-slow" style={{
                    animationDuration: '3600s',
                    transform: `rotate(${scrollY * 1.2}deg)`
                }}>
                    <div className="w-1.5 h-[38%] bg-gradient-to-t from-[#8a1c1c] to-[#1a0505] absolute bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom rounded-t-full shadow-[0_0_10px_rgba(138,28,28,0.5)]"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center animate-spin-slow" style={{ animationDuration: '60s', animationTimingFunction: 'steps(60)' }}>
                    <div className="w-0.5 h-[42%] bg-red-600 absolute bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom shadow-[0_0_8px_#ff0000]"></div>
                </div>
                <div className="absolute top-1/2 left-1/2 w-5 h-5 bg-[#1a0505] border-2 border-[#5c1616] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#000] z-20"></div>
            </div>
            <div className="absolute top-[95%] left-1/2 -translate-x-1/2 w-48 h-40 overflow-hidden z-0 pointer-events-none">
                <div className="w-full h-full bg-gradient-to-b from-black/90 to-transparent"></div>
                <div className="absolute top-0 left-1/2 w-1.5 h-32 bg-[#2a0505] -translate-x-1/2 origin-top animate-pendulum border-x border-[#5c1616]/30"
                    style={{ transformOrigin: 'top center', transform: `rotate(${Math.sin(scrollY * 0.01) * 5}deg)` }}>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[radial-gradient(circle_at_30%_30%,#5c1616,#000)] border border-[#3d0e0e] shadow-[0_0_20px_rgba(138,28,28,0.5)] flex items-center justify-center">
                        <div className="w-3 h-3 bg-red-900 rounded-full animate-pulse shadow-[0_0_10px_#ff0000]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimelineClock;
