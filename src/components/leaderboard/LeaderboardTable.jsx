import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { getLeaderboard } from '../../services/leaderboardService';

// Mock data generator for fallback
const makeMock = (n, currentUserId, interval) => {
  const list = [];
  const baseMultiplier = {
    daily: 1,
    monthly: 30,
    yearly: 365
  }[interval] || 1;

  for (let i = 1; i <= n; i++) {
    const counts = Math.max(0, Math.floor((2500 - i * 15) * baseMultiplier * (0.8 + Math.random() * 0.4)));
    const malas = Math.floor(counts / 108);

    list.push({
      rank: i,
      name: `Devotee ${i}`,
      userId: `user-${i}`,
      count: counts,
      malas: malas,
    });
  }

  // Insert current user at rank 4 if logged in
  if (currentUserId) {
    const userCounts = Math.floor(1800 * baseMultiplier);
    list.splice(3, 0, {
      rank: 4,
      name: 'You',
      userId: currentUserId,
      count: userCounts,
      malas: Math.floor(userCounts / 108),
      isCurrent: true,
    });

    // Adjust ranks after insertion
    list.forEach((item, idx) => {
      item.rank = idx + 1;
    });
  }

  return list.slice(0, 50);
};

const LeaderboardTable = ({ interval, deity }) => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setData([]);
      return;
    }

    console.log('📊 Loading leaderboard for', deity, interval);
    setLoading(true);

    // Show mock data immediately
    setTimeout(() => {
      const mockData = makeMock(50, user?.id, interval);
      console.log('✅ Mock data loaded:', mockData.length, 'users');
      setData(mockData);
      setLoading(false);
    }, 500); // Small delay to show it's loading

  }, [interval, deity, user]);

  const getMedalEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  const getRankBadge = (rank) => {
    const medal = getMedalEmoji(rank);
    if (medal) {
      return (
        <div className="rank-badge medal">
          <span className="medal-emoji">{medal}</span>
          <span className="rank-number-small">{rank}</span>
        </div>
      );
    }
    return (
      <div className="rank-badge">
        <span className="rank-number">{rank}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="leaderboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading rankings...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="leaderboard-loading">
        <p>No data available yet. Start chanting to appear on the leaderboard!</p>
      </div>
    );
  }

  return (
    <div className="leaderboard-table-wrapper">
      <table className="leaderboard-table-modern">
        <thead>
          <tr>
            <th className="th-rank">Rank</th>
            <th className="th-name">Devotee</th>
            <th className="th-counts">Total Counts</th>
            <th className="th-malas">Malas Completed</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={`${row.rank}-${row.userId}`}
              className={`
                table-row 
                ${row.userId === user?.id ? 'current-user-row' : ''} 
                ${row.rank <= 3 ? 'top-three' : ''}
                ${hoveredRow === index ? 'hovered' : ''}
              `}
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
              style={{
                animationDelay: `${index * 30}ms`,
              }}
            >
              <td className="td-rank">
                {getRankBadge(row.rank)}
              </td>
              <td className="td-name">
                <div className="name-cell">
                  <div className="avatar">
                    {row.name.charAt(0)}
                  </div>
                  <div className="name-info">
                    <span className="name-text">
                      {row.name}
                      {row.userId === user?.id && <span className="you-badge">YOU</span>}
                    </span>
                  </div>
                </div>
              </td>
              <td className="td-counts">
                <div className="count-cell">
                  <span className="count-number">{row.count.toLocaleString()}</span>
                  <span className="count-label">japa</span>
                </div>
              </td>
              <td className="td-malas">
                <div className="mala-cell">
                  <span className="mala-icon">📿</span>
                  <span className="mala-number">{row.malas}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;