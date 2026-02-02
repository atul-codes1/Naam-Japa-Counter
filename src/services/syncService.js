// import { supabase } from './supabase'; // SDK is broken/hanging, using Fetch API instead.

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Helper: Get Auth Token directly from LocalStorage to avoid SDK hangs.
 */
function getAuthToken() {
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            // Supabase tokens usually look like `sb-<project ref>-auth-token`
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
    return {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
    };
}

/**
 * FETCH: Get state via REST API
 */
export async function fetchServerState(userId) {
    const token = getAuthToken();
    if (!token) {
        console.error("❌ No auth token found. Cannot sync.");
        return null;
    }

    console.log(`[API] Fetching state for ${userId}...`);

    try {
        const url = `${SUPABASE_URL}/rest/v1/daily_counts?user_id=eq.${userId}&select=*`;
        const response = await fetch(url, {
            method: 'GET',
            headers: getHeaders(token)
        });

        if (!response.ok) {
            throw new Error(`API Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`[API] Fetched ${data.length} records.`);

        // Transform logic (Same as before)
        const serverStats = {};
        data.forEach(record => {
            const deity = record.deity_name;
            const date = record.date;

            if (!serverStats[deity]) {
                serverStats[deity] = {
                    lifetime: { totalCounts: 0, totalMalas: 0 },
                    history: {}
                };
            }

            serverStats[deity].lifetime.totalCounts += record.count;

            if (!serverStats[deity].history) serverStats[deity].history = {};
            serverStats[deity].history[date] = {
                counts: record.count,
                malas: record.malas
            };
        });

        Object.keys(serverStats).forEach(deity => {
            serverStats[deity].lifetime.totalMalas = Math.floor(serverStats[deity].lifetime.totalCounts / 108);
            serverStats[deity].currentCount = serverStats[deity].lifetime.totalCounts % 108;
            if (serverStats[deity].currentCount === 0 && serverStats[deity].lifetime.totalCounts > 0) {
                serverStats[deity].currentCount = 108;
            }
        });

        return serverStats;

    } catch (error) {
        console.error('[API] ❌ Fetch unsuccessful:', error);
        return null;
    }
}

/**
 * PUSH: Sync using Read-Modify-Write via REST API
 */
export async function pushPendingIncrements(userId, pendingStats) {
    const token = getAuthToken();
    if (!token) return [];

    // Logs removed for production
    const successfulSyncs = [];
    const deities = Object.keys(pendingStats);

    for (const deity of deities) {
        const dates = Object.keys(pendingStats[deity]);

        for (const date of dates) {
            const data = pendingStats[deity][date];
            if (data.counts <= 0) continue;

            const payload = {
                user_id: userId,
                deity_name: deity,
                date: date,
                count: data.counts,
                malas: data.malas || 0
            };

            try {
                // 1. GET Existing (Select)
                const selectUrl = `${SUPABASE_URL}/rest/v1/daily_counts?user_id=eq.${userId}&deity_name=eq.${encodeURIComponent(deity)}&date=eq.${date}&select=id,count,malas`;

                const getRes = await fetch(selectUrl, {
                    method: 'GET',
                    headers: getHeaders(token)
                });

                if (!getRes.ok) throw new Error(`Select failed: ${getRes.statusText}`);

                const rows = await getRes.json();
                const existing = rows[0];

                if (existing) {
                    // 2A. Update (PATCH)
                    const updateUrl = `${SUPABASE_URL}/rest/v1/daily_counts?id=eq.${existing.id}`;
                    const updateRes = await fetch(updateUrl, {
                        method: 'PATCH',
                        headers: getHeaders(token),
                        body: JSON.stringify({
                            count: existing.count + payload.count,
                            malas: existing.malas + payload.malas,
                            updated_at: new Date().toISOString()
                        })
                    });

                    if (!updateRes.ok) throw new Error(`Update failed: ${updateRes.statusText}`);
                    console.log(`[API] Updated row ${existing.id}`);

                } else {
                    // 2B. Insert (POST)
                    const insertUrl = `${SUPABASE_URL}/rest/v1/daily_counts`;
                    const insertRes = await fetch(insertUrl, {
                        method: 'POST',
                        headers: getHeaders(token),
                        body: JSON.stringify({
                            ...payload,
                            updated_at: new Date().toISOString()
                        })
                    });

                    if (!insertRes.ok) throw new Error(`Insert failed: ${insertRes.statusText}`);
                    console.log(`[API] Inserted new row`);
                }

                successfulSyncs.push({ deity, date });
                console.log(`[API] ✅ Synced +${data.counts} for ${deity}`);

            } catch (err) {
                console.error(`[API] ❌ Sync failed for ${deity}:`, err);
            }
        }
    }

    return successfulSyncs;
}

/**
 * ORCHESTRATOR: Sync on Login
 */
export async function syncOnLogin(userId, pendingStats = null) {
    window.dispatchEvent(new Event('japa_sync_start'));

    try {
        const pendingToSync = pendingStats || JSON.parse(localStorage.getItem('japa_pending_increments')) || {};

        // 1. Push
        const syncedItems = await pushPendingIncrements(userId, pendingToSync);

        // 2. Fetch
        const serverStats = await fetchServerState(userId);

        if (!serverStats) throw new Error("Failed to fetch server stats");

        // 3. Dispatch
        const event = new CustomEvent('japa_sync_complete', {
            detail: {
                syncedItems,
                serverStats
            }
        });
        window.dispatchEvent(event);

        return { syncedItems, serverStats };

    } catch (error) {
        console.error("Critical Sync Failure:", error);
        window.dispatchEvent(new Event('japa_sync_error'));
        return null;
    }
}
