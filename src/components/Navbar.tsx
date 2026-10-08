import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenSchedule: () => void;
  activeSection: string;
  customLogoUrl?: string;
  taglineText?: string;
  currentPage: 'home' | 'gallery' | 'ceo';
  onNavigatePage: (page: 'home' | 'gallery' | 'ceo', sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSchedule,
  activeSection,
  customLogoUrl = '',
  taglineText = 'BUILD ENTERPRISE • BUILD NATION',
  currentPage = 'home',
  onNavigatePage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  const handleNavigate = (page: 'home' | 'gallery' | 'ceo', sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigatePage(page, sectionId);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff] border-b border-[#E8E8E8] py-4 lg:py-5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => handleNavigate('home', 'home')} 
              className="text-left cursor-pointer focus:outline-none"
            >
              <Logo size="lg" customLogoUrl={customLogoUrl} taglineText={taglineText} />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => handleNavigate('home', 'home')}
              className={`text-[14px] font-medium transition-colors ${
                currentPage === 'home' && activeSection === 'home' ? 'text-[#c45b33]' : 'text-[#111111] hover:text-[#c45b33]'
              }`}
            >
              Home
            </button>

            <div className="relative group">
              <button
                className={`text-[14px] font-medium transition-colors flex items-center gap-1.5 ${
                  (currentPage === 'home' && activeSection === 'about') || currentPage === 'ceo' ? 'text-[#c45b33]' : 'text-[#111111] group-hover:text-[#c45b33]'
                }`}
              >
                About
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className={`mt-0.5 opacity-60 transition-transform duration-300 group-hover:rotate-180 ${currentPage === 'ceo' ? 'text-[#c45b33]' : 'currentColor'}`}>
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-5 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                <div className="bg-white border border-[#E8E8E8] shadow-[0_10px_40px_rgba(0,0,0,0.08)] py-2 min-w-[300px] w-auto whitespace-nowrap rounded-sm">
                  <button
                    onClick={() => handleNavigate('home', 'about')}
                    className="block w-full text-left px-5 py-2.5 text-[14px] font-medium text-[#111111] hover:text-[#c45b33] hover:bg-black/5 transition-colors"
                  >
                    FoundersLab
                  </button>
                  <button
                    onClick={() => handleNavigate('ceo')}
                    className="block w-full text-left px-5 py-2.5 text-[14px] font-medium text-[#111111] hover:text-[#c45b33] hover:bg-black/5 transition-colors"
                  >
                    About CEO - Ms. Sakuntala Kasaragadda (Phd)
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleNavigate('home', 'programs')}
              className={`text-[14px] font-medium transition-colors ${
                currentPage === 'home' && activeSection === 'programs' ? 'text-[#c45b33]' : 'text-[#111111] hover:text-[#c45b33]'
              }`}
            >
              Programs
            </button>

            <button
              onClick={() => handleNavigate('home', 'impact')}
              className={`text-[14px] font-medium transition-colors ${
                currentPage === 'home' && activeSection === 'impact' ? 'text-[#c45b33]' : 'text-[#111111] hover:text-[#c45b33]'
              }`}
            >
              Impact
            </button>

            <button
              onClick={() => handleNavigate('gallery')}
              className={`text-[14px] font-medium transition-colors flex items-center gap-1.5 ${
                currentPage === 'gallery' ? 'text-[#c45b33]' : 'text-[#111111] hover:text-[#c45b33]'
              }`}
            >
              Gallery
              <span className="text-[9px] uppercase font-bold text-[#c45b33] tracking-wider">New</span>
            </button>

            <button
              onClick={() => handleNavigate('home', 'contact')}
              className={`text-[14px] font-medium transition-colors ${
                currentPage === 'home' && activeSection === 'contact' ? 'text-[#c45b33]' : 'text-[#111111] hover:text-[#c45b33]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={onOpenSchedule}
              className="px-6 py-2.5 rounded-sm bg-[#F57C00] hover:bg-[#111111] text-white text-[12px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Schedule Meeting
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#111111] p-2 hover:bg-black/5 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[73px] z-40 bg-[#ffffff] lg:hidden overflow-y-auto border-t border-[#E8E8E8]"
          >
            <div className="flex flex-col px-6 py-8 h-full min-h-[calc(100vh-70px)]">
              <nav className="flex flex-col gap-6 mb-12">
                <button
                  onClick={() => handleNavigate('home', 'home')}
                  className="text-left text-[28px] font-medium text-[#111111] hover:text-[#c45b33] transition-colors"
                >
                  Home
                </button>
                <div className="flex flex-col">
                  <button
                    onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                    className="flex items-center justify-between text-left text-[28px] font-medium text-[#111111] hover:text-[#c45b33] transition-colors"
                  >
                    About
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-transform duration-300 ${mobileAboutOpen ? 'rotate-180' : ''}`}>
                      <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  
                  <AnimatePresence>
                    {mobileAboutOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden flex flex-col gap-4 mt-4 pl-4 border-l-2 border-[#E8E8E8]"
                      >
                        <button
                          onClick={() => handleNavigate('home', 'about')}
                          className="text-left text-[20px] font-medium text-[#555555] hover:text-[#c45b33]"
                        >
                          FoundersLab
                        </button>
                        <button
                          onClick={() => handleNavigate('ceo')}
                          className="text-left text-[20px] font-medium text-[#555555] hover:text-[#c45b33]"
                        >
                          About CEO (Ms. Sakuntala Kasaragadda)
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <button
                  onClick={() => handleNavigate('home', 'programs')}
                  className="text-left text-[28px] font-medium text-[#111111] hover:text-[#c45b33] transition-colors"
                >
                  Programs
                </button>
                <button
                  onClick={() => handleNavigate('home', 'impact')}
                  className="text-left text-[28px] font-medium text-[#111111] hover:text-[#c45b33] transition-colors"
                >
                  Impact
                </button>
                <button
                  onClick={() => handleNavigate('gallery')}
                  className="text-left text-[28px] font-medium text-[#111111] hover:text-[#c45b33] transition-colors flex items-center gap-3"
                >
                  Gallery
                  <span className="text-[11px] uppercase font-bold text-[#c45b33] border border-[#c45b33]/30 px-2 py-0.5 rounded-full">New</span>
                </button>
                <button
                  onClick={() => handleNavigate('home', 'contact')}
                  className="text-left text-[28px] font-medium text-[#111111] hover:text-[#c45b33] transition-colors"
                >
                  Contact
                </button>
              </nav>

              <div className="mt-auto pb-8">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSchedule();
                  }}
                  className="w-full px-6 py-4 rounded-sm bg-[#F57C00] hover:bg-[#111111] text-white text-[14px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Schedule Meeting
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
