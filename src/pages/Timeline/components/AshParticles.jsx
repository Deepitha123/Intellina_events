import React from 'react';
import './AshParticles.css';

const AshParticles = ({ ashParticles, activeDay }) => {
    return (
        <>
            {ashParticles.map(p => (
                <div
                    key={p.id}
                    className="ash-particle"
                    style={{
                        left: p.left,
                        top: '-10px',
                        width: p.size,
                        height: p.size,
                        backgroundColor: activeDay === 'day1' ? '#fff' : '#cceeff',
                        opacity: p.opacity,
                        animation: `ash-fall ${p.duration}s linear infinite`,
                        animationDelay: p.delay,
                        filter: activeDay === 'day1' ? 'blur(1px)' : 'blur(1.5px) drop-shadow(0 0 5px rgba(0, 100, 255, 0.8))'
                    }}
                />
            ))}
        </>
    );
};

export default AshParticles;
