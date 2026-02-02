import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getHindiName } from '../utils/helpers';
import CenteredLayout from '../components/japa/CenteredLayout';
import RandomFloatAnimation from '../components/animation/RandomFloatAnimation';

const JapaCounter = ({ activeNaam, setActiveNaam, isDesktop, stats, onIncrement }) => {
  const { naam: urlNaam } = useParams();
  const { currentCount, totalMalas, totalJapa, todaysJapa } = stats;

  // Sync state with URL parameter if it exists
  useEffect(() => {
    if (urlNaam && urlNaam !== activeNaam && setActiveNaam) {
      setActiveNaam(urlNaam);
    }
  }, [urlNaam, activeNaam, setActiveNaam]);

  const [bursts, setBursts] = useState([]);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const burstIdRef = useRef(0);
  const isProcessingTapRef = useRef(false);

  // Trigger celebration on mala completion
  useEffect(() => {
    if (currentCount === 1 && totalJapa > 0) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [totalMalas, currentCount, totalJapa]);

  // Timer
  // ... rest of timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        setSecondsElapsed(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Handle visibility change (pause when tab is hidden)
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const removeBurst = useCallback((id) => {
    setBursts(prev => prev.filter(b => b.id !== id));
  }, []);

  const handleTap = useCallback((e) => {
    // Prevent rapid-fire duplicate taps
    if (isProcessingTapRef.current) return;

    isProcessingTapRef.current = true;
    setTimeout(() => {
      isProcessingTapRef.current = false;
    }, 40);

    const x = e.clientX;
    const y = e.clientY;

    if (onIncrement) onIncrement();

    const burstId = burstIdRef.current++;
    setBursts(prev => [...prev, { id: burstId, x, y }]);
  }, [onIncrement]);

  return (
    <>
      <div
        className="tap-area"
        onClick={handleTap}
      >
        <div className="centered-content">
          <CenteredLayout
            activeNaam={activeNaam}
            currentCount={currentCount}
            malaCount={totalMalas}
            totalJapa={totalJapa}
            todaysJapa={todaysJapa}
            secondsElapsed={secondsElapsed}
            formatTime={formatTime}
            getHindiName={getHindiName}
            isDesktop={isDesktop}
            showCelebration={showCelebration}
          />
        </div>
      </div>

      {/* Floating Bursts */}
      {bursts.map(burst => (
        <RandomFloatAnimation
          key={burst.id}
          position={{ x: burst.x, y: burst.y }}
          naam={getHindiName(activeNaam)}
          onFinish={() => removeBurst(burst.id)}
        />
      ))}
    </>
  );
};

export default JapaCounter;
