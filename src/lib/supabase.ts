import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
});

// ---- Types ----

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon_name: string;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface Task {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  is_popular: boolean;
  sort_order: number;
  created_at: string;
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  website_url: string | null;
  logo_url: string | null;
  pricing_type: string;
  created_at: string;
}

export interface CategoryWithCount extends Category {
  tool_count: number;
}

export interface TaskWithCount extends Task {
  tool_count: number;
}
