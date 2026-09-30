import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, X, CheckCircle2, User, Building, Phone, Mail } from 'lucide-react';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-03');
  const [selectedTime, setSelectedTime] = useState<string>('11:00 AM');
  const [meetingType, setMeetingType] = useState<string>('Virtual Executive Strategy Session (Google Meet)');

  const [contactInfo, setContactInfo] = useState({
    name: '',
    designation: '',
    institution: '',
    phone: '',
    email: '',
  });

  const availableTimes = ['10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '05:30 PM'];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-slate-800"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {step === 1 ? (
            <div className="space-y-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F57C00] uppercase font-mono">
                  <Calendar className="w-3.5 h-3.5" /> Executive Advisory Booking
                </div>
                <h3 className="text-2xl font-extrabold text-[#0B2E6B] font-poppins">
                  Schedule Strategic Session
                </h3>
                <p className="text-xs text-slate-500">
                  Book a 30-minute 1-on-1 consultation with FoundersLab leadership.
                </p>
              </div>

              <form onSubmit={handleBook} className="space-y-4 text-xs sm:text-sm">
                
                {/* Meeting Mode */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Meeting Format</label>
                  <select
                    value={meetingType}
                    onChange={(e) => setMeetingType(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#F5F7FA] border border-slate-200 font-medium outline-none focus:border-[#1565C0]"
                  >
                    <option value="Virtual Executive Strategy Session (Google Meet)">
                      Virtual Executive Strategy Session (Google Meet)
                    </option>
                    <option value="In-Person Strategy Briefing at Hyderabad HQ">
                      In-Person Strategy Briefing at FoundersLab Hyderabad HQ
                    </option>
                    <option value="On-Campus Leadership Visit Request">
                      On-Campus Leadership Visit Request (College Campus)
                    </option>
                  </select>
                </div>

                {/* Date & Time */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Preferred Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-3 rounded-xl bg-[#F5F7FA] border border-slate-200 font-medium outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Preferred Time Slot (IST)</label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full p-3 rounded-xl bg-[#F5F7FA] border border-slate-200 font-medium outline-none"
                    >
                      {availableTimes.map((t) => (
                        <option key={t} value={t}>{t} IST</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Name & Designation */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. / Prof. / Mr."
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#F5F7FA] border border-slate-200 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Designation *</label>
                    <input
                      type="text"
                      required
                      placeholder="Vice Chancellor / Chairman / Director"
                      value={contactInfo.designation}
                      onChange={(e) => setContactInfo({ ...contactInfo, designation: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#F5F7FA] border border-slate-200 outline-none"
                    />
                  </div>
                </div>

                {/* Institution Name */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">University / College Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Institution Name"
                    value={contactInfo.institution}
                    onChange={(e) => setContactInfo({ ...contactInfo, institution: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#F5F7FA] border border-slate-200 outline-none"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Official Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="vc@university.edu.in"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#F5F7FA] border border-slate-200 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 90000 00000"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#F5F7FA] border border-slate-200 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#0B2E6B] to-[#1565C0] hover:scale-[1.01] transition-all shadow-md cursor-pointer"
                >
                  Confirm Meeting Booking
                </button>

              </form>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
              <h3 className="text-2xl font-bold font-poppins text-[#0B2E6B]">Meeting Confirmed!</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-bold">{contactInfo.name}</span> ({contactInfo.designation}, {contactInfo.institution}).
                Your session is scheduled for <span className="font-bold text-[#1565C0]">{selectedDate}</span> at <span className="font-bold text-[#1565C0]">{selectedTime} IST</span>.
              </p>
              <div className="p-4 rounded-2xl bg-[#F5F7FA] border border-slate-200 text-xs text-slate-700 font-medium">
                A Google Calendar invite and meeting link have been sent to <span className="font-bold">{contactInfo.email}</span>.
              </div>
              <button
                onClick={() => {
                  setStep(1);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-[#0B2E6B] cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
