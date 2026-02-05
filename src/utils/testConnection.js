// Quick test file to check Supabase connection
import { supabase } from '@/services/supabase';

async function testConnection() {
    console.log('🧪 Testing Supabase connection...');

    try {
        // Simple query to test connection
        const { data, error } = await Promise.race([
            supabase.from('daily_counts').select('count(*)'),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
        ]);

        if (error) {
            console.error('❌ Connection test failed:', error);
        } else {
            console.log('✅ Connection works!', data);
        }
    } catch (err) {
        console.error('❌ Connection timeout or error:', err.message);
    }
}

// Run test
testConnection();
