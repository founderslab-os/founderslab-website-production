import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FLAGSHIP_PROGRAMS } from '../data/founderslabData';
import { Program } from '../types';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import './FlagshipInitiatives.css';
import './FlagshipInitiatives.mobile.css';
import './Programs.mobile.css';

interface FlagshipProgramsProps {
  onSelectProgram: (program: Program) => void;
  onScheduleMeeting: () => void;
}

const PROGRAM_DIAGRAMS: Record<string, string> = {
  'young-founders-lab': 'IDEA → PROTOTYPE → VENTURE',
  'pharmapreneur': 'RESEARCH → IP → MARKET',
  'industry-readiness': 'CAMPUS → INDUSTRY → TALENT',
};

export const FlagshipPrograms: React.FC<FlagshipProgramsProps> = ({
  onSelectProgram,
  onScheduleMeeting,
}) => {
  const [selectedModalProgram, setSelectedModalProgram] = useState<Program | null>(null);
  const [activeTabId, setActiveTabId] = useState<string>(FLAGSHIP_PROGRAMS[0].id);
  const [highlightsOpen, setHighlightsOpen] = useState<boolean>(false);

  const activeProgram = FLAGSHIP_PROGRAMS.find((p) => p.id === activeTabId) || FLAGSHIP_PROGRAMS[0];
  const activeIndex = FLAGSHIP_PROGRAMS.findIndex((p) => p.id === activeTabId);

  return (
    <section id="programs" className="fl-initiatives">
      <div className="fl-initiatives-container">
        
        {/* Header */}
        <div className="fl-initiatives-header">
          <div className="fl-initiatives-header-left">
            <span className="fl-initiatives-eyebrow">Flagship Initiatives</span>
            <h2 className="fl-initiatives-title">Flagship Venture<br/>Building Programs</h2>
          </div>
          <div className="fl-initiatives-header-right">
            <p className="fl-initiatives-header-desc">
              Tailored, structured venture building pathways designed to ignite student entrepreneurship, commercialize pharmaceutical research, and bridge industry demands.
            </p>
          </div>
        </div>

        {/* MOBILE INTERACTIVE PROGRAM SELECTOR */}
        <div className="fl-mobile-program-selector md:hidden">
          {/* Tab Selector Buttons */}
          <div className="fl-mobile-tabs">
            {FLAGSHIP_PROGRAMS.map((prog, idx) => (
              <button
                key={prog.id}
                onClick={() => {
                  setActiveTabId(prog.id);
                  setHighlightsOpen(false);
                }}
                className={`fl-mobile-tab-btn ${prog.id === activeTabId ? 'active' : ''}`}
              >
                0{idx + 1} {prog.title}
              </button>
            ))}
          </div>

          {/* Active Program View */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProgram.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="fl-mobile-program-card"
            >
              <div className="fl-mobile-card-top">
                <span className="fl-mobile-card-index">0{activeIndex + 1}</span>
                <span className="fl-mobile-card-badge">{activeProgram.badge}</span>
              </div>

              <h3 className="fl-mobile-card-title">{activeProgram.title}</h3>
              <p className="fl-mobile-card-subtitle">{activeProgram.subtitle}</p>

              {/* Unique Journey Diagram */}
              <div className="fl-mobile-diagram">
                {PROGRAM_DIAGRAMS[activeProgram.id] || 'IDEATE → BUILD → SCALE'}
              </div>

              <p className="fl-mobile-card-desc">{activeProgram.description}</p>

              {/* 3 Metric Summary Strip */}
              <div className="fl-mobile-metrics-strip">
                {activeProgram.impactMetrics.map((m, mIdx) => (
                  <div key={mIdx} className="fl-mobile-metric">
                    <span className="fl-mobile-metric-val">{m.value}</span>
                    <span className="fl-mobile-metric-lbl">{m.label}</span>
                  </div>
                ))}
              </div>

              {/* Interactive Program Highlights Accordion */}
              <div className="fl-mobile-highlights-accordion">
                <button
                  onClick={() => setHighlightsOpen(!highlightsOpen)}
                  className="fl-mobile-accordion-toggle"
                >
                  <span>PROGRAM HIGHLIGHTS</span>
                  <span>{highlightsOpen ? '−' : '+'}</span>
                </button>

                <AnimatePresence>
                  {highlightsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="fl-mobile-accordion-content"
                    >
                      {activeProgram.keyBenefits.map((b, bIdx) => (
                        <div key={bIdx} className="fl-mobile-highlight-row">
                          <span className="fl-mobile-highlight-num">0{bIdx + 1}</span>
                          <span className="fl-mobile-highlight-text">{b}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Actions */}
              <div className="fl-mobile-actions">
                <button
                  onClick={() => setSelectedModalProgram(activeProgram)}
                  className="fl-mobile-btn-primary"
                >
                  EXPLORE PROGRAM ROADMAP →
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* DESKTOP 3-CARD GRID */}
        <div className="fl-initiatives-grid hidden md:grid">
          {FLAGSHIP_PROGRAMS.map((prog, idx) => (
            <div 
              key={prog.id} 
              className="fl-initiative"
              style={{ '--program-image': `url(${prog.imageUrl})` } as React.CSSProperties}
            >
              <div className="fl-initiative-bg"></div>
              <div className="fl-initiative-overlay"></div>
              
              <div className="fl-initiative-content">
                <div className="fl-initiative-category">
                  <span className="fl-initiative-index">0{idx + 1}</span>
                  {prog.badge}
                </div>
                
                <h3 className="fl-initiative-title">{prog.title}</h3>
                <p className="fl-initiative-subtitle">{prog.subtitle}</p>
                
                <p className="fl-initiative-description">
                  {prog.description}
                </p>

                <div className="fl-initiative-divider"></div>

                <div className="fl-initiative-metrics">
                  {prog.impactMetrics.map((m, mIdx) => (
                    <div key={mIdx} className="fl-initiative-metric">
                      <span className="fl-initiative-metric-value">{m.value}</span>
                      <span className="fl-initiative-metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>

                <div className="fl-initiative-highlights">
                  <h4 className="fl-initiative-highlights-title">Program Highlights</h4>
                  <ul className="fl-initiative-highlights-list">
                    {prog.keyBenefits.slice(0, 3).map((b, bIdx) => (
                      <li key={bIdx}>
                        <span className="fl-initiative-highlights-marker">0{bIdx + 1}</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="fl-initiative-cta">
                  <button
                    onClick={() => setSelectedModalProgram(prog)}
                    className="fl-initiative-btn primary-cta"
                  >
                    View Deep Dive & Roadmap <span>→</span>
                  </button>
                  <button
                    onClick={onScheduleMeeting}
                    className="fl-initiative-btn secondary-cta"
                  >
                    Partner <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal for Program Deep-Dive Details */}
      <AnimatePresence>
        {selectedModalProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fl-initiatives-modal-overlay"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fl-initiatives-modal-content"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedModalProgram(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border-0"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="space-y-2 mb-6 pr-10">
                <span className="text-xs font-bold text-[#F57C00] uppercase tracking-wider">
                  {selectedModalProgram.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B2E6B] font-poppins">
                  {selectedModalProgram.title}
                </h3>
                <p className="text-sm text-slate-600 italic font-medium">{selectedModalProgram.tagline}</p>
              </div>

              {/* Description */}
              <div className="p-4 rounded-2xl bg-[#F5F7FA] border border-slate-200 mb-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {selectedModalProgram.description}
              </div>

              {/* 4 Curriculum Phases */}
              <div className="space-y-4 mb-6">
                <h4 className="text-sm font-bold text-[#0B2E6B] uppercase tracking-wider font-mono">
                  Execution Curriculum & Phases
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {selectedModalProgram.curriculumPhases.map((phase) => (
                    <div key={phase.phase} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                      <span className="text-[10px] font-bold text-[#1565C0] uppercase font-mono">{phase.phase}</span>
                      <p className="text-sm font-bold text-slate-900">{phase.title}</p>
                      <p className="text-xs text-slate-500 leading-normal">{phase.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-3 mb-8">
                <h4 className="text-sm font-bold text-[#0B2E6B] uppercase tracking-wider font-mono">
                  Institutional Benefits & Outcomes
                </h4>
                <div className="space-y-2">
                  {selectedModalProgram.keyBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <span className="text-[#F57C00] shrink-0 mt-0.5">•</span>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-end gap-4 pt-4 border-t border-slate-200">
                <button
                  onClick={() => setSelectedModalProgram(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors border-0 bg-transparent cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedModalProgram(null);
                    onScheduleMeeting();
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#0B2E6B] to-[#1565C0] shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer border-0"
                >
                  Launch Program on Your Campus
                  <span>→</span>
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
