import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Mail, Phone, MessageSquare, ExternalLink } from 'lucide-react';
import './ContactSection.css';
import './ContactSection.mobile.css';
import './Contact.mobile.css';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    institution: '',
    email: '',
    phone: '',
    role: '',
    programInterest: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  
  // Mobile Interactive States
  const [hqDetailsExpanded, setHqDetailsExpanded] = useState(false);
  const [mobileFormRevealed, setMobileFormRevealed] = useState(false);
  const [formStep, setFormStep] = useState<1 | 2>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="cs-section">
      <div className="cs-container">
        
        {/* Intro Area */}
        <div className="cs-intro">
          <div className="cs-intro-left">
            <span className="cs-eyebrow">DIRECT ENGAGEMENT</span>
            <h2 className="cs-title">Partner With FoundersLab</h2>
            <p className="cs-desc">Initiate a high-level strategic discussion to transform your institution into a leading innovation campus.</p>
          </div>
          <div className="cs-intro-right hidden md:block">
            <div className="cs-status-block">
              <span className="cs-status-title">NATIONAL HEADQUARTERS</span>
              <div className="cs-status-divider"></div>
              <span className="cs-status-value">FOUNDERSLAB SECRETARIAT<br/>HYDERABAD<br/>TELANGANA, INDIA</span>
              <div className="cs-status-indicator">HQ ACTIVE <span className="cs-status-dot"></span></div>
            </div>
          </div>
        </div>

        {/* MOBILE DEDICATED INSTITUTIONAL COMPOSITION (<768px) */}
        <div className="cs-mobile-wrapper md:hidden">
          
          <div className="cs-mobile-rule"></div>

          {/* 02 — HQ Identity Strip */}
          <div className="cs-mobile-hq-identity-strip">
            <div className="cs-mobile-hq-loc">
              <span className="cs-mobile-hq-label">NATIONAL HEADQUARTERS</span>
              <h4 className="cs-mobile-hq-city">HYDERABAD</h4>
              <p className="cs-mobile-hq-state">TELANGANA, INDIA</p>
            </div>
            <div className="cs-mobile-hq-badge">
              <span className="cs-mobile-dot-restrained"></span>
              <span className="cs-mobile-status-text">HQ ACTIVE</span>
            </div>
          </div>

          <div className="cs-mobile-rule"></div>

          {/* 03 — Contact Dossier */}
          <div className="cs-mobile-dossier">
            <span className="cs-mobile-dossier-heading">CONTACT THE SECRETARIAT</span>

            {/* Email Row */}
            <a href="mailto:admin@founderslab.co.in" className="cs-mobile-dossier-row">
              <div className="cs-mobile-dossier-left">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <div className="flex flex-col">
                  <span className="cs-mobile-dossier-cat">OFFICIAL EMAIL</span>
                  <span className="cs-mobile-dossier-val">admin@founderslab.co.in</span>
                </div>
              </div>
              <span className="cs-mobile-arrow">→</span>
            </a>

            {/* Phone Row */}
            <a href="tel:+919010207999" className="cs-mobile-dossier-row">
              <div className="cs-mobile-dossier-left">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <div className="flex flex-col">
                  <span className="cs-mobile-dossier-cat">DIRECT ADVISORY PHONE</span>
                  <span className="cs-mobile-dossier-val">+91 9010207999</span>
                </div>
              </div>
              <span className="cs-mobile-arrow">→</span>
            </a>

            {/* WhatsApp Row (Enhanced Visual Emphasis within Institutional System) */}
            <a 
              href="https://wa.me/919010207999?text=Hello%20FoundersLab%20Team%2C%20I%20would%20like%20to%20inquire%20about%20building%20an%20Innovation%20Ecosystem." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="cs-mobile-dossier-row whatsapp-featured"
            >
              <div className="cs-mobile-dossier-left">
                <MessageSquare className="w-4 h-4 text-[#F57C00] shrink-0" />
                <div className="flex flex-col">
                  <span className="cs-mobile-dossier-cat text-[#F57C00]">WHATSAPP</span>
                  <span className="cs-mobile-dossier-val font-bold">Connect via WhatsApp (+91 9010207999)</span>
                </div>
              </div>
              <span className="cs-mobile-arrow text-[#F57C00]">→</span>
            </a>

            {/* Web Portal Row */}
            <a href="http://www.founderslab.co.in" target="_blank" rel="noopener noreferrer" className="cs-mobile-dossier-row">
              <div className="cs-mobile-dossier-left">
                <ExternalLink className="w-4 h-4 text-slate-500 shrink-0" />
                <div className="flex flex-col">
                  <span className="cs-mobile-dossier-cat">OFFICIAL WEB PORTAL</span>
                  <span className="cs-mobile-dossier-val">www.founderslab.co.in</span>
                </div>
              </div>
              <span className="cs-mobile-arrow">→</span>
            </a>
          </div>

          {/* Collapsible HQ Details */}
          <div className="cs-mobile-collapsible-hq">
            <button 
              onClick={() => setHqDetailsExpanded(!hqDetailsExpanded)}
              className="cs-mobile-accordion-btn"
            >
              <span>{hqDetailsExpanded ? 'Hide HQ Details −' : 'View HQ Details +'}</span>
            </button>

            <AnimatePresence>
              {hqDetailsExpanded && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="cs-mobile-accordion-body"
                >
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">FoundersLab Secretariat</h4>
                  <p className="text-xs italic text-slate-600 mb-2">Building Enterprises • Building the Nation</p>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Location & HQ: Hyderabad, Telangana, India<br />
                    FoundersLab Secretariat • Hyderabad • Telangana • 500001
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="cs-mobile-rule"></div>

          {/* 04 — Compact Map Module (Height ~140px) */}
          <div className="cs-mobile-map-box">
            <div className="cs-mobile-map-frame">
              <iframe
                title="HQ Map Mobile"
                src="https://maps.google.com/maps?q=Hyderabad&t=&z=11&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
              ></iframe>
            </div>
            <div className="cs-mobile-map-meta">
              <span className="text-xs font-bold text-slate-900">FoundersLab Secretariat</span>
              <span className="text-[11px] text-slate-500">Hyderabad • Telangana • 500001</span>
              <a 
                href="https://maps.google.com/?q=Hyderabad" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cs-mobile-map-ext-link"
              >
                View on Google Maps →
              </a>
            </div>
          </div>

          <div className="cs-mobile-rule"></div>

          {/* 05 — Progressive Disclosure Partnership Inquiry Form */}
          <div className="cs-mobile-inquiry-box">
            <div className="cs-mobile-inquiry-header">
              <h3 className="text-base font-bold text-slate-900">INSTITUTIONAL PARTNERSHIP</h3>
              <p className="text-xs text-slate-600">Schedule a strategic campus transformation call with our secretariat.</p>
            </div>

            {!mobileFormRevealed ? (
              <button 
                onClick={() => setMobileFormRevealed(true)}
                className="cs-mobile-start-inquiry-btn"
              >
                START PARTNERSHIP INQUIRY →
              </button>
            ) : submitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="cs-success-msg p-4 text-center">
                <CheckCircle2 className="w-10 h-10 text-[#F57C00] mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-900">Inquiry Received</h4>
                <p className="text-xs text-slate-600 mt-1">Our secretariat will contact you at {formData.email} within 24 hours.</p>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="cs-mobile-form-container">
                {/* 2-Stage Form Header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
                  <span className="text-xs font-bold text-[#F57C00] font-mono">
                    STAGE 0{formStep} / 02
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {formStep === 1 ? 'Institutional Identity' : 'Strategic Program Interest'}
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="cs-mobile-form">
                  {formStep === 1 ? (
                    <div className="flex flex-col gap-3">
                      <div>
                        <label className="cs-form-label">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="cs-form-input"
                          placeholder="e.g. Dr. Rajesh Kumar"
                        />
                      </div>
                      <div>
                        <label className="cs-form-label">Designation *</label>
                        <input
                          type="text"
                          required
                          value={formData.designation}
                          onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                          className="cs-form-input"
                          placeholder="e.g. Vice Chancellor / Principal"
                        />
                      </div>
                      <div>
                        <label className="cs-form-label">Institution Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.institution}
                          onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                          className="cs-form-input"
                          placeholder="e.g. University / Institute"
                        />
                      </div>
                      <div>
                        <label className="cs-form-label">Official Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="cs-form-input"
                          placeholder="admin@institution.edu.in"
                        />
                      </div>
                      <div>
                        <label className="cs-form-label">Phone / Mobile Number *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="cs-form-input"
                          placeholder="+91 9876543210"
                        />
                      </div>

                      <button 
                        type="button"
                        onClick={() => {
                          if (formData.name && formData.institution && formData.email) {
                            setFormStep(2);
                          } else {
                            alert('Please fill in required fields to continue.');
                          }
                        }}
                        className="cs-mobile-start-inquiry-btn mt-2"
                      >
                        CONTINUE TO STAGE 02 →
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <div>
                        <label className="cs-form-label">Institutional Role</label>
                        <select
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="cs-form-select"
                        >
                          <option value="" disabled>[ Select role ]</option>
                          <option value="Vice Chancellor / Director">Vice Chancellor / Director</option>
                          <option value="College Chairman / Trustee">College Chairman / Trustee</option>
                          <option value="Dean / HOD / Professor">Dean / HOD / Professor</option>
                          <option value="Government / Ministry Official">Government / Ministry Official</option>
                          <option value="Corporate CEO / CSR Head">Corporate CEO / CSR Head</option>
                          <option value="Investor / Incubator Lead">Investor / Incubator Lead</option>
                        </select>
                      </div>

                      <div>
                        <label className="cs-form-label">Primary Program Interest</label>
                        <select
                          value={formData.programInterest}
                          onChange={(e) => setFormData({ ...formData, programInterest: e.target.value })}
                          className="cs-form-select"
                        >
                          <option value="" disabled>[ Select program ]</option>
                          <option value="Young FoundersLab">Young FoundersLab</option>
                          <option value="FoundersLab PharmaPreneur Program">FoundersLab PharmaPreneur Program</option>
                          <option value="Industry Readiness Program">Industry Readiness Program</option>
                          <option value="Full Campus 360° Ecosystem Blueprint">Full Campus 360° Ecosystem Blueprint</option>
                          <option value="Research & Patent Monetization">Research & Patent Monetization</option>
                        </select>
                      </div>

                      <div>
                        <label className="cs-form-label">Message / Campus Vision</label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="cs-form-textarea"
                          rows={3}
                          placeholder="Tell us about your campus vision or inquiry..."
                        />
                      </div>

                      <div className="flex gap-2 mt-2">
                        <button 
                          type="button"
                          onClick={() => setFormStep(1)}
                          className="px-4 py-2.5 rounded-sm border border-slate-300 text-slate-700 text-xs font-bold"
                        >
                          ← BACK
                        </button>
                        <button type="submit" className="cs-mobile-start-inquiry-btn flex-1">
                          SUBMIT INQUIRY →
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </motion.div>
            )}
          </div>

          <div className="cs-mobile-rule"></div>

          {/* 06 — Compact Headquarters Signature Seal */}
          <div className="cs-mobile-signature-seal">
            <span className="cs-mobile-seal-title">FOUNDERSLAB SECRETARIAT</span>
            <span className="cs-mobile-seal-loc">HYDERABAD • TELANGANA • INDIA</span>
            <span className="cs-mobile-seal-motto">BUILDING ENTERPRISES • BUILDING THE NATION</span>
          </div>

        </div>

        {/* DESKTOP DEDICATED LAYOUT (UNCHANGED) */}
        <div className="cs-layout hidden md:grid">
          
          {/* Headquarters Info */}
          <div className="cs-hq-col">
            <h3 className="cs-hq-heading">NATIONAL HEADQUARTERS</h3>
            <h4 className="cs-hq-title">FoundersLab Secretariat</h4>
            <p className="cs-hq-tagline">Building Enterprises • Building the Nation</p>
            
            <div className="cs-contact-list">
              <div className="cs-contact-item">
                <span className="cs-contact-label">Location & HQ</span>
                <span className="cs-contact-value">Hyderabad, Telangana, India</span>
              </div>
              
              <div className="cs-contact-item">
                <span className="cs-contact-label">Official Email</span>
                <a href="mailto:admin@founderslab.co.in" className="cs-contact-value">
                  admin@founderslab.co.in
                  <ArrowRight />
                </a>
              </div>
              
              <div className="cs-contact-item">
                <span className="cs-contact-label">Direct Advisory Phone</span>
                <a href="tel:+919010207999" className="cs-contact-value">
                  +91 9010207999
                  <ArrowRight />
                </a>
              </div>
              
              <div className="cs-contact-item">
                <span className="cs-contact-label">Official Web Portal</span>
                <a href="http://www.founderslab.co.in" target="_blank" rel="noopener noreferrer" className="cs-contact-value">
                  www.founderslab.co.in
                  <ArrowRight />
                </a>
              </div>
              
              <div className="cs-contact-item">
                <span className="cs-contact-label">WhatsApp</span>
                <a 
                  href="https://wa.me/919010207999?text=Hello%20FoundersLab%20Team%2C%20I%20would%20like%20to%20inquire%20about%20building%20an%20Innovation%20Ecosystem." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="cs-contact-value"
                >
                  Connect via WhatsApp (+91 9010207999)
                  <ArrowRight />
                </a>
              </div>
            </div>

            <div className="cs-map-module">
              <div className="cs-map-area">
                <iframe
                  title="HQ Map Desktop"
                  src="https://maps.google.com/maps?q=Hyderabad&t=&z=11&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                ></iframe>
                <div className="cs-map-marker"></div>
              </div>
              <div className="cs-map-info">
                <div className="cs-map-details">
                  <span className="cs-map-hq">FoundersLab Secretariat</span>
                  <span className="cs-map-address">Hyderabad • Telangana • 500001</span>
                </div>
                <a href="https://maps.google.com/?q=Hyderabad" target="_blank" rel="noopener noreferrer" className="cs-map-link">
                  View on Google Maps →
                </a>
              </div>
            </div>
          </div>

          {/* Form Info */}
          <div className="cs-form-col">
            <h3 className="cs-form-heading">Institutional Partnership Inquiry</h3>
            <p className="cs-form-desc">Please provide your institutional details to schedule a strategy call.</p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="cs-success-msg"
              >
                <CheckCircle2 className="w-12 h-12 text-[#1a1a1a] mx-auto mb-4" />
                <h4 className="cs-success-title">Inquiry Received Successfully</h4>
                <p className="cs-success-desc">
                  Thank you, <span className="font-semibold">{formData.name}</span>. Our FoundersLab Executive Secretariat will contact you at <span className="font-semibold">{formData.email}</span> within 24 hours to coordinate your strategy briefing.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="cs-form-submit mx-auto mt-8"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="cs-form">
                
                <div className="cs-form-row">
                  <div className="cs-form-group">
                    <label className="cs-form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="cs-form-input"
                    />
                  </div>
                  <div className="cs-form-group">
                    <label className="cs-form-label">Designation *</label>
                    <input
                      type="text"
                      required
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="cs-form-input"
                    />
                  </div>
                </div>

                <div className="cs-form-group">
                  <label className="cs-form-label">Institution / Organization Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="cs-form-input"
                  />
                </div>

                <div className="cs-form-row">
                  <div className="cs-form-group">
                    <label className="cs-form-label">Official Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="cs-form-input"
                    />
                  </div>
                  <div className="cs-form-group">
                    <label className="cs-form-label">Phone / Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="cs-form-input"
                    />
                  </div>
                </div>

                <div className="cs-form-row">
                  <div className="cs-form-group">
                    <label className="cs-form-label">Institutional Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="cs-form-select"
                    >
                      <option value="" disabled>[ Select ]</option>
                      <option value="Vice Chancellor / Director">Vice Chancellor / Director</option>
                      <option value="College Chairman / Trustee">College Chairman / Trustee</option>
                      <option value="Dean / HOD / Professor">Dean / HOD / Professor</option>
                      <option value="Government / Ministry Official">Government / Ministry Official</option>
                      <option value="Corporate CEO / CSR Head">Corporate CEO / CSR Head</option>
                      <option value="Investor / Incubator Lead">Investor / Incubator Lead</option>
                    </select>
                  </div>
                  <div className="cs-form-group">
                    <label className="cs-form-label">Primary Program Interest</label>
                    <select
                      value={formData.programInterest}
                      onChange={(e) => setFormData({ ...formData, programInterest: e.target.value })}
                      className="cs-form-select"
                    >
                      <option value="" disabled>[ Select ]</option>
                      <option value="Young FoundersLab">Young FoundersLab</option>
                      <option value="FoundersLab PharmaPreneur Program">FoundersLab PharmaPreneur Program</option>
                      <option value="Industry Readiness Program">Industry Readiness Program</option>
                      <option value="Full Campus 360° Ecosystem Blueprint">Full Campus 360° Ecosystem Blueprint</option>
                      <option value="Research & Patent Monetization">Research & Patent Monetization</option>
                    </select>
                  </div>
                </div>

                <div className="cs-form-group">
                  <label className="cs-form-label">Message / Campus Vision</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="cs-form-textarea"
                  />
                </div>

                <button type="submit" className="cs-form-submit">
                  Submit Partnership Inquiry
                  <ArrowRight className="w-4 h-4" />
                </button>
                
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
