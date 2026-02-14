import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

const BackButton = () => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate(-1);
    };

    const handleRipple = (e) => {
        const btn = e.currentTarget;
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        const rect = btn.getBoundingClientRect();
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    };

    return (
        <button
            className="back-button-ultra"
            onClick={(e) => {
                handleRipple(e);
                setTimeout(handleClose, 200);
            }}
        >
            <div className="glow-ring"></div>
            <div className="glow-ring"></div>
            <div className="glow-ring"></div>

            <span className="arrow-icon">←</span>
            <span className="button-text">BACK</span>

            {/* Floating particles */}
            <div className="particle" style={{ '--tx': '-30px', '--ty': '-30px' }}></div>
            <div className="particle" style={{ '--tx': '30px', '--ty': '-30px' }}></div>
            <div className="particle" style={{ '--tx': '-30px', '--ty': '30px' }}></div>
            <div className="particle" style={{ '--tx': '30px', '--ty': '30px' }}></div>
            <div className="particle" style={{ '--tx': '0px', '--ty': '-40px' }}></div>
            <div className="particle" style={{ '--tx': '0px', '--ty': '40px' }}></div>
        </button>
    );
};

export default BackButton;
