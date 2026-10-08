import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useSpring } from 'motion/react';
import { WHY_FOUNDERSLAB_COMPARISON } from '../data/founderslabData';
import { Check, X, ShieldCheck, Sparkles, Rocket, Landmark, ArrowRight, Award, Cpu, Lightbulb } from 'lucide-react';
import './StrategicDifferentiation.css';
import './StrategicDifferentiation.mobile.css';
import './LongTermBlueprint.css';
import './LongTermBlueprint.mobile.css';

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

            {/* Comparison Matrix */}
            <div className="sd-matrix-wrapper" ref={matrixRef}>
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
              {roadmapSteps.map((step, idx) => (
                <div className="ltb-card" key={idx}>
                  <div className="ltb-card-header">
                    <div className="ltb-phase-number">
                      0{idx + 1}
                      <div className="ltb-phase-accent"></div>
                    </div>
                    <h3 className="ltb-phase-title">{step.title}</h3>
                    <h4 className="ltb-phase-subtitle">{step.subtitle}</h4>
                  </div>
                  
                  <div className="ltb-card-body">
                    <ul className="ltb-bullets">
                      {step.bullets?.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="ltb-card-outcome">
                    <span className="ltb-outcome-label">Outcome</span>
                    <p className="ltb-outcome-text">{step.outcome}</p>
                  </div>

                  <div className="ltb-card-footer">
                    <span className="ltb-bottom-text">{step.highlight}</span>
                    <span className="ltb-bottom-num">0{idx + 1}</span>
                  </div>
                </div>
              ))}
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
