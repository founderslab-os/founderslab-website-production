import React from 'react';
import './Footer.css';
import './Footer.mobile.css';

interface FooterProps {
  onOpenSchedule: () => void;
  customLogoUrl?: string;
  taglineText?: string;
  onNavigatePage?: (page: 'home' | 'gallery' | 'ceo', sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSchedule,
  customLogoUrl = '/logo.jpeg',
  onNavigatePage,
}) => {

  const handleNav = (e: React.MouseEvent, page: 'home' | 'gallery' | 'ceo', sectionId?: string) => {
    e.preventDefault();
    if (onNavigatePage) {
      onNavigatePage(page, sectionId);
    } else if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="ft-section">
      <div className="ft-container">
        
        {/* Top Area */}
        <div className="ft-top">
          <div className="ft-logo-area">
            <button 
              onClick={(e) => handleNav(e, 'home', 'home')} 
              className="focus:outline-none"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
            >
              <img 
                src={customLogoUrl} 
                alt="FoundersLab Logo" 
                className="ft-logo" 
              />
            </button>
            <p className="ft-desc">
              India's premier Innovation & Entrepreneurship Ecosystem Builder dedicated to transforming educational institutions into high-impact venture creation hubs.
            </p>
          </div>
          <div className="ft-motto-area">
            <span className="ft-motto">BUILD ENTERPRISE • BUILD NATION</span>
            <div className="ft-motto-line"></div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="ft-grid">
          
          <div className="ft-col">
            <h4 className="ft-col-title">Connect With Us</h4>
            <ul className="ft-list">
              <li><a href="mailto:admin@founderslab.co.in" className="ft-link">admin@founderslab.co.in</a></li>
              <li><a href="tel:+919010207999" className="ft-link">+91 9010207999</a></li>
              <li><a href="http://www.founderslab.co.in" target="_blank" rel="noopener noreferrer" className="ft-link">www.founderslab.co.in</a></li>
              <li><a href="https://wa.me/919010207999" target="_blank" rel="noopener noreferrer" className="ft-link">WhatsApp</a></li>
            </ul>
          </div>

          <div className="ft-col">
            <h4 className="ft-col-title">Navigation</h4>
            <ul className="ft-list">
              <li><button onClick={(e) => handleNav(e, 'home', 'home')} className="ft-link">Home</button></li>
              <li><button onClick={(e) => handleNav(e, 'home', 'about')} className="ft-link">About FoundersLab</button></li>
              <li><button onClick={(e) => handleNav(e, 'ceo')} className="ft-link">About the CEO</button></li>
              <li><button onClick={(e) => handleNav(e, 'home', 'programs')} className="ft-link">Flagship Programs</button></li>
              <li><button onClick={(e) => handleNav(e, 'home', 'impact')} className="ft-link">Ecosystem Impact</button></li>
              <li><button onClick={(e) => handleNav(e, 'gallery')} className="ft-link">Innovation Gallery</button></li>
              <li><button onClick={(e) => handleNav(e, 'home', 'contact')} className="ft-link">Contact Us</button></li>
            </ul>
          </div>

          <div className="ft-col">
            <h4 className="ft-col-title">Initiatives & Tools</h4>
            <ul className="ft-list">
              <li><button onClick={(e) => handleNav(e, 'home', 'programs')} className="ft-link">Young FoundersLab</button></li>
              <li><button onClick={(e) => handleNav(e, 'home', 'programs')} className="ft-link">PharmaPreneur Program</button></li>
              <li><button onClick={(e) => handleNav(e, 'home', 'programs')} className="ft-link">Industry Readiness Program</button></li>
              <li><button onClick={onOpenSchedule} className="ft-link">Schedule Strategy Call</button></li>
            </ul>
          </div>

        </div>

        {/* Secretariat HQ */}
        <div className="ft-hq">
          <div>
            <h4 className="ft-hq-title">SECRETARIAT HQ</h4>
            <address className="ft-hq-location" style={{ fontStyle: 'normal' }}>Hyderabad, Telangana, India</address>
          </div>
        </div>

        {/* Legal & SEO */}
        <div className="ft-bottom">
          <nav className="ft-legal-nav" aria-label="Footer Utility Links">
            <a href="/privacy-policy" className="ft-legal-link">Privacy Policy</a>
            <a href="/terms-and-conditions" className="ft-legal-link">Terms & Conditions</a>
            <a href="/cookie-policy" className="ft-legal-link">Cookie Policy</a>
            <a href="/accessibility" className="ft-legal-link">Accessibility</a>
            <a href="/sitemap" className="ft-legal-link">Sitemap</a>
            <a href="/disclaimer" className="ft-legal-link">Disclaimer</a>
          </nav>
          <p className="ft-copyright">© {new Date().getFullYear()} FoundersLab. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};
