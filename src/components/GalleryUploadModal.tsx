import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Check, 
  AlertCircle, 
  Calendar, 
  MapPin, 
  Tag, 
  Plus, 
  Star, 
  Trash2,
  Layers
} from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: GalleryItem) => void;
}

const CATEGORY_OPTIONS = [
  'Hackathons',
  'Campus & Labs',
  'Prototypes',
  'Events',
  'Workshops',
  'Custom'
];

// Helper to compress images client-side for fast local storage
const compressImage = (file: File, maxWidth = 1200, quality = 0.82): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => resolve(event.target?.result as string);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const GalleryUploadModal: React.FC<GalleryUploadModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [imageSourceTab, setImageSourceTab] = useState<'upload' | 'url'>('upload');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingProgress, setProcessingProgress] = useState<string>('');
  const [dragActive, setDragActive] = useState<boolean>(false);

  // Form Fields
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Events');
  const [customCategory, setCustomCategory] = useState<string>('');
  const [date, setDate] = useState<string>(() => {
    const now = new Date();
    return now.toLocaleString('default', { month: 'long', year: 'numeric' });
  });
  const [campusOrCity, setCampusOrCity] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tagsInput, setTagsInput] = useState<string>('');

  // Error handling
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFilesProcess = async (files: FileList | File[]) => {
    setErrorMessage('');
    const validFiles: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        validFiles.push(file);
      }
    }

    if (validFiles.length === 0) {
      setErrorMessage('Please select valid image files (JPEG, PNG, WEBP, GIF).');
      return;
    }

    try {
      setIsProcessing(true);
      const newCompressedImages: string[] = [];

      for (let i = 0; i < validFiles.length; i++) {
        setProcessingProgress(`Optimizing photo ${i + 1} of ${validFiles.length}...`);
        const compressed = await compressImage(validFiles[i]);
        newCompressedImages.push(compressed);
      }

      setUploadedImages((prev) => [...prev, ...newCompressedImages]);
      setIsProcessing(false);
      setProcessingProgress('');
    } catch {
      setIsProcessing(false);
      setProcessingProgress('');
      setErrorMessage('Failed to process one or more images. Please try again.');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesProcess(e.dataTransfer.files);
    }
  };

  const handleAddUrl = () => {
    if (!urlInput.trim()) {
      setErrorMessage('Please enter an image URL.');
      return;
    }
    setUploadedImages((prev) => [...prev, urlInput.trim()]);
    setUrlInput('');
    setErrorMessage('');
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setUploadedImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSetCover = (indexToCover: number) => {
    if (indexToCover === 0) return;
    setUploadedImages((prev) => {
      const item = prev[indexToCover];
      const remaining = prev.filter((_, idx) => idx !== indexToCover);
      return [item, ...remaining];
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (uploadedImages.length === 0) {
      setErrorMessage('Please upload at least one photo for this event.');
      return;
    }

    if (!title.trim()) {
      setErrorMessage('Please enter an event title or caption.');
      return;
    }

    const finalCategory = category === 'Custom' ? (customCategory.trim() || 'Photos') : category;
    
    // Parse tags
    const parsedTags = tagsInput
      ? tagsInput
          .split(',')
          .map((t) => t.trim().replace(/^#/, ''))
          .filter((t) => t.length > 0)
      : undefined;

    const newItem: GalleryItem = {
      id: `event_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title: title.trim(),
      category: finalCategory,
      date: date.trim() || undefined,
      campusOrCity: campusOrCity.trim() || undefined,
      description: description.trim() || undefined,
      imageUrl: uploadedImages[0],
      images: uploadedImages,
      tags: parsedTags,
    };

    onSave(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-6 border border-slate-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0B2E6B] flex items-center justify-center text-white shadow-xs">
              <Layers className="w-4 h-4 text-[#F57C00]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0B2E6B]">
                Upload Event Photos
              </h2>
              <p className="text-xs text-slate-500">
                Upload one or multiple photos for the same campus event or showcase
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[82vh] overflow-y-auto space-y-4">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-700 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section: Upload Photos */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700">
                Event Photos <span className="text-rose-500">*</span>
                {uploadedImages.length > 0 && (
                  <span className="ml-2 font-normal text-slate-500">
                    ({uploadedImages.length} {uploadedImages.length === 1 ? 'photo' : 'photos'} added)
                  </span>
                )}
              </label>

              {/* Source Tabs */}
              <div className="flex rounded-xl bg-slate-100 p-0.5">
                <button
                  type="button"
                  onClick={() => setImageSourceTab('upload')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    imageSourceTab === 'upload'
                      ? 'bg-white text-[#0B2E6B] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Upload Files
                </button>
                <button
                  type="button"
                  onClick={() => setImageSourceTab('url')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    imageSourceTab === 'url'
                      ? 'bg-white text-[#0B2E6B] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Paste URL
                </button>
              </div>
            </div>

            {imageSourceTab === 'upload' ? (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => e.target.files && handleFilesProcess(e.target.files)}
                  className="hidden"
                />
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                    dragActive
                      ? 'border-[#1565C0] bg-blue-50/60 scale-[1.01]'
                      : 'border-slate-300 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50'
                  }`}
                >
                  <div className="mx-auto w-10 h-10 rounded-xl bg-[#0B2E6B]/10 flex items-center justify-center text-[#1565C0] mb-2">
                    <ImageIcon className="w-5 h-5 text-[#F57C00]" />
                  </div>
                  <p className="text-xs font-bold text-slate-700">
                    {isProcessing ? processingProgress : 'Click to select multiple photos or drag & drop them here'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Select several pictures at once (JPG, PNG, WEBP, GIF)
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0B2E6B]"
                />
                <button
                  type="button"
                  onClick={handleAddUrl}
                  className="px-4 py-2 rounded-xl bg-[#0B2E6B] text-white text-xs font-bold hover:bg-[#1565C0] transition-colors cursor-pointer"
                >
                  Add Photo
                </button>
              </div>
            )}

            {/* Photos Preview Grid (when 1 or more photos uploaded) */}
            {uploadedImages.length > 0 && (
              <div className="mt-3.5 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold mb-2.5 px-0.5">
                  <span>Photo Album Preview (First photo is cover)</span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[#1565C0] hover:underline flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add more photos</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                  {uploadedImages.map((imgUrl, index) => {
                    const isCover = index === 0;
                    return (
                      <div
                        key={index}
                        className={`relative aspect-square rounded-xl overflow-hidden border group bg-slate-900 ${
                          isCover ? 'border-[#0B2E6B] ring-2 ring-[#0B2E6B]/30' : 'border-slate-200'
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`Uploaded preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />

                        {/* Cover Badge */}
                        {isCover && (
                          <div className="absolute top-1 left-1 bg-[#0B2E6B] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-md shadow-xs flex items-center gap-0.5">
                            <Star className="w-2.5 h-2.5 text-[#F57C00] fill-[#F57C00]" />
                            Cover
                          </div>
                        )}

                        {/* Hover Overlay Actions */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 p-1">
                          {!isCover && (
                            <button
                              type="button"
                              onClick={() => handleSetCover(index)}
                              className="p-1 rounded-md bg-white/90 hover:bg-white text-slate-800 text-[9px] font-bold shadow-xs cursor-pointer"
                              title="Set as Cover Photo"
                            >
                              <Star className="w-3 h-3 text-[#F57C00]" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="p-1 rounded-md bg-rose-600 hover:bg-rose-700 text-white shadow-xs cursor-pointer"
                            title="Remove photo"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Section: Event Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Event Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. National Hackathon 2026"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0B2E6B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Category / Album <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0B2E6B]"
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {category === 'Custom' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Custom Category Name
              </label>
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="e.g. Innovation Expo, Lab Launch"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0B2E6B]"
              />
            </div>
          )}

          {/* Section: Date & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Date (Optional)</span>
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. September 2026"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0B2E6B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Location / Venue (Optional)</span>
              </label>
              <input
                type="text"
                value={campusOrCity}
                onChange={(e) => setCampusOrCity(e.target.value)}
                placeholder="e.g. Main Auditorium or Campus Hub"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0B2E6B]"
              />
            </div>
          </div>

          {/* Section: Short Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Event Description / Notes (Optional)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary about this event or moments captured in these photos..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0B2E6B] resize-none"
            />
          </div>

          {/* Section: Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              <span>Tags (Optional, comma-separated)</span>
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. Hackathon, Coding, Robotics"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0B2E6B]"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {uploadedImages.length > 0 && `${uploadedImages.length} photo${uploadedImages.length > 1 ? 's' : ''} ready to publish`}
            </span>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing || uploadedImages.length === 0}
                className="px-6 py-2.5 rounded-xl bg-[#0B2E6B] hover:bg-[#1565C0] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                <span>Publish Event Album</span>
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
