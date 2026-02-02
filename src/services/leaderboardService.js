import { supabase } from './supabase';

/**
 * Get leaderboard for a specific deity and time interval
 */
export async function getLeaderboard(deity, interval) {
    try {
        const dateFilter = getDateFilter(interval);

        if (interval === 'daily') {
            // Daily: No aggregation needed - join with user_profiles
            const { data, error } = await supabase
                .from('daily_counts')
                .select(`
          user_id,
          count,
          malas,
          user_profiles (
            display_name,
            avatar_url
          )
        `)
                .eq('deity_name', deity)
                .eq('date', dateFilter.today)
                .order('count', { ascending: false })
                .limit(50);

            if (error) throw error;

            return (data || []).map((row, idx) => ({
                rank: idx + 1,
                userId: row.user_id,
                name: row.user_profiles?.display_name || 'Anonymous',
                avatar: row.user_profiles?.avatar_url,
                count: row.count,
                malas: row.malas
            }));

        } else {
            // Monthly/Yearly: Need aggregation
            const { data, error } = await supabase
                .from('daily_counts')
                .select(`
          user_id,
          count,
          malas,
          user_profiles (
            display_name,
            avatar_url
          )
        `)
                .eq('deity_name', deity)
                .gte('date', dateFilter.start)
                .lte('date', dateFilter.end);

            if (error) throw error;

            // Aggregate by user
            const userTotals = {};
            (data || []).forEach(row => {
                if (!userTotals[row.user_id]) {
                    userTotals[row.user_id] = {
                        count: 0,
                        malas: 0,
                        name: row.user_profiles?.display_name || 'Anonymous',
                        avatar: row.user_profiles?.avatar_url
                    };
                }
                userTotals[row.user_id].count += row.count;
                userTotals[row.user_id].malas += row.malas;
            });

            // Convert to array and sort
            return Object.entries(userTotals)
                .map(([userId, totals]) => ({
                    userId,
                    count: totals.count,
                    malas: totals.malas,
                    name: totals.name,
                    avatar: totals.avatar
                }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 50)
                .map((row, idx) => ({
                    ...row,
                    rank: idx + 1
                }));
        }
    } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
        return [];
    }
}

/**
 * Get current user's rank for specific deity and interval
 */
export async function getUserRank(userId, deity, interval) {
    try {
        const dateFilter = getDateFilter(interval);

        if (interval === 'daily') {
            // Get all users for today
            const { data, error } = await supabase
                .from('daily_counts')
                .select('user_id, count')
                .eq('deity_name', deity)
                .eq('date', dateFilter.today)
                .order('count', { ascending: false });

            if (error) throw error;

            const userIndex = (data || []).findIndex(row => row.user_id === userId);

            if (userIndex === -1) return null;

            return {
                rank: userIndex + 1,
                count: data[userIndex].count,
                totalUsers: data.length
            };

        } else {
            // Monthly/Yearly: Aggregate first
            const { data, error } = await supabase
                .from('daily_counts')
                .select('user_id, count')
                .eq('deity_name', deity)
                .gte('date', dateFilter.start)
                .lte('date', dateFilter.end);

            if (error) throw error;

            // Aggregate by user
            const userTotals = {};
            (data || []).forEach(row => {
                if (!userTotals[row.user_id]) {
                    userTotals[row.user_id] = 0;
                }
                userTotals[row.user_id] += row.count;
            });

            // Sort and find rank
            const sorted = Object.entries(userTotals)
                .map(([uid, count]) => ({ userId: uid, count }))
                .sort((a, b) => b.count - a.count);

            const userIndex = sorted.findIndex(row => row.userId === userId);

            if (userIndex === -1) return null;

            return {
                rank: userIndex + 1,
                count: sorted[userIndex].count,
                totalUsers: sorted.length
            };
        }
    } catch (error) {
        console.error('Failed to get user rank:', error);
        return null;
    }
}

/**
 * Helper: Get date filter based on interval
 */
function getDateFilter(interval) {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    switch (interval) {
        case 'daily':
            return { today: todayStr };

        case 'monthly':
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            return {
                start: monthStart.toISOString().split('T')[0],
                end: todayStr
            };

        case 'yearly':
            const yearStart = new Date(today.getFullYear(), 0, 1);
            return {
                start: yearStart.toISOString().split('T')[0],
                end: todayStr
            };

        default:
            return { today: todayStr };
    }
}
