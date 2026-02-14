import React from 'react';
import './TimelineEvent.css';

const TimelineEvent = ({ event, index, activeDay }) => {
    const isRight = activeDay === 'day1' ? index % 2 === 0 : index % 2 !== 0;

    return (
        <div className="relative mb-16 sm:mb-24 pl-12 sm:pl-16 md:pl-0 md:grid md:grid-cols-2 md:gap-16 group perspective-2000">
            <div className="absolute left-[24px] sm:left-[28px] md:left-1/2 top-8 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 -ml-0.5 z-10 flex items-center justify-center">
                <span className={`material-symbols-outlined text-3xl sm:text-4xl ${event.isSpecial ? 'text-[#ff0000]' : isRight ? 'text-[#3d0000]' : 'text-[#4a0a0a]'} drop-shadow-[0_0_10px_#ff0000] ${isRight ? 'animate-spin-slow' : 'animate-spin-reverse'} bg-black rounded-full`}>
                    {event.mainIcon}
                </span>
                <div className={`absolute inset-0 ${event.isSpecial ? 'bg-red-500/30 blur-xl' : 'bg-red-600/20 blur-md'} rounded-full animate-pulse`} style={{ animationDelay: `${index * 0.2}s` }}></div>
            </div>

            <div className={`${isRight ? 'md:col-start-2 md:text-left' : 'md:col-start-1 md:text-right md:order-first'} relative`}>
                <div className={`md:hidden absolute top-11 left-[-2rem] w-8 h-[2px] transition-colors duration-1000 ${activeDay === 'day1' ? 'bg-red-900/50' : 'bg-blue-900/50'}`}></div>
                <div className={`torn-card tilt-card glitch-on-hover reveal-hidden ${isRight ? 'reveal-hidden-right' : 'reveal-hidden-left'} relative ${event.isSpecial ? (activeDay === 'day1' ? 'bg-gradient-to-br from-[#1a0505] to-black border-2 border-red-900/50' : 'bg-gradient-to-br from-[#05051a] to-black border-2 border-blue-900/50') : (activeDay === 'day1' ? (isRight ? 'bg-[#120505]' : 'bg-[#0a0202]') : (isRight ? 'bg-[#050512]' : 'bg-[#02020a]'))} p-6 sm:p-8 ${isRight ? 'sm:pr-10' : 'sm:pl-10'} transition-all duration-700 group-hover:shadow-[0_0_50px_${activeDay === 'day1' ? 'rgba(255,0,0,0.4)' : 'rgba(0,100,255,0.4)'}]`}>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] opacity-30"></div>
                    <div className={`absolute ${isRight ? '-right-4 -top-4 w-20 h-20' : '-left-4 -bottom-4 w-24 h-24'} ${activeDay === 'day1' ? 'bg-red-900/20' : 'bg-blue-900/20'} blur-[20px] rounded-full mix-blend-color-dodge`}></div>

                    <div className="relative z-10">
                        <div className={`flex ${isRight ? 'justify-between' : 'flex-row md:flex-row-reverse justify-between'} items-start mb-4 border-b ${event.isSpecial ? (activeDay === 'day1' ? 'border-red-600/50' : 'border-blue-600/50') : (activeDay === 'day1' ? 'border-red-900/30' : 'border-blue-900/30')} pb-3`}>
                            <span className={`font-benguiat ${event.isSpecial ? `text-2xl border ${activeDay === 'day1' ? 'border-red-800' : 'border-blue-800'} px-4 py-2 bg-black/80` : 'text-3xl'} font-bold text-gray-200 animate-pulse`}>
                                {event.time}
                            </span>
                            <span className={`material-symbols-outlined ${event.isSpecial ? (activeDay === 'day1' ? 'text-red-500' : 'text-blue-500') + ' text-4xl' : (activeDay === 'day1' ? 'text-red-700' : 'text-blue-700') + ' text-3xl'} animate-icon-breathe`}>
                                {event.icon}
                            </span>
                        </div>
                        <h3 className={`${event.isSpecial ? (activeDay === 'day1' ? 'text-red-600' : 'text-blue-600') + ' text-3xl font-black' : (activeDay === 'day1' ? 'text-primary-light' : 'text-blue-400') + ' text-2xl font-bold'} mb-3 uppercase tracking-widest font-benguiat`}>
                            {event.title}
                        </h3>
                        <p className={`${event.isSpecial ? 'text-gray-300' : 'text-gray-400'} text-base font-light leading-relaxed font-benguiat`}>
                            {event.description}
                        </p>
                    </div>
                    {event.isSpecial && <div className={`absolute inset-0 ${activeDay === 'day1' ? 'bg-red-900/5' : 'bg-blue-900/5'} animate-flicker pointer-events-none`}></div>}
                </div>
            </div>
        </div>
    );
};

export default TimelineEvent;
