import React from 'react';
import './FlipCard.css';

const FlipCard = ({ name, role, description, photo, linkedin, github, email, phone, isUpsideDown }) => {
    return (
        <div className={`flip-card-wrapper ${isUpsideDown ? 'upside-down-theme' : ''}`}>
            <div className="card">
                <div className="content">
                    {/* FRONT SIDE: Photo + Name/Role */}
                    <div className="front" style={photo ? { backgroundImage: `url('${photo}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
                        <div className="front-bg-overlay" style={photo ? { height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)' } : {}}></div>

                        {!photo && (
                            <div className="profile-image-container">
                                {/* Placeholder SVG only if no photo */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-circle profile-icon" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg>
                            </div>
                        )}

                        <div className="front-details">
                            <h3 className="card-name">{name}</h3>
                            <span className="card-role">{role}</span>
                        </div>
                    </div>

                    {/* BACK SIDE: Details + Icons */}
                    <div className="back">
                        <div className="back-content">
                            <p className="card-description">
                                {description || "Member of the Intellina Team."}
                            </p>

                            {/* Contact Info Text */}
                            <div className="contact-text">
                                {email && <p className="contact-item">Email : {email}</p>}
                                {phone && <p className="contact-item">Mobile number: {phone}</p>}
                            </div>

                            <div className="social-icons">
                                {/* LinkedIn */}
                                {/* LinkedIn */}
                                {linkedin && (
                                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className="icon-link linkedin">
                                        <i className="fa-brands fa-linkedin-in"></i>
                                    </a>
                                )}

                                {/* GitHub */}
                                {github && (
                                    <a href={github} target="_blank" rel="noopener noreferrer" className="icon-link github">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                                        </svg>
                                    </a>
                                )}

                                {/* Email */}
                                {email && (
                                    <a href={`mailto:${email}`} className="icon-link email">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                        </svg>
                                    </a>
                                )}

                                {/* Mobile/Call */}
                                {phone && (
                                    <a href={`tel:${phone}`} className="icon-link phone">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;
