import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './CeoPage.css';
import './CeoPage.mobile.css';

interface CeoPageProps {
  onBackToHome: () => void;
  onOpenSchedule: () => void;
  onNavigateToContact: () => void;
}

export const CeoPage: React.FC<CeoPageProps> = ({
  onNavigateToContact,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Ms. Sakuntala Kasaragadda - FoundersLab Leadership';
    return () => {
      document.title = 'FoundersLab - Build Enterprise • Build Nation';
    };
  }, []);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
  };

  const staggerVariant = {
    visible: { transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="ceo-page-wrapper">
      
      {/* Breadcrumb / Small Header (Optional, based on design principles) */}
      <div className="pt-[85px] pb-0 ceo-container">
        <span className="ceo-eyebrow">FoundersLab Leadership</span>
      </div>

      <main>
        {/* 02 & 03 & 04 & 05 — EXECUTIVE HERO */}
        <section className="ceo-container ceo-hero-section">
          {/* Desktop Left / Mobile Top: Image */}
          <motion.div 
            className="ceo-hero-image-col"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="ceo-hero-image-wrap">
              <img 
                src="/ceo_image.jpg" 
                alt="Ms. Sakuntala Kasaragadda, Founder and CEO of FoundersLab" 
                className="ceo-hero-image"
              />
            </div>
          </motion.div>

          {/* Desktop Right / Mobile Bottom: Identity & Bio */}
          <div className="ceo-hero-content-col">
            <motion.h1 
              className="ceo-name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Ms. Sakuntala Kasaragadda <span className="text-[0.6em] align-top text-[#666] font-sans">(Phd)</span>
            </motion.h1>
            
            <motion.p className="ceo-role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              Founder & CEO
            </motion.p>
            
            <motion.p className="ceo-location" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              FoundersLab • Hyderabad, India
            </motion.p>
            
            <motion.div className="ceo-availability" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <div className="ceo-availability-dot" />
              Available for Institutional Keynotes & Advisory
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <span className="ceo-eyebrow" style={{ color: '#F57C00' }}>Ecosystem Visionary & Capacity Builder</span>
              <h2 className="ceo-hero-statement">
                Transforming Campuses into Engines of High-Impact Venture Creation.
              </h2>
              <div className="ceo-hero-bio">
                <p>
                  Ms. Sakuntala Kasaragadda (Phd) is an entrepreneurship, incubation and social-impact professional based in Hyderabad. She is currently associated with FoundersLab as its Founder & CEO and focuses on youth entrepreneurship, student innovation, incubation, enterprise development and ecosystem building. Her public professional profile describes her as a mentor, strategist and incubation/acceleration professional.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 06 — EXECUTIVE METRICS */}
        <motion.section 
          className="ceo-metrics-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerVariant}
        >
          <div className="ceo-container">
            <div className="ceo-metrics-grid">
              <motion.div className="ceo-metric-item" variants={fadeUpVariant}>
                <div className="ceo-metric-number">16<span className="ceo-metric-number-accent">+</span></div>
                <div className="ceo-metric-label">Years<br/>Experience</div>
              </motion.div>
              <motion.div className="ceo-metric-item" variants={fadeUpVariant}>
                <div className="ceo-metric-number">10,000<span className="ceo-metric-number-accent">+</span></div>
                <div className="ceo-metric-label">Founders<br/>Mentored</div>
              </motion.div>
              <motion.div className="ceo-metric-item" variants={fadeUpVariant}>
                <div className="ceo-metric-number" style={{ fontSize: '38px', paddingTop: '10px' }}>ni-msme</div>
                <div className="ceo-metric-label">Ex-Senior<br/>Faculty</div>
              </motion.div>
              <motion.div className="ceo-metric-item" variants={fadeUpVariant}>
                <div className="ceo-metric-number">100<span className="ceo-metric-number-accent">+</span></div>
                <div className="ceo-metric-label">Campuses<br/>Targeted</div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* 08 — EXECUTIVE PROFILE & JOURNEY */}
        <motion.section 
          className="ceo-container ceo-journey-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
        >
          <div className="ceo-journey-left">
            <div className="ceo-section-number">01</div>
            <div style={{ width: '2px', height: '100px', backgroundColor: '#F57C00', marginBottom: '32px' }} />
            <h2 className="ceo-journey-heading">Two Decades Dedicated to Capacity Building & Enterprise</h2>
          </div>
          <div className="ceo-journey-right">
            <span className="ceo-eyebrow">Executive Profile & Journey</span>
            <div className="ceo-journey-text">
              <p className="mb-6">
                Ms. Sakuntala Kasaragadda (Phd) is an accomplished entrepreneurship, incubation and social-impact leader with more than two decades of experience in enterprise development, youth entrepreneurship, women entrepreneurship, innovation and startup ecosystems.
              </p>
              <p className="mb-6">
                Her professional journey spans grassroots development with DHAN Foundation, youth entrepreneurship and mentoring with Bharatiya Yuva Shakti Trust (CII), consulting with Ernst & Young (EY), and leadership in social-impact entrepreneurship at WE Hub, Government of Telangana. She later led the Incubation Department at G. Narayanamma Institute of Technology & Science, where she worked extensively to develop innovation, incubation and entrepreneurship ecosystems for students and aspiring entrepreneurs.
              </p>
              <p>
                Over the years, she has supported thousands of aspiring entrepreneurs and women through enterprise-development, mentoring and entrepreneurship initiatives. As the Founder & CEO of FoundersLab, she is committed to transforming educational institutions into vibrant innovation and entrepreneurship ecosystems, enabling students to move from Ideas to Innovation, Innovation to Enterprises, and Enterprises to Impact, creating sustainable opportunities for students, institutions and communities.
              </p>
            </div>
          </div>
        </motion.section>

        {/* 09 — CEO MOTTO */}
        <motion.section 
          className="ceo-motto-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="ceo-container">
            <span className="ceo-eyebrow">FoundersLab Motto Championed by the CEO</span>
            <div className="ceo-motto-heading">
              <div className="ceo-motto-accent" />
              “BUILD ENTERPRISE • BUILD NATION”
            </div>
          </div>
        </motion.section>

        {/* 10 — CAREER TRACK RECORD */}
        <section className="ceo-container">
          <motion.div 
            className="ceo-timeline-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerVariant}
          >
            <div className="text-center mb-16">
              <span className="ceo-eyebrow">Career Track Record</span>
              <h2 className="ceo-timeline-heading">Key Experience & Tenures</h2>
            </div>

            <div className="ceo-timeline-container">
              <div className="ceo-timeline-line" />
              
              <motion.div className="ceo-timeline-item active" variants={fadeUpVariant}>
                <div className="ceo-timeline-dot" />
                <span className="ceo-timeline-date">2023 – Present</span>
                <h3 className="ceo-timeline-role">Chief Executive Officer & Co-Founder</h3>
                <p className="ceo-timeline-org">FoundersLab • Hyderabad, India</p>
                <p className="ceo-timeline-desc">
                  Spearheading India's dedicated innovation and entrepreneurship ecosystem builder. Architecting institutional transformation frameworks, campus incubators, and the Young Founders Lab across higher education institutions.
                </p>
              </motion.div>

              <motion.div className="ceo-timeline-item" variants={fadeUpVariant}>
                <div className="ceo-timeline-dot" />
                <span className="ceo-timeline-date">Senior Faculty Tenure</span>
                <h3 className="ceo-timeline-role">Senior Faculty & Capacity Building Specialist</h3>
                <p className="ceo-timeline-org">National Institute of MSME (ni-msme) • Ministry of MSME, Govt. of India, Hyderabad</p>
                <p className="ceo-timeline-desc">
                  Led national entrepreneurship development programs, MSME capacity building, incubation ecosystem strategies, and digital transformation initiatives for aspiring entrepreneurs across India.
                </p>
              </motion.div>

              <motion.div className="ceo-timeline-item" variants={fadeUpVariant}>
                <div className="ceo-timeline-dot" />
                <span className="ceo-timeline-date">16+ Years Track Record</span>
                <h3 className="ceo-timeline-role">Entrepreneurship & Digital Strategy Advisor</h3>
                <p className="ceo-timeline-org">Academic & MSME Development Ecosystem • Pan-India</p>
                <p className="ceo-timeline-desc">
                  Mentored over 10,000+ young innovators, student founders, and small business leaders in market entry, digital strategy, go-to-market architecture, and sustainable venture building.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* 14 — STRATEGIC FOCUS AREAS */}
        <section className="ceo-container ceo-pillars-section">
          <motion.div 
            className="ceo-pillars-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="ceo-eyebrow">Strategic Focus Areas</span>
            <h2 className="ceo-pillars-heading">The CEO's 4 Strategic Pillars for Campus Innovation</h2>
            <p className="ceo-pillars-sub">
              How Ms. Sakuntala Kasaragadda structures sustainable transformation inside educational institutions.
            </p>
          </motion.div>

          <motion.div 
            className="ceo-pillars-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerVariant}
          >
            <motion.article className="ceo-pillar-card" variants={fadeUpVariant}>
              <span className="ceo-pillar-number">01</span>
              <div className="ceo-pillar-indicator" />
              <h3 className="ceo-pillar-title">Institutional Incubation Architecture</h3>
              <p className="ceo-pillar-desc">
                Designing campus incubators from policy formulation to investor readiness, ensuring colleges produce real ventures rather than just academic certificates.
              </p>
            </motion.article>

            <motion.article className="ceo-pillar-card" variants={fadeUpVariant}>
              <span className="ceo-pillar-number">02</span>
              <div className="ceo-pillar-indicator" />
              <h3 className="ceo-pillar-title">Youth & Aspiring Founder Mentorship</h3>
              <p className="ceo-pillar-desc">
                Pioneered programs like the Young Founders Lab (ages 12–25) to inculcate critical problem-solving, commercial acumen, and entrepreneurial resilience early.
              </p>
            </motion.article>

            <motion.article className="ceo-pillar-card" variants={fadeUpVariant}>
              <span className="ceo-pillar-number">03</span>
              <div className="ceo-pillar-indicator" />
              <h3 className="ceo-pillar-title">Translating Research into Market Enterprise</h3>
              <p className="ceo-pillar-desc">
                Bridging academic intellectual property, student prototypes, and faculty dissertations with commercial viability, angel investors, and enterprise buyers.
              </p>
            </motion.article>

            <motion.article className="ceo-pillar-card" variants={fadeUpVariant}>
              <span className="ceo-pillar-number">04</span>
              <div className="ceo-pillar-indicator" />
              <h3 className="ceo-pillar-title">National MSME & Policy Alignment</h3>
              <p className="ceo-pillar-desc">
                Aligning campus innovation with India’s national goals—fostering high-value employment, indigenous manufacturing, and MSME sector competitiveness.
              </p>
            </motion.article>
          </motion.div>
        </section>

        {/* 16 — CEO QUOTE / CLOSING STATEMENT */}
        <motion.section 
          className="ceo-quote-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="ceo-container">
            <div className="ceo-quote-mark">“</div>
            <blockquote className="ceo-quote-text">
              We must stop measuring college success purely by placement day statistics. When an institution equips its brightest minds to build enterprises, invent indigenous deeptech, and create employment for thousands, that institution becomes a permanent pillar of nation-building.
            </blockquote>
            <div className="ceo-quote-author">Ms. Sakuntala Kasaragadda (Phd)</div>
            <div className="ceo-quote-author-role">Founder & CEO, FoundersLab</div>
          </div>
        </motion.section>

        {/* 07 — PRIMARY CTA */}
        <div className="ceo-container ceo-cta-container">
          <button onClick={onNavigateToContact} className="ceo-cta-btn">
            Connect with Secretariat <ArrowRight className="w-5 h-5 ceo-cta-icon" />
          </button>
        </div>

      </main>
    </div>
  );
};
