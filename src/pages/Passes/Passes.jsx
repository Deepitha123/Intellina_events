import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ChevronRight, ArrowRight, Terminal } from 'lucide-react';
import './Passes.css';

const REGISTRATION_URL = "https://docs.google.com/forms/d/e/1FAIpQLScUsI6og_xxSWquoO9k74xv3ZbN1xHb5D94Kw8jrLcpdih0Rw/viewform";

const passesData = [
    {
        name: "TECH INITIATE",
        price: 250,
        tagline: "Begin your journey into the unknown",
        events: ["Paper Presentation", "GPTathon", "Web Design"],
        dotColor: "#4ade80",
        accentColor: "#4ade80",
        emoji: "⚡",
        delay: 0.1,
        popular: false,
    },
    {
        name: "STRATEGIST",
        price: 250,
        tagline: "Outsmart the darkness",
        events: ["Treasure Hunt", "Object Odyssey", "Connections"],
        dotColor: "#60a5fa",
        accentColor: "#60a5fa",
        emoji: "🕳",
        delay: 0.2,
        popular: false,
    },
    {
        name: "CHALLENGER",
        price: 300,
        tagline: "Face the upside down",
        events: ["RRR", "Worst UI", "Project Expo"],
        dotColor: "#f87171",
        accentColor: "#f87171",
        emoji: "🔥",
        delay: 0.3,
        popular: true,
    },
    {
        name: "SURVIVOR",
        price: 300,
        tagline: "Only the worthy remain",
        events: ["Bigg Boss", "Murder Mystery", "IPL Auction"],
        dotColor: "#facc15",
        accentColor: "#facc15",
        emoji: "⚔",
        delay: 0.4,
        popular: false,
    },
];

const PassCard = ({ name, price, tagline, events, dotColor, accentColor, emoji, delay, popular }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay, ease: "easeOut" }}
        className="reg-pack"
        tabIndex={0}
        role="article"
        aria-label={`${name} pass - ₹${price}`}
    >
        {/* Colored accent line at top */}
        <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
            opacity: 0.6,
        }} />

        {/* Popular badge */}
        {popular && <span className="badge-popular">★ MOST POPULAR</span>}

        {/* Title with Icon Inline */}
        <div className="pack-title">
            <span style={{ fontSize: '1.6rem', filter: `drop-shadow(0 0 12px ${accentColor})`, lineHeight: 1 }}>{emoji}</span>
            {name}
        </div>

        {/* Price label */}
        <span className="pack-price-label">EARLY BIRD PRICE</span>

        {/* Price */}
        <p className="pack-price">₹{price}</p>

        {/* Tagline */}
        <p className="pack-desc">"{tagline}"</p>

        {/* Events List */}
        <ul className="pack-events">
            {events.map((event, i) => (
                <li key={i}>
                    <span className="dot" style={{ backgroundColor: dotColor, boxShadow: `0 0 12px ${dotColor}` }}></span>
                    {event}
                </li>
            ))}
        </ul>

        {/* Button */}
        <button
            className="btn-register"
            aria-label={`Register for ${name} pass`}
            onClick={() => window.open(REGISTRATION_URL, '_blank')}
        >
            REGISTER NOW <ArrowRight size={16} />
        </button>
    </motion.div>
);

/* Helper to convert hex to rgb for inline rgba */
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
}

export default function Passes() {
    return (
        <div className="page-passes">
            <div id="unified-passes-page">
                <div className="passes-bg">
                    <div className="relative z-10" style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px 20px 80px' }}>



                        {/* Hero Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="section-heading text-center text-[45px] mb-4"
                            style={{ fontSize: '45px' }}
                        >
                            <center>CHOOSE YOUR BATTLE PASS</center>

                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="page-subtitle text-center max-w-2xl mx-auto"
                            style={{ marginBottom: '60px' }}
                        >
                            <center>
                                <div className="inline-block px-6 py-2 rounded-full border border-red-500/30 bg-red-950/20 backdrop-blur-sm">
                                    <p className="text-red-400 font-mono text-sm md:text-base tracking-widest uppercase animate-pulse">
                                        ⚠ Early Bird Registration - Active only for Few days — Expiring Soon
                                    </p>
                                </div>
                            </center>

                        </motion.p>

                        {/* 2x2 Grid */}
                        <div className="passes-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '50px',
                            justifyContent: 'center',
                            justifyItems: 'center',
                            margin: '0 auto 80px',
                        }}>
                            {passesData.map((pass, i) => (
                                <PassCard key={i} {...pass} />
                            ))}
                        </div>

                        {/* Hackathon Standalone */}
                        <div className="w-full flex justify-center mb-20 px-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.96 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="hackathon-card w-full max-w-[500px] mx-auto"
                                style={{ padding: '44px' }}
                            >
                                {/* Title & Desc Group */}
                                <div className="flex flex-col items-center gap-2 mb-6">
                                    <div className="pack-title !justify-center">
                                        <Terminal size={28} className="text-red-600" style={{ filter: 'drop-shadow(0 0 8px rgba(255,26,26,0.6))' }} />
                                        HACKATHON
                                    </div>
                                    <p className="pack-desc">"8-Hour Coding Battle – Build. Break. Conquer."</p>
                                </div>

                                {/* Price Section Wrapper */}
                                <div className="price-section flex flex-col items-center gap-6 w-full">
                                    <div className="flex flex-col items-center">
                                        <span className="pack-price-label" style={{ display: 'block' }}>STANDALONE ENTRY</span>
                                        <p className="pack-price !text-5xl md:!text-6xl">₹250</p>
                                    </div>

                                    <button
                                        className="btn-register flex justify-center items-center"
                                        style={{ minWidth: '280px', width: 'auto', padding: '0 40px' }}
                                        aria-label="Register for Hackathon"
                                        onClick={() => window.open(REGISTRATION_URL, '_blank')}
                                    >
                                        REGISTER NOW <ArrowRight size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        </div>


                        {/* Final CTA */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-center pt-10"
                            style={{ borderTop: '1px solid rgba(255,26,26,0.08)' }}
                        >
                            <br />
                            <center>
                                <p className="warning-text mt-6">
                                    ⚠ One pass allows access only to events listed under it.
                                </p>
                            </center>
                        </motion.div>
                    </div >
                </div >
            </div>
        </div>
    );
}
