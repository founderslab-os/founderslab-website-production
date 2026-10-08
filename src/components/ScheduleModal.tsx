import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import './ScheduleModal.css';
import './ScheduleModal.mobile.css';

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

  React.useEffect(() => {
    if (isOpen) {
      window.history.pushState({ modal: 'schedule' }, '');

      const handlePopState = () => {
        onClose();
      };

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };

      window.addEventListener('popstate', handlePopState);
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';

      return () => {
        window.removeEventListener('popstate', handlePopState);
        window.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
        if (window.history.state?.modal === 'schedule') {
          window.history.back();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="sm-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          onClick={(e) => e.stopPropagation()}
          className="sm-content"
        >
          <button
            type="button"
            onClick={onClose}
            className="sm-close"
          >
            <X className="w-5 h-5" />
          </button>

          {step === 1 ? (
            <div>
              <div className="sm-header">
                <span className="sm-eyebrow">
                  Executive Advisory Booking
                </span>
                <h3 className="sm-title">
                  Schedule Strategic Session
                </h3>
                <p className="sm-desc">
                  Book a 30-minute 1-on-1 consultation with FoundersLab leadership.
                </p>
              </div>

              <form onSubmit={handleBook} className="sm-form">
                
                {/* Meeting Mode */}
                <div className="sm-form-group">
                  <label className="sm-form-label">Meeting Format</label>
                  <select
                    value={meetingType}
                    onChange={(e) => setMeetingType(e.target.value)}
                    className="sm-form-select"
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
                <div className="sm-form-row">
                  <div className="sm-form-group">
                    <label className="sm-form-label">Preferred Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="sm-form-input"
                    />
                  </div>

                  <div className="sm-form-group">
                    <label className="sm-form-label">Preferred Time Slot (IST)</label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="sm-form-select"
                    >
                      {availableTimes.map((t) => (
                        <option key={t} value={t}>{t} IST</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Name & Designation */}
                <div className="sm-form-row">
                  <div className="sm-form-group">
                    <label className="sm-form-label">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. / Prof. / Mr."
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                      className="sm-form-input"
                    />
                  </div>

                  <div className="sm-form-group">
                    <label className="sm-form-label">Designation *</label>
                    <input
                      type="text"
                      required
                      placeholder="Vice Chancellor / Chairman / Director"
                      value={contactInfo.designation}
                      onChange={(e) => setContactInfo({ ...contactInfo, designation: e.target.value })}
                      className="sm-form-input"
                    />
                  </div>
                </div>

                {/* Institution Name */}
                <div className="sm-form-group">
                  <label className="sm-form-label">University / College Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Institution Name"
                    value={contactInfo.institution}
                    onChange={(e) => setContactInfo({ ...contactInfo, institution: e.target.value })}
                    className="sm-form-input"
                  />
                </div>

                {/* Email & Phone */}
                <div className="sm-form-row">
                  <div className="sm-form-group">
                    <label className="sm-form-label">Official Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="vc@university.edu.in"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      className="sm-form-input"
                    />
                  </div>

                  <div className="sm-form-group">
                    <label className="sm-form-label">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 90000 00000"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      className="sm-form-input"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="sm-submit"
                >
                  Confirm Meeting Booking
                  <ArrowRight className="w-4 h-4" />
                </button>

              </form>
            </div>
          ) : (
            <div className="sm-success">
              <CheckCircle2 className="sm-success-icon" />
              <h3 className="sm-success-title">Meeting Confirmed!</h3>
              <p className="sm-success-desc">
                Thank you, <span className="font-semibold">{contactInfo.name}</span> ({contactInfo.designation}, {contactInfo.institution}).
                Your session is scheduled for <span className="font-semibold">{selectedDate}</span> at <span className="font-semibold">{selectedTime} IST</span>.
              </p>
              <div className="sm-success-box">
                A Google Calendar invite and meeting link have been sent to <strong>{contactInfo.email}</strong>.
              </div>
              <button
                onClick={() => {
                  setStep(1);
                  onClose();
                }}
                className="sm-done-btn"
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
