import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Calendar, 
  ArrowRight, 
  PhoneCall, 
  Sparkles, 
  Upload, 
  Camera, 
  Images, 
  ChevronDown, 
  UserCheck, 
  Compass, 
  Building 
} from 'lucide-react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileAboutExpanded, setMobileAboutExpanded] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isAboutActive = currentPage === 'ceo' || (currentPage === 'home' && activeSection === 'about');

  const handleNavigate = (page: 'home' | 'gallery' | 'ceo', sectionId?: string) => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
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
      {/* Top Banner Notice */}
      <div className="bg-[#0B2E6B] text-white py-1.5 px-4 text-xs font-medium text-center border-b border-white/10 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#F57C00] text-white font-bold text-[10px] uppercase tracking-wider">
          <Sparkles className="w-3 h-3" />
          Ecosystem Leadership
        </span>
        <span className="truncate sm:whitespace-normal max-w-[200px] sm:max-w-none">
          Transforming Educational Campuses into World-Class Innovation Hubs Across India.
        </span>
      </div>

      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 px-4 lg:px-8 ${
          isScrolled ? 'top-0' : 'top-8 sm:top-7'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
            isScrolled
              ? 'glass-panel shadow-lg shadow-[#0B2E6B]/5 py-2.5 sm:py-3 border border-slate-200/80'
              : 'bg-white/90 backdrop-blur-md py-3 sm:py-4 border border-slate-100 shadow-sm'
          }`}
        >
          <div className="px-3 sm:px-4 lg:px-6 flex items-center justify-between">
            {/* Logo Container */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleNavigate('home', 'home')} 
                className="text-left cursor-pointer focus:outline-none"
              >
                <Logo size="md" customLogoUrl={customLogoUrl} taglineText={taglineText} />
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {/* Home */}
              <button
                onClick={() => handleNavigate('home', 'home')}
                className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all cursor-pointer ${
                  currentPage === 'home' && activeSection === 'home'
                    ? 'text-[#0B2E6B] bg-[#F5F7FA] font-bold border border-slate-200/70 shadow-xs'
                    : 'text-slate-700 hover:text-[#1565C0] hover:bg-slate-50'
                }`}
              >
                Home
              </button>

              {/* About with Dropdown */}
              <div 
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setAboutDropdownOpen(true)}
                onMouseLeave={() => setAboutDropdownOpen(false)}
              >
                <button
                  onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isAboutActive
                      ? 'text-[#0B2E6B] bg-[#F5F7FA] font-bold border border-slate-200/70 shadow-xs'
                      : 'text-slate-700 hover:text-[#1565C0] hover:bg-slate-50'
                  }`}
                  aria-haspopup="true"
                  aria-expanded={aboutDropdownOpen}
                >
                  <span>About</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180 text-[#F57C00]' : 'text-slate-500'}`} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {aboutDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 mt-1.5 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl shadow-[#0B2E6B]/10 p-2 z-50 text-slate-800"
                    >
                      <button
                        onClick={() => handleNavigate('home', 'about')}
                        className={`w-full p-2.5 rounded-xl text-left transition-colors flex items-start gap-3 cursor-pointer ${
                          currentPage === 'home' && activeSection === 'about'
                            ? 'bg-[#F5F7FA] text-[#0B2E6B] font-bold'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#0B2E6B]/10 text-[#0B2E6B] flex items-center justify-center shrink-0 mt-0.5">
                          <Compass className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">About FoundersLab</div>
                          <div className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
                            Mission, Institutional Transformation & Pillars
                          </div>
                        </div>
                      </button>

                      <div className="my-1 border-t border-slate-100" />

                      <button
                        onClick={() => handleNavigate('ceo')}
                        className={`w-full p-2.5 rounded-xl text-left transition-colors flex items-start gap-3 cursor-pointer group ${
                          currentPage === 'ceo'
                            ? 'bg-[#F5F7FA] text-[#0B2E6B] font-bold'
                            : 'hover:bg-[#F57C00]/5 text-slate-700'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#F57C00]/15 text-[#F57C00] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                          <UserCheck className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 group-hover:text-[#0B2E6B]">
                              About the CEO
                            </span>
                            <span className="px-1.5 py-0.2 rounded-full bg-[#F57C00] text-white text-[9px] font-black uppercase">
                              Profile
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
                            Ms. Sakuntala Kasaragadda (Phd) – Leadership & Vision
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Programs */}
              <button
                onClick={() => handleNavigate('home', 'programs')}
                className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all cursor-pointer ${
                  currentPage === 'home' && activeSection === 'programs'
                    ? 'text-[#0B2E6B] bg-[#F5F7FA] font-bold border border-slate-200/70 shadow-xs'
                    : 'text-slate-700 hover:text-[#1565C0] hover:bg-slate-50'
                }`}
              >
                Programs
              </button>

              {/* Impact */}
              <button
                onClick={() => handleNavigate('home', 'impact')}
                className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all cursor-pointer ${
                  currentPage === 'home' && activeSection === 'impact'
                    ? 'text-[#0B2E6B] bg-[#F5F7FA] font-bold border border-slate-200/70 shadow-xs'
                    : 'text-slate-700 hover:text-[#1565C0] hover:bg-slate-50'
                }`}
              >
                Impact
              </button>

              {/* Gallery */}
              <button
                onClick={() => handleNavigate('gallery')}
                className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentPage === 'gallery'
                    ? 'text-[#0B2E6B] bg-[#F5F7FA] font-bold border border-slate-200/70 shadow-xs'
                    : 'text-slate-700 hover:text-[#1565C0] hover:bg-slate-50'
                }`}
              >
                <Camera className={`w-3.5 h-3.5 ${currentPage === 'gallery' ? 'text-[#F57C00]' : 'text-slate-500'}`} />
                <span>Gallery</span>
                <span className="px-1.5 py-0.5 rounded-full bg-[#F57C00]/15 text-[#F57C00] text-[9px] font-black uppercase tracking-wider">
                  New
                </span>
              </button>

              {/* Contact */}
              <button
                onClick={() => handleNavigate('home', 'contact')}
                className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all cursor-pointer ${
                  currentPage === 'home' && activeSection === 'contact'
                    ? 'text-[#0B2E6B] bg-[#F5F7FA] font-bold border border-slate-200/70 shadow-xs'
                    : 'text-slate-700 hover:text-[#1565C0] hover:bg-slate-50'
                }`}
              >
                Contact
              </button>
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              {/* Gallery Quick Button (if on home or ceo page) */}
              {currentPage !== 'gallery' ? (
                <button
                  onClick={() => handleNavigate('gallery')}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-[#0B2E6B] bg-slate-100 hover:bg-[#F57C00]/10 hover:text-[#0B2E6B] border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Images className="w-3.5 h-3.5 text-[#F57C00]" />
                  <span>View Gallery</span>
                </button>
              ) : (
                <button
                  onClick={() => handleNavigate('home', 'home')}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-[#0B2E6B] bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <ArrowRight className="w-3.5 h-3.5 rotate-180 text-[#F57C00]" />
                  <span>Back to Home</span>
                </button>
              )}

              {/* Schedule Meeting CTA */}
              <button
                onClick={onOpenSchedule}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#0B2E6B] to-[#1565C0] hover:from-[#1565C0] hover:to-[#0B2E6B] transition-all shadow-md shadow-[#0B2E6B]/15 hover:shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#F57C00]" />
                Schedule Meeting
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <React.Fragment key="mobile-menu-fragment">
            <motion.div
              key="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              key="mobile-menu-drawer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-[76px] sm:top-[84px] z-50 p-4 lg:hidden max-h-[calc(100dvh-80px)] overflow-y-auto scroll-smooth"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div className="glass-panel-dark rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/20 text-white mb-4">
              {/* Navigation Grid & Accordion */}
              <div className="space-y-2 mb-6">
                {/* Home */}
                <button
                  onClick={() => handleNavigate('home', 'home')}
                  className={`w-full p-3 rounded-xl text-xs font-medium transition-all flex items-center justify-between text-left cursor-pointer ${
                    currentPage === 'home' && activeSection === 'home'
                      ? 'bg-white/20 text-white font-bold'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>Home</span>
                  <ArrowRight className="w-3 h-3 text-[#F57C00]" />
                </button>

                {/* About Section Accordion */}
                <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                  <button
                    onClick={() => setMobileAboutExpanded(!mobileAboutExpanded)}
                    className="w-full p-3 text-xs font-medium transition-all flex items-center justify-between text-left cursor-pointer text-slate-200 hover:text-white"
                  >
                    <div className="flex items-center gap-2">
                      <Compass className="w-3.5 h-3.5 text-[#F57C00]" />
                      <span className="font-bold">About</span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileAboutExpanded ? 'rotate-180 text-[#F57C00]' : 'text-slate-400'}`} />
                  </button>

                  {mobileAboutExpanded && (
                    <div className="px-3 pb-3 space-y-1.5 border-t border-white/10 pt-2">
                      <button
                        onClick={() => handleNavigate('home', 'about')}
                        className={`w-full p-2.5 rounded-lg text-xs transition-all flex items-center justify-between text-left cursor-pointer ${
                          currentPage === 'home' && activeSection === 'about'
                            ? 'bg-white/20 text-white font-bold'
                            : 'text-slate-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Building className="w-3.5 h-3.5 text-slate-400" />
                          <span>About FoundersLab</span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-[#F57C00]" />
                      </button>

                      <button
                        onClick={() => handleNavigate('ceo')}
                        className={`w-full p-2.5 rounded-lg text-xs transition-all flex items-center justify-between text-left cursor-pointer ${
                          currentPage === 'ceo'
                            ? 'bg-white/20 text-white font-bold'
                            : 'text-slate-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-3.5 h-3.5 text-[#F57C00]" />
                          <span>About the CEO</span>
                        </div>
                        <span className="px-1.5 py-0.5 rounded-full bg-[#F57C00] text-white text-[9px] font-bold">
                          CEO
                        </span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Programs */}
                <button
                  onClick={() => handleNavigate('home', 'programs')}
                  className={`w-full p-3 rounded-xl text-xs font-medium transition-all flex items-center justify-between text-left cursor-pointer ${
                    currentPage === 'home' && activeSection === 'programs'
                      ? 'bg-white/20 text-white font-bold'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>Programs</span>
                  <ArrowRight className="w-3 h-3 text-[#F57C00]" />
                </button>

                {/* Impact */}
                <button
                  onClick={() => handleNavigate('home', 'impact')}
                  className={`w-full p-3 rounded-xl text-xs font-medium transition-all flex items-center justify-between text-left cursor-pointer ${
                    currentPage === 'home' && activeSection === 'impact'
                      ? 'bg-white/20 text-white font-bold'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>Impact</span>
                  <ArrowRight className="w-3 h-3 text-[#F57C00]" />
                </button>

                {/* Gallery */}
                <button
                  onClick={() => handleNavigate('gallery')}
                  className={`w-full p-3 rounded-xl text-xs font-medium transition-all flex items-center justify-between text-left cursor-pointer ${
                    currentPage === 'gallery'
                      ? 'bg-white/20 text-white font-bold'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-[#F57C00]" />
                    <span>Gallery</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full bg-[#F57C00] text-white text-[9px] font-bold">
                    New
                  </span>
                </button>

                {/* Contact */}
                <button
                  onClick={() => handleNavigate('home', 'contact')}
                  className={`w-full p-3 rounded-xl text-xs font-medium transition-all flex items-center justify-between text-left cursor-pointer ${
                    currentPage === 'home' && activeSection === 'contact'
                      ? 'bg-white/20 text-white font-bold'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>Contact</span>
                  <ArrowRight className="w-3 h-3 text-[#F57C00]" />
                </button>
              </div>

              <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSchedule();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#1565C0] to-[#F57C00] text-white text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule Strategic Meeting
                </button>

                <div className="mt-2 text-center text-[11px] text-slate-300 flex items-center justify-center gap-2">
                  <PhoneCall className="w-3 h-3 text-[#F57C00]" />
                  +91 9010207999 | admin@founderslab.co.in
                </div>
              </div>
            </div>
          </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </>
  );
};
