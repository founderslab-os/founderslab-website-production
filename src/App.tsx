import React, { useState, useEffect } from 'react';
import { PageLoader } from './components/PageLoader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ImpactMetrics } from './components/ImpactMetrics';
import { FlagshipPrograms } from './components/FlagshipPrograms';
import { WhyFoundersLab } from './components/WhyFoundersLab';
import { ContactSection } from './components/ContactSection';
import { ScheduleModal } from './components/ScheduleModal';

import { Footer } from './components/Footer';
import { GalleryPage } from './components/GalleryPage';
import { CeoPage } from './components/CeoPage';
import { FloatingPhoneCTA } from './components/FloatingPhoneCTA';

export default function App() {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);

  const [activeSection, setActiveSection] = useState('home');
  
  // Page routing state ('home', 'gallery', or 'ceo')
  const [currentPage, setCurrentPage] = useState<'home' | 'gallery' | 'ceo'>(() => {
    const hash = window.location.hash;
    if (hash === '#gallery') return 'gallery';
    if (hash === '#ceo' || hash === '#about-ceo') return 'ceo';
    return 'home';
  });

  // Custom logo state stored in localStorage
  const [customLogoUrl, setCustomLogoUrl] = useState<string>(() => {
    return localStorage.getItem('fl_custom_logo_url') || '/logo.jpeg';
  });
  const [taglineText, setTaglineText] = useState<string>(() => {
    return localStorage.getItem('fl_tagline_text') || 'BUILD ENTERPRISE • BUILD NATION';
  });

  const handleSaveLogo = (newLogoUrl: string, newTagline?: string) => {
    setCustomLogoUrl(newLogoUrl);
    localStorage.setItem('fl_custom_logo_url', newLogoUrl);

    if (newTagline !== undefined) {
      setTaglineText(newTagline);
      localStorage.setItem('fl_tagline_text', newTagline);
    }
  };

  // Listen to hash changes in browser
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#gallery') {
        setCurrentPage('gallery');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#ceo' || hash === '#about-ceo') {
        setCurrentPage('ceo');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Scroll spy on home page
  useEffect(() => {
    if (currentPage !== 'home') return;

    const handleScroll = () => {
      const sections = ['home', 'about', 'impact', 'programs', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const scrollToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      window.location.hash = `#${sectionId}`;
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleNavigatePage = (page: 'home' | 'gallery' | 'ceo', sectionId?: string) => {
    if (page === 'gallery') {
      setCurrentPage('gallery');
      window.location.hash = '#gallery';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'ceo') {
      setCurrentPage('ceo');
      window.location.hash = '#about-ceo';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('home');
      if (sectionId) {
        window.location.hash = `#${sectionId}`;
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.location.hash = '#home';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#1565C0] selection:text-white">
      {!isLoaderFinished && (
        <PageLoader
          customLogoUrl={customLogoUrl}
          onComplete={() => setIsLoaderFinished(true)}
        />
      )}

      {/* Header & Navigation */}
      <Navbar
        onOpenSchedule={() => setScheduleModalOpen(true)}

        activeSection={activeSection}
        customLogoUrl={customLogoUrl}
        taglineText={taglineText}
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
      />

      {/* Page Routing */}
      {currentPage === 'gallery' ? (
        <GalleryPage
          onBackToHome={() => handleNavigatePage('home', 'home')}
          onOpenSchedule={() => setScheduleModalOpen(true)}
          onNavigateToContact={() => handleNavigatePage('home', 'contact')}
        />
      ) : currentPage === 'ceo' ? (
        <CeoPage
          onBackToHome={() => handleNavigatePage('home', 'home')}
          onOpenSchedule={() => setScheduleModalOpen(true)}
          onNavigateToContact={() => handleNavigatePage('home', 'contact')}
        />
      ) : (
        <main>
          {/* Hero Section */}
          <Hero
            onPartnerWithUs={() => scrollToSection('contact')}
            onExplorePrograms={() => scrollToSection('programs')}
            onScheduleMeeting={() => setScheduleModalOpen(true)}
          />

          {/* About FoundersLab */}
          <AboutSection />

          {/* Quantifiable Impact Metrics */}
          <ImpactMetrics
            onNavigateToGallery={() => handleNavigatePage('gallery')}
          />

          {/* Flagship Initiatives */}
          <FlagshipPrograms
            onSelectProgram={() => scrollToSection('programs')}
            onScheduleMeeting={() => setScheduleModalOpen(true)}
          />

          {/* Why FoundersLab & Transformation Journey */}
          <WhyFoundersLab
            onScheduleMeeting={() => setScheduleModalOpen(true)}
          />

          {/* Contact & Inquiries */}
          <ContactSection />
        </main>
      )}

      {/* Footer */}
      <Footer
        onOpenSchedule={() => setScheduleModalOpen(true)}
        customLogoUrl={customLogoUrl}
        taglineText={taglineText}
        onNavigatePage={handleNavigatePage}
      />

      {/* Schedule Meeting Modal */}
      <ScheduleModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
      />

      {/* Global Floating Phone CTA */}
      <FloatingPhoneCTA />
    </div>
  );
}
