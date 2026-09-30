import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { ALL_IMPACT_METRICS } from '../data/founderslabData';
import { TrendingUp, Award, Users, Building, Lightbulb, Presentation, Filter, Sparkles, Camera, ArrowRight } from 'lucide-react';

// Animated Counter component
const AnimatedCounter: React.FC<{ value: number; duration?: number }> = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const totalSteps = 60;
    const increment = end / totalSteps;
    const stepTime = duration / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString('en-IN')}</span>;
};

interface ImpactMetricsProps {
  onNavigateToGallery?: () => void;
}

export const ImpactMetrics: React.FC<ImpactMetricsProps> = ({ onNavigateToGallery }) => {

  const [activeTab, setActiveTab] = useState<string>('all');

  const tabs = [
    { id: 'all', label: 'All 16 Ecosystem Metrics' },
    { id: 'institutions', label: 'Institutions & Students' },
    { id: 'startups', label: 'Venture Creation Pipeline' },
    { id: 'mentors', label: 'Mentor Network' },
    { id: 'events', label: 'Capacity & Events' },
  ];

  const filteredMetrics = activeTab === 'all' 
    ? ALL_IMPACT_METRICS 
    : ALL_IMPACT_METRICS.filter(m => {
        if (activeTab === 'institutions') return m.category === 'institutions' || m.category === 'students';
        return m.category === activeTab;
      });

  return (
    <section id="impact" className="py-20 lg:py-32 bg-[#F5F7FA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#0B2E6B] text-xs font-bold uppercase tracking-wider shadow-sm">
            <TrendingUp className="w-3.5 h-3.5 text-[#F57C00]" />
            Quantifiable Ecosystem Impact
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2E6B] font-poppins tracking-tight">
            Impact Driven by <span className="gradient-text">Measurable Outcomes</span>
          </h2>
          <p className="text-base text-slate-600">
            Real data from FoundersLab partner campuses across India reflecting tangible venture creation, student reach, research monetization, and mentor engagement.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#0B2E6B] text-white shadow-md shadow-[#0B2E6B]/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Highlighted Banner Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Startup Ideas</p>
            <p className="text-3xl sm:text-4xl font-extrabold font-poppins mt-2 text-[#0B2E6B]">
              <AnimatedCounter value={2100} />+
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Evaluated & registered</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Prototypes Built</p>
            <p className="text-3xl sm:text-4xl font-extrabold font-poppins mt-2 text-[#1565C0]">
              <AnimatedCounter value={300} />+
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Working MVPs</p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#F57C00] to-[#E65100] text-white shadow-xl">
            <p className="text-xs font-semibold text-amber-100 uppercase tracking-wider">Revenue Startups</p>
            <p className="text-3xl sm:text-4xl font-extrabold font-poppins mt-2">
              <AnimatedCounter value={14} />
            </p>
            <p className="text-[11px] text-amber-100 mt-1">Actively monetizing</p>
          </div>
        </div>

        {/* Comprehensive Grid for Filtered Metrics */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMetrics.map((metric) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#1565C0]/40 hover:shadow-md transition-all group"
            >
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#0B2E6B] font-poppins group-hover:text-[#1565C0] transition-colors">
                  {metric.prefix}
                  <AnimatedCounter value={metric.value} />
                  {metric.suffix}
                </span>
                <span className="text-[10px] font-bold text-[#F57C00] bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 uppercase">
                  Verified
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-1">{metric.label}</h3>
              {metric.description && (
                <p className="text-xs text-slate-500 leading-snug">{metric.description}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Discovery link to Innovation Gallery */}
        {onNavigateToGallery && (
          <div className="mt-12 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-3 sm:px-6 sm:py-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <span className="p-1.5 rounded-lg bg-[#0B2E6B]/10 text-[#0B2E6B]">
                  <Camera className="w-4 h-4 text-[#F57C00]" />
                </span>
                <span>See photos from campus hackathons, prototypes, and labs in action</span>
              </div>
              <button
                onClick={onNavigateToGallery}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0B2E6B] to-[#1565C0] hover:from-[#1565C0] hover:to-[#0B2E6B] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Photo Gallery</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F57C00]" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
