import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
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
            <span className="cs-eyebrow">Direct Engagement</span>
            <h2 className="cs-title">Partner With FoundersLab</h2>
            <p className="cs-desc">Initiate a high-level strategic discussion to transform your institution into a leading innovation campus.</p>
          </div>
          <div className="cs-intro-right">
            <div className="cs-status-block">
              <span className="cs-status-title">NATIONAL HEADQUARTERS</span>
              <div className="cs-status-divider"></div>
              <span className="cs-status-value">FOUNDERSLAB SECRETARIAT<br/>HYDERABAD<br/>TELANGANA, INDIA</span>
              <div className="cs-status-indicator">HQ ACTIVE <span className="cs-status-dot"></span></div>
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="cs-layout">
          
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
                  title="HQ Map"
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
