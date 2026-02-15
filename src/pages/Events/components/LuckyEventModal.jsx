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

            {/* Modal Content - Compact Size */}
            <div className="relative w-full max-w-lg transform scale-100 transition-all duration-500 ease-out animate-in zoom-in-95">
                {/* Magical Sparkle/Glow Background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-600 rounded-2xl opacity-60 blur-xl animate-pulse duration-1000" />

                <div className="relative bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] max-h-[85vh] flex flex-col">
                    {/* Header */}
                    <div className="p-5 md:p-6 text-center border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent flex-shrink-0">
                        <div className="inline-block p-1.5 px-3 mb-2 rounded-full bg-yellow-400/10 text-xs font-bold uppercase tracking-[0.2em] text-yellow-400 border border-yellow-400/20">
                            Lucky Roll!
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-white mb-1 leading-tight" style={{ textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
                            {event.title}
                        </h2>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.25em]">{event.category} EVENT</p>
                    </div>

                    {/* Body */}
                    <div className="p-5 md:p-8 text-center space-y-4 md:space-y-6 overflow-y-auto custom-scrollbar flex-grow">
                        <div className="text-5xl md:text-7xl mb-3 md:mb-4 transform hover:scale-110 transition-transform duration-500 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            {event.icon}
                        </div>
                        <div className="max-w-md mx-auto">
                            <p className="text-base md:text-lg text-gray-200 leading-relaxed">
                                {event.fullDesc}
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 md:p-5 bg-black/40 border-t border-white/5 text-center flex-shrink-0">
                        <button
                            onClick={onClose}
                            className="px-8 py-3 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white rounded-full font-black text-sm uppercase tracking-wider hover:from-red-500 hover:via-red-600 hover:to-red-700 transition-all duration-300 shadow-[0_10px_30px_rgba(220,38,38,0.3)] hover:shadow-[0_15px_40px_rgba(220,38,38,0.5)] transform hover:-translate-y-1 active:scale-95 w-full sm:w-auto"
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
