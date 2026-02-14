import { useState } from 'react';

export default function AboutCIT() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="about-box">
      <div
        className="about-box-inner"
        style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ flex: 3 }}>
          <h2 className="stat-number">About CIT</h2>
          <div className="about-content">
            <p>
              Coimbatore Institute of Technology (CIT), Coimbatore, is a government‑aided autonomous engineering college established in 1956 by the V. Rangaswamy Naidu Educational Trust, and is currently affiliated to Anna University. Recognized by AICTE and accredited by the National Board of Accreditation (NBA), CIT offers a wide range of undergraduate, postgraduate, and research programmes in engineering, technology, and applied sciences, supported by strong industry collaboration and a focus on innovation
            </p>
          </div>
        </div>
        <div className="about-image-card" style={{ flex: 2, position: 'relative', overflow: 'hidden' }}>
          <img
            src="/assets/about/clg.jpeg"
            alt="CIT Campus"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: isHovered ? 0 : 1,
              transition: 'opacity 0.5s ease-in-out',
              zIndex: 1
            }}
          />
          <img
            src="/assets/about/clg-upsidedown.png"
            alt="CIT Campus Upside Down"
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
              zIndex: 0
            }}
          />
        </div>
      </div>
    </div>
  );
}
