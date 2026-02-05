import React, { useState, useEffect } from 'react';
import LeaderboardTable from '@/components/leaderboard/LeaderboardTable';
import useAuth from '@/hooks/useAuth';
import { getLeaderboard, getUserRank } from '@/services/leaderboardService';

const DEITIES = ['Radha', 'Krishna', 'Ram', 'Shiv', 'Narayan'];

const LeaderboardPage = () => {
  const [interval, setInterval] = useState('daily');
  const [selectedDeity, setSelectedDeity] = useState('Radha');
  const [userRank, setUserRank] = useState(null);
  const [loadingRank, setLoadingRank] = useState(false);
  const { user, openLogin } = useAuth();

  // Fetch user rank when deity or interval changes
  useEffect(() => {
    if (!user) {
      setUserRank(null);
      return;
    }

    async function fetchUserRank() {
      setLoadingRank(true);
      try {
        const rankData = await getUserRank(user.id, selectedDeity, interval);
        console.log('📊 User rank data:', rankData);
        setUserRank(rankData);
      } catch (error) {
        console.error('❌ Failed to fetch user rank:', error);
        setUserRank(null);
      } finally {
        setLoadingRank(false);
      }
    }

    fetchUserRank();
  }, [user, selectedDeity, interval]);

  // Calculate percentage for display
  const getPercentage = () => {
    if (!userRank || !userRank.totalUsers || userRank.totalUsers === 0) return null;
    const val = (userRank.rank / userRank.totalUsers) * 100;
    return Number.isInteger(val) ? val.toString() : val.toFixed(1);
  };

  // If not logged in, show login prompt
  if (!user) {
    return (
      <div className="page-container">
        <div className="page-content">
          <div className="login-prompt-container">
            <h1 className="login-prompt-icon">🏆</h1>
            <h2 className="login-prompt-title">Global Leaderboard</h2>
            <p className="login-prompt-text">
              Login to compete with devotees worldwide and see your ranking!
            </p>
            <button
              onClick={() => openLogin('/leaderboard')}
              className="login-prompt-btn"
            >
              Login with Google
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-inner page-inner-large">

          {/* Page Title */}
          <div className="leaderboard-header">
            <h1 className="leaderboard-main-title">🏆 Global Leaderboard</h1>
            <p className="leaderboard-subtitle">
              Compete with devotees worldwide in your spiritual journey
            </p>
          </div>

          <div className="leaderboard-controls-row">
            {/* User Rank Card - shown when logged in */}
            {user && (
              <div className="user-rank-card compact">
                {loadingRank ? (
                  <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Loading your rank...</p>
                  </div>
                ) : userRank ? (
                  <>
                    <div className="rank-circle">
                      <div className="rank-number">#{userRank.rank}</div>
                      <div className="rank-label">Your Rank</div>
                    </div>
                    <div className="rank-details">
                      <div className="rank-stat">
                        <span className="rank-stat-label">Total Users</span>
                        <span className="rank-stat-value">{userRank.totalUsers.toLocaleString()}</span>
                      </div>
                      <div className="rank-stat">
                        <span className="rank-stat-label">Top</span>
                        <span className="rank-stat-value">{getPercentage()}%</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="loading-container">
                    <p className="empty-state-text">
                      Start chanting {selectedDeity} Naam to appear on the leaderboard!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Deity Selector */}
            <div className="deity-selector-wrapper">
              <label className="deity-selector-label">
                📿 Select Deity for Rankings:
              </label>
              <select
                value={selectedDeity}
                onChange={(e) => setSelectedDeity(e.target.value)}
                className="deity-selector-dropdown"
              >
                {DEITIES.map(deity => (
                  <option key={deity} value={deity}>{deity} Naam</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tabs */}
          <div className="leaderboard-tabs-container">
            {['daily', 'monthly', 'yearly'].map((tab) => (
              <button
                key={tab}
                className={`leaderboard-tab ${interval === tab ? 'active' : ''}`}
                onClick={() => setInterval(tab)}
              >
                <span className="tab-icon">
                  {tab === 'daily' && '☀️'}
                  {tab === 'monthly' && '🗓️'}
                  {tab === 'yearly' && '📆'}
                </span>
                <span className="tab-label">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </span>
              </button>
            ))}
          </div>

          {/* Leaderboard Table - pass deity and interval */}
          <div className="leaderboard-card-modern">
            <LeaderboardTable interval={interval} deity={selectedDeity} />
          </div>

          {/* Info Footer */}
          <div className="leaderboard-footer">
            <p>🔄 Updates every 5 minutes • 🌟 Keep chanting to climb higher!</p>
          </div>
        </div>
      </div>
    </div >
  );
};

export default LeaderboardPage;