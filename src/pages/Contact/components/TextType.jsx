import React, { useState, useEffect } from 'react';

const TextType = ({
    text,
    speed = 100,
    initialDelay = 0,
    waitTime = 2000,
    deleteSpeed = 50,
    loop = true,
    className = '',
    cursorChar = '|',
    showCursor = true,
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        let timeout;

        const handleTyping = () => {
            setDisplayedText((prev) => {
                if (isDeleting) {
                    if (prev.length > 0) {
                        return prev.slice(0, -1);
                    }
                    return prev;
                } else {
                    if (prev.length < text.length) {
                        return text.slice(0, prev.length + 1);
                    }
                    return prev;
                }
            });

            if (!isDeleting && displayedText.length === text.length) {
                // Finished typing, wait before deleting
                if (loop) {
                    timeout = setTimeout(() => setIsDeleting(true), waitTime);
                }
            } else if (isDeleting && displayedText.length === 0) {
                // Finished deleting, switch to typing
                setIsDeleting(false);
                timeout = setTimeout(handleTyping, speed);
            } else {
                // Continue typing or deleting
                const nextSpeed = isDeleting ? deleteSpeed : speed;
                timeout = setTimeout(handleTyping, nextSpeed);
            }
        };

        // Start the loop only once or when mode changes (carefully)
        // Actually, better to just set timeout based on current state
        if (isDeleting) {
            if (displayedText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayedText(prev => prev.slice(0, -1));
                }, deleteSpeed);
            } else {
                setIsDeleting(false);
            }
        } else {
            if (displayedText.length < text.length) {
                timeout = setTimeout(() => {
                    setDisplayedText(text.slice(0, displayedText.length + 1));
                }, speed);
            } else {
                if (loop) {
                    timeout = setTimeout(() => setIsDeleting(true), waitTime);
                }
            }
        }

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, text, speed, deleteSpeed, waitTime, loop]);

    return (
        <span className={className}>
            {displayedText}
            {showCursor && (
                <span className="animate-pulse ml-1">{cursorChar}</span>
            )}
        </span>
    );
};

export default TextType;
