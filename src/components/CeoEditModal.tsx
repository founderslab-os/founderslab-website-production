import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Upload,
  Link as LinkIcon,
  Check,
  RotateCcw,
  Sparkles,
  User,
  Mail,
  Phone,
  Linkedin,
  MessageCircle,
  Briefcase,
  Target,
  Building,
  GraduationCap,
  Award,
  Lightbulb,
  Users,
  Compass,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Quote,
  AlertTriangle,
  FileText,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { CeoProfile, CeoCareerHighlight, CeoLeadershipPillar } from '../types';
import { DEFAULT_CEO_PROFILE } from '../data/defaultCeoProfile';

interface CeoEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: CeoProfile;
  onSaveProfile: (updatedProfile: CeoProfile) => void;
  onResetToDefaults: () => void;
}

export const CeoEditModal: React.FC<CeoEditModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile,
  onResetToDefaults
}) => {
  // Local working copy of profile during editing
  const [formData, setFormData] = useState<CeoProfile>(currentProfile);
  const [activeTab, setActiveTab] = useState<'profile' | 'hero' | 'bio' | 'timeline' | 'pillars'>('profile');
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [urlInput, setUrlInput] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(JSON.parse(JSON.stringify(currentProfile)));
      setErrorMessage('');
      setShowResetConfirm(false);
      setUrlInput('');
    }
  }, [isOpen, currentProfile]);

  if (!isOpen) return null;

  // Handle generic string updates
  const updateField = (field: keyof CeoProfile, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Image Upload handler
  const handleFileUpload = (file: File) => {
    setErrorMessage('');
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 3.5 * 1024 * 1024) {
      setErrorMessage('Image size should be under 3.5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        updateField('photoUrl', result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    updateField('photoUrl', urlInput.trim());
    setUrlInput('');
  };

  // Metric updates
  const updateMetric = (index: number, field: 'value' | 'label', value: string) => {
    setFormData((prev) => {
      const nextMetrics = [...prev.metrics];
      if (nextMetrics[index]) {
        nextMetrics[index] = {
          ...nextMetrics[index],
          [field]: value
        };
      }
      return { ...prev, metrics: nextMetrics };
    });
  };

  // Milestone updates
  const updateMilestone = (index: number, field: keyof CeoCareerHighlight, value: any) => {
    setFormData((prev) => {
      const nextHighlights = [...prev.careerHighlights];
      if (nextHighlights[index]) {
        nextHighlights[index] = {
          ...nextHighlights[index],
          [field]: value
        };
      }
      return { ...prev, careerHighlights: nextHighlights };
    });
  };

  const addMilestone = () => {
    const newId = `c_${Date.now()}`;
    const newMilestone: CeoCareerHighlight = {
      id: newId,
      period: 'New Tenure / Year',
      role: 'Executive / Leadership Role',
      organization: 'FoundersLab / Partner Org',
      location: 'Hyderabad, India',
      description: 'Describe key achievements, initiatives led, and ecosystem impact.',
      iconType: 'briefcase'
    };
    setFormData((prev) => ({
      ...prev,
      careerHighlights: [newMilestone, ...prev.careerHighlights]
    }));
  };

  const removeMilestone = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      careerHighlights: prev.careerHighlights.filter((_, i) => i !== index)
    }));
  };

  const moveMilestone = (index: number, direction: 'up' | 'down') => {
    setFormData((prev) => {
      const highlights = [...prev.careerHighlights];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= highlights.length) return prev;
      const temp = highlights[index];
      highlights[index] = highlights[targetIndex];
      highlights[targetIndex] = temp;
      return { ...prev, careerHighlights: highlights };
    });
  };

  // Pillar updates
  const updatePillar = (index: number, field: keyof CeoLeadershipPillar, value: any) => {
    setFormData((prev) => {
      const nextPillars = [...prev.pillars];
      if (nextPillars[index]) {
        nextPillars[index] = {
          ...nextPillars[index],
          [field]: value
        };
      }
      return { ...prev, pillars: nextPillars };
    });
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      setErrorMessage('Full name is required.');
      setActiveTab('profile');
      return;
    }
    onSaveProfile(formData);
    onClose();
  };

  const handleResetConfirm = () => {
    onResetToDefaults();
    setFormData(JSON.parse(JSON.stringify(DEFAULT_CEO_PROFILE)));
    setShowResetConfirm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col border border-slate-200 overflow-hidden my-auto"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0B2E6B] to-[#1565C0] flex items-center justify-center text-white shadow-xs">
              <User className="w-5 h-5 text-[#F57C00]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#0B2E6B] font-poppins">Edit "About the CEO" Profile</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-[#F57C00]/10 text-[#F57C00]">
                  Live Preview
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Update leadership biography, portrait, stats, career timeline, and contact information.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-200 bg-white flex gap-2 overflow-x-auto scrollbar-none py-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#0B2E6B] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <User className="w-3.5 h-3.5 text-[#F57C00]" />
            <span>Profile & Photo</span>
          </button>

          <button
            onClick={() => setActiveTab('hero')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'hero'
                ? 'bg-[#0B2E6B] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#1565C0]" />
            <span>Hero & Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('bio')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'bio'
                ? 'bg-[#0B2E6B] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#0B2E6B]" />
            <span>Detailed Bio & Motto</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'timeline'
                ? 'bg-[#0B2E6B] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-[#F57C00]" />
            <span>Career Milestones ({formData.careerHighlights.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pillars')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'pillars'
                ? 'bg-[#0B2E6B] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Quote & Pillars</span>
          </button>
        </div>

        {/* Error message alert */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 max-h-[64vh]">
          {/* TAB 1: Profile & Photo */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Photo Upload & Preview */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  CEO Executive Portrait
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Photo Preview Container */}
                  <div className="relative group shrink-0">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl p-1 bg-gradient-to-tr from-[#0B2E6B] via-[#1565C0] to-[#F57C00] shadow-md">
                      <div className="w-full h-full rounded-[14px] bg-slate-900 overflow-hidden relative flex items-center justify-center">
                        {formData.photoUrl ? (
                          <img
                            src={formData.photoUrl}
                            alt="CEO Preview"
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          <User className="w-12 h-12 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {formData.photoUrl && (
                      <button
                        type="button"
                        onClick={() => updateField('photoUrl', '')}
                        className="absolute -top-2 -right-2 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md transition-transform hover:scale-110 cursor-pointer"
                        title="Remove photo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="flex-1 w-full space-y-3">
                    <div
                      onDrop={handleDrop}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragActive(true);
                      }}
                      onDragLeave={() => setDragActive(false)}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                        dragActive
                          ? 'border-[#0B2E6B] bg-[#0B2E6B]/5 scale-[0.99]'
                          : 'border-slate-300 hover:border-[#1565C0] hover:bg-white bg-slate-50/50'
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileUpload(e.target.files[0]);
                          }
                        }}
                      />
                      <Upload className="w-5 h-5 mx-auto text-[#0B2E6B] mb-1" />
                      <p className="text-xs font-bold text-slate-700">
                        Click to upload portrait photo or drag & drop
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        PNG, JPG, or WEBP up to 3.5MB (saved locally)
                      </p>
                    </div>

                    {/* Or URL Input */}
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="url"
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                          placeholder="Or paste external image URL..."
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20 focus:border-[#0B2E6B]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleApplyUrl}
                        className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                      >
                        Apply URL
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Name & Title */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="e.g. Satya Prasad Peddapelli"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20 focus:border-[#0B2E6B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Primary Designation / Title *
                  </label>
                  <input
                    type="text"
                    value={formData.primaryTitle}
                    onChange={(e) => updateField('primaryTitle', e.target.value)}
                    placeholder="e.g. Chief Executive Officer & Co-Founder"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20 focus:border-[#0B2E6B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    value={formData.organizationName}
                    onChange={(e) => updateField('organizationName', e.target.value)}
                    placeholder="FoundersLab"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20 focus:border-[#0B2E6B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    placeholder="Hyderabad, India"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20 focus:border-[#0B2E6B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Photo Overlay Badge
                  </label>
                  <input
                    type="text"
                    value={formData.badgeText}
                    onChange={(e) => updateField('badgeText', e.target.value)}
                    placeholder="FoundersLab Leadership"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20 focus:border-[#0B2E6B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Availability Status Banner
                  </label>
                  <input
                    type="text"
                    value={formData.availabilityStatus}
                    onChange={(e) => updateField('availabilityStatus', e.target.value)}
                    placeholder="Available for Institutional Keynotes & Advisory"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20 focus:border-[#0B2E6B]"
                  />
                </div>
              </div>

              {/* Direct Social & Contact Channels */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[#F57C00]" />
                  Executive Contact & Social Channels
                </h4>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-600 flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                      LinkedIn Profile URL
                    </label>
                    <input
                      type="url"
                      value={formData.linkedinUrl}
                      onChange={(e) => updateField('linkedinUrl', e.target.value)}
                      placeholder="https://linkedin.com/..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-600 flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      WhatsApp Direct Number
                    </label>
                    <input
                      type="text"
                      value={formData.whatsappNumber}
                      onChange={(e) => updateField('whatsappNumber', e.target.value)}
                      placeholder="+91 9010207999"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-600 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#0B2E6B]" />
                      Email Address (Secretariat)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="admin@founderslab.co.in"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-600 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#F57C00]" />
                      Official Phone / Direct Line
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+91 9010207999"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                    />
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <label className="block text-[11px] font-semibold text-slate-600">
                    WhatsApp Pre-filled Inquire Message
                  </label>
                  <input
                    type="text"
                    value={formData.whatsappMessage}
                    onChange={(e) => updateField('whatsappMessage', e.target.value)}
                    placeholder="Hello Mr. Satya Prasad, I would like to connect..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Hero & Metrics */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Tagline Badge Text
                </label>
                <input
                  type="text"
                  value={formData.taglineBadge}
                  onChange={(e) => updateField('taglineBadge', e.target.value)}
                  placeholder="e.g. Ecosystem Visionary & Capacity Builder"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Main Hero Headline *
                </label>
                <textarea
                  rows={2}
                  value={formData.heroHeadline}
                  onChange={(e) => updateField('heroHeadline', e.target.value)}
                  placeholder="e.g. Transforming Campuses into Engines of High-Impact Venture Creation."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20 font-medium"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Hero Summary Paragraph 1
                  </label>
                  <textarea
                    rows={4}
                    value={formData.heroBioParagraph1}
                    onChange={(e) => updateField('heroBioParagraph1', e.target.value)}
                    placeholder="First introductory paragraph..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Hero Summary Paragraph 2
                  </label>
                  <textarea
                    rows={4}
                    value={formData.heroBioParagraph2}
                    onChange={(e) => updateField('heroBioParagraph2', e.target.value)}
                    placeholder="Second introductory paragraph..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                  />
                </div>
              </div>

              {/* 4 Quantifiable Leadership Metrics */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  4 Key Quantifiable Metrics
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {formData.metrics.map((metric, idx) => (
                    <div key={metric.id || idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Metric #{idx + 1}</span>
                      <input
                        type="text"
                        value={metric.value}
                        onChange={(e) => updateMetric(idx, 'value', e.target.value)}
                        placeholder="e.g. 16+"
                        className="w-full px-2.5 py-1.5 text-base font-extrabold text-[#0B2E6B] rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                      />
                      <input
                        type="text"
                        value={metric.label}
                        onChange={(e) => updateMetric(idx, 'label', e.target.value)}
                        placeholder="e.g. Years Experience"
                        className="w-full px-2 py-1 text-xs text-slate-600 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Detailed Bio & Motto */}
          {activeTab === 'bio' && (
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Bio Section Badge
                  </label>
                  <input
                    type="text"
                    value={formData.bioSectionBadge}
                    onChange={(e) => updateField('bioSectionBadge', e.target.value)}
                    placeholder="Executive Profile & Journey"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Bio Section Heading
                  </label>
                  <input
                    type="text"
                    value={formData.bioSectionHeading}
                    onChange={(e) => updateField('bioSectionHeading', e.target.value)}
                    placeholder="A Decade and a Half Dedicated..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Biography Paragraph 1
                </label>
                <textarea
                  rows={3}
                  value={formData.bioParagraph1}
                  onChange={(e) => updateField('bioParagraph1', e.target.value)}
                  placeholder="First story paragraph..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Biography Paragraph 2
                </label>
                <textarea
                  rows={3}
                  value={formData.bioParagraph2}
                  onChange={(e) => updateField('bioParagraph2', e.target.value)}
                  placeholder="Second story paragraph (ni-msme tenure, etc.)..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Biography Paragraph 3
                </label>
                <textarea
                  rows={3}
                  value={formData.bioParagraph3}
                  onChange={(e) => updateField('bioParagraph3', e.target.value)}
                  placeholder="Third story paragraph (FoundersLab vision)..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                />
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-amber-900">
                    Motto Label
                  </label>
                  <input
                    type="text"
                    value={formData.mottoHeading}
                    onChange={(e) => updateField('mottoHeading', e.target.value)}
                    placeholder="FoundersLab Motto Championed by the CEO"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-amber-900">
                    Motto / Slogan Text
                  </label>
                  <input
                    type="text"
                    value={formData.mottoText}
                    onChange={(e) => updateField('mottoText', e.target.value)}
                    placeholder="BUILD ENTERPRISE • BUILD NATION"
                    className="w-full px-3 py-2 text-xs font-bold font-mono rounded-xl border border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Career Milestones Timeline */}
          {activeTab === 'timeline' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#0B2E6B]">Career Milestones Timeline</h4>
                  <p className="text-xs text-slate-500">
                    Add, edit, reorder, or remove key leadership tenures displayed in the timeline.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addMilestone}
                  className="px-3.5 py-1.5 rounded-xl bg-[#0B2E6B] hover:bg-[#1565C0] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#F57C00]" />
                  <span>Add Milestone</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.careerHighlights.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#0B2E6B] text-white text-xs font-bold flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span className="text-xs font-bold text-[#0B2E6B]">
                          {item.role || 'New Role'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => moveMilestone(index, 'up')}
                          className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 disabled:opacity-30 cursor-pointer"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={index === formData.careerHighlights.length - 1}
                          onClick={() => moveMilestone(index, 'down')}
                          className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 disabled:opacity-30 cursor-pointer"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeMilestone(index)}
                          className="p-1 rounded-lg hover:bg-red-100 text-red-600 cursor-pointer ml-1"
                          title="Delete Milestone"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-semibold text-slate-600">
                          Time Period / Tenure
                        </label>
                        <input
                          type="text"
                          value={item.period}
                          onChange={(e) => updateMilestone(index, 'period', e.target.value)}
                          placeholder="e.g. 2023 – Present"
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-semibold text-slate-600">
                          Role Title
                        </label>
                        <input
                          type="text"
                          value={item.role}
                          onChange={(e) => updateMilestone(index, 'role', e.target.value)}
                          placeholder="Chief Executive Officer"
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-semibold text-slate-600">
                          Organization
                        </label>
                        <input
                          type="text"
                          value={item.organization}
                          onChange={(e) => updateMilestone(index, 'organization', e.target.value)}
                          placeholder="FoundersLab"
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-semibold text-slate-600">
                          Location / Ministry
                        </label>
                        <input
                          type="text"
                          value={item.location}
                          onChange={(e) => updateMilestone(index, 'location', e.target.value)}
                          placeholder="Hyderabad, India"
                          className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold text-slate-600">
                        Description / Impact Highlights
                      </label>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                        placeholder="Description of accomplishments..."
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                      />
                    </div>
                  </div>
                ))}

                {formData.careerHighlights.length === 0 && (
                  <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl">
                    <Briefcase className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs text-slate-500">No career milestones added yet.</p>
                    <button
                      type="button"
                      onClick={addMilestone}
                      className="mt-3 px-3.5 py-1.5 bg-[#0B2E6B] text-white text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Add First Milestone
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: Quote & Pillars */}
          {activeTab === 'pillars' && (
            <div className="space-y-6">
              {/* Executive Quote Section */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0B2E6B]/5 to-[#1565C0]/10 border border-[#0B2E6B]/15 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B2E6B] flex items-center gap-1.5">
                  <Quote className="w-4 h-4 text-[#F57C00]" />
                  Executive Quote & Manifesto
                </h4>

                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-slate-700">
                    Quote Statement *
                  </label>
                  <textarea
                    rows={3}
                    value={formData.quoteText}
                    onChange={(e) => updateField('quoteText', e.target.value)}
                    placeholder="Quote text..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20 italic"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-700">
                      Attributed Name
                    </label>
                    <input
                      type="text"
                      value={formData.quoteAuthor}
                      onChange={(e) => updateField('quoteAuthor', e.target.value)}
                      placeholder="Satya Prasad Peddapelli"
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-700">
                      Attributed Designation
                    </label>
                    <input
                      type="text"
                      value={formData.quoteTitle}
                      onChange={(e) => updateField('quoteTitle', e.target.value)}
                      placeholder="Chief Executive Officer & Co-Founder, FoundersLab"
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                    />
                  </div>
                </div>
              </div>

              {/* 4 Strategic Pillars */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Strategic Pillars Heading
                  </label>
                  <input
                    type="text"
                    value={formData.pillarsHeading}
                    onChange={(e) => updateField('pillarsHeading', e.target.value)}
                    placeholder="The CEO's 4 Strategic Pillars..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {formData.pillars.map((pillar, idx) => (
                    <div key={pillar.id || idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Pillar #{idx + 1}</span>
                      <input
                        type="text"
                        value={pillar.title}
                        onChange={(e) => updatePillar(idx, 'title', e.target.value)}
                        placeholder="Pillar Title"
                        className="w-full px-3 py-1.5 text-xs font-bold text-slate-900 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                      />
                      <textarea
                        rows={3}
                        value={pillar.description}
                        onChange={(e) => updatePillar(idx, 'description', e.target.value)}
                        placeholder="Pillar Description..."
                        className="w-full px-3 py-1.5 text-xs text-slate-600 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2E6B]/20"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 sticky bottom-0 z-20">
          <div>
            {!showResetConfirm ? (
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Defaults</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-xl border border-red-200">
                <span className="text-xs text-red-700 font-semibold">Confirm reset to original profile?</span>
                <button
                  type="button"
                  onClick={handleResetConfirm}
                  className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Yes, Reset
                </button>
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="px-2 py-1 text-slate-600 hover:bg-slate-200 text-xs rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200/70 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#0B2E6B] to-[#1565C0] hover:from-[#1565C0] hover:to-[#0B2E6B] text-white text-xs font-bold shadow-md shadow-[#0B2E6B]/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4 text-[#F57C00]" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
