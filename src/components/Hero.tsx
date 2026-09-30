import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Rocket, ChevronRight, Upload, Image as ImageIcon, RefreshCw } from 'lucide-react';

interface HeroProps {
  onPartnerWithUs: () => void;
  onExplorePrograms: () => void;
  onScheduleMeeting: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onPartnerWithUs,
  onExplorePrograms,
  onScheduleMeeting,
}) => {
  const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80";
  return (
    <section id="home" className="relative pt-32 lg:pt-36 pb-10 lg:pb-16 overflow-hidden bg-gradient-to-b from-[#F5F7FA] via-white to-white">
      {/* Background Architectural Mesh, Tint Image & Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Background Image Tint */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
            alt="Innovation Ecosystem"
            className="w-full h-full object-cover opacity-[0.06] mix-blend-multiply filter contrast-125 brightness-95"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F5F7FA]/80 via-white/90 to-white" />
        </div>

        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#1565C0]/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-[#0B2E6B]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#F57C00]/10 rounded-full blur-3xl" />
        
        {/* Subtle grid lines */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `radial-gradient(#0B2E6B 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Storytelling & Key CTAs */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            
            {/* Top Positioning Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-slate-800 text-xs font-semibold"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F57C00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F57C00]"></span>
              </span>
              <span className="text-[#0B2E6B] font-bold">India's Innovation & Entrepreneurship Ecosystem Builder</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-1.5"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-[#0B2E6B] tracking-tight font-poppins leading-[1.15]">
                Empowering Institutions.
                <br />
                <span className="gradient-text">Inspiring Innovation.</span>
                <br />
                <span className="text-slate-800">Creating Startups.</span>
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed"
            >
              FoundersLab partners with educational institutions to build sustainable innovation ecosystems that transform students into entrepreneurs, commercialize research, strengthen industry collaboration and create globally competitive startups.
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <button
                onClick={onPartnerWithUs}
                className="px-5 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#0B2E6B] to-[#1565C0] hover:from-[#1565C0] hover:to-[#0B2E6B] transition-all duration-300 shadow-lg shadow-[#0B2E6B]/20 hover:shadow-xl hover:scale-[1.02] flex items-center gap-2 cursor-pointer group"
              >
                Partner With Us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExplorePrograms}
                className="px-5 py-3 rounded-xl font-bold text-sm text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 transition-all duration-300 shadow-sm hover:border-[#1565C0] hover:text-[#1565C0] flex items-center gap-2 cursor-pointer"
              >
                Explore Programs
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={onScheduleMeeting}
                className="px-5 py-3 rounded-xl font-bold text-sm text-[#0B2E6B] bg-[#F5F7FA] hover:bg-slate-200/80 border border-slate-200 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#F57C00]" />
                Schedule a Meeting
              </button>
            </motion.div>

          </div>

          {/* Right Column: Hero Image Container */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-lg lg:max-w-none"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white group">
                <img
                  src={DEFAULT_IMAGE}
                  alt="Students and Researchers in Hardware & Prototyping Innovation Lab"
                  className="w-full h-[380px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2E6B]/85 via-transparent to-black/20" />
                


                {/* Image Overlay Content */}
                <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F57C00] text-[10px] font-extrabold uppercase tracking-widest text-white shadow">
                    Campus Hardware & Innovation Lab
                  </div>
                  <h3 className="text-xl font-bold font-poppins text-white">Student Founders & Hardware Innovators</h3>
                  <p className="text-xs text-slate-200">Hands-on prototyping, research commercialization & venture creation</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
