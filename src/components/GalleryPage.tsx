import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Search, 
  Calendar, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Share2, 
  Check, 
  Camera, 
  Trash2, 
  RotateCcw, 
  AlertTriangle, 
  Plus, 
  LayoutGrid, 
  Columns, 
  Download, 
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/founderslabData';
import { GalleryItem } from '../types';
import { GalleryUploadModal } from './GalleryUploadModal';

interface GalleryPageProps {
  onBackToHome: () => void;
  onOpenSchedule?: () => void;
  onNavigateToContact?: () => void;
}

const STORAGE_KEY = 'founderslab_multi_gallery_items_v3';

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onBackToHome,
}) => {
  // Gallery items state backed by localStorage
  const [items, setItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading gallery items from localStorage', e);
    }
    return GALLERY_ITEMS;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Lightbox state: active event & which photo inside that event
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  const [copiedLink, setCopiedLink] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');

  // Modals & Action States
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null);
  const [photoToDeleteFromEvent, setPhotoToDeleteFromEvent] = useState<{ item: GalleryItem; photoIndex: number } | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Persist items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving gallery items to localStorage', e);
    }
  }, [items]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Add new item (with multiple photos)
  const handleAddItem = (newItem: GalleryItem) => {
    setItems((prev) => [newItem, ...prev]);
    const count = newItem.images?.length || 1;
    showToast(`"${newItem.title}" with ${count} photo${count > 1 ? 's' : ''} added!`);
  };

  // Delete entire item
  const handleConfirmDelete = () => {
    if (!itemToDelete) return;
    const targetTitle = itemToDelete.title;
    setItems((prev) => prev.filter((it) => it.id !== itemToDelete.id));
    if (activeItem?.id === itemToDelete.id) {
      setActiveItem(null);
    }
    setItemToDelete(null);
    showToast(`Removed "${targetTitle}"`);
  };

  // Delete single photo from inside an event album
  const handleConfirmDeletePhotoFromEvent = () => {
    if (!photoToDeleteFromEvent) return;
    const { item, photoIndex } = photoToDeleteFromEvent;
    const currentImages = item.images && item.images.length > 0 ? item.images : [item.imageUrl];

    if (currentImages.length <= 1) {
      // If it only has 1 photo, delete the entire item
      setItems((prev) => prev.filter((it) => it.id !== item.id));
      setActiveItem(null);
    } else {
      const updatedImages = currentImages.filter((_, idx) => idx !== photoIndex);
      const updatedItem: GalleryItem = {
        ...item,
        imageUrl: updatedImages[0],
        images: updatedImages,
      };

      setItems((prev) => prev.map((it) => (it.id === item.id ? updatedItem : it)));
      setActiveItem(updatedItem);
      setActivePhotoIndex((prev) => Math.min(prev, updatedImages.length - 1));
    }

    setPhotoToDeleteFromEvent(null);
    showToast('Photo removed from event album');
  };

  // Clear all items
  const handleConfirmClearAll = () => {
    setItems([]);
    setShowClearConfirm(false);
    setActiveItem(null);
    showToast('Gallery cleared. Ready for your custom photos.');
  };

  // Reset to original default showcase
  const handleResetDefaults = () => {
    setItems(GALLERY_ITEMS);
    setShowClearConfirm(false);
    showToast('Default photos restored.');
  };

  // Dynamic available categories
  const categories = useMemo(() => {
    const list = ['All'];
    const itemCats = Array.from(new Set(items.map((it) => it.category).filter(Boolean)));
    return [...list, ...itemCats];
  }, [items]);

  // Filtered gallery items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.campusOrCity && item.campusOrCity.toLowerCase().includes(q)) ||
        (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  // Current active event images array
  const activeEventPhotos = useMemo(() => {
    if (!activeItem) return [];
    if (activeItem.images && activeItem.images.length > 0) {
      return activeItem.images;
    }
    return [activeItem.imageUrl];
  }, [activeItem]);

  const currentDisplayPhoto = activeEventPhotos[activePhotoIndex] || activeItem?.imageUrl;

  // Handle lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeItem) return;
      if (e.key === 'Escape') {
        setActiveItem(null);
      } else if (e.key === 'ArrowRight') {
        handleNextPhoto();
      } else if (e.key === 'ArrowLeft') {
        handlePrevPhoto();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem, activePhotoIndex, activeEventPhotos, filteredItems]);

  const handleNextPhoto = () => {
    if (!activeItem) return;
    if (activePhotoIndex < activeEventPhotos.length - 1) {
      setActivePhotoIndex((prev) => prev + 1);
    } else {
      // Advance to next event in filteredItems
      const currentEventIndex = filteredItems.findIndex((it) => it.id === activeItem.id);
      if (currentEventIndex !== -1) {
        const nextEventIndex = (currentEventIndex + 1) % filteredItems.length;
        setActiveItem(filteredItems[nextEventIndex]);
        setActivePhotoIndex(0);
      }
    }
  };

  const handlePrevPhoto = () => {
    if (!activeItem) return;
    if (activePhotoIndex > 0) {
      setActivePhotoIndex((prev) => prev - 1);
    } else {
      // Go to previous event in filteredItems
      const currentEventIndex = filteredItems.findIndex((it) => it.id === activeItem.id);
      if (currentEventIndex !== -1) {
        const prevEventIndex = (currentEventIndex - 1 + filteredItems.length) % filteredItems.length;
        const prevItem = filteredItems[prevEventIndex];
        const prevPhotos = prevItem.images && prevItem.images.length > 0 ? prevItem.images : [prevItem.imageUrl];
        setActiveItem(prevItem);
        setActivePhotoIndex(prevPhotos.length - 1);
      }
    }
  };

  const handleShare = (item: GalleryItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/#gallery`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const activeEventIndex = activeItem 
    ? filteredItems.findIndex((it) => it.id === activeItem.id) + 1 
    : 0;

  // Calculate total photos across all items
  const totalPhotosCount = useMemo(() => {
    return items.reduce((acc, curr) => acc + (curr.images?.length || 1), 0);
  }, [items]);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#F8FAFC]">
      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#0B2E6B] text-white px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold border border-white/20"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-[#0B2E6B] font-semibold text-xs border border-slate-200 shadow-xs transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#F57C00] group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span 
              onClick={onBackToHome} 
              className="hover:text-[#0B2E6B] cursor-pointer hover:underline"
            >
              Home
            </span>
            <span>/</span>
            <span className="text-[#0B2E6B] font-bold">Photo Gallery</span>
          </div>
        </div>

        {/* Clean Gallery Header */}
        <div className="mt-8 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2E6B] tracking-tight">
              Photo Gallery
            </h1>
            <p className="mt-1 text-slate-500 text-xs sm:text-sm">
              Event photo albums, prototyping sessions, student showcases, and hackathons.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B2E6B] hover:bg-[#1565C0] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#F57C00]" />
              <span>Upload Photos</span>
            </button>

            {items.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-xs font-semibold transition-colors cursor-pointer"
                title="Clear all photos from gallery"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}

            <button
              onClick={handleResetDefaults}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              title="Reset to default photos"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0B2E6B] text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Right Controls: Search & Layout Toggle */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events or photos..."
                className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0B2E6B]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Layout Toggle */}
            <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-[#0B2E6B] shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'masonry' ? 'bg-white text-[#0B2E6B] shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Collage view"
              >
                <Columns className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Counter Info */}
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 px-1">
          <div>
            Showing <strong className="text-slate-800">{filteredItems.length}</strong> events ({totalPhotosCount} total photos)
            {selectedCategory !== 'All' && <span> in <strong className="text-[#0B2E6B]">{selectedCategory}</strong></span>}
          </div>
          {(selectedCategory !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-[#1565C0] hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Gallery Grid / Masonry */}
        {filteredItems.length > 0 ? (
          <div
            className={`mt-6 ${
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
                : 'columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5'
            }`}
          >
            {filteredItems.map((item) => {
              const photoCount = item.images?.length || 1;
              const isMultiPhoto = photoCount > 1;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => {
                    setActiveItem(item);
                    setActivePhotoIndex(0);
                  }}
                  className={`group bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer relative flex flex-col ${
                    viewMode === 'masonry' ? 'break-inside-avoid' : ''
                  }`}
                >
                  {/* Photo Container */}
                  <div className={`relative overflow-hidden bg-slate-100 ${viewMode === 'grid' ? 'aspect-[4/3]' : ''}`}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Category Pill */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold tracking-wide">
                        {item.category}
                      </span>
                    </div>

                    {/* Multiple Photos Badge */}
                    {isMultiPhoto && (
                      <div className="absolute bottom-2.5 right-2.5">
                        <span className="px-2 py-1 rounded-lg bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold flex items-center gap-1.5 shadow-xs">
                          <Layers className="w-3 h-3 text-[#F57C00]" />
                          <span>{photoCount} photos</span>
                        </span>
                      </div>
                    )}

                    {/* Delete Button on Card */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setItemToDelete(item);
                        }}
                        className="p-1.5 rounded-lg bg-white/90 hover:bg-rose-600 text-slate-600 hover:text-white shadow-xs transition-all cursor-pointer backdrop-blur-xs"
                        title="Delete event album"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Caption Bar */}
                  <div className="p-3.5 flex flex-col justify-between">
                    <h3 className="text-sm font-bold text-slate-800 group-hover:text-[#0B2E6B] transition-colors line-clamp-1">
                      {item.title}
                    </h3>

                    {(item.date || item.campusOrCity) && (
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                        {item.date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#F57C00]" />
                            {item.date}
                          </span>
                        )}
                        {item.date && item.campusOrCity && <span>•</span>}
                        {item.campusOrCity && (
                          <span className="flex items-center gap-1 truncate">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {item.campusOrCity}
                          </span>
                        )}
                      </div>
                    )}

                    {item.description && (
                      <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="mt-12 text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
            <Camera className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">
              {items.length === 0 ? 'No photos in the gallery' : 'No photos found'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {items.length === 0
                ? 'Upload multiple photos from your device to start building your campus event gallery.'
                : `No results matching "${searchQuery}". Try selecting another category.`}
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#0B2E6B] text-white text-xs font-bold hover:bg-[#1565C0] transition-colors cursor-pointer"
              >
                Upload Photos
              </button>
              {items.length === 0 && (
                <button
                  onClick={handleResetDefaults}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Load Sample Photos
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Fullscreen Photo & Album Viewer */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="relative w-full max-w-5xl bg-slate-950 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[94vh] border border-slate-800"
            >
              {/* Top Controls Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-black/50 border-b border-slate-800 text-slate-300">
                <div className="flex items-center gap-2 text-xs truncate mr-2">
                  <span className="font-semibold text-white truncate">{activeItem.title}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-[#F57C00] font-bold whitespace-nowrap">
                    Photo {activePhotoIndex + 1} of {activeEventPhotos.length}
                  </span>
                  <span className="text-slate-500 hidden sm:inline">•</span>
                  <span className="text-slate-400 text-[11px] hidden sm:inline whitespace-nowrap">
                    Event {activeEventIndex} of {filteredItems.length}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleShare(activeItem)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Share event link"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>

                  <a
                    href={currentDisplayPhoto}
                    download={`${activeItem.title}-photo-${activePhotoIndex + 1}.jpg`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Open full size / Download current photo"
                  >
                    <Download className="w-4 h-4" />
                  </a>

                  {/* Delete button (deletes current photo or whole event) */}
                  <button
                    onClick={() => {
                      if (activeEventPhotos.length > 1) {
                        setPhotoToDeleteFromEvent({ item: activeItem, photoIndex: activePhotoIndex });
                      } else {
                        setItemToDelete(activeItem);
                      }
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    title={activeEventPhotos.length > 1 ? "Remove this photo from event" : "Delete event"}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveItem(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
                    title="Close (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Photo Area */}
              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px]">
                <img
                  key={currentDisplayPhoto}
                  src={currentDisplayPhoto}
                  alt={`${activeItem.title} - photo ${activePhotoIndex + 1}`}
                  className="max-h-[60vh] w-auto max-w-full object-contain transition-opacity duration-200"
                />

                {/* Arrow Controls */}
                {(activeEventPhotos.length > 1 || filteredItems.length > 1) && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevPhoto();
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all cursor-pointer backdrop-blur-xs shadow-md"
                      title="Previous photo (Left Arrow)"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextPhoto();
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all cursor-pointer backdrop-blur-xs shadow-md"
                      title="Next photo (Right Arrow)"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Multi-Photo Thumbnail Strip */}
              {activeEventPhotos.length > 1 && (
                <div className="bg-slate-950 px-4 py-2.5 border-t border-slate-900 flex items-center gap-2 overflow-x-auto scrollbar-none">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                    <Layers className="w-3 h-3 text-[#F57C00]" />
                    <span>Album:</span>
                  </div>
                  {activeEventPhotos.map((photoUrl, idx) => {
                    const isCurrent = idx === activePhotoIndex;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActivePhotoIndex(idx)}
                        className={`relative w-12 h-10 sm:w-14 sm:h-11 rounded-lg overflow-hidden shrink-0 border transition-all cursor-pointer ${
                          isCurrent
                            ? 'border-[#F57C00] ring-2 ring-[#F57C00]/50 scale-105'
                            : 'border-slate-800 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={photoUrl}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Bottom Caption Bar */}
              {(activeItem.description || activeItem.date || activeItem.campusOrCity) && (
                <div className="px-5 py-3 bg-slate-900 border-t border-slate-800 text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    {activeItem.description && (
                      <p className="text-slate-200">{activeItem.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 text-[11px] shrink-0">
                    {activeItem.campusOrCity && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#F57C00]" />
                        {activeItem.campusOrCity}
                      </span>
                    )}
                    {activeItem.date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {activeItem.date}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Upload Modal (Multiple Photos) */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <GalleryUploadModal
            isOpen={isUploadModalOpen}
            onClose={() => setIsUploadModalOpen(false)}
            onSave={handleAddItem}
          />
        )}
      </AnimatePresence>

      {/* Single Photo from Event Delete Modal */}
      <AnimatePresence>
        {photoToDeleteFromEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPhotoToDeleteFromEvent(null)}
              className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl z-10 border border-slate-200 text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Remove this photo?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Remove photo {photoToDeleteFromEvent.photoIndex + 1} from <strong className="text-slate-800">"{photoToDeleteFromEvent.item.title}"</strong>? Other photos in this event will remain.
              </p>
              <div className="mt-5 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setPhotoToDeleteFromEvent(null)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDeletePhotoFromEvent}
                  className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Remove Photo
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Entire Event Modal */}
      <AnimatePresence>
        {itemToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setItemToDelete(null)}
              className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl z-10 border border-slate-200 text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Delete Event Album?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Remove <strong className="text-slate-800">"{itemToDelete.title}"</strong> and all its photos from the gallery?
              </p>
              <div className="mt-5 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setItemToDelete(null)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Delete Event
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Clear All Confirmation Modal */}
      <AnimatePresence>
        {showClearConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowClearConfirm(false)}
              className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl z-10 border border-slate-200 text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#F57C00] flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Clear Gallery?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                This will remove all <strong className="text-slate-800">{items.length} events</strong>. You can upload your own custom event photos or restore defaults at any time.
              </p>
              <div className="mt-5 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Keep Photos
                </button>
                <button
                  type="button"
                  onClick={handleConfirmClearAll}
                  className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
