import React, { useEffect, useState } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import './FloatingPhoneCTA.css';
import './FloatingPhoneCTA.mobile.css';

export const FloatingPhoneCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCompeting, setIsCompeting] = useState(false);

  useEffect(() => {
    // Show after slight delay for subtle entrance
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    // Observer to hide CTA when main contact/footer is visible
    const observer = new IntersectionObserver(
      (entries) => {
        const anyIntersecting = entries.some(entry => entry.isIntersecting);
        setIsCompeting(anyIntersecting);
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );

    // Small delay to ensure DOM is fully mounted
    setTimeout(() => {
      const targets = document.querySelectorAll('#contact, .contact-section, footer, .footer');
      targets.forEach(target => observer.observe(target));
    }, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <a 
      href="tel:+919010207999"
      className={`floating-phone-cta ${isVisible && !isCompeting ? 'floating-cta-visible' : 'floating-cta-hidden'}`}
      aria-label="Talk to FoundersLab at +91 9010207999"
    >
      <div className="floating-cta-inner">
        <span className="floating-cta-icon">
          <Phone size={20} strokeWidth={2} />
        </span>
        <span className="floating-cta-text">
          Talk to FoundersLab
        </span>
        <span className="floating-cta-arrow">
          <ArrowRight size={18} strokeWidth={2.5} />
        </span>
      </div>
    </a>
  );
};
