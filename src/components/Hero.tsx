import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import './FoundersLabHero.css';
import './FoundersLabHero.mobile.css';

interface HeroProps {
  onPartnerWithUs: () => void;
  onExplorePrograms: () => void;
  onScheduleMeeting: () => void;
}

const IMAGES = [
  '/T-HUB_GRP.jpeg',
  '/KTR_GRP_PIC.jpeg'
];

export const Hero: React.FC<HeroProps> = ({
  onPartnerWithUs,
  onExplorePrograms,
  onScheduleMeeting,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="fl-hero">
      <div className="fl-hero__container">
        
        {/* Left: Content */}
        <div className="fl-hero__content">
          <span className="fl-hero__eyebrow fl-hero__animate-up">
            India's Innovation & Entrepreneurship Ecosystem Builder
          </span>
          
          <h1 className="fl-hero__title fl-hero__animate-up fl-hero__delay-1">
            <span>Empowering Institutions.</span>
            <span>Inspiring Innovation.</span>
            <span>Creating Startups.</span>
          </h1>

          <div className="fl-hero__divider fl-hero__animate-up fl-hero__delay-2"></div>

          <p className="fl-hero__description fl-hero__animate-up fl-hero__delay-3">
            FoundersLab partners with educational institutions to build sustainable innovation ecosystems that transform students into entrepreneurs, commercialize research, strengthen industry collaboration and create globally competitive startups.
          </p>

          <div className="fl-hero__actions fl-hero__animate-up fl-hero__delay-4">
            <button onClick={onPartnerWithUs} className="fl-hero__btn-primary">
              Partner With Us
            </button>
            
            <button onClick={onExplorePrograms} className="fl-hero__btn-link group">
              Explore Programs
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button onClick={onScheduleMeeting} className="fl-hero__btn-link group">
              Schedule a Meeting
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Visual System (Carousel) */}
        <div className="fl-hero__visual fl-hero__animate-fade fl-hero__delay-5">
          <div className="fl-hero__image-frame">
            {IMAGES.map((img, idx) => (
              <img 
                key={img}
                src={img} 
                alt="FoundersLab Group" 
                className={`fl-hero__carousel-img ${idx === currentImageIndex ? 'active' : ''}`}
              />
            ))}
            
            <div className="fl-hero__carousel-indicators">
              {IMAGES.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`fl-hero__carousel-dot ${idx === currentImageIndex ? 'active' : ''}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
