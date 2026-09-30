import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Globe, Send, MessageSquare, CheckCircle2, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    institution: '',
    email: '',
    phone: '',
    role: 'Vice Chancellor / Director',
    programInterest: 'Young FoundersLab',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(`Hello FoundersLab Team, I would like to inquire about building an Innovation Ecosystem at our institution.`);
    window.open(`https://wa.me/919010207999?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-[#F5F7FA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[#0B2E6B] text-xs font-bold uppercase tracking-wider shadow-sm">
            <Mail className="w-3.5 h-3.5 text-[#1565C0]" />
            Direct Engagement
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2E6B] font-poppins tracking-tight">
            Partner With <span className="gradient-text">FoundersLab</span>
          </h2>
          <p className="text-base text-slate-600">
            Initiate a high-level strategic discussion to transform your institution into a leading innovation campus.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#0B2E6B] via-[#0E3B87] to-[#1565C0] text-white shadow-xl flex-1 flex flex-col justify-between relative overflow-hidden border border-white/20">
              
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-[#F57C00] uppercase tracking-widest font-mono">NATIONAL HEADQUARTERS</span>
                <h3 className="text-2xl font-bold font-poppins">FoundersLab Secretariat</h3>
                <p className="text-xs text-slate-200">Building Enterprises • Building the Nation</p>
              </div>

              <div className="space-y-4 my-4 text-xs sm:text-sm">
                
                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#F57C00] shrink-0">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Location & HQ</p>
                    <p className="text-slate-200 leading-snug">Hyderabad, Telangana, India</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#F57C00] shrink-0">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Official Email</p>
                    <a href="mailto:admin@founderslab.co.in" className="text-slate-200 hover:text-white underline">
                      admin@founderslab.co.in
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#F57C00] shrink-0">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Direct Advisory Phone</p>
                    <a href="tel:+919010207999" className="text-slate-200 hover:text-white underline">
                      +91 9010207999
                    </a>
                  </div>
                </div>

                {/* Web */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#F57C00] shrink-0">
                    <Globe className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Official Web Portal</p>
                    <a href="http://www.founderslab.co.in" target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-white underline">
                      www.founderslab.co.in
                    </a>
                  </div>
                </div>

              </div>

              {/* WhatsApp Quick Trigger Button */}
              <div className="pt-3.5 border-t border-white/10">
                <button
                  onClick={openWhatsApp}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  Connect via WhatsApp (+91 9010207999)
                </button>
              </div>

            </div>

            {/* Simulated Hyderabad HQ Map Preview */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2.5">
              <div className="flex justify-between items-center text-xs text-slate-600 font-medium">
                <span className="font-bold text-[#0B2E6B]">Hyderabad Innovation Hub Map</span>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">HQ Active</span>
              </div>
              <div className="h-32 rounded-2xl bg-slate-200 relative overflow-hidden flex items-center justify-center text-slate-500 text-xs font-semibold">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center p-3 text-center">
                  <MapPin className="w-6 h-6 text-[#0B2E6B] animate-bounce mb-1" />
                  <p className="font-bold text-slate-800 text-xs">FoundersLab Secretariat</p>
                  <p className="text-[10px] text-slate-500">Hyderabad • Telangana • 500001</p>
                  <a
                    href="https://maps.google.com/?q=Hyderabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-[10px] font-bold text-[#1565C0] underline"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
              
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-[#0B2E6B] font-poppins">Institutional Partnership Inquiry</h3>
                <p className="text-xs text-slate-500">Please provide your institutional details to schedule a strategy call.</p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-4 text-center"
                >
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-xl font-bold font-poppins">Inquiry Received Successfully</h4>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold">{formData.name}</span>. Our FoundersLab Executive Secretariat will contact you at <span className="font-bold">{formData.email}</span> within 24 hours to coordinate your strategy briefing.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. / Prof. / Mr. Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#F5F7FA] border border-slate-200 focus:border-[#1565C0] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Designation *</label>
                      <input
                        type="text"
                        required
                        placeholder="Vice Chancellor / Director / Chairman"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#F5F7FA] border border-slate-200 focus:border-[#1565C0] outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Institution / Organization Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="University or College Name"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#F5F7FA] border border-slate-200 focus:border-[#1565C0] outline-none"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Official Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="name@university.edu.in"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#F5F7FA] border border-slate-200 focus:border-[#1565C0] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Phone / Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 90000 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#F5F7FA] border border-slate-200 focus:border-[#1565C0] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Institutional Role</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#F5F7FA] border border-slate-200 focus:border-[#1565C0] outline-none font-medium"
                      >
                        <option value="Vice Chancellor / Director">Vice Chancellor / Director</option>
                        <option value="Chairman / Trustee Board">College Chairman / Trustee</option>
                        <option value="Dean / Professor / Head of Dept">Dean / HOD / Professor</option>
                        <option value="Government / Ministry Official">Government / Ministry Official</option>
                        <option value="Corporate CEO / CSR Leader">Corporate CEO / CSR Head</option>
                        <option value="Investor / Incubator">Investor / Incubator Lead</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Primary Program Interest</label>
                      <select
                        value={formData.programInterest}
                        onChange={(e) => setFormData({ ...formData, programInterest: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#F5F7FA] border border-slate-200 focus:border-[#1565C0] outline-none font-medium"
                      >
                        <option value="Young FoundersLab">Young FoundersLab</option>
                        <option value="FoundersLab PharmaPreneur Program">FoundersLab PharmaPreneur Program</option>
                        <option value="Industry Readiness Program">Industry Readiness Program</option>
                        <option value="Full Campus Ecosystem Setup">Full Campus 360° Ecosystem Blueprint</option>
                        <option value="Research Commercialization">Research & Patent Monetization</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Message / Campus Vision</label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe your campus goals, student strength, or specific innovation targets..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#F5F7FA] border border-slate-200 focus:border-[#1565C0] outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#0B2E6B] to-[#1565C0] hover:from-[#1565C0] hover:to-[#0B2E6B] transition-all shadow-lg shadow-[#0B2E6B]/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#F57C00]" />
                    Submit Partnership Inquiry
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
