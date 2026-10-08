import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase, DbEvent, DbGalleryImage, DbActivityLog } from '../lib/supabase';
import { 
  Shield, Image as ImageIcon, Upload, LogOut, CheckCircle, 
  XCircle, Trash2, Edit3, Search, Plus, Eye, EyeOff, Star,
  Activity, Layers, RefreshCw, MoveUp, MoveDown
} from 'lucide-react';
import './AdminDashboard.css';

interface AdminDashboardProps {
  onBackToHome: () => void;
}

interface PendingImageItem {
  id: string;
  file?: File;
  previewUrl: string;
  description: string;
  altText: string;
  isMain: boolean;
  dbImageId?: string;
  storagePath?: string;
  sortOrder: number;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome }) => {
  const { user, adminProfile, signOut } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'gallery' | 'logs'>('gallery');
  const [events, setEvents] = useState<DbEvent[]>([]);
  const [logs, setLogs] = useState<DbActivityLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

  // Modal State for Add / Edit Event
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<DbEvent | null>(null);

  // Event Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Events');
  const [keyDignitaries, setKeyDignitaries] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);

  // Multi-Image Form State
  const [imageItems, setImageItems] = useState<PendingImageItem[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);
  const [deletedStoragePaths, setDeletedStoragePaths] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchEvents();
    fetchActivityLogs();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (eventsError) throw eventsError;

      if (eventsData) {
        const eventIds = eventsData.map(e => e.id);
        const { data: imagesData } = await supabase
          .from('gallery_images')
          .select('*')
          .in('event_id', eventIds.length > 0 ? eventIds : ['00000000-0000-0000-0000-000000000000'])
          .order('sort_order', { ascending: true });

        const mappedEvents: DbEvent[] = eventsData.map(ev => {
          let images = (imagesData || []).filter(img => img.event_id === ev.id);
          if (images.length === 0 && ev.image_url) {
            images = [{
              id: `fallback_${ev.id}`,
              event_id: ev.id,
              image_url: ev.image_url,
              storage_path: '',
              description: ev.title,
              alt_text: ev.title,
              sort_order: 0,
              is_main: true,
              created_at: ev.created_at || new Date().toISOString(),
              updated_at: ev.updated_at || new Date().toISOString()
            }];
          }
          return {
            ...ev,
            images
          };
        });

        setEvents(mappedEvents);
      }
    } catch (err: any) {
      console.error('Fetch events error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchActivityLogs = async () => {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (data && !error) {
      setLogs(data as DbActivityLog[]);
    }
  };

  const logActivity = async (action: string, entityId?: string, metadata?: Record<string, any>) => {
    if (!user) return;
    await supabase.from('activity_logs').insert([{
      admin_id: user.id,
      action,
      entity_type: 'GALLERY_EVENT',
      entity_id: entityId,
      metadata: metadata || {}
    }]);
    fetchActivityLogs();
  };

  const handleOpenAddModal = () => {
    setEditingEvent(null);
    setTitle('');
    setDescription('');
    setCategory('Events');
    setKeyDignitaries('');
    setEventDate('');
    setLocation('');
    setIsPublished(true);
    setSortOrder(events.length + 1);
    setImageItems([]);
    setDeletedImageIds([]);
    setDeletedStoragePaths([]);
    setFormError('');
    setModalOpen(true);
  };

  const handleOpenEditModal = (event: DbEvent) => {
    setEditingEvent(event);
    setTitle(event.title);
    setDescription(event.description || '');
    setCategory(event.category || 'Events');
    setKeyDignitaries(event.key_dignitaries || '');
    setEventDate(event.event_date || '');
    setLocation(event.location || '');
    setIsPublished(event.is_published);
    setSortOrder(event.sort_order);

    let mappedExistingImages: PendingImageItem[] = (event.images || []).map((img, idx) => ({
      id: img.id,
      dbImageId: img.id.startsWith('fallback_') ? undefined : img.id,
      previewUrl: img.image_url,
      storagePath: img.storage_path,
      description: img.description || '',
      altText: img.alt_text || '',
      isMain: img.is_main,
      sortOrder: img.sort_order ?? idx
    }));

    if (mappedExistingImages.length === 0 && event.image_url) {
      mappedExistingImages = [{
        id: `main_${event.id}`,
        previewUrl: event.image_url,
        description: event.title,
        altText: event.title,
        isMain: true,
        sortOrder: 0
      }];
    }

    setImageItems(mappedExistingImages);
    setDeletedImageIds([]);
    setDeletedStoragePaths([]);
    setFormError('');
    setModalOpen(true);
  };

  const handleAddImageFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const filesArray: File[] = Array.from(e.target.files);
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];
    const allowedExts = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

    const newItems: PendingImageItem[] = [];

    for (const file of filesArray) {
      if (file.size > 10 * 1024 * 1024) {
        setFormError(`File "${file.name}" exceeds maximum limit of 10MB.`);
        return;
      }

      const ext = file.name.split('.').pop()?.toLowerCase();
      if (!allowedTypes.includes(file.type) || !ext || !allowedExts.includes(ext)) {
        setFormError(`Security rejection: "${file.name}" is not a supported image format.`);
        return;
      }

      newItems.push({
        id: `new_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        file,
        previewUrl: URL.createObjectURL(file),
        description: '',
        altText: file.name.split('.')[0].replace(/[-_]/g, ' '),
        isMain: false,
        sortOrder: imageItems.length + newItems.length
      });
    }

    setFormError('');
    let updatedList = [...imageItems, ...newItems];

    // Ensure at least one image is marked as main
    if (updatedList.length > 0 && !updatedList.some(i => i.isMain)) {
      updatedList[0].isMain = true;
    }

    setImageItems(updatedList);
  };

  const handleSetMainImage = (id: string) => {
    setImageItems(prev => prev.map(item => ({
      ...item,
      isMain: item.id === id
    })));
  };

  const handleRemoveImageItem = (id: string) => {
    const target = imageItems.find(i => i.id === id);
    if (!target) return;

    if (target.dbImageId) {
      setDeletedImageIds(prev => [...prev, target.dbImageId!]);
      if (target.storagePath) {
        setDeletedStoragePaths(prev => [...prev, target.storagePath!]);
      }
    } else if (target.previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(target.previewUrl);
    }

    const remaining = imageItems.filter(i => i.id !== id);
    
    // Fallback: If removed image was main, assign lowest sort_order image as main
    if (target.isMain && remaining.length > 0) {
      remaining[0].isMain = true;
    }

    setImageItems(remaining);
  };

  const handleMoveImageOrder = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === imageItems.length - 1)) {
      return;
    }

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const reordered = [...imageItems];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    // Update sort_order values
    const updated = reordered.map((item, idx) => ({
      ...item,
      sortOrder: idx
    }));

    setImageItems(updated);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Event title is required.');
      return;
    }

    if (imageItems.length === 0) {
      setFormError('At least one photograph is required for an event gallery.');
      return;
    }

    setUploading(true);
    setUploadProgress(10);

    try {
      // 1. Create or Update events record
      const eventPayload = {
        title: title.trim(),
        description: description.trim() || null,
        category: category.trim() || 'Events',
        key_dignitaries: keyDignitaries.trim() || null,
        event_date: eventDate || null,
        location: location.trim() || null,
        is_published: isPublished,
        sort_order: Number(sortOrder) || 0,
        updated_at: new Date().toISOString()
      } as any;

      let activeEventId = editingEvent?.id;

      if (editingEvent) {
        const { error: updateError } = await supabase
          .from('events')
          .update(eventPayload)
          .eq('id', editingEvent.id);

        if (updateError) throw updateError;
      } else {
        const { data: newEvent, error: createError } = await supabase
          .from('events')
          .insert([{
            ...eventPayload,
            created_by: user?.id || null
          }])
          .select()
          .single();

        if (createError) throw createError;
        activeEventId = newEvent.id;
      }

      setUploadProgress(30);

      // 2. Remove deleted images from DB and Storage
      if (deletedImageIds.length > 0) {
        await supabase.from('gallery_images').delete().in('id', deletedImageIds);
      }
      if (deletedStoragePaths.length > 0) {
        await supabase.storage.from('founderslab-media').remove(deletedStoragePaths);
      }

      setUploadProgress(50);

      // 3. Process new and existing image items
      let mainSet = false;
      const currentList = [...imageItems];
      if (!currentList.some(i => i.isMain) && currentList.length > 0) {
        currentList[0].isMain = true;
      }

      for (let i = 0; i < currentList.length; i++) {
        const item = currentList[i];
        let imageUrl = item.previewUrl;
        let storagePath = item.storagePath || '';

        if (item.file) {
          // Upload file to Supabase storage under gallery/events/{event_id}/
          const fileExt = item.file.name.split('.').pop()?.toLowerCase() || 'jpg';
          const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
          const newPath = `gallery/events/${activeEventId}/${fileName}`;

          const { error: uploadErr } = await supabase.storage
            .from('founderslab-media')
            .upload(newPath, item.file, { cacheControl: '3600', upsert: false });

          if (uploadErr) throw new Error(`Upload failed for ${item.file.name}: ${uploadErr.message}`);

          const { data: pubUrlData } = supabase.storage
            .from('founderslab-media')
            .getPublicUrl(newPath);

          imageUrl = pubUrlData.publicUrl;
          storagePath = newPath;
        }

        const imagePayload = {
          event_id: activeEventId,
          image_url: imageUrl,
          storage_path: storagePath,
          description: item.description.trim() || null,
          alt_text: item.altText.trim() || title.trim(),
          sort_order: i,
          is_main: item.isMain,
          updated_at: new Date().toISOString()
        };

        if (item.dbImageId) {
          await supabase.from('gallery_images').update(imagePayload).eq('id', item.dbImageId);
        } else {
          await supabase.from('gallery_images').insert([imagePayload]);
        }

        if (item.isMain) {
           await supabase.from('events').update({ image_url: imageUrl }).eq('id', activeEventId);
        }
      }

      setUploadProgress(100);
      await logActivity(
        editingEvent ? 'GALLERY_EVENT_UPDATED' : 'GALLERY_EVENT_CREATED',
        activeEventId,
        { title: eventPayload.title, imageCount: currentList.length }
      );

      setModalOpen(false);
      fetchEvents();
    } catch (err: any) {
      console.error('Save event error:', err);
      setFormError(err.message || 'Failed to save gallery event.');
    } finally {
      setUploading(false);
    }
  };

  const handleTogglePublish = async (event: DbEvent) => {
    const newStatus = !event.is_published;
    const { error } = await supabase
      .from('events')
      .update({ is_published: newStatus, updated_at: new Date().toISOString() })
      .eq('id', event.id);

    if (!error) {
      logActivity(
        newStatus ? 'EVENT_PUBLISHED' : 'EVENT_UNPUBLISHED',
        event.id,
        { title: event.title }
      );
      fetchEvents();
    }
  };

  const handleDeleteEvent = async (event: DbEvent) => {
    const confirmDelete = window.confirm(
      `Delete event gallery "${event.title}"?\n\nThis will permanently remove the event and all ${event.images?.length || 0} associated photos.`
    );
    if (!confirmDelete) return;

    try {
      // 1. Delete storage files
      const storagePaths = (event.images || []).map(img => img.storage_path).filter(Boolean);
      if (storagePaths.length > 0) {
        await supabase.storage.from('founderslab-media').remove(storagePaths);
      }

      // 2. Delete event DB record (gallery_images cascades automatically)
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', event.id);

      if (error) throw error;

      await logActivity('GALLERY_EVENT_DELETED', event.id, { title: event.title });
      fetchEvents();
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  // Filtered gallery events list
  const categories = Array.from(new Set(events.map(e => e.category || 'Events')));
  
  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (event.location && event.location.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;

    const matchesStatus = 
      filterStatus === 'all' ||
      (filterStatus === 'published' && event.is_published) ||
      (filterStatus === 'draft' && !event.is_published);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalCount = events.length;
  const publishedCount = events.filter(e => e.is_published).length;
  const draftCount = totalCount - publishedCount;

  return (
    <div className="fl-admin-dashboard">
      
      {/* Top Admin Header */}
      <header className="fl-admin-nav">
        <div className="fl-admin-nav-left">
          <div className="fl-admin-nav-brand">
            <Shield size={20} className="fl-brand-icon" />
            <span>FoundersLab Multi-Image CMS</span>
          </div>
          <div className="fl-admin-nav-user">
            <span>{adminProfile?.full_name || user?.email || 'Administrator'}</span>
            <span className="fl-role-badge">ADMIN</span>
          </div>
        </div>

        <div className="fl-admin-nav-right">
          <button type="button" onClick={onBackToHome} className="fl-nav-btn secondary">
            Public Website
          </button>
          <button type="button" onClick={signOut} className="fl-nav-btn logout">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      <div className="fl-admin-layout">
        
        {/* Sidebar */}
        <aside className="fl-admin-sidebar">
          <nav className="fl-sidebar-menu">
            <button
              type="button"
              className={`fl-sidebar-link ${activeTab === 'gallery' ? 'active' : ''}`}
              onClick={() => setActiveTab('gallery')}
            >
              <ImageIcon size={18} />
              <span>Gallery Events ({totalCount})</span>
            </button>

            <button
              type="button"
              className={`fl-sidebar-link ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <Layers size={18} />
              <span>CMS Architecture</span>
            </button>

            <button
              type="button"
              className={`fl-sidebar-link ${activeTab === 'logs' ? 'active' : ''}`}
              onClick={() => setActiveTab('logs')}
            >
              <Activity size={18} />
              <span>Audit Trail ({logs.length})</span>
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="fl-admin-content">
          
          {/* TAB: GALLERY EVENTS */}
          {activeTab === 'gallery' && (
            <div className="fl-admin-section">
              
              {/* Header Bar */}
              <div className="fl-section-header">
                <div>
                  <h1 className="fl-section-title">Institutional Event Gallery</h1>
                  <p className="fl-section-desc">Manage multi-photo events, set main cover photos, and publish to FoundersLab.</p>
                </div>
                <button type="button" onClick={handleOpenAddModal} className="fl-primary-btn">
                  <Plus size={18} />
                  <span>Create New Event</span>
                </button>
              </div>

              {/* Stats Bar */}
              <div className="fl-admin-metrics">
                <div className="fl-metric-card">
                  <span className="fl-metric-val">{totalCount}</span>
                  <span className="fl-metric-label">Total Events</span>
                </div>
                <div className="fl-metric-card success">
                  <span className="fl-metric-val">{publishedCount}</span>
                  <span className="fl-metric-label">Published Live</span>
                </div>
                <div className="fl-metric-card warning">
                  <span className="fl-metric-val">{draftCount}</span>
                  <span className="fl-metric-label">Drafts / Unpublished</span>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="fl-filter-toolbar">
                <div className="fl-search-box">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Search by event title, location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="fl-filter-group">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="fl-select-input"
                  >
                    <option value="all">All Categories ({categories.length})</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="fl-select-input"
                  >
                    <option value="all">All Statuses</option>
                    <option value="published">Published Only</option>
                    <option value="draft">Drafts Only</option>
                  </select>

                  <button type="button" onClick={fetchEvents} className="fl-refresh-btn" title="Refresh">
                    <RefreshCw size={16} />
                  </button>
                </div>
              </div>

              {/* Gallery Grid */}
              {loading ? (
                <div className="fl-admin-loading">Loading Supabase Event Gallery...</div>
              ) : filteredEvents.length === 0 ? (
                <div className="fl-admin-empty">
                  <ImageIcon size={48} />
                  <p>No gallery events found matching your filters.</p>
                  <button type="button" onClick={handleOpenAddModal} className="fl-secondary-btn">
                    Create First Multi-Photo Event
                  </button>
                </div>
              ) : (
                <div className="fl-admin-gallery-grid">
                  {filteredEvents.map(ev => {
                    const mainImage = ev.images?.find(i => i.is_main) || ev.images?.[0];
                    const photoCount = ev.images?.length || 0;

                    return (
                      <div key={ev.id} className={`fl-admin-card ${ev.is_published ? 'published' : 'draft'}`}>
                        
                        <div className="fl-admin-card-image-wrap">
                          {mainImage ? (
                            <img src={mainImage.image_url} alt={ev.title} className="fl-admin-card-img" />
                          ) : (
                            <div className="fl-no-image">No Photos</div>
                          )}
                          <span className={`fl-status-badge ${ev.is_published ? 'pub' : 'dft'}`}>
                            {ev.is_published ? 'PUBLISHED' : 'DRAFT'}
                          </span>
                          <span className="fl-photo-count-badge">📷 {photoCount} Photos</span>
                        </div>

                        <div className="fl-admin-card-body">
                          <div className="fl-card-category">{ev.category?.toUpperCase() || 'EVENTS'}</div>
                          <h3 className="fl-card-title">{ev.title}</h3>
                          {ev.description && (
                            <p className="fl-card-desc">{ev.description}</p>
                          )}

                          <div className="fl-card-meta">
                            {ev.event_date && <span>📅 {ev.event_date}</span>}
                            {ev.location && <span>📍 {ev.location}</span>}
                          </div>
                        </div>

                        <div className="fl-admin-card-actions">
                          <button
                            type="button"
                            onClick={() => handleTogglePublish(ev)}
                            className={`fl-action-btn ${ev.is_published ? 'unpublish' : 'publish'}`}
                          >
                            {ev.is_published ? <EyeOff size={16} /> : <Eye size={16} />}
                            <span>{ev.is_published ? 'Unpublish' : 'Publish'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(ev)}
                            className="fl-action-btn edit"
                          >
                            <Edit3 size={16} />
                            <span>Edit Event</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteEvent(ev)}
                            className="fl-action-btn delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}

          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="fl-admin-section">
              <h1 className="fl-section-title">Multi-Image Schema Architecture</h1>
              <p className="fl-section-desc">PostgreSQL tables: <code>events</code> + <code>gallery_images</code></p>

              <div className="fl-overview-grid">
                <div className="fl-overview-box">
                  <h3>Event Schema (Parent)</h3>
                  <p>Table: <code>public.events</code></p>
                  <p>Contains event title, description, key dignitaries, date, location, category, image_url.</p>
                </div>

                <div className="fl-overview-box">
                  <h3>Photo Gallery Schema (Child)</h3>
                  <p>Table: <code>public.gallery_images</code> (FK cascade to <code>events</code>)</p>
                  <p>Guaranteed 1 main cover image via PostgreSQL partial unique index.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: AUDIT LOGS */}
          {activeTab === 'logs' && (
            <div className="fl-admin-section">
              <h1 className="fl-section-title">Activity Audit Trail</h1>
              <p className="fl-section-desc">Recent administrative actions logged in PostgreSQL.</p>

              <div className="fl-logs-table-wrap">
                <table className="fl-logs-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Action</th>
                      <th>Entity Type</th>
                      <th>Metadata</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map(log => (
                      <tr key={log.id}>
                        <td>{new Date(log.created_at).toLocaleString()}</td>
                        <td><span className="fl-log-action">{log.action}</span></td>
                        <td>{log.entity_type}</td>
                        <td><code>{JSON.stringify(log.metadata)}</code></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* EVENT EDITOR MODAL */}
      {modalOpen && (
        <div className="fl-modal-overlay">
          <div className="fl-modal-container fl-modal-large">
            
            <div className="fl-modal-header">
              <h2>{editingEvent ? 'Edit Event & Photo Gallery' : 'Create New Event Gallery'}</h2>
              <button type="button" onClick={() => setModalOpen(false)} className="fl-close-btn">×</button>
            </div>

            {formError && (
              <div className="fl-modal-error">{formError}</div>
            )}

            <form onSubmit={handleSaveEvent} className="fl-modal-form">
              
              {/* Event Details */}
              <div className="fl-form-row">
                <div className="fl-form-group">
                  <label>Event Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FoundersLab First Anniversary at T-Hub"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="fl-form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Events, Orientation, Summit"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
              </div>

              <div className="fl-form-row">
                <div className="fl-form-group">
                  <label>Key Dignitaries</label>
                  <input
                    type="text"
                    placeholder="e.g. Sri K.T. Rama Rao..."
                    value={keyDignitaries}
                    onChange={(e) => setKeyDignitaries(e.target.value)}
                  />
                </div>
              </div>

              <div className="fl-form-row">
                <div className="fl-form-group">
                  <label>Event Date</label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>

                <div className="fl-form-group">
                  <label>Location / Campus</label>
                  <input
                    type="text"
                    placeholder="e.g. Hyderabad, PES College Aurangabad"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="fl-form-group full">
                <label>Event Overview & Story</label>
                <textarea
                  rows={2}
                  placeholder="Detailed background of the event..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Multi-Photo Gallery Upload Section */}
              <div className="fl-form-group full">
                <div className="fl-photos-header">
                  <label>Event Photos ({imageItems.length})</label>
                  <label className="fl-add-photos-btn">
                    <Plus size={16} />
                    <span>Add Photographs</span>
                    <input
                      type="file"
                      multiple
                      accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
                      onChange={handleAddImageFiles}
                    />
                  </label>
                </div>

                {imageItems.length === 0 ? (
                  <div className="fl-no-photos-box">
                    <Upload size={32} />
                    <p>No photos added yet. Click "Add Photographs" to upload event images.</p>
                  </div>
                ) : (
                  <div className="fl-photos-editor-list">
                    {imageItems.map((img, index) => (
                      <div key={img.id} className={`fl-photo-editor-card ${img.isMain ? 'is-main' : ''}`}>
                        
                        <div className="fl-photo-thumb-wrap">
                          <img src={img.previewUrl} alt={img.altText} />
                          {img.isMain && <span className="fl-main-star">★ COVER</span>}
                        </div>

                        <div className="fl-photo-inputs">
                          <div className="fl-photo-input-row">
                            <input
                              type="text"
                              placeholder="Photo caption / description..."
                              value={img.description}
                              onChange={(e) => {
                                const val = e.target.value;
                                setImageItems(prev => prev.map(i => i.id === img.id ? { ...i, description: val } : i));
                              }}
                            />
                            <input
                              type="text"
                              placeholder="Alt text..."
                              value={img.altText}
                              onChange={(e) => {
                                const val = e.target.value;
                                setImageItems(prev => prev.map(i => i.id === img.id ? { ...i, altText: val } : i));
                              }}
                            />
                          </div>

                          <div className="fl-photo-controls">
                            <button
                              type="button"
                              onClick={() => handleSetMainImage(img.id)}
                              className={`fl-main-toggle ${img.isMain ? 'active' : ''}`}
                            >
                              <Star size={14} />
                              <span>{img.isMain ? 'Cover Photo' : 'Set as Cover'}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleMoveImageOrder(index, 'up')}
                              disabled={index === 0}
                              className="fl-order-btn"
                              title="Move Up"
                            >
                              <MoveUp size={14} />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleMoveImageOrder(index, 'down')}
                              disabled={index === imageItems.length - 1}
                              className="fl-order-btn"
                              title="Move Down"
                            >
                              <MoveDown size={14} />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleRemoveImageItem(img.id)}
                              className="fl-remove-photo-btn"
                              title="Remove Photo"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="fl-form-row">
                <label className="fl-checkbox-label">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                  />
                  <span>Publish event immediately on FoundersLab website</span>
                </label>
              </div>

              {/* Progress bar */}
              {uploading && (
                <div className="fl-upload-progress">
                  <div className="fl-progress-bar" style={{ width: `${uploadProgress}%` }} />
                  <span>Saving event & uploading photos to Supabase... {uploadProgress}%</span>
                </div>
              )}

              {/* Modal Actions */}
              <div className="fl-modal-footer">
                <button type="button" onClick={() => setModalOpen(false)} className="fl-cancel-btn">
                  Cancel
                </button>
                <button type="submit" disabled={uploading} className="fl-save-btn">
                  {uploading ? 'Saving to Supabase...' : (editingEvent ? 'Update Event Gallery' : 'Save & Publish Event')}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
