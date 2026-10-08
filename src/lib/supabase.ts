import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key missing in environment variables.');
}

export const supabase = createClient(
  supabaseUrl || 'https://zecyhbxgfnfzuuikkhlm.supabase.co',
  supabaseAnonKey || ''
);

export interface DbGalleryEvent {
  id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  event_name?: string | null;
  event_date?: string | null;
  location?: string | null;
  alt_text?: string | null;
  is_published: boolean;
  sort_order: number;
  show_descriptions: boolean;
  created_by?: string | null;
  created_at: string;
  updated_at: string;
  images?: DbGalleryImage[];
}

export interface DbGalleryImage {
  id: string;
  event_id: string;
  image_url: string;
  storage_path: string;
  description?: string | null;
  alt_text?: string | null;
  sort_order: number;
  is_main: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbAdminProfile {
  id: string;
  email: string;
  role: string;
  full_name?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbActivityLog {
  id: string;
  admin_id?: string | null;
  action: string;
  entity_type: string;
  entity_id?: string | null;
  metadata?: Record<string, any> | null;
  created_at: string;
}
