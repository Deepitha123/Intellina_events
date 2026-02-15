import { useState, useEffect, useRef } from 'react';
import FlipCard from '../../components/members/cards/FlipCard/FlipCard';
import GlobalEffects from '../../components/members/effects/GlobalEffects/GlobalEffects';
import DualRealityTransition from '../../components/members/effects/DualRealityTransition/DualRealityTransition';
import AshParticles from '../../components/members/effects/AshParticles/AshParticles';
import SplashCursor from '../../components/members/effects/SplashCursor/SplashCursor';
import D20 from '../../components/members/ui/D20/D20';
import StrangerTitle from '../../components/members/ui/StrangerTitle/StrangerTitle';
import ScrollReveal from '../../components/members/effects/ScrollReveal/ScrollReveal';
import "./Members.css";


export default function Members() {
    const [isUpsideDown, setIsUpsideDown] = useState(false);
    const [isFlipping, setIsFlipping] = useState(false);
    const titleRef = useRef(null); // Ref for scroll target

    // Manage body class for persistent theme state
    useEffect(() => {
        if (isUpsideDown) {
            document.body.classList.add('upside-down-active');
        } else {
            document.body.classList.remove('upside-down-active');
        }
    }, [isUpsideDown]);

    const toggleUpsideDown = () => {
        if (isFlipping) return;
        setIsFlipping(true);
        // Smooth scroll to top without reload
        titleRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handlePhaseChange = (phase) => {
        if (phase === 'FLIP_POINT') {
            // Commit the state change exactly when world is inverted (hidden/90deg)
            setIsUpsideDown(prev => !prev);
        }
        if (phase === 'idle') {
            setIsFlipping(false);
        }
    };

    // HOD
    const hod = {
        name: "DR.VALLIAPPAN RAMAN",
        role: "HEAD OF THE DEPARTMENT",
        description: "Visionary leader with over 20 years of experience in AI and academic excellence.",
        photo: "/assets/members/profiles/VALLIAPPANRAMAN.jpg",
        linkedin: "https://www.linkedin.com/in/valliappan-raman-smieee-ceng-uk-intpe-miet-mie-macs-34184b22/",
        email: "valliappan@cit.edu.in"
    };

    // Staff Advisors
    const staffAdvisors = [
        {
            name: "MRS.K.SUDHA",
            role: "STAFF ADVISOR",
            description: "Dedicated mentor guiding students towards technical innovation and research.",
            photo: "/assets/members/profiles/SUDHA.jpg",
            email: "sudhak@cit.edu.in"
        },
        {
            name: "MS.R.AKSHAYA",
            role: "STAFF ADVISOR",
            description: "Expert in machine learning, fostering a culture of continuous learning.",
            photo: "/assets/members/profiles/AKSHAYA.jpg",
            email: "akshaya@cit.edu.in"
        }
    ];

    // INTELLINA Coordinators
    const coordinators = [
        {
            name: "BALAMURALI",
            role: "INTELLINA COORDINATOR",
            description: "Driving force behind Intellina's events, ensuring seamless execution.",
            photo: "/assets/members/profiles/BALAMURALI.jpeg",
            linkedin: "https://www.linkedin.com/in/balamurali-m-08-oct?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            email: "71762308006@cit.edu.in",
            phone: "+91 88259 40346"
        },
        {
            name: "DHIVYA BHARATHY",
            role: "INTELLINA COORDINATOR",
            description: "Creative strategist ensuring high engagement and impactful events.",
            photo: "/assets/members/profiles/DHIVYA BHARATHY.jpeg",
            linkedin: "https://www.linkedin.com/in/dhivya-bharathy-9b118530b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            email: "71762308012@cit.edu.in",
            phone: "+91 88383 05421"
        }
    ];

    // Committee Members
    const committeeMembers = [
        { name: "AAKASH KANNAH R V", role: "SECRETARY", description: "Leading the team with strategic vision.", photo: "/assets/members/profiles/AAKASH KANNAN.jpeg", linkedin: "https://www.linkedin.com/in/aakash-kannah-6503b2371/", email: "Secretaryb.techai.ds@gmail.com" },
        { name: "RANJITH D", role: "CHIEF STUDENT COORDINATOR", description: "Orchestrating student activities effectively.", photo: "/assets/members/profiles/RANJITH.jpeg", linkedin: "https://www.linkedin.com/in/ranjith44/", email: "71762308044@cit.edu.in" },
        { name: "AATHITHYA G", role: "TREASURER", description: "Managing finances with precision.", photo: "/assets/members/profiles/AATHITHYA.jpeg", linkedin: "https://www.linkedin.com/in/aathithya-g-23560727a/", email: "71762308001@cit.edu.in" },
        { name: "KAVIYAA N", role: "CAREER DIRECTOR", description: "Guiding career development initiatives.", photo: "/assets/members/profiles/KAVIYAA.jpeg", linkedin: "https://www.linkedin.com/in/kaviyaa-n-62984335b/", email: "71762308028@cit.edu.in" },
        { name: "ARYA NAKSHATRA", role: "SOCIAL MEDIA LEAD", description: "Amplifying our digital presence.", photo: "/assets/members/profiles/ARYA NAKSHATHRA.jpeg", linkedin: "https://www.linkedin.com/in/arya-nakshathra-n-k-39b7832ba/", email: "71762308005@cit.edu.in" }
    ];



    return (
        <>
            <GlobalEffects />

            <DualRealityTransition
                isFlipping={isFlipping}
                isUpsideDown={isUpsideDown}
                onPhaseChange={handlePhaseChange}
            />

            {/* Interactive Ash Particles - Only in Upside Down mode */}
            <AshParticles isActive={isUpsideDown} />

            {/* Splash Cursor - Always active, color shifts with theme */}
            <SplashCursor
                color={isUpsideDown ? "#4a90e2" : "#e71d23"}
                SPLAT_FORCE={3000}
                SPLAT_RADIUS={0.15}
            />

            {/* Portal Button - Fixed on right side */}
            {/* D20 Toggle Button */}
            <D20
                onClick={toggleUpsideDown}
                isUpsideDown={isUpsideDown}
            />

            <div className={`members-container ${isFlipping ? 'flipping' : ''}`}>
                <div className="noise-overlay"></div>



                <div ref={titleRef} style={{ position: 'relative', zIndex: 100 }}>
                    <ScrollReveal>
                        <StrangerTitle
                            textTop="INTELLINA"
                            textBottom="2K26"
                            subtitle="DEPARTMENT OF ARTIFICIAL INTELLIGENCE AND DATA SCIENCE"
                            introText={<></>}
                            isUpsideDown={isUpsideDown}
                        />
                    </ScrollReveal>
                </div>

                {/* HOD - Real World Only */}
                {!isUpsideDown && (
                    <section className="members-section">
                        {/* Leadership Subtitle - Moved here for proximity */}
                        <p className="stranger-small-text leadership"
                            style={{ marginBottom: '0', marginTop: '1rem' }}>
                            Under the Leadership of
                        </p>
                        <ScrollReveal>
                            <h2 className="section-title" style={{ marginTop: '0.5rem' }}>HEAD OF THE DEPARTMENT</h2>
                        </ScrollReveal>
                        <div className="members-grid single">
                            <ScrollReveal delay={200}>
                                <FlipCard
                                    name={hod.name}
                                    role={hod.role}
                                    description={hod.description}
                                    photo={hod.photo}
                                    linkedin={hod.linkedin}
                                    email={hod.email}
                                    phone={hod.phone}
                                    isUpsideDown={isUpsideDown}
                                />
                            </ScrollReveal>
                        </div>
                    </section>
                )}

                {/* Staff Advisors - Real World Only */}
                {!isUpsideDown && (
                    <section className="members-section">
                        <ScrollReveal>
                            <h2 className="section-title">STAFF ADVISORS</h2>
                        </ScrollReveal>
                        <div className="members-grid two-col">
                            {staffAdvisors.map((member, index) => (
                                <ScrollReveal key={index} delay={index * 150}>
                                    <FlipCard
                                        name={member.name}
                                        role={member.role}
                                        description={member.description}
                                        photo={member.photo}
                                        linkedin={member.linkedin}
                                        email={member.email}
                                        phone={member.phone}
                                        isUpsideDown={isUpsideDown}
                                    />
                                </ScrollReveal>
                            ))}
                        </div>
                    </section>
                )}

                {/* INTELLINA Coordinators - Real World Only */}
                {!isUpsideDown && (
                    <section className="members-section">
                        <ScrollReveal>
                            <h2 className="section-title">INTELLINA COORDINATORS</h2>
                        </ScrollReveal>
                        <div className="members-grid two-col">
                            {coordinators.map((member, index) => (
                                <ScrollReveal key={index} delay={index * 150}>
                                    <FlipCard
                                        name={member.name}
                                        role={member.role}
                                        description={member.description}
                                        photo={member.photo}
                                        linkedin={member.linkedin}
                                        email={member.email}
                                        phone={member.phone}
                                        isUpsideDown={isUpsideDown}
                                    />
                                </ScrollReveal>
                            ))}
                        </div>
                    </section>
                )}

                {/* Committee Members - Upside Down Only */}
                {isUpsideDown && (
                    <section className="members-section">
                        <ScrollReveal>
                            <h2 className="section-title">COMMITTEE MEMBERS</h2>
                        </ScrollReveal>
                        <div className="members-grid">
                            {committeeMembers.map((member, index) => (
                                <ScrollReveal key={index} delay={index * 100}>
                                    <FlipCard
                                        name={member.name}
                                        role={member.role}
                                        description={member.description}
                                        photo={member.photo}
                                        linkedin={member.linkedin}
                                        email={member.email}
                                        phone={member.phone}
                                        isUpsideDown={isUpsideDown}
                                    />
                                </ScrollReveal>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}
