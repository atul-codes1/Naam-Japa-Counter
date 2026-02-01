import React, { useState, useMemo } from 'react'; // eslint-disable-line no-unused-vars
import LeaderboardTable from '../components/leaderboard/LeaderboardTable';
import useAuth from '../hooks/useAuth';

const LeaderboardPage = () => {
  const [interval, setInterval] = useState('daily');
  const { user } = useAuth();

  // Mock user rank and total users (will come from backend later)
  const userRank = 4;
  const totalUsers = 1234;

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-inner" style={{ maxWidth: '1100px' }}>
          
          {/* Page Title */}
          <div className="leaderboard-header">
            <h1 className="leaderboard-main-title">🏆 Global Leaderboard</h1>
            <p className="leaderboard-subtitle">
              Compete with devotees worldwide in your spiritual journey
            </p>
          </div>

          {/* User Rank Card */}
          {user && (
            <div className="user-rank-card">
              <div className="rank-circle">
                <div className="rank-number">#{userRank}</div>
                <div className="rank-label">Your Rank</div>
              </div>
              <div className="rank-details">
                <div className="rank-stat">
                  <span className="rank-stat-label">Total Users</span>
                  <span className="rank-stat-value">{totalUsers.toLocaleString()}</span>
                </div>
                <div className="rank-stat">
                  <span className="rank-stat-label">Top</span>
                  <span className="rank-stat-value">{((userRank / totalUsers) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="leaderboard-tabs-container">
            {['daily', 'weekly', 'monthly', 'yearly'].map((tab) => (
              <button
                key={tab}
                className={`leaderboard-tab ${interval === tab ? 'active' : ''}`}
                onClick={() => setInterval(tab)}
              >
                <span className="tab-icon">
                  {tab === 'daily' && '☀️'}
                  {tab === 'weekly' && '📅'}
                  {tab === 'monthly' && '🗓️'}
                  {tab === 'yearly' && '📆'}
                </span>
                <span className="tab-label">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </span>
              </button>
            ))}
          </div>

          {/* Leaderboard Table */}
          <div className="leaderboard-card-modern">
            <LeaderboardTable interval={interval} />
          </div>

          {/* Info Footer */}
          <div className="leaderboard-footer">
            <p>🔄 Updates every 5 minutes • 🌟 Keep chanting to climb higher!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;