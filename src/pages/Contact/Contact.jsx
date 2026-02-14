import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Radio } from "lucide-react";
import SplashCursor from "./components/SplashCursor";
import TextType from "./components/TextType";
import "./Contact.css";

// Floating Particles Component
function FloatingParticles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 80; i++) {
      const isBlue = Math.random() > 0.5;
      const size = Math.random() * 12 + 8; // Bigger particles: 8-20px
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: size,
        duration: Math.random() * 8 + 6, // Faster motion: 6-14s
        delay: Math.random() * 5,
        color: isBlue ? '51, 102, 204' : '255, 51, 51',
        moveX: (Math.random() - 0.5) * 100, // Random horizontal movement
        moveY: (Math.random() - 0.5) * 100, // Random vertical movement
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, rgba(${particle.color}, 0.9), rgba(${particle.color}, 0.4) 50%, transparent)`,
            boxShadow: `0 0 ${particle.size * 4}px rgba(${particle.color}, 0.8), 0 0 ${particle.size * 2}px rgba(${particle.color}, 0.6)`,
            animation: `float-particle-big ${particle.duration}s ${particle.delay}s ease-in-out infinite`,
            '--move-x': `${particle.moveX}px`,
            '--move-y': `${particle.moveY}px`,
          }}
        />
      ))}
    </div>
  );
}

// Lightning Effect Component
function LightningEffect() {
  const [lightning, setLightning] = useState([]);

  useEffect(() => {
    const createLightning = () => {
      const newLightning = [];
      for (let i = 0; i < 3; i++) {
        newLightning.push({
          id: i,
          x: Math.random() * window.innerWidth,
          delay: Math.random() * 5,
          duration: 0.3 + Math.random() * 0.2,
        });
      }
      setLightning(newLightning);
    };

    createLightning();
    const interval = setInterval(createLightning, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {lightning.map((bolt) => (
        <div
          key={bolt.id}
          className="absolute"
          style={{
            left: bolt.x,
            top: 0,
            width: "2px",
            height: "100%",
            background: "linear-gradient(to bottom, transparent, rgba(51, 102, 204, 0.8), transparent)",
            boxShadow: "0 0 10px rgba(51, 102, 204, 0.6), 0 0 20px rgba(51, 102, 204, 0.4)",
            animation: `lightning ${bolt.duration}s ${bolt.delay}s ease-out`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}

// Portal Ripple Effect
function PortalRipple() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          border: "2px solid rgba(255, 51, 51, 0.3)",
          animation: "portal-ripple 4s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          border: "2px solid rgba(255, 51, 51, 0.4)",
          animation: "portal-ripple 3s ease-in-out infinite 0.5s",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          border: "2px solid rgba(255, 51, 51, 0.5)",
          animation: "portal-ripple 2s ease-in-out infinite 1s",
        }}
      />
    </div>
  );
}

// Galaxy Background Component with Animated Stars
function GalaxyBackground() {
  const [scrollY, setScrollY] = useState(0);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Generate random stars
    const newStars = [];
    for (let i = 0; i < 200; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3,
        opacity: Math.random() * 0.8 + 0.2,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5,
      });
    }
    setStars(newStars);
  }, []);

  const backgroundImageUrl = "/assets/contact/stranger-things-bg.png";

  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-[#060010]">
      {/* Galaxy gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, #1a0033 0%, #0a001a 40%, #060010 100%)",
        }}
      />

      {/* Stranger Things background image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${encodeURI(backgroundImageUrl)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${-scrollY * 0.05}px)`,
          filter: "brightness(0.7) contrast(1.3) saturate(1.2)",
          opacity: 0.85,
        }}
      />

      {/* Nebula clouds overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(51, 102, 204, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(139, 0, 139, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(255, 51, 51, 0.2) 0%, transparent 60%)
          `,
          animation: "nebula-drift 30s ease-in-out infinite",
        }}
      />

      {/* Animated stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: star.size > 2 ?
              `radial-gradient(circle, rgba(255, 255, 255, ${star.opacity}), rgba(51, 102, 204, ${star.opacity * 0.5}))` :
              `rgba(255, 255, 255, ${star.opacity})`,
            boxShadow: star.size > 2 ?
              `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity * 0.8})` :
              'none',
            animation: `twinkle ${star.duration}s ${star.delay}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Cosmic dust overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
          mixBlendMode: "screen",
        }}
      />

      {/* Dark vignette for contrast */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, transparent 20%, rgba(6, 0, 16, 0.7) 100%)",
        }}
      />
    </div>
  );
}

export default function StrangerThingsContact() {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentReview, setCurrentReview] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const reviews = [
    {
      title: "GPTathon Was a Game Changer",
      rating: 5,
      text: "The GPTathon event was incredibly well-structured. Working with AI prompts under time pressure really tested our creativity and problem-solving skills. The judges gave constructive feedback that was actually useful. What impressed me most was how the event balanced technical knowledge with creative thinking. We had to optimize prompts for different scenarios, which taught us a lot about AI limitations and capabilities. The organizers did a great job explaining the judging criteria upfront, so we knew exactly what to focus on.",
      reviewer: "Participant",
    },
    {
      title: "Hackathon Pushed My Limits",
      rating: 4,
      text: "The coding challenge was intense but worth it. Our team built something functional and learned a lot about collaboration under pressure. The mentors were available when we got stuck, which helped a lot. We had to pivot our idea halfway through when we realized our initial approach wasn't feasible, and that taught us valuable lessons about adaptability. The presentation round at the end was nerve-wracking but good practice for pitching ideas. Would definitely participate again next year.",
      reviewer: "Participant",
    },
    {
      title: "Worst UI Design - Best Fun",
      rating: 5,
      text: "Ironically, the Worst UI Design competition was the most fun I had. Creating intentionally terrible interfaces while following design principles backwards was hilarious and educational. 10/10 would make ugly buttons again. The creativity people showed in making things deliberately confusing was impressive. One team made a login page where the submit button ran away from your cursor. We learned more about good UX by intentionally breaking every rule. The judges were laughing throughout the presentations, which made the whole atmosphere really enjoyable.",
      reviewer: "Participant",
    },
    {
      title: "Treasure Hunt Was Clever",
      rating: 4,
      text: "The Treasure Hunt combined coding challenges with physical clues around campus. Good mix of technical and logical thinking. Some clues were tricky but fair. Would recommend wearing comfortable shoes. Each checkpoint had a different type of puzzle - some were algorithm problems, others were riddles or pattern recognition tasks. The way they integrated the campus landmarks into the hunt was creative. Our team got stuck on one cryptography challenge for way too long, but figuring it out felt really satisfying. Great team bonding experience overall.",
      reviewer: "Participant",
    },
    {
      title: "IPL Auction Strategy Event",
      rating: 4,
      text: "The IPL Auction event was surprisingly strategic. Had to balance budgets, player stats, and team composition. Good practice for data analysis and quick decision-making. Learned more about cricket economics than expected. The real-time bidding format kept everyone on their toes, and you had to think several moves ahead like chess. We used spreadsheets to track our spending and player values, which turned into a mini data science project. The winning team had clearly done their homework on player performance metrics. Fun way to apply analytical skills to something different from typical tech competitions.",
      reviewer: "Participant",
    },
  ];

  const handleSubmit = () => {
    // Create Gmail compose URL with form data
    const recipient = "secretaryb.techai.ds@gmail.com";
    const subject = encodeURIComponent(formData.subject || "Signal from Hawkins");
    const body = encodeURIComponent(
      `Name: ${formData.name}\n\nMessage:\n${formData.message}`
    );

    // Open Gmail compose in new tab
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const nextReview = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const next = (currentReview + 1) % reviews.length;
    console.log("Next clicked! Current:", currentReview, "Going to:", next);
    setCurrentReview(next);
  };

  const prevReview = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const prev = (currentReview - 1 + reviews.length) % reviews.length;
    console.log("Prev clicked! Current:", currentReview, "Going to:", prev);
    setCurrentReview(prev);
  };

  const goToReview = (index, e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Dot clicked! Current:", currentReview, "Going to:", index);
    setCurrentReview(index);
  };

  // eventPhotos array removed as we now use CSS grid gradients

  return (
    <div className="page-contact">
      <GalaxyBackground />
      <SplashCursor />
      <FloatingParticles />
      <LightningEffect />
      <PortalRipple />
      <div id="contact-root" className="min-h-screen text-white font-sans relative overflow-hidden selection:bg-red-500/30">

        {/* Scanline Effect */}
        <div className="fixed inset-0 scanline pointer-events-none z-50"></div>

        <div className="max-w-7xl mx-auto relative z-20">
          {/* Hero Section - The Gate is Open */}
          <section className="text-center mb-16 md:mb-20 py-16 md:py-24 border-b border-blue-900/30 relative overflow-hidden">
            {/* Subtle overlay for text readability */}
            <div
              className="absolute inset-0 z-0"
              style={{
                background: "radial-gradient(ellipse at center, rgba(10, 20, 50, 0.4) 0%, rgba(51, 102, 204, 0.2) 50%, rgba(139, 0, 0, 0.15) 70%)",
                animation: "pulse 4s ease-in-out infinite",
              }}
            ></div>

            {/* Electric grid overlay */}
            <div
              className="absolute inset-0 z-0 opacity-15"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(51, 102, 204, 0.15) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(51, 102, 204, 0.15) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
                animation: "glitch-scan 10s linear infinite",
              }}
            ></div>

            <div className="flex flex-col items-center justify-center">
              <h1 className="conformity-gate font-bold relative z-10 drop-shadow-2xl horror-title intense-flicker fade-in-down py-2">
                <TextType
                  text="THE GATE IS OPEN"
                  speed={150}
                  waitTime={1500}
                  deleteSpeed={100}
                  cursorChar="|"
                />
              </h1>
            </div>
          </section>

          {/* Contact Form + Reviews Section */}
          <section className="mb-16 md:mb-20 fade-in relative overflow-hidden">
            {/* Subtle overlay for section separation */}
            <div className="absolute inset-0 z-0 bg-overlay-2 opacity-60"></div>

            <div className="grid lg:grid-cols-2 gap-12 items-stretch relative z-10">
              {/* Left: Contact Form */}
              <div
                className="deep-navy-card border-2 border-red-900/40 p-8 md:p-10 glow-border relative fade-in-left flip-in card-3d glow-pulse overflow-hidden group"
                style={{
                  boxShadow: "0 0 20px rgba(255, 51, 51, 0.1)",
                }}
              >
                <div
                  className="absolute inset-0 z-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(135deg, rgba(20, 0, 0, 0.9) 0%, rgba(60, 10, 10, 0.8) 50%, rgba(20, 0, 0, 0.9) 100%)",
                    backgroundSize: "200% 200%",
                    animation: "electric-flow 10s ease infinite",
                  }}
                ></div>
                <div className="scanline-overlay"></div>
                <div className="mb-6 md:mb-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-6 neon-text-soft flex items-center gap-2">
                    SIGNAL FROM HAWKINS
                  </h3>

                </div>

                {submitted && (
                  <div className="mb-6 p-4 bg-red-900/30 border-2 border-red-500 text-center neon-text-red animate-pulse">
                    ⚡ Signal received. Stand by. ⚡
                  </div>
                )}

                <div className="space-y-6">
                  <div className="fade-in-up stagger-1">
                    <label className="block text-gray-300 mb-2 font-semibold">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full deep-navy-card border-2 border-red-900/50 p-3 text-white focus:border-red-500 focus:outline-none transition-all input-glow hover-glow"
                      placeholder="Enter your name..."
                    />
                  </div>

                  <div className="fade-in-up stagger-2">
                    <label className="block text-gray-300 mb-2 font-semibold">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full deep-navy-card border-2 border-red-900/50 p-3 text-white focus:border-red-500 focus:outline-none transition-all input-glow hover-glow"
                      placeholder="Enter email subject..."
                    />
                  </div>

                  <div className="fade-in-up stagger-3">
                    <label className="block text-gray-300 mb-2 font-semibold">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full deep-navy-card border-2 border-red-900/50 p-3 text-white focus:border-red-500 focus:outline-none transition-all resize-none input-glow hover-glow"
                      placeholder="Type your message here..."
                    ></textarea>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-red-900/50 border-2 border-red-500 text-red-500 py-4 px-6 font-bold glow-button cursor-pointer text-lg bounce-in stagger-5 hover-grow"
                  >
                    ⚡ SEND MESSAGE ⚡
                  </button>
                </div>
              </div>

              {/* Right: Reviews Section */}
              <div
                className="deep-navy-card border-2 border-red-900/50 p-8 md:p-10 glow-border-always relative fade-in-right flip-in card-3d glow-pulse group overflow-hidden"
                style={{ boxShadow: "0 0 15px rgba(255, 51, 51, 0.2)" }}
              >
                {/* Card Background - Animated Gradient */}
                <div
                  className="absolute inset-0 z-0 opacity-40 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(135deg, rgba(20, 0, 0, 0.9) 0%, rgba(60, 10, 10, 0.8) 50%, rgba(20, 0, 0, 0.9) 100%)",
                    backgroundSize: "200% 200%",
                    animation: "electric-flow 10s ease infinite",
                  }}
                ></div>

                {/* Grid Overlay */}
                <div
                  className="absolute inset-0 z-0 opacity-20"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255, 51, 51, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 51, 51, 0.3) 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/90 z-0 morph-bg"></div>

                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold mb-6 neon-text-soft flex items-center gap-2">
                    Review from Intellina 2K25
                  </h3>

                  <div className="min-h-[340px]">
                    <div className="review-slide" key={currentReview}>
                      <h4 className="text-2xl font-bold text-white mb-4">
                        {reviews[currentReview].title}
                      </h4>

                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-6 h-6 ${i < reviews[currentReview].rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-600"
                              }`}
                          />
                        ))}
                      </div>

                      <p className="text-gray-300 mb-6 leading-relaxed text-base">
                        {reviews[currentReview].text}
                      </p>

                      <p className="text-red-400 font-semibold text-lg">
                        — {reviews[currentReview].reviewer}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevReview}
                    className="bg-red-900/30 hover:bg-red-900/50 border-2 border-red-500/50 hover:border-red-500 p-3 transition-all cursor-pointer z-10 hover-grow hover-glow"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-6 h-6 text-red-500" />
                  </button>

                  <div className="flex gap-2">
                    {reviews.map((_, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={(e) => goToReview(idx, e)}
                        className={`h-3 rounded-full transition-all cursor-pointer z-10 hover-grow ${idx === currentReview
                          ? "bg-red-500 w-8 bounce-in"
                          : "bg-red-900/50 hover:bg-red-700/50 w-3"
                          }`}
                        aria-label={`Go to review ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={nextReview}
                    className="bg-red-900/30 hover:bg-red-900/50 border-2 border-red-500/50 hover:border-red-500 p-3 transition-all cursor-pointer z-10 hover-grow hover-glow"
                    aria-label="Next review"
                  >
                    <ChevronRight className="w-6 h-6 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Assistance Section */}
          <section className="mb-16 md:mb-20 fade-in slide-in-bottom relative overflow-hidden py-12">
            {/* Subtle overlay for section separation */}
            <div className="absolute inset-0 z-0 bg-overlay opacity-50"></div>

            <div className="grid md:grid-cols-2 gap-8 items-start relative z-10">
              {/* Left: Technical Assistance */}
              <div className="fade-in-left transform-3d">
                <h2 className="text-3xl font-bold mb-6 neon-text-red flex items-center gap-2">
                  CONTACT US
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      name: "Bala Murali",
                      phone: "+91 88259 40346",
                      image: "/assets/contact/contacts/bala.jpg"
                    },
                    {
                      id: 2,
                      name: "Dhivya bharathy",
                      phone: "+91 88383 05421",
                      image: "/assets/contact/contacts/dhivya.jpg"
                    }
                  ].map((member, index) => (
                    <div
                      key={member.id}
                      className={`deep-navy-card border-2 border-red-900/50 p-6 glow-border card-hover fade-in-up stagger-${index + 1} hover-glow card-3d glow-pulse relative group overflow-hidden`}
                      style={{ boxShadow: "0 0 15px rgba(255, 51, 51, 0.2)" }}
                    >
                      {/* Card Background */}
                      {/* Card Background - Animated Gradient */}
                      <div
                        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                        style={{
                          background: "linear-gradient(135deg, rgba(20, 0, 0, 0.9) 0%, rgba(60, 10, 10, 0.8) 50%, rgba(20, 0, 0, 0.9) 100%)",
                          backgroundSize: "200% 200%",
                          animation: "electric-flow 10s ease infinite",
                        }}
                      ></div>

                      {/* Grid Overlay */}
                      <div
                        className="absolute inset-0 z-0 opacity-20"
                        style={{
                          backgroundImage: "linear-gradient(rgba(255, 51, 51, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 51, 51, 0.3) 1px, transparent 1px)",
                          backgroundSize: "20px 20px"
                        }}
                      ></div>
                      <div className="relative z-10 flex flex-row items-center gap-6">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-red-900/50 relative group/photo shrink-0">
                          <div className="absolute inset-0 bg-red-500/10 rounded-full z-0 group-hover/photo:bg-red-500/20 transition-all"></div>
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover rounded-full relative z-10 border-2 border-transparent group-hover/photo:border-red-500/50 transition-all"
                          />
                          <div className="absolute -inset-1 border border-red-500/0 rounded-full group-hover/photo:border-red-500/20 animate-pulse-slow"></div>
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-bold text-red-500 mb-1 neon-text-soft text-reveal">
                            {member.name}
                          </h3>
                          <a href={`tel:${member.phone.replace(/\s+/g, '')}`} className="text-gray-300 flex items-center gap-2 text-lg hover:text-red-400 transition-colors group/tel">
                            <span className="text-red-400 text-xl group-hover/tel:scale-110 transition-transform">📞</span> {member.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Map */}
              <div
                className="deep-navy-card border-2 border-red-900/50 p-6 h-full card-hover glow-border fade-in-right zoom-in hover-glow card-3d glow-pulse relative group overflow-hidden"
                style={{ boxShadow: "0 0 15px rgba(255, 51, 51, 0.2)" }}
              >
                {/* Card Background - Animated Gradient */}
                <div
                  className="absolute inset-0 z-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(135deg, rgba(20, 0, 0, 0.9) 0%, rgba(60, 10, 10, 0.8) 50%, rgba(20, 0, 0, 0.9) 100%)",
                    backgroundSize: "200% 200%",
                    animation: "electric-flow 10s ease infinite",
                  }}
                ></div>

                {/* Grid Overlay */}
                <div
                  className="absolute inset-0 z-0 opacity-20"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255, 51, 51, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 51, 51, 0.3) 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                  }}
                ></div>

                {/* Card Background */}
                <div
                  className="absolute inset-0 opacity-10 z-0"
                  style={{
                    backgroundImage: "url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "hue-rotate(330deg) saturate(1.3) brightness(0.3)",
                  }}
                ></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2 neon-text-soft text-reveal">
                    FIND US
                  </h3>
                  <p className="text-white font-bold mb-4 flex items-center gap-2 drop-shadow-lg">
                    <span className="text-xl">📍</span> Coimbatore Institute of Technology
                  </p>
                  <div
                    className="w-full h-64 border-2 border-red-900/30 relative overflow-hidden image-zoom"
                    style={{ background: "rgba(26, 10, 10, 0.8)" }}
                  >
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.3218559092446!2d77.0250919347862!3d11.028325892150917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba858979f85136b%3A0xdd9ca28d3c37cf8a!2sCoimbatore%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1707236500000!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{
                        border: 0,
                        filter: "contrast(1.2) brightness(0.8) saturate(1.1)",
                      }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="CIT Location Map"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>



          {/* Social Media Footer */}
          <section className="border-t border-red-900/50 pt-12 pb-8 fade-in relative overflow-hidden">
            {/* Subtle overlay for section separation */}
            <div className="absolute inset-0 z-0 bg-overlay opacity-50"></div>

            <div className="max-w-4xl mx-auto relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/b.tech_ai_ds?igsh=MWJtaHU4eHlmejU3Mw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="deep-navy-card border-2 border-red-900/50 p-6 glow-border group float fade-in-left bounce-in hover-grow hover-glow overflow-hidden"
                  style={{ boxShadow: "0 0 15px rgba(255, 51, 51, 0.2)" }}
                  data-text="INSTAGRAM"
                >
                  <div className="flex items-center justify-center relative z-10 w-full group-hover:glitch">
                    <svg
                      className="w-12 h-12 text-pink-400 group-hover:scale-110 transition-transform hover-rotate"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/b-tech-artificial-intelligence-data-science/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="deep-navy-card border-2 border-red-900/50 p-6 glow-border group float fade-in-right bounce-in stagger-1 hover-grow hover-glow overflow-hidden"
                  style={{ boxShadow: "0 0 15px rgba(255, 51, 51, 0.2)" }}
                  data-text="LINKEDIN"
                >
                  <div className="flex items-center justify-center relative z-10 w-full group-hover:glitch">
                    <svg
                      className="w-12 h-12 text-blue-400 group-hover:scale-110 transition-transform hover-rotate"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
