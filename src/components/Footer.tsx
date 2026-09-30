import React from 'react';
import { Logo } from './Logo';
import { Mail, Phone, MapPin, Globe, Linkedin, Twitter, Instagram, Youtube, Facebook, MessageCircle, Camera } from 'lucide-react';

interface FooterProps {
  onOpenSchedule: () => void;
  customLogoUrl?: string;
  taglineText?: string;
  onNavigatePage?: (page: 'home' | 'gallery' | 'ceo', sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSchedule,
  customLogoUrl = '',
  taglineText = 'BUILD ENTERPRISE • BUILD NATION',
  onNavigatePage,
}) => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/company/founderslab-india',
      color: 'hover:bg-[#0A66C2] hover:border-[#0A66C2]',
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      href: 'https://x.com/founderslab_in',
      color: 'hover:bg-slate-900 hover:border-slate-700',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/founderslab_in',
      color: 'hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 hover:border-pink-500',
    },
    {
      name: 'YouTube',
      icon: Youtube,
      href: 'https://youtube.com/@founderslab',
      color: 'hover:bg-[#FF0000] hover:border-[#FF0000]',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://facebook.com/founderslab.co.in',
      color: 'hover:bg-[#1877F2] hover:border-[#1877F2]',
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: 'https://wa.me/919010207999?text=Hello%20FoundersLab%20Team%2C%20I%20would%20like%20to%20connect.',
      color: 'hover:bg-[#25D366] hover:border-[#25D366]',
    },
  ];

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
    <footer className="bg-[#0B2E6B] text-white pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <button 
              onClick={(e) => handleNav(e, 'home', 'home')} 
              className="inline-block text-left cursor-pointer focus:outline-none"
            >
              <Logo variant="dark" size="lg" customLogoUrl={customLogoUrl} taglineText={taglineText} />
            </button>
            <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
              India's premier Innovation & Entrepreneurship Ecosystem Builder dedicated to transforming educational institutions into high-impact venture creation hubs.
            </p>
            <div className="pt-1 text-[11px] text-[#F57C00] font-bold uppercase tracking-wider font-mono">
              BUILD ENTERPRISE - BUILD NATION
            </div>

            {/* Social Media Integration Buttons */}
            <div className="pt-3 space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-300 font-mono">Connect With Us</p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social) => {
                  const IconComp = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.name}
                      aria-label={social.name}
                      className={`w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-slate-200 hover:text-white transition-all duration-300 shadow-sm hover:scale-105 ${social.color}`}
                    >
                      <IconComp className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">Navigation</p>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li>
                <button onClick={(e) => handleNav(e, 'home', 'home')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={(e) => handleNav(e, 'home', 'about')} className="hover:text-white transition-colors cursor-pointer text-left">
                  About FoundersLab
                </button>
              </li>
              <li>
                <button onClick={(e) => handleNav(e, 'ceo')} className="hover:text-[#F57C00] transition-colors cursor-pointer text-left flex items-center gap-1.5 font-medium">
                  <span>About the CEO</span>
                </button>
              </li>
              <li>
                <button onClick={(e) => handleNav(e, 'home', 'programs')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Flagship Programs
                </button>
              </li>
              <li>
                <button onClick={(e) => handleNav(e, 'home', 'impact')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Ecosystem Impact
                </button>
              </li>
              <li>
                <button onClick={(e) => handleNav(e, 'gallery')} className="hover:text-[#F57C00] transition-colors cursor-pointer text-left flex items-center gap-1.5 font-bold text-white">
                  <Camera className="w-3.5 h-3.5 text-[#F57C00]" />
                  <span>Innovation Gallery</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#F57C00] text-white text-[9px] font-black">NEW</span>
                </button>
              </li>
              <li>
                <button onClick={(e) => handleNav(e, 'home', 'contact')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Programs & Assessment */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">Initiatives & Tools</p>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li>
                <button onClick={(e) => handleNav(e, 'home', 'programs')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Young FoundersLab
                </button>
              </li>
              <li>
                <button onClick={(e) => handleNav(e, 'home', 'programs')} className="hover:text-white transition-colors cursor-pointer text-left">
                  PharmaPreneur Program
                </button>
              </li>
              <li>
                <button onClick={(e) => handleNav(e, 'home', 'programs')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Industry Readiness Program
                </button>
              </li>
              <li>
                <button onClick={onOpenSchedule} className="hover:text-white text-left cursor-pointer">
                  Schedule Strategy Call
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact Info */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">Secretariat HQ</p>
            <div className="space-y-2 text-xs text-slate-300 font-medium">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F57C00] shrink-0" />
                <span>Hyderabad, Telangana, India</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F57C00] shrink-0" />
                <a href="mailto:admin@founderslab.co.in" className="hover:underline">admin@founderslab.co.in</a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F57C00] shrink-0" />
                <a href="tel:+919010207999" className="hover:underline">+91 9010207999</a>
              </p>
              <p className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#F57C00] shrink-0" />
                <a href="http://www.founderslab.co.in" target="_blank" rel="noopener noreferrer" className="hover:underline">www.founderslab.co.in</a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-300 gap-4">
          <p>© {new Date().getFullYear()} FoundersLab. All Rights Reserved. Build Enterprise - Build Nation.</p>
          <div className="flex items-center gap-4">
            <span>Hyderabad, Telangana</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
