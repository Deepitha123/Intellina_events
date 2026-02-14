import React, { useEffect } from 'react';

const LuckyEventModal = ({ event, onClose }) => {
    useEffect(() => {
        // Add escape key listener
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!event) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-md transform scale-100 transition-all duration-500 ease-out animate-in zoom-in-95">
                {/* Magical Sparkle/Glow Background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-600 rounded-2xl opacity-75 blur-lg group-hover:opacity-100 animate-pulse duration-1000" />

                <div className="relative bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                    {/* Header */}
                    <div className="p-6 text-center border-b border-white/5">
                        <div className="inline-block p-2 px-3 mb-2 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-yellow-400">
                            Lucky Roll!
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-1" style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
                            {event.title}
                        </h2>
                        <p className="text-gray-400 text-sm uppercase tracking-widest">{event.category} EVENT</p>
                    </div>

                    {/* Body */}
                    <div className="p-8 text-center space-y-4">
                        <div className="text-6xl mb-4 transform hover:scale-110 transition-transform duration-300">
                            {event.icon}
                        </div>
                        <p className="text-lg text-gray-200 leading-relaxed font-light">
                            {event.fullDesc}
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="p-4 bg-black/20 text-center">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-full font-bold hover:from-red-500 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/20 transform hover:-translate-y-0.5"
                        >
                            Collect Reward
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LuckyEventModal;
