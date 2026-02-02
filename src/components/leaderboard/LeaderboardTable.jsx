import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { getLeaderboard } from '../../services/leaderboardService';

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

    async function fetchLeaderboard() {
      setLoading(true);

      try {
        // Race against a 10-second timeout
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timed out')), 10000)
        );

        const dataPromise = getLeaderboard(deity, interval);
        const leaderboardData = await Promise.race([dataPromise, timeoutPromise]);

        setData(leaderboardData || []);
      } catch (error) {
        console.error('LeaderboardTable: Error:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
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
        <p>No devotees found for {deity} Naam {interval === 'daily' ? 'today' : `this ${interval.replace('ly', '')}`}.
          Be the first to start chanting!</p>
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