import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useSpring, AnimatePresence } from 'motion/react';
import { WHY_FOUNDERSLAB_COMPARISON } from '../data/founderslabData';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import './StrategicDifferentiation.css';
import './StrategicDifferentiation.mobile.css';
import './Differentiation.mobile.css';
import './LongTermBlueprint.css';
import './LongTermBlueprint.mobile.css';
import './Blueprint.mobile.css';

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
  const matrixRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Mobile interactive comparison carousel index
  const [mobileCompIndex, setMobileCompIndex] = useState(0);

  // Mobile Blueprint progressive disclosure expanded states
  const [expandedBlueprintPhases, setExpandedBlueprintPhases] = useState<Record<number, boolean>>({});

  const { scrollYProgress } = useScroll({
    target: matrixRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    let index = Math.floor(latest * WHY_FOUNDERSLAB_COMPARISON.length);
    if (index < 0) index = 0;
    if (index >= WHY_FOUNDERSLAB_COMPARISON.length) index = WHY_FOUNDERSLAB_COMPARISON.length - 1;
    setActiveIndex(index);
  });

  const toggleBlueprintPhase = (idx: number) => {
    setExpandedBlueprintPhases(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const roadmapSteps: RoadmapStep[] = [
    {
      phase: 'Phase 01',
      title: 'INSPIRE',
      subtitle: 'Innovation Mindset',
      bullets: [
        'Identify student talent',
        'Idea generation workshops',
        'Innovation challenges',
        'Entrepreneurship awareness',
        'Faculty & EDC orientation'
      ],
      outcome: 'Students begin thinking like innovators.',
      icon: null,
      color: '',
      highlight: 'Mindset & Orientation'
    },
    {
      phase: 'Phase 02',
      title: 'INNOVATE',
      subtitle: 'Prototype Development',
      bullets: [
        'Idea validation',
        'Design thinking',
        'Prototype development',
        'Expert mentoring',
        'Hackathons & innovation labs'
      ],
      outcome: 'Ideas become working solutions.',
      icon: null,
      color: '',
      highlight: 'Prototyping & Labs'
    },
    {
      phase: 'Phase 03',
      title: 'INCUBATE',
      subtitle: 'Startup Formation',
      bullets: [
        'Academic Incubation Centre',
        'Startup mentoring',
        'Business model development',
        'Industry & investor connect',
        'Product validation'
      ],
      outcome: 'Students become founders.',
      icon: null,
      color: '',
      highlight: 'Incubation & Mentoring'
    },
    {
      phase: 'Phase 04',
      title: 'ACCELERATE',
      subtitle: 'Enterprise Growth',
      bullets: [
        'Funding readiness',
        'Market access',
        'Commercialization',
        'Business growth',
        'Job creation & impact'
      ],
      outcome: 'Startups become successful enterprises that create jobs and drive economic growth.',
      icon: null,
      color: '',
      highlight: 'Growth & Enterprise'
    }
  ];

  const currentCompItem = WHY_FOUNDERSLAB_COMPARISON[mobileCompIndex] || WHY_FOUNDERSLAB_COMPARISON[0];

  return (
    <>
      <section className="sd-section" id="why-founderslab">
        <div className="sd-container">
          <div className="sd-content">
            {/* Header */}
            <div className="sd-header">
              <div className="sd-header-eyebrow">
                <span>Strategic Differentiation</span>
                <div className="sd-header-line"></div>
              </div>
              <h2 className="sd-header-title">Why FoundersLab?</h2>
              <p className="sd-header-desc">
                We don't sell one-off motivational talks or superficial certificates. We partner with institutions to build self-sustaining innovation, entrepreneurship, and incubation ecosystems that create lasting impact.
              </p>
            </div>

            {/* MOBILE INTERACTIVE COMPARISON CAROUSEL */}
            <div className="fl-mobile-comp-carousel md:hidden">
              <div className="fl-mobile-comp-header">
                <span className="fl-mobile-comp-badge">0{mobileCompIndex + 1} / 0{WHY_FOUNDERSLAB_COMPARISON.length}</span>
                <h3 className="fl-mobile-comp-feature">{currentCompItem.feature}</h3>
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={mobileCompIndex}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="fl-mobile-comp-card"
                >
                  <div className="fl-mobile-comp-block traditional">
                    <span className="fl-mobile-comp-tag">TRADITIONAL APPROACH</span>
                    <p className="fl-mobile-comp-text">{currentCompItem.traditional}</p>
                  </div>

                  <div className="fl-mobile-comp-vs">VS</div>

                  <div className="fl-mobile-comp-block founderslab">
                    <span className="fl-mobile-comp-tag fl-tag">FOUNDERSLAB</span>
                    <p className="fl-mobile-comp-text fl-text">{currentCompItem.founderslab}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Number Buttons Controls */}
              <div className="fl-mobile-comp-controls">
                <button 
                  onClick={() => setMobileCompIndex((prev) => (prev > 0 ? prev - 1 : WHY_FOUNDERSLAB_COMPARISON.length - 1))}
                  className="fl-mobile-comp-nav-btn"
                  aria-label="Previous comparison"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="fl-mobile-comp-numbers">
                  {WHY_FOUNDERSLAB_COMPARISON.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMobileCompIndex(idx)}
                      className={`fl-mobile-comp-num-btn ${idx === mobileCompIndex ? 'active' : ''}`}
                    >
                      0{idx + 1}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => setMobileCompIndex((prev) => (prev < WHY_FOUNDERSLAB_COMPARISON.length - 1 ? prev + 1 : 0))}
                  className="fl-mobile-comp-nav-btn"
                  aria-label="Next comparison"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* DESKTOP COMPARISON MATRIX WITH ORANGE RAIL */}
            <div className="sd-matrix-wrapper hidden md:block" ref={matrixRef}>
              <div className="sd-mobile-rail">
                <motion.div 
                  className="sd-mobile-rail-progress"
                  style={{ scaleY: smoothProgress }}
                />
              </div>
              <div className="sd-matrix">
                <div className="sd-matrix-header">
                  <div className="sd-col-head"></div>
                  <div className="sd-col-head">Traditional Approach</div>
                  <div className="sd-col-head highlight">FoundersLab</div>
                </div>
                {WHY_FOUNDERSLAB_COMPARISON.map((item, idx) => (
                  <div className={`sd-row ${idx === activeIndex ? 'is-active' : ''}`} key={idx}>
                    <div className="sd-col-index">
                      <span className="sd-index-number">0{idx + 1}</span>
                      <h3 className="sd-dimension-title">{item.feature}</h3>
                    </div>
                    <div className="sd-col-traditional">
                      <span className="sd-mobile-label">Traditional Approach</span>
                      <p className="sd-traditional-text">{item.traditional}</p>
                    </div>
                    <div className="sd-col-founderslab">
                      <span className="sd-mobile-label founderslab-label">FoundersLab</span>
                      <p className="sd-founderslab-text">{item.founderslab}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ltb-section">
        <div className="ltb-container">
          
          <div className="ltb-header">
            <div className="ltb-eyebrow">
              LONG-TERM BLUEPRINT
              <div className="ltb-eyebrow-line"></div>
            </div>
            <h2 className="ltb-title">The Campus Transformation Journey</h2>
            <p className="ltb-desc">
              A structured multi-year roadmap from initial audit to investor demo day.
            </p>
          </div>

          <div className="ltb-journey-container">
            <div className="ltb-journey-track">
              <div className="ltb-journey-line"></div>
              <div className="ltb-journey-markers">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="ltb-marker-wrapper">
                    <div className="ltb-marker-dot"></div>
                    <span className="ltb-marker-num">0{num}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ltb-grid">
              {roadmapSteps.map((step, idx) => {
                const isExpanded = !!expandedBlueprintPhases[idx];
                return (
                  <div className="ltb-card" key={idx}>
                    <div className="ltb-card-header">
                      <div className="ltb-phase-number">
                        0{idx + 1}
                        <div className="ltb-phase-accent"></div>
                      </div>
                      <h3 className="ltb-phase-title">{step.title}</h3>
                      <h4 className="ltb-phase-subtitle">{step.subtitle}</h4>
                    </div>

                    <div className="ltb-card-outcome">
                      <span className="ltb-outcome-label">OUTCOME</span>
                      <p className="ltb-outcome-text">{step.outcome}</p>
                    </div>
                    
                    {/* Progressive Disclosure Activities for Mobile */}
                    <div className="ltb-card-body">
                      <button 
                        onClick={() => toggleBlueprintPhase(idx)}
                        className="ltb-toggle-activities-btn md:hidden"
                      >
                        {isExpanded ? 'HIDE STAGE ACTIVITIES −' : 'VIEW STAGE ACTIVITIES +'}
                      </button>

                      <ul className={`ltb-bullets ${isExpanded ? 'is-expanded' : ''}`}>
                        {step.bullets?.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="ltb-card-footer hidden md:flex">
                      <span className="ltb-bottom-text">{step.highlight}</span>
                      <span className="ltb-bottom-num">0{idx + 1}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="ltb-cta">
            <div className="ltb-cta-left">
              <h4 className="ltb-cta-title">Ready to Transform Your Campus?</h4>
              <p className="ltb-cta-desc">
                Partner with India's leading Innovation Ecosystem Builder to elevate your institution's global stature, student enrollment appeal, and NIRF rankings.
              </p>
            </div>
            <button onClick={onScheduleMeeting} className="ltb-cta-btn">
              Schedule Campus Strategy Call
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>
    </>
  );
};
