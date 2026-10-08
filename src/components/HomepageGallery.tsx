import React, { useState, useEffect } from 'react';
import { GALLERY_ITEMS } from '../data/founderslabData';
import { GalleryItem } from '../types';
import { supabase, DbGalleryItem } from '../lib/supabase';
import { ArrowRight } from 'lucide-react';
import './HomepageGallery.css';
import './HomepageGallery.mobile.css';

interface HomepageGalleryProps {
  onNavigateToGallery: () => void;
}

export const HomepageGallery: React.FC<HomepageGalleryProps> = ({ onNavigateToGallery }) => {
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_ITEMS.slice(0, 3));

  useEffect(() => {
    async function loadLiveFeatured() {
      try {
        const { data, error } = await supabase
          .from('gallery_items')
          .select('*')
          .eq('is_published', true)
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false })
          .limit(3);

        if (data && !error && data.length > 0) {
          const mapped: GalleryItem[] = data.map((row: DbGalleryItem) => ({
            id: row.id,
            title: row.title,
            category: row.category || 'Events',
            date: row.event_date || new Date(row.created_at).toLocaleDateString(),
            campusOrCity: row.location || 'India',
            description: row.description || '',
            imageUrl: row.image_url,
            tags: [row.category || 'Events', row.location || 'FoundersLab'].filter(Boolean)
          }));
          setItems(mapped);
        }
      } catch (err) {
        console.error('Homepage gallery live fetch error:', err);
      }
    }
    loadLiveFeatured();
  }, []);

  // Homepage displays featured items (up to 3)
  const featuredItems = items.slice(0, 3);

  const getExcerpt = (text: string, maxLength: number = 140) => {
    if (!text) return '';
    const cleaned = text.replace(/\[Read More\]/gi, '').trim();
    if (cleaned.length <= maxLength) return cleaned;
    return cleaned.slice(0, maxLength).trim() + '...';
  };

  return (
    <section className="fl-homepage-gallery" id="homepage-gallery" aria-label="Institutional Moments Gallery">
      <div className="fl-gallery-container">
        
        {/* Section Header */}
        <header className="fl-gallery-header">
          <div className="fl-gallery-header-top">
            <span className="fl-gallery-index">01 / GALLERY</span>
            <div className="fl-gallery-accent-bar" aria-hidden="true" />
          </div>
          <div className="fl-gallery-header-main">
            <div className="fl-gallery-titles">
              <span className="fl-gallery-eyebrow">INNOVATION IN ACTION</span>
              <h2 className="fl-gallery-heading">
                Building India’s Next Generation<br className="desktop-only" /> of Innovators & Entrepreneurs
              </h2>
            </div>
            <p className="fl-gallery-subheading">
              A curated view of FoundersLab’s work across institutions, programs, innovation initiatives, and national entrepreneurship tracks.
            </p>
          </div>
        </header>

        {/* 3-Column Desktop Grid / 2-Column Mobile Grid */}
        <div className="fl-gallery-grid">
          {featuredItems.map((item, index) => {
            const itemNumber = String(index + 1).padStart(2, '0');
            const excerpt = getExcerpt(item.description);

            return (
              <article key={item.id} className="fl-gallery-card">
                <div className="fl-gallery-card-num">{itemNumber}</div>
                
                {/* Image Container with guaranteed non-cropping contain */}
                <div className="fl-gallery-image-wrapper">
                  <div className="fl-gallery-image-frame">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="fl-gallery-img"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Content Under Each Image */}
                <div className="fl-gallery-card-content">
                  <span className="fl-gallery-card-category">{item.category.toUpperCase()} • {item.campusOrCity}</span>
                  <h3 className="fl-gallery-card-title">{item.title}</h3>
                  <p className="fl-gallery-card-desc">{excerpt}</p>
                  
                  <button 
                    type="button"
                    onClick={onNavigateToGallery}
                    className="fl-gallery-card-link"
                    aria-label={`View full story: ${item.title}`}
                  >
                    <span>View Story</span>
                    <ArrowRight className="fl-gallery-card-arrow" size={14} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Section Footer / View Gallery CTA */}
        <footer className="fl-gallery-footer">
          <button 
            type="button" 
            onClick={onNavigateToGallery}
            className="fl-gallery-cta-btn"
          >
            <span>VIEW FULL GALLERY</span>
            <ArrowRight className="fl-gallery-cta-arrow" size={16} />
          </button>
        </footer>

      </div>
    </section>
  );
};

export default HomepageGallery;
