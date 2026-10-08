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

  LayoutGrid, 
  Columns, 
  Download, 
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/founderslabData';
import { GalleryItem } from '../types';
import { supabase, DbGalleryEvent, DbGalleryImage } from '../lib/supabase';
import './Gallery.mobile.css';


interface GalleryPageProps {
  onBackToHome: () => void;
  onOpenSchedule?: () => void;
  onNavigateToContact?: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onBackToHome,
}) => {
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_ITEMS);

  useEffect(() => {
    async function loadLiveEvents() {
      try {
        const { data: eventsData, error: eventsError } = await supabase
          .from('gallery_events')
          .select('*')
          .eq('is_published', true)
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (eventsData && !eventsError && eventsData.length > 0) {
          const eventIds = eventsData.map(e => e.id);
          const { data: imagesData } = await supabase
            .from('gallery_images')
            .select('*')
            .in('event_id', eventIds)
            .order('sort_order', { ascending: true });

          const mapped: GalleryItem[] = eventsData.map((ev: DbGalleryEvent) => {
            const evImages = (imagesData || []).filter((i: DbGalleryImage) => i.event_id === ev.id);
            const mainImg = evImages.find(i => i.is_main) || evImages[0];

            return {
              id: ev.id,
              title: ev.title,
              category: ev.category || 'Events',
              date: ev.event_date || new Date(ev.created_at).toLocaleDateString(),
              campusOrCity: ev.location || 'India',
              description: ev.description || '',
              imageUrl: mainImg ? mainImg.image_url : '/T-HUB_GRP.jpeg',
              images: evImages.map(i => i.image_url),
              tags: [ev.category || 'Events', ev.location || 'FoundersLab'].filter(Boolean)
            };
          });

          setItems(mapped);
        }
      } catch (err) {
        console.error('Supabase live events fetch error:', err);
      }
    }
    loadLiveEvents();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Lightbox state: active event & which photo inside that event
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  const [copiedLink, setCopiedLink] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [expandedDescIds, setExpandedDescIds] = useState<Set<string>>(new Set());



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


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Gallery Header */}
        <div className="mb-6 flex flex-col gap-4">
          {/* Top Row: Navigation & Title */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              {/* Breadcrumb & Back */}
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={onBackToHome}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white hover:bg-slate-50 text-slate-600 hover:text-[#0B2E6B] text-xs font-semibold border border-slate-200 transition-colors shadow-xs cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#F57C00]" />
                  <span>Back to Home</span>
                </button>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-white px-2.5 py-1 rounded-md border border-slate-100 shadow-xs">
                  <span onClick={onBackToHome} className="hover:text-[#0B2E6B] cursor-pointer transition-colors">Home</span>
                  <span className="text-slate-300">/</span>
                  <span className="text-[#0B2E6B] font-bold">Photo Gallery</span>
                </div>
              </div>
              
              {/* Title & Description */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2E6B] tracking-tight">
                Campus Photo Gallery
              </h1>
              <p className="mt-1.5 text-slate-500 text-xs sm:text-sm max-w-2xl">
                Explore our ecosystem in action—from high-energy hackathons and prototyping sessions to startup pitches and institutional milestones.
              </p>
            </div>

            {/* Right side Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 sm:w-56">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events or tags..."
                  className="w-full pl-8 pr-6 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0B2E6B] shadow-xs"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
              <div className="flex items-center justify-center bg-white rounded-lg p-0.5 border border-slate-200 shadow-xs">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1 rounded-md transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-slate-100 text-[#0B2E6B] shadow-xs' : 'text-slate-400 hover:text-slate-600'}`}
                  title="Grid view"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('masonry')}
                  className={`p-1 rounded-md transition-colors cursor-pointer ${viewMode === 'masonry' ? 'bg-slate-100 text-[#0B2E6B] shadow-xs' : 'text-slate-400 hover:text-slate-600'}`}
                  title="Masonry view"
                >
                  <Columns className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-slate-200 pt-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0B2E6B] text-white shadow-xs border border-transparent'
                    : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 shadow-xs'
                }`}
              >
                {cat}
              </button>
            ))}
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
                      <div className="mt-1.5 flex flex-col items-start">
                        <p className={`text-xs text-slate-500 leading-relaxed transition-all duration-300 ${expandedDescIds.has(item.id) ? '' : 'line-clamp-2'}`}>
                          {item.description}
                        </p>
                        {item.description.length > 90 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedDescIds(prev => {
                                const next = new Set(prev);
                                if (next.has(item.id)) next.delete(item.id);
                                else next.add(item.id);
                                return next;
                              });
                            }}
                            className="text-[#0B2E6B] font-bold text-[11px] mt-1 hover:underline focus:outline-none"
                          >
                            {expandedDescIds.has(item.id) ? 'Read Less' : 'Read More'}
                          </button>
                        )}
                      </div>
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


    </div>
  );
};
