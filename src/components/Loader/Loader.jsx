import React, { useEffect, useState, useRef } from 'react';
import './Loader.css';

const Loader = ({ onEnter }) => {
    const [introHidden, setIntroHidden] = useState(false);
    const [viewportShow, setViewportShow] = useState(false);
    const [skipBtnShow, setSkipBtnShow] = useState(false);
    const musicRef = useRef(null);

    // Audio file
    const audioSrc = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/161676/music.mp3";

    const startAnimation = () => {
        setIntroHidden(true);

        // Try playing music
        if (musicRef.current) {
            musicRef.current.play().catch(e => console.log('Audio autoplay blocked, normal interaction will fix'));
        }

        setTimeout(() => {
            setViewportShow(true);
            setSkipBtnShow(true);

            // Credits animation - show each credit for 3 seconds
            const creditsMs = 3000;
            const creditElements = document.querySelectorAll('.credits-group');

            creditElements.forEach((credit, i) => {
                setTimeout(() => {
                    // Hide previous credit
                    if (creditElements[i - 1]) {
                        creditElements[i - 1].classList.remove('credits-group--show');
                    }
                    // Show current credit
                    credit.classList.add('credits-group--show');
                }, i * creditsMs);
            });

            // Hide last credit after its duration
            setTimeout(() => {
                if (creditElements[creditElements.length - 1]) {
                    creditElements[creditElements.length - 1].classList.remove('credits-group--show');
                }
            }, creditElements.length * creditsMs);

            // Scene animations
            const scenesMs = [creditsMs, creditsMs * 2, creditsMs, creditsMs, creditsMs, creditsMs, creditsMs * 2, 19500];
            const sceneElements = document.querySelectorAll('.title--scene');
            const fullTitle = document.querySelector('.title--full');

            let offset = 0;
            sceneElements.forEach((scene, i) => {
                setTimeout(() => {
                    if (sceneElements[i - 1]) {
                        sceneElements[i - 1].classList.remove('title--show');
                    }
                    scene.classList.add('title--show');
                }, offset);
                offset += scenesMs[i];
            });

            // Show full title after all scenes
            setTimeout(() => {
                if (sceneElements[sceneElements.length - 1]) {
                    sceneElements[sceneElements.length - 1].classList.remove('title--show');
                }
                if (fullTitle) {
                    fullTitle.classList.add('title--show');
                }

                // Complete after full title animation (20s)
                setTimeout(() => {
                    onEnter();
                }, 20000);
            }, offset);

        }, 1500);
    };

    useEffect(() => {
        musicRef.current = new Audio(audioSrc);
        return () => {
            if (musicRef.current) {
                musicRef.current.pause();
                musicRef.current = null;
            }
        };
    }, []);

    return (
        <div id="loader-wrapper">
            <div className={`intro ${introHidden ? 'intro--hide' : ''}`}>
                <h1 className="intro-title">INTELLINA 2K26</h1>
                <p className="intro-text intro-text--show" style={{ maxWidth: '600px', margin: '0 auto', letterSpacing: '0.5px' }}>
                    <span style={{ display: 'block', marginBottom: '1em', textTransform: 'uppercase', fontSize: '0.8em', letterSpacing: '2px', color: '#666' }}>-- U.S. DEPARTMENT OF ENERGY --</span>
                    The Department of AI & Data Science is cracking the dimensional barrier at C.I.T.
                    <br /><br />
                    <span style={{ color: '#fff', textShadow: '0 0 5px rgba(255,255,255,0.5)' }}>WARNING:</span> The frequencies are unstable.
                    Engage your audio transmitters for safe passage.
                    <br />

                    <button className="intro-text-play mt-8" onClick={startAnimation}>
                        OPEN THE GATE
                    </button>
                </p>
            </div>

            <div className={`viewport ${viewportShow ? 'viewport--show' : ''}`}>
                <div className="scene">
                    <div className="title title--full">
                        <div className="title-word">
                            <span className="title-word-letter" data-letter="S1">
                                <span className="title-word-letter-large">I</span>
                                <div className="titlebar titlebar--left"></div>
                            </span>
                            <span className="title-word-letter" data-letter="T1">N</span>
                            <span className="title-word-letter" data-letter="R1">T</span>
                            <span className="title-word-letter" data-letter="A">E</span>
                            <span className="title-word-letter" data-letter="N1">L</span>
                            <span className="title-word-letter" data-letter="G1">L</span>
                            <span className="title-word-letter" data-letter="E1">I</span>
                            <span className="title-word-letter" data-letter="E2">N</span>
                            <span className="title-word-letter" data-letter="R2">
                                <span className="title-word-letter-large">A</span>
                                <div className="titlebar titlebar--right"></div>
                            </span>
                            <div className="titlebar titlebar--top"></div>
                        </div>

                        <div></div>

                        <div className="title-word title-word-second">
                            <span className="title-word-letter" data-letter="T2">2</span>
                            <span className="title-word-letter" data-letter="H">K</span>
                            <span className="title-word-letter" data-letter="G2">2</span>
                            <span className="title-word-letter" data-letter="S2">6</span>
                        </div>
                    </div>

                    <div className="title title--scene title--scene0"></div>
                    <div className="title title--scene title--scene1"><div className="title-word"><div className="title-word-letter" data-letter="A">I</div></div></div>
                    <div className="title title--scene title--scene2"><div className="title-word"><div className="title-word-letter" data-letter="N">N</div></div></div>
                    <div className="title title--scene title--scene3"><div className="title-word"><div className="title-word-letter" data-letter="R">T</div><div className="title-word-letter" data-letter="I">I</div></div></div>
                    <div className="title title--scene title--scene4"><div className="title-word"><div className="title-word-letter" data-letter="S">L</div><div className="title-word-letter" data-letter="G">L</div></div></div>
                    <div className="title title--scene title--scene5"><div className="title-word"><div className="title-word-letter" data-letter="R">I</div><div className="title-word-letter" data-letter="S">N</div></div></div>
                    <div className="title title--scene title--scene6">
                        <div className="title-word">
                            <div className="title-word-letter" data-letter="I">I</div>
                            <div className="title-word-letter" data-letter="A">N</div>
                            <div className="title-word-letter" data-letter="T">T</div>
                            <div className="title-word-letter" data-letter="H">E</div>
                            <div className="title-word-letter" data-letter="N">L</div>
                            <div className="title-word-letter" data-letter="G">L</div>
                        </div>
                    </div>
                </div>

                <div className="credits">
                    <div className="credits-group"><div className="credits-group-credit" data-text="A CIT Original Series">A CIT Original Series</div></div>
                    <div className="credits-group"><div className="credits-group-credit" data-text="The Department of">The Department of</div></div>
                    <div className="credits-group"><div className="credits-group-credit" data-text="Artificial Intelligence and Data Science">Artificial Intelligence and Data Science</div></div>
                    <div className="credits-group">
                        <div className="credits-group-credit" data-text="Proudly Presents">Proudly Presents</div>
                        <div className="credits-group-credit" data-text="A National Level Tech Symposium">A National Level Tech Symposium</div>
                    </div>
                    <div className="credits-group">
                        <div className="credits-group-credit" data-text="INTELLINA">INTELLINA</div>
                        <div className="credits-group-credit" data-text="2K26">2K26</div>
                    </div>
                    <div className="credits-group">
                        <div className="credits-group-credit" data-text="Coming Soon">Coming Soon</div>
                        <div className="credits-group-credit" data-text="MARCH 6 & 7">MARCH 6 & 7</div>
                    </div>
                    <div className="credits-group"><div className="credits-group-credit" data-text="Get Ready">Get Ready</div></div>
                    <div className="credits-group">
                        <div className="credits-group-sub" data-text="To Enter">To Enter</div>
                        <div className="credits-group-credit" data-text="The National Level Tech Symposium">The National Level Tech Symposium</div>
                    </div>
                </div>
            </div>

            <div className="vignette"></div>
            <div className="grain"></div>
            <div className="letterbox">
                <div className="letterbox-cover letterbox-cover--top"></div>
                <div className="letterbox-cover letterbox-cover--left"></div>
                <div className="letterbox-cover letterbox-cover--right"></div>
                <div className="letterbox-cover letterbox-cover--bottom"></div>
            </div>

            <button
                className={`skip-intro-btn ${skipBtnShow ? 'skip-intro-btn--show' : ''}`}
                onClick={onEnter}
            >
                Skip Intro
            </button>
        </div>
    );
};

export default Loader;
