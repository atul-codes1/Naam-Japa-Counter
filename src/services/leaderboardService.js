// import { supabase } from './supabase'; // SDK is broken/hanging, using Fetch API instead.

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Helper: Get Auth Token directly from LocalStorage
 * Copied from syncService.js to ensure consistent behavior
 */
function getAuthToken() {
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('sb-') && key.endsWith('-auth-token')) {
                const session = JSON.parse(localStorage.getItem(key));
                if (session && session.access_token) {
                    return session.access_token;
                }
            }
        }
    } catch (e) {
        console.error("Error reading auth token", e);
    }
    return null;
}

/**
 * Helper: Standard Headers for Supabase REST API
 */
function getHeaders(token) {
    const headers = {
        'apikey': SUPABASE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
}

/**
 * Get leaderboard for a specific deity and time interval
 */
export async function getLeaderboard(deity, interval) {
    try {
        const dateFilter = getDateFilter(interval);
        const token = getAuthToken();
        const headers = getHeaders(token);

        let url = `${SUPABASE_URL}/rest/v1/daily_counts`;

        // 1. Fetch Counts (Top 50) - NO JOIN
        // Just get the raw numbers first. proven to work.
        let rawData = [];

        if (interval === 'daily') {
            const params = new URLSearchParams({
                select: 'user_id,count,malas',
                deity_name: `eq.${deity}`,
                date: `eq.${dateFilter.today}`,
                order: 'count.desc',
                limit: '50'
            });

            const response = await fetch(`${url}?${params}`, { method: 'GET', headers });

            if (!response.ok) throw new Error(`Fetch Counts Error: ${response.status}`);
            rawData = await response.json();

        } else {
            // Monthly/Yearly ranges
            // Fetch raw data for the period
            const queryString = `select=user_id,count,malas&deity_name=eq.${encodeURIComponent(deity)}&date=gte.${dateFilter.start}&date=lte.${dateFilter.end}`;

            const response = await fetch(`${url}?${queryString}`, { method: 'GET', headers });

            if (!response.ok) throw new Error(`Fetch Ranges Error: ${response.status}`);
            const data = await response.json();

            // Aggregate by user
            const userTotals = {};
            data.forEach(row => {
                if (!userTotals[row.user_id]) {
                    userTotals[row.user_id] = { count: 0, malas: 0, user_id: row.user_id };
                }
                userTotals[row.user_id].count += row.count;
                userTotals[row.user_id].malas += row.malas;
            });

            rawData = Object.values(userTotals)
                .sort((a, b) => b.count - a.count)
                .slice(0, 50);
        }

        if (rawData.length === 0) return [];

        // 2. Fetch Profiles for these User IDs
        const userIds = [...new Set(rawData.map(r => r.user_id))];
        const profileUrl = `${SUPABASE_URL}/rest/v1/user_profiles`;

        // Construct query: user_id=in.(id1,id2,id3)
        // Note: URLSearchParams encodes parentheses which Supabase dislikes for IN filter sometimes,
        // so we construct string manually for safety.
        const idList = userIds.map(id => `"${id}"`).join(','); // Quote IDs if UUIDs
        const profileQuery = `select=user_id,display_name,avatar_url&user_id=in.(${userIds.join(',')})`;

        const profileRes = await fetch(`${profileUrl}?${profileQuery}`, { method: 'GET', headers });

        let profiles = [];
        if (profileRes.ok) {
            profiles = await profileRes.json();
        } else {
            console.warn(`[Service] Profile fetch failed (${profileRes.status}), showing anonymous`);
        }

        // 3. Merge Data
        const profileMap = {};
        profiles.forEach(p => {
            profileMap[p.user_id] = p;
        });

        return rawData.map((row, idx) => ({
            rank: idx + 1,
            userId: row.user_id,
            name: profileMap[row.user_id]?.display_name || 'Devotee',
            avatar: profileMap[row.user_id]?.avatar_url,
            count: row.count,
            malas: row.malas
        }));

    } catch (error) {
        console.error('[Service] CRITICAL FAILURE in getLeaderboard:', error);
        return [];
    }
}

/**
 * Get current user's rank via FETCH
 */
export async function getUserRank(userId, deity, interval) {
    try {
        const dateFilter = getDateFilter(interval);
        const token = getAuthToken();
        const headers = getHeaders(token);

        let url = `${SUPABASE_URL}/rest/v1/daily_counts`;

        if (interval === 'daily') {
            const params = new URLSearchParams({
                select: 'user_id,count',
                deity_name: `eq.${deity}`,
                date: `eq.${dateFilter.today}`,
                order: 'count.desc'
            });

            const response = await fetch(`${url}?${params}`, { method: 'GET', headers });
            if (!response.ok) throw new Error(`Rank Fetch Error: ${response.status}`);

            const data = await response.json();
            const userIndex = data.findIndex(row => row.user_id === userId);

            if (userIndex === -1) return null;

            return {
                rank: userIndex + 1,
                count: data[userIndex].count,
                totalUsers: data.length
            };

        } else {
            // RELAXED FILTER
            const queryString = `select=user_id,count&deity_name=eq.${encodeURIComponent(deity)}&date=gte.${dateFilter.start}&date=lte.${dateFilter.end}`;

            const response = await fetch(`${url}?${queryString}`, { method: 'GET', headers });
            if (!response.ok) throw new Error(`Rank Fetch Error: ${response.status}`);

            const data = await response.json();

            // Aggregate
            const userTotals = {};
            data.forEach(row => {
                if (!userTotals[row.user_id]) userTotals[row.user_id] = 0;
                userTotals[row.user_id] += row.count;
            });

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

function getDateFilter(interval) {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    switch (interval) {
        case 'daily':
            return { today: todayStr };
        case 'monthly':
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const toLocalISO = (d) => {
                const offset = d.getTimezoneOffset() * 60000;
                return new Date(d.getTime() - offset).toISOString().split('T')[0];
            };
            return {
                start: toLocalISO(monthStart),
                end: todayStr
            };
        case 'yearly':
            const yearStart = new Date(today.getFullYear(), 0, 1);
            const toLocalISOYear = (d) => {
                const offset = d.getTimezoneOffset() * 60000;
                return new Date(d.getTime() - offset).toISOString().split('T')[0];
            };
            return {
                start: toLocalISOYear(yearStart),
                end: todayStr
            };
        default:
            return { today: todayStr };
    }
}
