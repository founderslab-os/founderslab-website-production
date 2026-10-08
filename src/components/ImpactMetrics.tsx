import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'motion/react';
import { ALL_IMPACT_METRICS } from '../data/founderslabData';
import './QuantifiableEcosystemImpact.css';
import './QuantifiableEcosystemImpact.mobile.css';
import './Impact.mobile.css';

// Animated Counter component
const AnimatedCounter: React.FC<{ value: number; duration?: number; suffix?: string }> = ({ value, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
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

  return <span ref={ref}>{count.toLocaleString('en-IN')}{suffix}</span>;
};

interface ImpactMetricsProps {
  onNavigateToGallery?: () => void;
}

export const ImpactMetrics: React.FC<ImpactMetricsProps> = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'institutions', label: 'Institutions & Students' },
    { id: 'startups', label: 'Venture Creation' },
    { id: 'mentors', label: 'Mentor Network' },
    { id: 'events', label: 'Capacity & Events' },
  ];

  const filteredMetrics = activeTab === 'all' 
    ? ALL_IMPACT_METRICS 
    : ALL_IMPACT_METRICS.filter(m => {
        if (activeTab === 'institutions') return m.category === 'institutions' || m.category === 'students';
        if (activeTab === 'startups') return m.category === 'startups';
        if (activeTab === 'mentors') return m.category === 'mentors';
        if (activeTab === 'events') return m.category === 'events';
        return true;
      });

  return (
    <section id="impact" className="fl-impact">
      <div className="fl-impact__container">
        
        {/* Header */}
        <div className="fl-impact__header">
          <div className="fl-impact__header-eyebrow">
            <span className="fl-impact__eyebrow-line"></span>
            Impact / By the numbers
          </div>
          <div className="fl-impact__header-content">
            <h2 className="fl-impact__title">Quantifiable Ecosystem Impact</h2>
            <h3 className="fl-impact__subtitle">Impact Driven by Measurable Outcomes</h3>
            <p className="fl-impact__description">
              Real data from FoundersLab partner campuses across India reflecting tangible venture creation, student reach, research monetization, and mentor engagement.
            </p>
          </div>
        </div>

        {/* Primary KPI Strip */}
        <div className="fl-impact__kpi-strip">
          <div className="fl-impact__kpi-item">
            <div className="fl-impact__kpi-index">01</div>
            <div className="fl-impact__kpi-value"><AnimatedCounter value={2100} suffix="+" /></div>
            <div className="fl-impact__kpi-label">Startup Ideas</div>
            <div className="fl-impact__kpi-desc">Evaluated & registered</div>
          </div>
          <div className="fl-impact__kpi-divider"></div>
          <div className="fl-impact__kpi-item">
            <div className="fl-impact__kpi-index">02</div>
            <div className="fl-impact__kpi-value"><AnimatedCounter value={300} suffix="+" /></div>
            <div className="fl-impact__kpi-label">Prototypes Built</div>
            <div className="fl-impact__kpi-desc">Working MVPs</div>
          </div>
          <div className="fl-impact__kpi-divider"></div>
          <div className="fl-impact__kpi-item">
            <div className="fl-impact__kpi-index">03</div>
            <div className="fl-impact__kpi-value"><AnimatedCounter value={14} /></div>
            <div className="fl-impact__kpi-label">Revenue Startups</div>
            <div className="fl-impact__kpi-desc">Actively monetizing</div>
          </div>
        </div>

        {/* Ecosystem Metrics Matrix */}
        <div className="fl-impact__matrix-section">
          <div className="fl-impact__matrix-header">
            <span className="fl-impact__matrix-marker"></span>
            Ecosystem Metrics
          </div>

          <div className="fl-impact__nav-container">
            <nav className="fl-impact__nav">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`fl-impact__nav-item ${activeTab === tab.id ? 'active' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="fl-impact__grid">
            {filteredMetrics.map((metric, index) => {
              const displayIndex = (index + 1).toString().padStart(2, '0');
              return (
                <div key={metric.id} className="fl-impact__card">
                  <div className="fl-impact__card-header">
                    <span className="fl-impact__card-index">{displayIndex}</span>
                    <span className="fl-impact__card-status">Verified</span>
                  </div>
                  <div className="fl-impact__card-value">
                    <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                  </div>
                  <div className="fl-impact__card-metric">{metric.label}</div>
                  <div className="fl-impact__card-desc">{metric.description}</div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
