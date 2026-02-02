import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('CRITICAL: Supabase URL or Key is missing from environment variables!');
    console.log('URL:', supabaseUrl ? 'Set' : 'Missing');
    console.log('Key:', supabaseAnonKey ? 'Set' : 'Missing');
} else {
    console.log('Supabase Client Initialized with URL:', supabaseUrl);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
