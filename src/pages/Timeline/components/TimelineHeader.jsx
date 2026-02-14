import React from 'react';
import './TimelineHeader.css';

const TimelineHeader = () => {
    return (
        <header className="sticky top-0 w-full p-4 flex justify-between items-center z-50 backdrop-blur-sm bg-black/40 border-b border-red-900/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)] group">
            <span className="material-symbols-outlined text-white/60 hover:text-primary-light transition cursor-pointer">menu</span>
            <h1 className="text-3xl md:text-5xl font-outlined font-normal tracking-[0.2em] md:tracking-[0.5em] text-primary-light animate-blood-glow group-hover:animate-h1-glitch drop-shadow-[0_0_20px_rgba(255,0,0,0.9)] transition-all duration-300 relative cursor-default">
                <span className="relative z-10">TIMELINE</span>
                <span className="absolute inset-0 text-red-600/30 blur-md -z-10 animate-pulse-slow translate-x-1 translate-y-1">TIMELINE</span>
            </h1>
            <span className="material-symbols-outlined text-white/60 hover:text-primary-light transition cursor-pointer">calendar_month</span>
        </header>
    );
};

export default TimelineHeader;
