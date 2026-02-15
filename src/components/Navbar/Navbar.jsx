import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import sympoLogo from '../../assets/images/logo/sympo-logo.png';
import deptLogo from '../../assets/images/logo/dept-logo.png';
// import './Navbar.css'; // Uncomment if using specific styles

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.mobile-menu-button')) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [mobileMenuOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [mobileMenuOpen]);

    const navLinks = [
        { to: '/', label: 'HOME' },
        { to: '/about', label: 'ABOUT' },
        { to: '/events', label: 'EVENTS' },
        { to: '/timeline', label: 'TIMELINE' },
        { to: '/passes', label: 'PASSES' },
        { to: '/members', label: 'MEMBERS' },
        { to: '/contact', label: 'CONTACT' }
    ];

    const handleLinkClick = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
            {/* Mobile Menu Overlay */}
            <div
                className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
            ></div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-black text-st-red tracking-wider">MENU</h2>
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-white hover:text-st-red transition-colors p-2"
                        aria-label="Close menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <ul className="space-y-4">
                    {navLinks.map((link) => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                onClick={handleLinkClick}
                                className="block text-lg font-black tracking-[0.1em] text-gray-400 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-st-red/10 border-2 border-transparent hover:border-st-red/30"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link
                            to="/developers"
                            onClick={handleLinkClick}
                            className="block text-center px-4 py-3 bg-black/80 text-white font-black text-sm rounded-lg border-2 border-st-red/50 hover:border-st-red hover:bg-st-red hover:text-black transition-all duration-500"
                        >
                            <span className="font-mono">&lt;/&gt;</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <nav className="fixed top-6 sm:top-8 md:top-10 left-1/2 transform -translate-x-1/2 z-50 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[75%] xl:w-[70%] max-w-7xl">
                <div id="innovative-navbar" className="innovative-navbar glass-premium glass-premium--red rounded-full px-6 py-3 sm:py-4 flex justify-between items-center group/nav overflow-hidden relative" style={{ borderRadius: '9999px' }}>
                    {/* Holographic Grid Pattern */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,0,51,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,51,0.3) 1px, transparent 1px)', backgroundSize: '15px 15px', animation: 'nav-grid-move 15s linear infinite' }}></div>


                    {/* Pulsing Core Glow - Reduced Opacity */}
                    <div className="absolute inset-0 bg-radial-gradient from-st-red/10 via-st-red/5 to-transparent rounded-full opacity-0 group-hover/nav:opacity-50 transition-opacity duration-700 animate-pulse-fast"></div>

                    {/* Premium Glow Effect - Tighter */}
                    <div className="absolute inset-0 bg-gradient-to-r from-st-red/0 via-st-red/10 to-st-red/0 opacity-0 group-hover/nav:opacity-50 transition-opacity duration-700 blur-xl"></div>

                    {/* Animated Border Glow - Reduced Shadow */}
                    <div className="absolute inset-0 rounded-full border border-transparent group-hover/nav:border-st-red/50 transition-all duration-700" style={{ boxShadow: '0 0 15px rgba(255,0,51,0.3), inset 0 0 10px rgba(255,0,51,0.1)' }}></div>

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/nav:opacity-100 transform -skew-x-12 translate-x-[-200%] group-hover/nav:translate-x-[200%] transition-transform duration-1500 ease-in-out"></div>

                    {/* Glitch Border Effect - Subtle */}
                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-st-red/80 to-transparent opacity-60 group-hover/nav:opacity-80 group-hover/nav:h-[2px] transition-all duration-500" style={{ boxShadow: '0 0 8px rgba(255,0,51,0.5)' }}></div>
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-st-red/30 to-transparent opacity-30 group-hover/nav:opacity-60 transition-all duration-500"></div>

                    {/* Noise Texture Overlay */}
                    <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-5 mix-blend-overlay rounded-full"></div>

                    <div className="flex items-center space-x-4 sm:space-x-6 group cursor-pointer relative z-10 transition-all duration-500">
                        {/* CIT Logo with Premium Effects */}
                        <div className="relative flex items-center justify-center logo-animate">
                            {/* Glow Effects */}
                            <div className="absolute inset-0 bg-white/10 blur-xl opacity-0 group-hover:opacity-40 transition-all duration-700 rounded-full"></div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-st-red/20 to-white/10 rounded-full scale-0 group-hover:scale-105 transition-transform duration-700 opacity-0 group-hover:opacity-80"></div>

                            {/* Logo Container with White Background - Circular - Cleaned */}
                            <div className="relative z-10 bg-white rounded-full overflow-hidden flex items-center justify-center p-1 sm:p-1.5" style={{ width: '40px', height: '40px' }}>
                                <img src={sympoLogo} alt="Coimbatore Institute of Technology" className="object-contain" style={{ width: 'auto', height: '32px' }} />
                            </div>
                        </div>

                        {/* Vertical Divider */}
                        <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-st-red/40 to-transparent"></div>


                        {/* Department Logo with Premium Effects */}
                        <div className="relative flex items-center justify-center logo-animate">
                            {/* Glow Effects */}
                            <div className="absolute inset-0 bg-white/10 blur-xl opacity-0 group-hover:opacity-40 transition-all duration-700 rounded-full"></div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-st-red/20 to-white/10 rounded-full scale-0 group-hover:scale-105 transition-transform duration-700 opacity-0 group-hover:opacity-80"></div>

                            {/* Logo Container with White Background - Cleaned */}
                            <div className="relative z-10 bg-white rounded-full overflow-hidden flex items-center justify-center p-1 sm:p-1.5" style={{ width: '40px', height: '40px' }}>
                                <img src={deptLogo} alt="AI & DS Association" className="object-contain" style={{ width: 'auto', height: '32px' }} />
                            </div>
                        </div>


                    </div>

                    <ul className="hidden xl:flex items-center space-x-2 relative z-10">
                        {navLinks.map((link) => (
                            <li key={link.to}>
                                <Link to={link.to} className="nav-link relative text-[10px] font-black tracking-[0.1em] text-gray-400 hover:text-white transition-all duration-500 py-1.5 px-3 rounded-lg group/link overflow-hidden">
                                    <span className="relative z-10">{link.label}</span>
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-st-red to-transparent group-hover/link:w-full transition-all duration-700 ease-in-out" style={{ boxShadow: '0 0 10px rgba(255,0,51,0.6)' }}></span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-menu-button relative z-10"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6 text-st-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    {/* Developer Button */}
                    <Link to="/developers" className="hidden xl:block px-3 py-1.5 bg-black/80 text-white font-black text-xs rounded-lg border border-st-red/40 hover:border-st-red hover:bg-st-red hover:text-black transition-all duration-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,0,51,0.6)] relative z-10 overflow-hidden group/dev backdrop-blur-sm">
                        <span className="relative z-10 font-mono">&lt;/&gt;</span>
                        {/* Developer Btn Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/dev:translate-x-full transition-transform duration-1000"></div>
                        {/* Pulse Effect on Hover */}
                        <div className="absolute inset-0 bg-st-red/20 opacity-0 group-hover/dev:opacity-100 animate-pulse transition-opacity duration-500"></div>
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
