import React from 'react';
import './StrangerTitle.css';

const StrangerTitle = ({
    textTop = "INTELLINA",
    textBottom = "2K26",
    subtitle = "DEPARTMENT OF ARTIFICIAL INTELLIGENCE & DATA SCIENCE",
    introText = "",
    isUpsideDown = false
}) => {
    // Helper function to render letters with "Stranger Things" edge scaling
    const renderWord = (word) => {
        return word.split('').map((char, index) => {
            const isEdge = index === 0 || index === word.length - 1;
            return (
                <span key={index} className={`st-char ${isEdge ? 'st-edge' : ''} char-${char.toUpperCase()}`}>
                    {char}
                </span>
            );
        });
    };

    return (
        <div className={`stranger-container ${isUpsideDown ? 'upside-down' : ''}`}>
            <div className="stranger-content">
                <div className="stranger-wrapper">
                    {/* Top glowing line */}
                    <div className="line-top"></div>

                    {/* Top Text (INTELLINA) */}
                    <div className="stranger-line top">
                        <h1 className="stranger-title">{renderWord(textTop)}</h1>
                    </div>

                    {/* Bottom Text (2K26) with side dashes */}
                    <div className="stranger-line bottom">
                        <div className="line-dash left"></div>
                        <h1 className="stranger-title">{renderWord(textBottom)}</h1>
                        <div className="line-dash right"></div>
                    </div>

                    {/* Bottom glowing line */}
                    <div className="line-bottom"></div>
                </div>

                {/* 1. Intro Text: "A National-Level Tech Fest by" */}
                {introText && <p className="stranger-small-text intro">{introText}</p>}

                {/* 2. Subtitle: DEPARTMENT OF ... */}
                {subtitle && <p className="stranger-subtitle">{subtitle}</p>}
            </div>
        </div>
    );
};

export default StrangerTitle;
