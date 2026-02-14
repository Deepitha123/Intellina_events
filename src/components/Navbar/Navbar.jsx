import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import sympoLogo from '../../assets/images/logo/sympo-logo.png';
import deptLogo from '../../assets/images/logo/dept-logo.png';
// import './Navbar.css'; // Uncomment if using specific styles

const Navbar = () => {
    return (
        <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[60%] max-w-7xl">
            <div id="innovative-navbar" className="innovative-navbar glass-premium glass-premium--red rounded-full px-8 py-4 flex justify-between items-center group/nav overflow-hidden relative" style={{ borderRadius: '9999px' }}>
                {/* Holographic Grid Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,0,51,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,51,0.3) 1px, transparent 1px)', backgroundSize: '15px 15px', animation: 'nav-grid-move 15s linear infinite' }}></div>


                {/* Pulsing Core Glow */}
                <div className="absolute inset-0 bg-radial-gradient from-st-red/20 via-st-red/5 to-transparent rounded-full opacity-0 group-hover/nav:opacity-100 transition-opacity duration-700 animate-pulse-fast"></div>

                {/* Premium Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-st-red/0 via-st-red/15 to-st-red/0 opacity-0 group-hover/nav:opacity-100 transition-opacity duration-700 blur-2xl"></div>

                {/* Animated Border Glow */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover/nav:border-st-red/70 transition-all duration-700" style={{ boxShadow: '0 0 40px rgba(255,0,51,0.4), inset 0 0 20px rgba(255,0,51,0.2)' }}></div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/nav:opacity-100 transform -skew-x-12 translate-x-[-200%] group-hover/nav:translate-x-[200%] transition-transform duration-1500 ease-in-out"></div>

                {/* Glitch Border Effect - Multiple Layers */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-st-red to-transparent opacity-80 group-hover/nav:opacity-100 group-hover/nav:h-[3px] transition-all duration-500" style={{ boxShadow: '0 0 10px rgba(255,0,51,0.8)' }}></div>
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-st-red/50 to-transparent opacity-50 group-hover/nav:opacity-100 transition-all duration-500"></div>

                {/* Noise Texture Overlay */}
                <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-5 mix-blend-overlay rounded-full"></div>

                <div className="flex items-center space-x-3 group cursor-pointer relative z-10 transition-all duration-500 ">
                    {/* CIT Logo with Premium Effects */}
                    <div className="relative flex items-center justify-center logo-animate">
                        {/* Glow Effects */}
                        <div className="absolute inset-0 bg-white/20 blur-2xl opacity-0 group-hover:opacity-60 transition-all duration-700 rounded-full"></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-st-red/30 to-white/10 rounded-full scale-0 group-hover:scale-110 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>

                        {/* Logo Container with White Background - Circular */}
                        <div className="relative z-10 bg-white rounded-full overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] p-1">
                            <img src={sympoLogo} alt="Coimbatore Institute of Technology" className="h-10 w-auto object-contain transform transition-transform duration-700 group-" />
                        </div>
                    </div>

                    {/* Vertical Divider */}
                    <div className="h-12 w-[2px] bg-gradient-to-b from-transparent via-st-red/50 to-transparent"></div>


                    {/* Department Logo with Premium Effects */}
                    <div className="relative flex items-center justify-center logo-animate">
                        {/* Glow Effects */}
                        <div className="absolute inset-0 bg-white/20 blur-2xl opacity-0 group-hover:opacity-60 transition-all duration-700 rounded-full"></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-st-red/30 to-white/10 rounded-full scale-0 group-hover:scale-110 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>

                        {/* Logo Container with White Background */}
                        <div className="relative z-10 bg-white rounded-full overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] p-1">
                            <img src={deptLogo} alt="AI & DS Association" className="h-10 w-10 object-contain transform transition-transform duration-700 group-" />
                        </div>
                    </div>


                </div>

                <ul className="hidden xl:flex items-center space-x-2 relative z-10">
                    <li><Link to="/" className="nav-link relative text-xs font-black tracking-[0.1em] text-gray-400 hover:text-white transition-all duration-500 py-2 px-3 rounded-xl group/link overflow-hidden">
                        <span className="relative z-10">HOME</span>
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-gradient-to-r from-transparent via-st-red to-transparent group-hover/link:w-full transition-all duration-700 ease-in-out" style={{ boxShadow: '0 0 15px rgba(255,0,51,0.8)' }}></span>
                    </Link></li>
                    <li><Link to="/about" className="nav-link relative text-xs font-black tracking-[0.1em] text-gray-400 hover:text-white transition-all duration-500 py-2 px-3 rounded-xl group/link overflow-hidden">
                        <span className="relative z-10">ABOUT</span>
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-gradient-to-r from-transparent via-st-red to-transparent group-hover/link:w-full transition-all duration-700 ease-in-out" style={{ boxShadow: '0 0 15px rgba(255,0,51,0.8)' }}></span>
                    </Link></li>
                    <li><Link to="/events" className="nav-link relative text-xs font-black tracking-[0.1em] text-gray-400 hover:text-white transition-all duration-500 py-2 px-3 rounded-xl group/link overflow-hidden">
                        <span className="relative z-10">EVENTS</span>
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-gradient-to-r from-transparent via-st-red to-transparent group-hover/link:w-full transition-all duration-700 ease-in-out" style={{ boxShadow: '0 0 15px rgba(255,0,51,0.8)' }}></span>
                    </Link></li>
                    <li><Link to="/timeline" className="nav-link relative text-xs font-black tracking-[0.1em] text-gray-400 hover:text-white transition-all duration-500 py-2 px-3 rounded-xl group/link overflow-hidden">
                        <span className="relative z-10">TIMELINE</span>
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-gradient-to-r from-transparent via-st-red to-transparent group-hover/link:w-full transition-all duration-700 ease-in-out" style={{ boxShadow: '0 0 15px rgba(255,0,51,0.8)' }}></span>
                    </Link></li>
                    <li><Link to="/passes" className="nav-link relative text-xs font-black tracking-[0.1em] text-gray-400 hover:text-white transition-all duration-500 py-2 px-3 rounded-xl group/link overflow-hidden">
                        <span className="relative z-10">PASSES</span>
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-gradient-to-r from-transparent via-st-red to-transparent group-hover/link:w-full transition-all duration-700 ease-in-out" style={{ boxShadow: '0 0 15px rgba(255,0,51,0.8)' }}></span>
                    </Link></li>
                    <li><Link to="/members" className="nav-link relative text-xs font-black tracking-[0.1em] text-gray-400 hover:text-white transition-all duration-500 py-2 px-3 rounded-xl group/link overflow-hidden">
                        <span className="relative z-10">MEMBERS</span>
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-gradient-to-r from-transparent via-st-red to-transparent group-hover/link:w-full transition-all duration-700 ease-in-out" style={{ boxShadow: '0 0 15px rgba(255,0,51,0.8)' }}></span>
                    </Link></li>
                    <li><Link to="/contact" className="nav-link relative text-xs font-black tracking-[0.1em] text-gray-400 hover:text-white transition-all duration-500 py-2 px-3 rounded-xl group/link overflow-hidden">
                        <span className="relative z-10">CONTACT</span>
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-gradient-to-r from-transparent via-st-red to-transparent group-hover/link:w-full transition-all duration-700 ease-in-out" style={{ boxShadow: '0 0 15px rgba(255,0,51,0.8)' }}></span>
                    </Link></li>
                </ul>

                {/* Developer Button */}
                <Link to="/developers" className="px-4 py-2 bg-black/80 text-white font-black text-sm rounded-lg border-2 border-st-red/50 hover:border-st-red hover:bg-st-red hover:text-black transition-all duration-500 hover:scale-110 hover:shadow-[0_0_40px_rgba(255,0,51,0.8)] relative z-10 overflow-hidden group/dev backdrop-blur-sm">
                    <span className="relative z-10 font-mono">&lt;/&gt;</span>
                    {/* Developer Btn Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/dev:translate-x-full transition-transform duration-1000"></div>
                    {/* Pulse Effect on Hover */}
                    <div className="absolute inset-0 bg-st-red/20 opacity-0 group-hover/dev:opacity-100 animate-pulse transition-opacity duration-500"></div>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
