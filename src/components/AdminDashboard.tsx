import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase, DbGalleryItem, DbActivityLog } from '../lib/supabase';
import { 
  Shield, Image as ImageIcon, Upload, LogOut, CheckCircle, 
  XCircle, Trash2, Edit3, Search, Plus, Eye, EyeOff, ArrowUp, ArrowDown,
  Activity, Layers, RefreshCw
} from 'lucide-react';
import './AdminDashboard.css';

interface AdminDashboardProps {
  onBackToHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome }) => {
  const { user, adminProfile, signOut } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'gallery' | 'logs'>('gallery');
  const [items, setItems] = useState<DbGalleryItem[]>([]);
  const [logs, setLogs] = useState<DbActivityLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

  // Modal State for Add / Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DbGalleryItem | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Events');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [altText, setAltText] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);

  // Image File State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchGalleryItems();
    fetchActivityLogs();
  }, []);

  const fetchGalleryItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (data && !error) {
      setItems(data as DbGalleryItem[]);
    }
    setLoading(false);
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
      entity_type: 'GALLERY',
      entity_id: entityId,
      metadata: metadata || {}
    }]);
    fetchActivityLogs();
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setTitle('');
    setDescription('');
    setCategory('Events');
    setEventName('');
    setEventDate('');
    setLocation('');
    setAltText('');
    setIsPublished(true);
    setSortOrder(items.length + 1);
    setSelectedFile(null);
    setFilePreview(null);
    setFormError('');
    setModalOpen(true);
  };

  const handleOpenEditModal = (item: DbGalleryItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setDescription(item.description || '');
    setCategory(item.category || 'Events');
    setEventName(item.event_name || '');
    setEventDate(item.event_date || '');
    setLocation(item.location || '');
    setAltText(item.alt_text || '');
    setIsPublished(item.is_published);
    setSortOrder(item.sort_order);
    setSelectedFile(null);
    setFilePreview(item.image_url);
    setFormError('');
    setModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setFormError('File size exceeds maximum limit of 10MB.');
        return;
      }

      // Validate MIME type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];
      if (!allowedTypes.includes(file.type)) {
        setFormError('Only JPG, PNG, WEBP, and AVIF image formats are allowed.');
        return;
      }

      setFormError('');
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Title is required.');
      return;
    }

    if (!editingItem && !selectedFile) {
      setFormError('An image file is required for new gallery items.');
      return;
    }

    setUploading(true);
    setUploadProgress(20);

    let imageUrl = editingItem ? editingItem.image_url : '';
    let storagePath = editingItem ? editingItem.storage_path : '';
    let oldStoragePathToClean: string | null = null;

    try {
      // If a new file is selected, upload to Supabase Storage
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const year = new Date().getFullYear();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
        const newPath = `gallery/${year}/${fileName}`;

        setUploadProgress(50);
        const { error: uploadError } = await supabase.storage
          .from('founderslab-media')
          .upload(newPath, selectedFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          throw new Error(`Upload failed: ${uploadError.message}`);
        }

        const { data: publicUrlData } = supabase.storage
          .from('founderslab-media')
          .getPublicUrl(newPath);

        if (editingItem && editingItem.storage_path) {
          oldStoragePathToClean = editingItem.storage_path;
        }

        imageUrl = publicUrlData.publicUrl;
        storagePath = newPath;
      }

      setUploadProgress(80);

      const payload = {
        title: title.trim(),
        description: description.trim() || null,
        category: category.trim() || 'Events',
        event_name: eventName.trim() || null,
        event_date: eventDate || null,
        location: location.trim() || null,
        alt_text: altText.trim() || title.trim(),
        is_published: isPublished,
        sort_order: Number(sortOrder) || 0,
        image_url: imageUrl,
        storage_path: storagePath,
        updated_at: new Date().toISOString()
      };

      if (editingItem) {
        // UPDATE
        const { error: updateError } = await supabase
          .from('gallery_items')
          .update(payload)
          .eq('id', editingItem.id);

        if (updateError) throw updateError;

        // Cleanup old image if replaced
        if (oldStoragePathToClean) {
          await supabase.storage.from('founderslab-media').remove([oldStoragePathToClean]);
        }

        await logActivity(
          selectedFile ? 'GALLERY_IMAGE_REPLACED' : (isPublished ? 'GALLERY_PUBLISHED' : 'GALLERY_UPDATED'),
          editingItem.id,
          { title: payload.title }
        );
      } else {
        // INSERT
        const { data: insertedData, error: insertError } = await supabase
          .from('gallery_items')
          .insert([{
            ...payload,
            created_by: user?.id || null
          }])
          .select()
          .single();

        if (insertError) throw insertError;

        await logActivity(
          isPublished ? 'GALLERY_PUBLISHED' : 'GALLERY_CREATED',
          insertedData?.id,
          { title: payload.title }
        );
      }

      setUploadProgress(100);
      setModalOpen(false);
      fetchGalleryItems();
    } catch (err: any) {
      console.error('Save error:', err);
      setFormError(err.message || 'Failed to save gallery item.');
    } finally {
      setUploading(false);
    }
  };

  const handleTogglePublish = async (item: DbGalleryItem) => {
    const newStatus = !item.is_published;
    const { error } = await supabase
      .from('gallery_items')
      .update({ is_published: newStatus, updated_at: new Date().toISOString() })
      .eq('id', item.id);

    if (!error) {
      logActivity(
        newStatus ? 'GALLERY_PUBLISHED' : 'GALLERY_UNPUBLISHED',
        item.id,
        { title: item.title }
      );
      fetchGalleryItems();
    }
  };

  const handleDeleteItem = async (item: DbGalleryItem) => {
    const confirmDelete = window.confirm(
      `Delete gallery item "${item.title}"?\n\nThis will permanently remove the record and storage image from FoundersLab.`
    );
    if (!confirmDelete) return;

    try {
      // 1. Delete storage file
      if (item.storage_path) {
        await supabase.storage.from('founderslab-media').remove([item.storage_path]);
      }

      // 2. Delete database record
      const { error } = await supabase
        .from('gallery_items')
        .delete()
        .eq('id', item.id);

      if (error) throw error;

      await logActivity('GALLERY_DELETED', item.id, { title: item.title });
      fetchGalleryItems();
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  // Filtered gallery list
  const categories = Array.from(new Set(items.map(i => i.category || 'Events')));
  
  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

    const matchesStatus = 
      filterStatus === 'all' ||
      (filterStatus === 'published' && item.is_published) ||
      (filterStatus === 'draft' && !item.is_published);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalCount = items.length;
  const publishedCount = items.filter(i => i.is_published).length;
  const draftCount = totalCount - publishedCount;

  return (
    <div className="fl-admin-dashboard">
      
      {/* Top Admin Header */}
      <header className="fl-admin-nav">
        <div className="fl-admin-nav-left">
          <div className="fl-admin-nav-brand">
            <Shield size={20} className="fl-brand-icon" />
            <span>FoundersLab CMS</span>
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
              <span>Gallery Items ({totalCount})</span>
            </button>

            <button
              type="button"
              className={`fl-sidebar-link ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <Layers size={18} />
              <span>CMS Overview</span>
            </button>

            <button
              type="button"
              className={`fl-sidebar-link ${activeTab === 'logs' ? 'active' : ''}`}
              onClick={() => setActiveTab('logs')}
            >
              <Activity size={18} />
              <span>Audit Logs ({logs.length})</span>
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="fl-admin-content">
          
          {/* TAB: GALLERY MANAGEMENT */}
          {activeTab === 'gallery' && (
            <div className="fl-admin-section">
              
              {/* Header Bar */}
              <div className="fl-section-header">
                <div>
                  <h1 className="fl-section-title">Gallery CMS</h1>
                  <p className="fl-section-desc">Manage, reorder, and publish institutional moments to the public website.</p>
                </div>
                <button type="button" onClick={handleOpenAddModal} className="fl-primary-btn">
                  <Plus size={18} />
                  <span>Upload Image</span>
                </button>
              </div>

              {/* Stats Bar */}
              <div className="fl-admin-metrics">
                <div className="fl-metric-card">
                  <span className="fl-metric-val">{totalCount}</span>
                  <span className="fl-metric-label">Total Media Items</span>
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
                    placeholder="Search by title, location..."
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

                  <button type="button" onClick={fetchGalleryItems} className="fl-refresh-btn" title="Refresh">
                    <RefreshCw size={16} />
                  </button>
                </div>
              </div>

              {/* Gallery Grid */}
              {loading ? (
                <div className="fl-admin-loading">Loading Supabase Gallery database...</div>
              ) : filteredItems.length === 0 ? (
                <div className="fl-admin-empty">
                  <ImageIcon size={48} />
                  <p>No gallery items found matching your filters.</p>
                  <button type="button" onClick={handleOpenAddModal} className="fl-secondary-btn">
                    Add First Gallery Image
                  </button>
                </div>
              ) : (
                <div className="fl-admin-gallery-grid">
                  {filteredItems.map(item => (
                    <div key={item.id} className={`fl-admin-card ${item.is_published ? 'published' : 'draft'}`}>
                      
                      <div className="fl-admin-card-image-wrap">
                        <img src={item.image_url} alt={item.title} className="fl-admin-card-img" />
                        <span className={`fl-status-badge ${item.is_published ? 'pub' : 'dft'}`}>
                          {item.is_published ? 'PUBLISHED' : 'DRAFT'}
                        </span>
                        <span className="fl-order-badge">#{item.sort_order}</span>
                      </div>

                      <div className="fl-admin-card-body">
                        <div className="fl-card-category">{item.category?.toUpperCase() || 'EVENTS'}</div>
                        <h3 className="fl-card-title">{item.title}</h3>
                        {item.description && (
                          <p className="fl-card-desc">{item.description}</p>
                        )}

                        <div className="fl-card-meta">
                          {item.event_date && <span>📅 {item.event_date}</span>}
                          {item.location && <span>📍 {item.location}</span>}
                        </div>
                      </div>

                      <div className="fl-admin-card-actions">
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(item)}
                          className={`fl-action-btn ${item.is_published ? 'unpublish' : 'publish'}`}
                          title={item.is_published ? 'Unpublish' : 'Publish'}
                        >
                          {item.is_published ? <EyeOff size={16} /> : <Eye size={16} />}
                          <span>{item.is_published ? 'Unpublish' : 'Publish'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(item)}
                          className="fl-action-btn edit"
                          title="Edit"
                        >
                          <Edit3 size={16} />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteItem(item)}
                          className="fl-action-btn delete"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="fl-admin-section">
              <h1 className="fl-section-title">System & Storage Overview</h1>
              <p className="fl-section-desc">Supabase Project: <strong>founderslab-web-fullstack</strong></p>

              <div className="fl-overview-grid">
                <div className="fl-overview-box">
                  <h3>Connected Supabase Database</h3>
                  <p>URL: <code>https://zecyhbxgfnfzuuikkhlm.supabase.co</code></p>
                  <p>Status: <span className="text-green">ACTIVE_HEALTHY</span></p>
                  <p>Tables: <code>gallery_items</code>, <code>admin_profiles</code>, <code>activity_logs</code></p>
                </div>

                <div className="fl-overview-box">
                  <h3>Supabase Storage Bucket</h3>
                  <p>Bucket Name: <code>founderslab-media</code></p>
                  <p>Max Upload Size: 10MB per image</p>
                  <p>Allowed MIME Types: JPG, JPEG, PNG, WEBP, AVIF</p>
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

      {/* UPLOAD / EDIT MODAL */}
      {modalOpen && (
        <div className="fl-modal-overlay">
          <div className="fl-modal-container">
            
            <div className="fl-modal-header">
              <h2>{editingItem ? 'Edit Gallery Item' : 'Upload New Gallery Image'}</h2>
              <button type="button" onClick={() => setModalOpen(false)} className="fl-close-btn">×</button>
            </div>

            {formError && (
              <div className="fl-modal-error">{formError}</div>
            )}

            <form onSubmit={handleSaveItem} className="fl-modal-form">
              
              {/* Image Upload Box */}
              <div className="fl-form-group full">
                <label>Media Photograph (Max 10MB)</label>
                <div className="fl-image-picker-box">
                  {filePreview ? (
                    <div className="fl-picker-preview">
                      <img src={filePreview} alt="Preview" />
                      <div className="fl-picker-overlay">
                        <span>Change Photograph</span>
                        <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={handleFileChange} />
                      </div>
                    </div>
                  ) : (
                    <label className="fl-picker-dropzone">
                      <Upload size={32} />
                      <span>Click or Drag photo here to upload</span>
                      <small>JPG, PNG, WEBP, AVIF up to 10MB</small>
                      <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={handleFileChange} />
                    </label>
                  )}
                </div>
              </div>

              {/* Title & Category */}
              <div className="fl-form-row">
                <div className="fl-form-group">
                  <label>Title *</label>
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

              {/* Event Name & Date */}
              <div className="fl-form-row">
                <div className="fl-form-group">
                  <label>Event Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. T-Hub Anniversary 2024"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>

                <div className="fl-form-group">
                  <label>Event Date (Optional)</label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Location & Alt Text */}
              <div className="fl-form-row">
                <div className="fl-form-group">
                  <label>Location / Campus</label>
                  <input
                    type="text"
                    placeholder="e.g. Hyderabad, PES College Aurangabad"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="fl-form-group">
                  <label>Sort Order Number</label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="fl-form-group full">
                <label>Description / Story Excerpt</label>
                <textarea
                  rows={3}
                  placeholder="Detailed description of the institutional event..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Alt text */}
              <div className="fl-form-group full">
                <label>Image Alt Text (Accessibility)</label>
                <input
                  type="text"
                  placeholder="Descriptive alt text for screen readers..."
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                />
              </div>

              {/* Publish Toggle */}
              <div className="fl-form-group full checkbox-group">
                <label className="fl-checkbox-label">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                  />
                  <span>Publish immediately to FoundersLab website</span>
                </label>
              </div>

              {/* Progress bar */}
              {uploading && (
                <div className="fl-upload-progress">
                  <div className="fl-progress-bar" style={{ width: `${uploadProgress}%` }} />
                  <span>Uploading to Supabase Storage... {uploadProgress}%</span>
                </div>
              )}

              {/* Modal Actions */}
              <div className="fl-modal-footer">
                <button type="button" onClick={() => setModalOpen(false)} className="fl-cancel-btn">
                  Cancel
                </button>
                <button type="submit" disabled={uploading} className="fl-save-btn">
                  {uploading ? 'Saving to Supabase...' : (editingItem ? 'Update Gallery Item' : 'Save & Publish')}
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
