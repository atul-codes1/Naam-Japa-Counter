import React, { useState, useEffect } from 'react';
import LeaderboardTable from '../components/leaderboard/LeaderboardTable';
import useAuth from '../hooks/useAuth';
import { getLeaderboard, getUserRank } from '../services/leaderboardService';

const DEITIES = ['Radha', 'Krishna', 'Ram', 'Shiva', 'Hanuman', 'Ganesh'];

const LeaderboardPage = () => {
  const [interval, setInterval] = useState('daily');
  const [selectedDeity, setSelectedDeity] = useState('Radha');
  const { user, openLogin } = useAuth();

  // If not logged in, show login prompt
  if (!user) {
    return (
      <div className="page-container">
        <div className="page-content">
          <div className="page-inner" style={{ maxWidth: '600px', textAlign: 'center', paddingTop: '100px' }}>
            <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🏆</h1>
            <h2 style={{ fontSize: '28px', marginBottom: '15px', fontWeight: '700', color: '#1a1a1a' }}>Global Leaderboard</h2>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '30px', lineHeight: '1.6' }}>
              Login to compete with devotees worldwide and see your ranking!
            </p>
            <button
              onClick={() => openLogin('/leaderboard')}
              style={{
                padding: '15px 40px',
                fontSize: '18px',
                fontWeight: '600',
                backgroundColor: '#4285f4',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(66, 133, 244, 0.3)',
                transition: 'all 0.3s ease'
              }}
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
        <div className="page-inner" style={{ maxWidth: '1100px' }}>

          {/* Page Title */}
          <div className="leaderboard-header">
            <h1 className="leaderboard-main-title">🏆 Global Leaderboard</h1>
            <p className="leaderboard-subtitle">
              Compete with devotees worldwide in your spiritual journey
            </p>
          </div>

          {/* User Rank Card - shown when logged in */}
          {user && (
            <div className="user-rank-card">
              <div className="rank-circle">
                <div className="rank-number">#4</div>
                <div className="rank-label">Your Rank</div>
              </div>
              <div className="rank-details">
                <div className="rank-stat">
                  <span className="rank-stat-label">Total Users</span>
                  <span className="rank-stat-value">1,234</span>
                </div>
                <div className="rank-stat">
                  <span className="rank-stat-label">Top</span>
                  <span className="rank-stat-value">0.3%</span>
                </div>
              </div>
            </div>
          )}

          {/* Deity Selector */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#666'
            }}>
              📿 Select Deity for Rankings:
            </label>
            <select
              value={selectedDeity}
              onChange={(e) => setSelectedDeity(e.target.value)}
              style={{
                padding: '10px 15px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '2px solid #e0e0e0',
                backgroundColor: 'white',
                cursor: 'pointer',
                minWidth: '200px',
                fontWeight: '500'
              }}
            >
              {DEITIES.map(deity => (
                <option key={deity} value={deity}>{deity} Naam</option>
              ))}
            </select>
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
    </div>
  );
};

export default LeaderboardPage;