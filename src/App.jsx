import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ProtectedRoute from './components/auth/ProtectedRoute';
import FullCenteredBackground from './components/layout/FullCenteredBackground';
import MobileDrawer from './components/layout/MobileDrawer';
import Header from './components/layout/Header';
import WebFooter from './components/layout/WebFooter';
import useAuth from './hooks/useAuth';
import { useSync } from './context/SyncContext';
import BottomNavigation from './components/layout/BottomNavigation';

// Lazy Load Pages for Performance
const JapaCounterPage = lazy(() => import('./pages/JapaCounterPage'));
const NaamLibraryPage = lazy(() => import('./pages/NaamLibraryPage'));
const PremanandJiPage = lazy(() => import('./pages/PremanandJiPage'));
const StatisticsPage = lazy(() => import('./pages/StatisticsPage'));
const LeaderboardPage = lazy(() => import('./pages/LeaderboardPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const RefundPage = lazy(() => import('./pages/RefundPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Loading Fallback
const PageLoader = () => (
  <div className="app-loader">
    <div className="loader-spinner"></div>
  </div>
);

function App() {
  const { user } = useAuth();
  const { updateJapaCount, getDeityStats, allMergedStats } = useSync();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNaam, setActiveNaam] = useState('Radha');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);

  const isDesktop = windowWidth > 1000;

  // Handle URL-based Active Naam setting (moved from manual title logic to simple state sync)
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setActiveNaam('Radha');
    }

    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);

  // Listen for drawer toggle from bottom nav
  useEffect(() => {
    const handleDrawerToggle = () => setIsDrawerOpen(prev => !prev);
    window.addEventListener('toggle-drawer', handleDrawerToggle);
    return () => window.removeEventListener('toggle-drawer', handleDrawerToggle);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // PWA Install Logic
  useEffect(() => {
    console.log('PWA Detection Started');
    const handler = (e) => {
      console.log('beforeinstallprompt fired');
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('App is running in STANDALONE mode');
      setIsPWAInstalled(true);
    }

    const appInstalledHandler = () => {
      console.log('App was successfully installed');
      setIsPWAInstalled(true);
      setDeferredPrompt(null);
    };
    window.addEventListener('appinstalled', appInstalledHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', appInstalledHandler);
    };
  }, []);

  console.log('App Render State:', { isPWAInstalled, hasDeferredPrompt: !!deferredPrompt });

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
          deferredPrompt={deferredPrompt}
          isPWAInstalled={isPWAInstalled}
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
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="scroll-container"
          >
            <Suspense fallback={<PageLoader />}>
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
                      <StatisticsPage japaStats={allMergedStats} />
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
                {/* Footer Pages */}
                <Route path="/about" element={<AboutPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/refund" element={<RefundPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </Suspense>

            {!location.pathname.startsWith('/naam-japa-counter/') && (
              <WebFooter isDesktop={windowWidth > 900} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      {!isDesktop && <BottomNavigation />}
    </div>
  );
}

export default App;
