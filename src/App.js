import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import JapaCounterPage from './pages/JapaCounterPage';
import NaamLibraryPage from './pages/NaamLibraryPage';
import PremanandJiPage from './pages/PremanandJiPage';
import StatisticsPage from './pages/StatisticsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import FullCenteredBackground from './components/common/FullCenteredBackground';
import MobileDrawer from './components/common/MobileDrawer';
import Header from './components/common/Header';
import WebFooter from './components/common/WebFooter';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNaam, setActiveNaam] = useState('Radha');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // --- PERSISTENCE & GLOBAL STATE ---
  const [japaStats, setJapaStats] = useState(() => {
    const saved = localStorage.getItem('japa_stats');
    return saved ? JSON.parse(saved) : {};
  });

  // Save to localStorage whenever stats change
  useEffect(() => {
    localStorage.setItem('japa_stats', JSON.stringify(japaStats));
  }, [japaStats]);

  const getTodayStr = () => new Date().toISOString().split('T')[0];

  const updateJapaCount = (naam) => {
    const today = getTodayStr();

    setJapaStats(prev => {
      const stats = { ...prev };
      if (!stats[naam]) {
        stats[naam] = {
          currentCount: 0,
          lifetime: { totalCounts: 0, totalMalas: 0 },
          history: {}
        };
      }

      const deity = { ...stats[naam] };
      deity.lifetime = { ...deity.lifetime };
      deity.history = { ...deity.history };

      // Increment counts
      deity.currentCount += 1;
      deity.lifetime.totalCounts += 1;

      // Ensure today's entry exists in history
      if (!deity.history[today]) {
        deity.history[today] = { counts: 0, malas: 0 };
      }
      deity.history[today].counts += 1;

      // Handle Mala completion
      if (deity.currentCount > 108) {
        deity.currentCount = 1;
        deity.lifetime.totalMalas += 1;
        deity.history[today].malas += 1;
      }

      stats[naam] = deity;
      return stats;
    });
  };

  const getDeityStats = (naam) => {
    const today = getTodayStr();
    const defaultStats = {
      currentCount: 0,
      totalMalas: 0,
      totalJapa: 0,
      todaysJapa: 0
    };

    if (!japaStats[naam]) return defaultStats;

    const deity = japaStats[naam];
    return {
      currentCount: deity.currentCount,
      totalMalas: deity.lifetime.totalMalas,
      totalJapa: deity.lifetime.totalCounts,
      todaysJapa: deity.history[today]?.counts || 0
    };
  };
  // ----------------------------------

  const isDesktop = windowWidth > 1000;

  // Handle Dynamic Document Titles & Meta Descriptions
  useEffect(() => {
    const path = location.pathname;
    let title = 'Japa Counter - Spiritual Mantra Chanting';
    let description = 'The most beautiful and simple Japa Counter for spiritual practitioners. Track your Naam Jaap of Radha, Krishna, Ram, and more.';

    if (path === '/') {
      title = 'Japa Counter - Spiritual Mantra Chanting';
      description = 'Start your spiritual journey with the best Japa Counter. Track your daily counts and spiritual progress with ease.';
      setActiveNaam('Radha');
    } else if (path.startsWith('/naam-japa-counter')) {
      const naamParam = path.split('/')[2];
      const displayName = naamParam || 'Mantra';
      title = `${displayName} Japa | Naam Library`;
      description = `Practice ${displayName} Japa with our aesthetic counter. Part of the ultimate Naam Library for spiritual chanting.`;
    } else if (path === '/premanand-ji-maharaj') {
      title = 'Pujya Shri Premanand Ji Maharaj | Japa Counter';
      description = 'Connecting you to the teachings of Pujya Shri Premanand Ji Maharaj and supporting your daily Naam Jaap practice.';
    } else if (path === '/statistics') {
      title = 'Spiritual Insights | Japa Counter Statistics';
      description = 'Analyze your spiritual journey with detailed statistics and insights. View your lifetime malas and daily progress.';
    }

    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    window.scrollTo(0, 0);
  }, [location]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectNaam = (naam) => {
    setActiveNaam(naam);
    navigate(`/naam-japa-counter/${naam}`);
  };


  return (
    <div className="app-container">
      {/* Background */}
      <FullCenteredBackground />

      {/* Mobile Drawer */}
      {!isDesktop && (
        <MobileDrawer
          isOpen={isDrawerOpen}
          activeNaam={activeNaam}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Header */}
      <Header
        activeNaam={activeNaam}
        isDesktop={isDesktop}
        onMenuClick={() => setIsDrawerOpen(true)}
      />

      {/* Main Content */}
      <div className="main-content">
        <div className="scroll-container" key={location.pathname}>
          <Routes>
            <Route
              path="/"
              element={
                <JapaCounterPage
                  activeNaam={activeNaam}
                  isDesktop={isDesktop}
                  stats={getDeityStats(activeNaam)}
                  onIncrement={() => updateJapaCount(activeNaam)}
                />
              }
            />
            <Route
              path="/naam-japa-counter"
              element={
                <NaamLibraryPage
                  onSelectNaam={handleSelectNaam}
                />
              }
            />
            <Route
              path="/naam-japa-counter/:naam"
              element={
                <JapaCounterPage
                  activeNaam={activeNaam}
                  setActiveNaam={setActiveNaam}
                  isDesktop={isDesktop}
                  stats={getDeityStats(activeNaam)}
                  onIncrement={() => updateJapaCount(activeNaam)}
                />
              }
            />
            <Route
              path="/premanand-ji-maharaj"
              element={<PremanandJiPage />}
            />
            <Route
              path="/statistics"
              element={
                <ProtectedRoute>
                  <StatisticsPage japaStats={japaStats} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <LeaderboardPage />
                </ProtectedRoute>
              }
            />
          </Routes>

          {!location.pathname.startsWith('/naam-japa-counter/') && (
            <WebFooter isDesktop={windowWidth > 900} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
