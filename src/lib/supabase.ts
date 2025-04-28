
import { createClient } from '@supabase/supabase-js';

// Get the Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if the required environment variables are available
if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL and Anon Key are required. Please make sure they are set in your environment variables.');
}

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
