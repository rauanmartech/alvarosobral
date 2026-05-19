import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "Supabase credentials are missing! Please configure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in your deployment environment variables (e.g., Vercel Dashboard)."
  );
}

// Fallback placeholders to prevent fatal javascript initialization crash (Uncaught Error: supabaseUrl is required)
const finalUrl = supabaseUrl || 'https://placeholder-url-for-supabase.supabase.co';
const finalKey = supabaseKey || 'placeholder-key';

export const supabase = createClient(finalUrl, finalKey);

