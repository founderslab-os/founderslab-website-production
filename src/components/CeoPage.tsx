import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Calendar, 
  Mail, 
  Phone, 
  Linkedin, 
  MessageCircle, 
  Award, 
  Building, 
  Compass, 
  Sparkles, 
  Target, 
  CheckCircle2, 
  Quote, 
  ArrowRight,
  Briefcase,
  GraduationCap,
  Users,
  Lightbulb,
  Pencil,
  Check
} from 'lucide-react';
import { CeoProfile, CeoCareerHighlight, CeoLeadershipPillar } from '../types';
import { DEFAULT_CEO_PROFILE } from '../data/defaultCeoProfile';
import { CeoEditModal } from './CeoEditModal';

interface CeoPageProps {
  onBackToHome: () => void;
  onOpenSchedule: () => void;
  onNavigateToContact: () => void;
}

const STORAGE_KEY = 'fl_ceo_profile_v1';

export const CeoPage: React.FC<CeoPageProps> = ({
  onBackToHome,
  onOpenSchedule,
  onNavigateToContact,
}) => {
  // CEO Profile state loaded from localStorage or defaults
  const [profile, setProfile] = useState<CeoProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name) {
          return { ...DEFAULT_CEO_PROFILE, ...parsed };
        }
      }
    } catch (e) {
      console.error('Failed to load CEO profile from localStorage', e);
    }
    return DEFAULT_CEO_PROFILE;
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `About the CEO - ${profile.name} | FoundersLab`;
    return () => {
      document.title = 'FoundersLab - Build Enterprise • Build Nation';
    };
  }, [profile.name]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const handleSaveProfile = (updatedProfile: CeoProfile) => {
    setProfile(updatedProfile);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
    } catch (e) {
      console.error('Failed to save CEO profile to localStorage', e);
    }
    showToast('CEO Profile updated successfully!');
  };

  const handleResetToDefaults = () => {
    setProfile(DEFAULT_CEO_PROFILE);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to reset CEO profile', e);
    }
    showToast('CEO Profile restored to original defaults.');
  };

  // Icon mapping helper for timeline
  const getTimelineIcon = (iconType?: string) => {
    switch (iconType) {
      case 'building': return Building;
      case 'briefcase': return Briefcase;
      case 'award': return Award;
      case 'graduation': return GraduationCap;
      case 'target':
      default:
        return Target;
    }
  };

  // Icon mapping helper for pillars
  const getPillarIcon = (iconType?: string, index: number = 0) => {
    switch (iconType) {
      case 'users': return Users;
      case 'lightbulb': return Lightbulb;
      case 'award': return Award;
      case 'target': return Target;
      case 'compass': return Compass;
      case 'graduation':
      default:
        // Alternate fallback if unspecified
        if (index === 1) return Users;
        if (index === 2) return Lightbulb;
        if (index === 3) return Award;
        return GraduationCap;
    }
  };

  // Format whatsapp URL safely
  const cleanPhone = profile.whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(profile.whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-24 pb-20 selection:bg-[#1565C0] selection:text-white relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-4 sm:right-8 z-50 bg-[#0B2E6B] text-white px-5 py-3 rounded-2xl shadow-xl border border-[#1565C0] flex items-center gap-2.5 text-xs sm:text-sm font-semibold"
          >
            <Check className="w-4 h-4 text-[#F57C00]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Breadcrumb & Actions Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-[68px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 overflow-hidden text-ellipsis whitespace-nowrap">
            <button 
              onClick={onBackToHome}
              className="hover:text-[#0B2E6B] font-medium flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span>/</span>
            <span className="text-slate-500 shrink-0">About</span>
            <span>/</span>
            <span className="text-[#0B2E6B] font-bold truncate">About the CEO</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">

            {/* Schedule Meeting CTA */}
            <button
              onClick={onOpenSchedule}
              className="px-3.5 py-1.5 rounded-lg bg-[#0B2E6B] hover:bg-[#1565C0] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#F57C00]" />
              <span className="hidden sm:inline">Schedule Strategic Meeting</span>
              <span className="sm:hidden">Schedule</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12">
        
        {/* Hero Section: Executive Profile Card */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden relative">
          {/* Subtle decorative background gradient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#0B2E6B]/10 via-[#1565C0]/5 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none" />
          
          <div className="p-6 sm:p-10 lg:p-12">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Portrait & Quick Contact */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <div className="relative group">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl p-1.5 bg-gradient-to-tr from-[#0B2E6B] via-[#1565C0] to-[#F57C00] shadow-2xl relative">
                    {/* Executive Portrait Container */}
                    <div className="w-full h-full rounded-[22px] bg-slate-900 overflow-hidden relative flex items-center justify-center">
                      {profile.photoUrl ? (
                        <img 
                          src={profile.photoUrl} 
                          alt={profile.name} 
                          className="w-full h-full object-cover object-top opacity-95 transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center text-slate-400">
                          <Compass className="w-12 h-12 text-[#F57C00] mb-2" />
                          <span className="text-xs font-semibold">FoundersLab Leadership</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2E6B]/80 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Monogram Badge Overlay */}
                      {profile.badgeText && (
                        <div className="absolute bottom-3 left-3 right-3 text-center pointer-events-none">
                          <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider border border-white/30">
                            {profile.badgeText}
                          </span>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Verified Sparkle Badge */}
                  <div className="absolute -bottom-2 -right-2 bg-[#F57C00] text-white p-2 rounded-xl shadow-lg border-2 border-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                <div className="mt-6 space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2E6B] font-poppins">
                    {profile.name}
                  </h1>
                  <p className="text-sm font-bold text-[#F57C00]">
                    {profile.primaryTitle}
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    {profile.organizationName} • {profile.location}
                  </p>
                </div>

                {/* Direct Action Links */}
                <div className="mt-5 flex flex-wrap gap-2 justify-center">
                  {profile.linkedinUrl && (
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-100 hover:bg-[#0A66C2] hover:text-white text-slate-600 transition-all border border-slate-200 cursor-pointer shadow-xs"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {cleanPhone && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-100 hover:bg-[#25D366] hover:text-white text-slate-600 transition-all border border-slate-200 cursor-pointer shadow-xs"
                      title="Connect on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  )}
                  {profile.email && (
                    <a
                      href={`mailto:${profile.email}`}
                      className="p-2.5 rounded-xl bg-slate-100 hover:bg-[#0B2E6B] hover:text-white text-slate-600 transition-all border border-slate-200 cursor-pointer shadow-xs"
                      title="Email CEO Secretariat"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                  {profile.phone && (
                    <a
                      href={`tel:${profile.phone.replace(/[^0-9+]/g, '')}`}
                      className="p-2.5 rounded-xl bg-slate-100 hover:bg-[#F57C00] hover:text-white text-slate-600 transition-all border border-slate-200 cursor-pointer shadow-xs"
                      title="Call Office"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {profile.availabilityStatus && (
                  <div className="mt-4 pt-4 border-t border-slate-200/80 w-full text-center">
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      {profile.availabilityStatus}
                    </span>
                  </div>
                )}
              </div>

              {/* Right Column: Bio Summary & Impact Metrics */}
              <div className="lg:col-span-8 space-y-6">
                
                <div className="space-y-3">
                  {profile.taglineBadge && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B2E6B]/5 text-[#0B2E6B] text-xs font-bold uppercase tracking-wider border border-[#0B2E6B]/15">
                      <Compass className="w-3.5 h-3.5 text-[#1565C0]" />
                      {profile.taglineBadge}
                    </div>
                  )}
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2E6B] font-poppins leading-tight">
                    {profile.heroHeadline}
                  </h2>
                  {profile.heroBioParagraph1 && (
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                      {profile.heroBioParagraph1}
                    </p>
                  )}
                  {profile.heroBioParagraph2 && (
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                      {profile.heroBioParagraph2}
                    </p>
                  )}
                </div>

                {/* 4 Quantifiable Leadership Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {profile.metrics.map((metric, idx) => (
                    <div key={metric.id || idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                      <p className={`text-2xl sm:text-3xl font-black font-poppins ${metric.colorClass || 'text-[#0B2E6B]'}`}>
                        {metric.value}
                      </p>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Direct CTA Buttons */}
                <div className="pt-2 flex flex-wrap gap-3 items-center">
                  <button
                    onClick={onNavigateToContact}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0B2E6B] to-[#1565C0] hover:from-[#1565C0] hover:to-[#0B2E6B] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#0B2E6B]/20 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Connect with Secretariat</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F57C00]" />
                  </button>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Executive Biography & Career Milestones */}
        <section className="grid lg:grid-cols-12 gap-8">
          
          {/* Biography Text (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            {profile.bioSectionBadge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
                <Briefcase className="w-3.5 h-3.5 text-[#0B2E6B]" />
                {profile.bioSectionBadge}
              </div>
            )}
            
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0B2E6B] font-poppins">
              {profile.bioSectionHeading}
            </h3>

            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              {profile.bioParagraph1 && <p>{profile.bioParagraph1}</p>}
              {profile.bioParagraph2 && <p>{profile.bioParagraph2}</p>}
              {profile.bioParagraph3 && <p>{profile.bioParagraph3}</p>}

              {(profile.mottoHeading || profile.mottoText) && (
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-amber-900 text-sm space-y-1 mt-4">
                  {profile.mottoHeading && (
                    <p className="font-bold flex items-center gap-1.5 text-[#0B2E6B]">
                      <CheckCircle2 className="w-4 h-4 text-[#F57C00]" />
                      {profile.mottoHeading}
                    </p>
                  )}
                  {profile.mottoText && (
                    <p className="font-mono text-xs font-bold tracking-wide text-slate-700">
                      "{profile.mottoText}"
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Timeline / Milestones (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-[#F57C00]" />
                Career Track Record
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#0B2E6B] font-poppins">
              Key Experience & Tenures
            </h3>

            <div className="relative pl-6 border-l-2 border-slate-200 space-y-8">
              {profile.careerHighlights.map((item, index) => {
                const IconComp = getTimelineIcon(item.iconType);
                return (
                  <div key={item.id || index} className="relative group">
                    {/* Timeline bullet */}
                    <div className="absolute -left-[31px] top-0 w-8 h-8 rounded-full bg-white border-2 border-[#0B2E6B] flex items-center justify-center text-[#0B2E6B] group-hover:bg-[#0B2E6B] group-hover:text-white transition-colors">
                      <IconComp className="w-4 h-4" />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#F57C00] font-mono">
                        {item.period}
                      </span>
                      <h4 className="text-base font-bold text-slate-900">
                        {item.role}
                      </h4>
                      <p className="text-xs font-semibold text-[#0B2E6B]">
                        {item.organization} • {item.location}
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed pt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </section>

        {/* Leadership Philosophy Pillars */}
        <section className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            {profile.pillarsBadge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B2E6B]/5 text-[#0B2E6B] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#F57C00]" />
                {profile.pillarsBadge}
              </div>
            )}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B2E6B] font-poppins">
              {profile.pillarsHeading}
            </h3>
            {profile.pillarsSubheading && (
              <p className="text-sm text-slate-600">
                {profile.pillarsSubheading}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile.pillars.map((pillar, idx) => {
              const IconComp = getPillarIcon(pillar.iconType, idx);
              return (
                <div 
                  key={pillar.id || idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3 group hover:border-[#1565C0]/40"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0B2E6B]/10 text-[#0B2E6B] flex items-center justify-center group-hover:bg-[#0B2E6B] group-hover:text-white transition-all">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 font-poppins">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CEO Personal Quote / Executive Statement */}
        <section className="bg-gradient-to-br from-[#0B2E6B] to-[#1565C0] text-white p-8 sm:p-12 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Quote className="w-48 h-48 text-white" />
          </div>

          <div className="max-w-4xl relative z-10 space-y-6">
            <Quote className="w-10 h-10 text-[#F57C00]" />
            <blockquote className="text-lg sm:text-2xl font-medium leading-relaxed font-serif italic text-slate-100">
              "{profile.quoteText}"
            </blockquote>
            
            <div className="pt-2 flex items-center justify-between border-t border-white/20">
              <div>
                <p className="text-base sm:text-lg font-bold font-poppins text-white">
                  {profile.quoteAuthor}
                </p>
                <p className="text-xs text-slate-300">
                  {profile.quoteTitle}
                </p>
              </div>

            </div>
          </div>
        </section>

      </div>


    </div>
  );
};
