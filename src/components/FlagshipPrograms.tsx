import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FLAGSHIP_PROGRAMS } from '../data/founderslabData';
import { Program } from '../types';
import { Rocket, Microscope, Building, ArrowRight, CheckCircle2, Users, Sparkles, X, ChevronRight, Layers } from 'lucide-react';

interface FlagshipProgramsProps {
  onSelectProgram: (program: Program) => void;
  onScheduleMeeting: () => void;
}

export const FlagshipPrograms: React.FC<FlagshipProgramsProps> = ({
  onSelectProgram,
  onScheduleMeeting,
}) => {
  const [selectedModalProgram, setSelectedModalProgram] = useState<Program | null>(null);

  const getIllustrationIcon = (type: string) => {
    switch (type) {
      case 'student':
        return <Rocket className="w-8 h-8 text-[#F57C00]" />;
      case 'pharma':
        return <Microscope className="w-8 h-8 text-[#0284C7]" />;
      case 'industry':
        return <Building className="w-8 h-8 text-[#1565C0]" />;
      default:
        return <Sparkles className="w-8 h-8 text-[#0B2E6B]" />;
    }
  };

  return (
    <section id="programs" className="py-12 lg:py-18 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F7FA] border border-slate-200 text-[#0B2E6B] text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-[#1565C0]" />
            Flagship Initiatives
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-[#0B2E6B] font-poppins tracking-tight">
            Flagship Venture Building <span className="gradient-text">Programs</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Tailored, structured venture building pathways designed to ignite student entrepreneurship, commercialize pharmaceutical research, and bridge industry demands.
          </p>
        </div>

        {/* 3 Flagship Program Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {FLAGSHIP_PROGRAMS.map((prog, idx) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-[#1565C0]/60"
            >
              <div>
                {/* Header Banner with optional cover image */}
                <div className={`h-48 sm:h-52 p-5 sm:p-6 bg-gradient-to-br ${prog.colorGradient} text-white relative overflow-hidden group flex flex-col justify-between`}>
                  {prog.imageUrl && (
                    <div className="absolute inset-0 z-0 opacity-25 group-hover:opacity-35 transition-opacity duration-500">
                      <img
                        src={prog.imageUrl}
                        alt={prog.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                    </div>
                  )}

                  <div className="absolute top-0 right-0 p-5 opacity-10">
                    {getIllustrationIcon(prog.illustrationType)}
                  </div>
                  
                  <div className="flex justify-between items-start mb-2 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-md">
                      {getIllustrationIcon(prog.illustrationType)}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-sm">
                      {prog.badge}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-lg sm:text-xl font-extrabold font-poppins mb-0.5">{prog.title}</h3>
                    <p className="text-xs text-slate-200 font-medium leading-relaxed line-clamp-2">{prog.subtitle}</p>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 sm:p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {prog.description}
                  </p>

                  {/* Impact Highlights */}
                  <div className="p-3.5 rounded-2xl bg-[#F5F7FA] border border-slate-200 grid grid-cols-3 gap-2 text-center">
                    {prog.impactMetrics.map((m, mIdx) => (
                      <div key={mIdx}>
                        <p className="text-sm sm:text-base font-extrabold text-[#0B2E6B] font-poppins">{m.value}</p>
                        <p className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Key Benefits List */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Program Highlights</p>
                    {prog.keyBenefits.slice(0, 3).map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1565C0] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 sm:p-6 pt-0 flex items-center gap-2.5">
                <button
                  onClick={() => setSelectedModalProgram(prog)}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs text-[#0B2E6B] bg-[#F5F7FA] hover:bg-slate-200 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  View Deep Dive & Roadmap
                  <ChevronRight className="w-4 h-4 text-[#1565C0]" />
                </button>

                <button
                  onClick={onScheduleMeeting}
                  className="py-3 px-4 rounded-xl font-bold text-xs text-white bg-[#0B2E6B] hover:bg-[#1565C0] transition-all flex items-center justify-center gap-1 cursor-pointer shrink-0"
                  title="Partner on this program"
                >
                  Partner
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative text-slate-800"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedModalProgram(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
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
                      <CheckCircle2 className="w-4 h-4 text-[#F57C00] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => setSelectedModalProgram(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedModalProgram(null);
                    onScheduleMeeting();
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#0B2E6B] to-[#1565C0] shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  Launch Program on Your Campus
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
