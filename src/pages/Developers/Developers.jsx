import React from 'react';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import './Developers.css';

const Developers = () => {
    const teamMembers = [
        {
            name: 'Abinaya',
            title: 'Developer',
            handle: 'abinaya',
            avatarUrl: '/assets/images/developers/abinaya.png',
            linkedinUrl: 'https://www.linkedin.com/in/abinaya-santhana-kumar-5a7340316?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        },
        {
            name: 'Agila',
            title: 'Developer',
            handle: 'agila',
            avatarUrl: '/assets/images/developers/Akila.png',
            linkedinUrl: 'https://www.linkedin.com/in/agila-tamil-selvan-859b82325?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        },
        {
            name: 'Hemkumar',
            title: 'Developer',
            handle: 'hemkumar',
            avatarUrl: '/assets/images/developers/Hemkumar.png',
            linkedinUrl: 'https://www.linkedin.com/in/hemkumar-r-7b749b326/',
        },
        {
            name: 'Kiruthika',
            title: 'Developer',
            handle: 'kiruthika',
            avatarUrl: '/assets/images/developers/kirthika.png',
            linkedinUrl: 'https://www.linkedin.com/in/kiruthika-k-477775396',
        },
        {
            name: 'Nandhakishore',
            title: 'Developer',
            handle: 'nandhakishore',
            avatarUrl: '/assets/images/developers/nandhakishore.png',
            linkedinUrl: 'https://www.linkedin.com/in/nandhakishore-bakkiyaraj-b89600332',
        },
        {
            name: 'Satthikumar',
            title: 'Developer',
            handle: 'satthikumar',
            avatarUrl: '/assets/images/developers/satthikumar.png',
            linkedinUrl: 'https://www.linkedin.com/in/satthikumar-m-998ba5325?utm_source=share_via&utm_content=profile&utm_medium=member_android',
        },
        {
            name: 'Shagul Hameeth',
            title: 'Developer',
            handle: 'shagulhameeth',
            avatarUrl: '/assets/images/developers/shagul.png',
            linkedinUrl: 'https://www.linkedin.com/in/shagul-hameeth-j-2a52bb326?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        },
        {
            name: 'Thirumaran',
            title: 'Developer',
            handle: 'thirumaran',
            avatarUrl: '/assets/images/developers/thirumaran.png',
            linkedinUrl: 'https://www.linkedin.com/in/thiru-maran-b30600326?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        },
    ];

    return (
        <div className="page-developers">
            <div className="developers-page">
                {/* Animated Background */}
                <div className="developers-bg" />
                <div className="developers-grid" />

                {/* Content */}
                <div className="developers-content">
                    {/* Hero Section */}
                    <div className="developers-hero">
                        <h1 className="developers-title">Developers</h1>
                        <p className="developers-subtitle">Meet the Architects of Innovation</p>
                        <p className="developers-tagline">
                            <strong>From bugs to breakthroughs—that's the developer life.</strong>
                        </p>
                    </div>

                    {/* Team Grid */}
                    <div className="developers-grid-container">
                        {teamMembers.map((member, index) => (
                            <ProfileCard
                                key={index}
                                name={member.name}
                                title={member.title}
                                handle={member.handle}
                                avatarUrl={member.avatarUrl}
                                enableTilt={true}
                                enableMobileTilt={false}
                                showBehindGlow={true}
                                behindGlowColor="rgba(125, 190, 255, 0.67)"
                                innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
                                showUserInfo={false}
                                showIcon={true}
                                linkedinUrl={member.linkedinUrl}
                                onContactClick={() => console.log(`Contact ${member.name}`)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Developers;
