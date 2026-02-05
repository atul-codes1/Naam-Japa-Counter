import React, { createContext, useContext, useState, useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import { pushPendingIncrements, fetchServerState } from '@/services/syncService';

const SyncContext = createContext();

export const useSync = () => useContext(SyncContext);

export const SyncProvider = ({ children }) => {
    const { user } = useAuth();

    // --- PERSISTENCE & GLOBAL STATE ---
    // 1. Cached Server State (Authentication Truth)
    const [cachedServerState, setCachedServerState] = useState(() => {
        const saved = localStorage.getItem('japa_cached_server_state');
        return saved ? JSON.parse(saved) : {};
    });

    // 2. Pending Increments (Local/Guest/Offline writes)
    const [pendingIncrements, setPendingIncrements] = useState(() => {
        const saved = localStorage.getItem('japa_pending_increments');
        return saved ? JSON.parse(saved) : {};
    });

    // Persist State
    useEffect(() => {
        localStorage.setItem('japa_cached_server_state', JSON.stringify(cachedServerState));
    }, [cachedServerState]);

    useEffect(() => {
        localStorage.setItem('japa_pending_increments', JSON.stringify(pendingIncrements));
    }, [pendingIncrements]);

    // Listen for sync completion (Login Event from syncService)
    useEffect(() => {
        const handleSyncComplete = (event) => {
            const { syncedItems, serverStats } = event.detail;
            console.log('🔄 Sync Complete. Updating state...', serverStats);

            // 1. Update Server Cache
            setCachedServerState(serverStats);

            // 2. Remove synced items from Pending
            setPendingIncrements(prev => {
                const next = { ...prev };
                syncedItems.forEach(({ deity, date }) => {
                    if (next[deity] && next[deity][date]) {
                        delete next[deity][date];
                    }
                });
                return next;
            });
        };

        window.addEventListener('japa_sync_complete', handleSyncComplete);
        return () => window.removeEventListener('japa_sync_complete', handleSyncComplete);
    }, []);

    // Debounced Sync Effect (Background Sync)
    useEffect(() => {
        if (!user || Object.keys(pendingIncrements).length === 0) return;

        const timer = setTimeout(async () => {
            try {
                // console.log("☁️ Attempting background sync..."); 
                const syncedItems = await pushPendingIncrements(user.id, pendingIncrements);

                if (syncedItems.length > 0) {
                    console.log('✅ Background sync done:', syncedItems.length);

                    // A. Update Pending
                    setPendingIncrements(prev => {
                        const next = { ...prev };
                        syncedItems.forEach(({ deity, date }) => {
                            if (next[deity] && next[deity][date]) {
                                delete next[deity][date];
                            }
                        });
                        return next;
                    });

                    // B. Refresh Server Cache (To maintain UI consistency)
                    const freshState = await fetchServerState(user.id);
                    if (freshState) {
                        setCachedServerState(freshState);
                    }
                }
            } catch (err) {
                console.error('Background sync failed', err);
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [pendingIncrements, user]);

    // Helper: Get today's date in YYYY-MM-DD format based on LOCAL device time
    const getTodayStr = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const updateJapaCount = async (naam) => {
        const today = getTodayStr();

        setPendingIncrements(prev => {
            // 1. Deep copy the relevant parts to avoid mutation
            const state = { ...prev };
            state[naam] = { ...(state[naam] || {}) };
            state[naam][today] = { ...(state[naam][today] || { counts: 0, malas: 0 }) };

            // 2. Increment
            state[naam][today].counts += 1;

            return state;
        });
    };

    /**
     * DERIVED STATE UI HELPERS
     */
    const getDeityStats = (naam) => {
        const today = getTodayStr();

        // 1. Get Base from Server Cache
        const serverDeity = cachedServerState[naam] || {
            lifetime: { totalCounts: 0 },
            history: {}
        };

        const serverTotal = serverDeity.lifetime.totalCounts || 0;
        const serverToday = serverDeity.history[today]?.counts || 0;

        // 2. Get Pending from Local
        const pendingDeity = pendingIncrements[naam] || {};
        let pendingTotal = 0;
        Object.values(pendingDeity).forEach(day => pendingTotal += day.counts);
        const pendingToday = pendingDeity[today]?.counts || 0;

        // 3. Calculate Final UI Values
        const finalTotalCounts = serverTotal + pendingTotal;
        const finalTodaysJapa = serverToday + pendingToday;
        const finalTotalMalas = Math.floor(finalTotalCounts / 108);

        // 4. Progress Circle Logic: (Total % 108)
        let currentCount = finalTotalCounts % 108;
        if (currentCount === 0 && finalTotalCounts > 0) {
            currentCount = 108;
        }

        return {
            currentCount: currentCount,
            totalMalas: finalTotalMalas,
            totalJapa: finalTotalCounts,
            todaysJapa: finalTodaysJapa
        };
    };

    /**
     * FULL MERGE: For Statistics Page
     */
    /**
     * FULL MERGE: For Statistics Page
     * Memoized to prevent App-wide re-renders
     */
    const allMergedStats = React.useMemo(() => {
        const merged = JSON.parse(JSON.stringify(cachedServerState));

        Object.entries(pendingIncrements).forEach(([naam, dates]) => {
            if (!merged[naam]) {
                merged[naam] = { lifetime: { totalCounts: 0, totalMalas: 0 }, history: {} };
            }

            Object.entries(dates).forEach(([date, data]) => {
                if (!merged[naam].history[date]) {
                    merged[naam].history[date] = { counts: 0, malas: 0 };
                }

                merged[naam].history[date].counts += data.counts;
                merged[naam].lifetime.totalCounts += data.counts;
            });

            merged[naam].lifetime.totalMalas = Math.floor(merged[naam].lifetime.totalCounts / 108);
        });

        return merged;
    }, [cachedServerState, pendingIncrements]);

    return (
        <SyncContext.Provider value={{
            cachedServerState,
            pendingIncrements,
            updateJapaCount,
            getDeityStats,
            allMergedStats
        }}>
            {children}
        </SyncContext.Provider>
    );
};
