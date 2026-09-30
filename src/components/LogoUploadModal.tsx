import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Image as ImageIcon, RotateCcw, Check, Sparkles, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { Logo } from './Logo';

interface LogoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  customLogoUrl: string;
  onSaveLogo: (url: string, tagline?: string) => void;
  taglineText: string;
}

export const LogoUploadModal: React.FC<LogoUploadModalProps> = ({
  isOpen,
  onClose,
  customLogoUrl,
  onSaveLogo,
  taglineText
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(customLogoUrl);
  const [tagline, setTagline] = useState<string>(taglineText);
  const [urlInput, setUrlInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (file: File) => {
    setErrorMessage('');
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (PNG, SVG, JPG, WEBP).');
      return;
    }

    // Max 3MB for localStorage base64 storage
    if (file.size > 3 * 1024 * 1024) {
      setErrorMessage('Image size should be under 3MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setSelectedImage(result);
        setSuccessMessage('Logo loaded successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    setSelectedImage(urlInput.trim());
    setSuccessMessage('Logo URL applied!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleReset = () => {
    setSelectedImage('/logo.jpeg');
    setTagline('BUILD ENTERPRISE • BUILD NATION');
    setUrlInput('');
    setErrorMessage('');
    onSaveLogo('/logo.jpeg', 'BUILD ENTERPRISE • BUILD NATION');
    setSuccessMessage('Reset to default logo');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSave = () => {
    onSaveLogo(selectedImage, tagline);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-xl overflow-hidden text-slate-800"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0B2E6B] to-[#1565C0] text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-1 text-[#FFB74D] font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#F57C00]" />
              Brand Customization
            </div>
            <h3 className="text-xl font-black font-poppins text-white">
              Upload Custom Institution Logo
            </h3>
            <p className="text-xs text-slate-200 mt-1 max-w-md">
              Replace the default FoundersLab emblem with your institution's official co-branded logo.
            </p>
          </div>

          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Upload Method Tabs */}
            <div className="flex gap-2 p-1 bg-slate-100 rounded-xl text-xs font-bold">
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'upload'
                    ? 'bg-white text-[#0B2E6B] shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                File Upload (PNG/SVG/JPG)
              </button>
              <button
                onClick={() => setActiveTab('url')}
                className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'url'
                    ? 'bg-white text-[#0B2E6B] shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                Image URL
              </button>
            </div>

            {/* File Upload Zone */}
            {activeTab === 'upload' && (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                  dragActive
                    ? 'border-[#1565C0] bg-[#1565C0]/5 scale-[1.01]'
                    : 'border-slate-200 hover:border-[#1565C0] hover:bg-slate-50/50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/svg+xml, image/webp"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileChange(e.target.files[0]);
                    }
                  }}
                />
                <div className="w-12 h-12 rounded-2xl bg-[#0B2E6B]/5 text-[#0B2E6B] mx-auto flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6 text-[#1565C0]" />
                </div>
                <p className="text-sm font-bold text-slate-800">
                  Click or Drag & Drop logo image here
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Supports SVG, Transparent PNG, JPG, WEBP (Max 3MB)
                </p>
              </div>
            )}

            {/* URL Input */}
            {activeTab === 'url' && (
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 block">
                  Direct Logo Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/my-logo.png"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1565C0]"
                  />
                  <button
                    onClick={handleApplyUrl}
                    className="px-4 py-2.5 bg-[#0B2E6B] text-white rounded-xl text-xs font-bold hover:bg-[#1565C0] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}

            {/* Notification messages */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Tagline Customizer */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Brand Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="BUILD ENTERPRISE • BUILD NATION"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1565C0]"
              />
            </div>

            {/* Live Preview Container */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">
                Live Preview
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Light Mode Preview */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center min-h-[100px] text-center">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2">
                    Light Canvas
                  </span>
                  <Logo
                    customLogoUrl={selectedImage}
                    taglineText={tagline}
                    size="md"
                    variant="light"
                  />
                </div>

                {/* Dark Mode Preview */}
                <div className="p-4 rounded-2xl bg-[#0B2E6B] border border-white/10 flex flex-col items-center justify-center min-h-[100px] text-center">
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Dark Canvas
                  </span>
                  <Logo
                    customLogoUrl={selectedImage}
                    taglineText={tagline}
                    size="md"
                    variant="dark"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="p-5 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Default
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0B2E6B] to-[#1565C0] hover:from-[#1565C0] hover:to-[#0B2E6B] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4 text-[#F57C00]" />
                Save & Apply Logo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
