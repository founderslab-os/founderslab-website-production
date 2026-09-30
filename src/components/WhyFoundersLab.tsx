import React from 'react';
import { motion } from 'motion/react';
import { WHY_FOUNDERSLAB_COMPARISON } from '../data/founderslabData';
import { Check, X, ShieldCheck, Sparkles, Rocket, Landmark, ArrowRight, Award, Cpu, Lightbulb } from 'lucide-react';

interface WhyFoundersLabProps {
  onScheduleMeeting: () => void;
}

interface RoadmapStep {
  phase: string;
  title: string;
  subtitle: string;
  desc?: string;
  bullets?: string[];
  outcome: string;
  icon: any;
  color: string;
  highlight: string;
}

export const WhyFoundersLab: React.FC<WhyFoundersLabProps> = ({ onScheduleMeeting }) => {
  const roadmapSteps: RoadmapStep[] = [
    {
      phase: 'Phase 01',
      title: 'Inspire',
      subtitle: 'Creating an Innovation Mindset',
      bullets: [
        'Identify student talent',
        'Idea generation workshops',
        'Innovation challenges',
        'Entrepreneurship awareness',
        'Faculty & EDC orientation'
      ],
      outcome: 'Students begin thinking like innovators.',
      icon: Landmark,
      color: 'from-[#0B2E6B] to-[#1565C0]',
      highlight: 'Mindset & Orientation'
    },
    {
      phase: 'Phase 02',
      title: 'Innovate',
      subtitle: 'Transforming Ideas into Prototypes',
      bullets: [
        'Idea validation',
        'Design thinking',
        'Prototype development',
        'Expert mentoring',
        'Hackathons & innovation labs'
      ],
      outcome: 'Ideas become working solutions.',
      icon: Cpu,
      color: 'from-[#1565C0] to-[#0284C7]',
      highlight: 'Prototyping & Labs'
    },
    {
      phase: 'Phase 03',
      title: 'Incubate',
      subtitle: 'Building Startups & Future Entrepreneurs',
      bullets: [
        'Academic Incubation Centre',
        'Startup mentoring',
        'Business model development',
        'Industry & investor connect',
        'Product validation'
      ],
      outcome: 'Students become startup founders.',
      icon: Award,
      color: 'from-[#0284C7] to-[#0D9488]',
      highlight: 'Incubation & Mentoring'
    },
    {
      phase: 'Phase 04',
      title: 'Accelerate',
      subtitle: 'Creating Sustainable Enterprises',
      bullets: [
        'Funding readiness',
        'Market access',
        'Commercialization',
        'Business growth',
        'Job creation & impact'
      ],
      outcome: 'Startups become successful enterprises that create jobs and drive economic growth.',
      icon: Rocket,
      color: 'from-[#F57C00] to-[#E65100]',
      highlight: 'Growth & Enterprise'
    }
  ];

  return (
    <section className="py-12 lg:py-18 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F7FA] border border-slate-200 text-[#0B2E6B] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F57C00]" />
            Strategic Differentiation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-[#0B2E6B] font-poppins tracking-tight">
            Why <span className="gradient-text">FoundersLab?</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            We don't sell one-off motivational talks or superficial certificates. We partner with institutions to build self-sustaining innovation, entrepreneurship, and incubation ecosystems that create lasting impact.
          </p>
        </div>

        {/* Comparison Matrix */}
        <div className="mb-10 rounded-3xl bg-[#F5F7FA] border border-slate-200 p-5 sm:p-6 shadow-sm">
          <h3 className="text-lg sm:text-xl font-bold text-[#0B2E6B] font-poppins mb-4 text-center sm:text-left">
            Institutional Transformation Comparison
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold uppercase text-slate-500 font-mono">
                  <th className="py-3 px-4 w-1/3">Ecosystem Dimension</th>
                  <th className="py-3 px-4 w-1/3 text-red-600 bg-red-50/50 rounded-t-xl">Traditional Workshops & Event Vendors</th>
                  <th className="py-3 px-4 w-1/3 text-[#0B2E6B] bg-[#0B2E6B]/10 rounded-t-xl">FoundersLab 360° Ecosystem Blueprint</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                {WHY_FOUNDERSLAB_COMPARISON.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/60 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-800 font-poppins">{item.feature}</td>
                    <td className="py-4 px-4 text-slate-600 bg-red-50/20">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{item.traditional}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-[#0B2E6B] bg-[#0B2E6B]/5">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#1565C0] shrink-0 mt-0.5" />
                        <span>{item.founderslab}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4-Phase Transformation Roadmap */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="text-xs font-bold text-[#F57C00] uppercase tracking-wider font-mono">
              LONG-TERM BLUEPRINT
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B2E6B] font-poppins">
              The Campus Transformation Journey
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              A structured multi-year roadmap from initial audit to investor demo day.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {roadmapSteps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative flex flex-col justify-between group overflow-hidden"
                >
                  {/* Top gradient accent bar */}
                  <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${step.color}`} />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <IconComp className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-[10px] font-bold font-mono px-2.5 py-1 rounded-full bg-slate-100 text-[#0B2E6B] border border-slate-200">
                        {step.phase}
                      </span>
                    </div>

                    <div className="mb-3">
                      <h4 className="text-lg font-extrabold text-[#0B2E6B] font-poppins group-hover:text-[#1565C0] transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                        {step.subtitle}
                      </p>
                    </div>

                    {step.bullets && step.bullets.length > 0 ? (
                      <ul className="text-xs text-slate-600 space-y-1.5 mb-4">
                        {step.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-1.5">
                            <span className="text-[#F57C00] font-extrabold shrink-0 mt-0.5">•</span>
                            <span className="leading-snug">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {step.desc}
                      </p>
                    )}

                    {step.outcome && (
                      <div className="mb-4 p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs">
                        <span className="font-extrabold text-[#0B2E6B] block mb-0.5">Outcome:</span>
                        <span className="text-slate-700 font-medium">{step.outcome}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-[#1565C0] bg-[#1565C0]/5 px-2 py-0.5 rounded-md">
                      {step.highlight}
                    </span>
                    <span className="font-mono font-bold text-slate-300">
                      0{idx + 1}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B2E6B] via-[#1565C0] to-[#0B2E6B] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-2xl font-bold font-poppins">Ready to Transform Your Campus?</h4>
              <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
                Partner with India's leading Innovation Ecosystem Builder to elevate your institution's global stature, student enrollment appeal, and NIRF rankings.
              </p>
            </div>
            <button
              onClick={onScheduleMeeting}
              className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-[#0B2E6B] bg-white hover:bg-slate-100 transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer"
            >
              Schedule Campus Strategy Call
              <ArrowRight className="w-4 h-4 text-[#F57C00]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
