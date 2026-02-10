import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getHindiName } from '@/utils/helpers';
import CenteredLayout from '@/components/japa/CenteredLayout';
import RandomFloatAnimation from '@/components/animation/RandomFloatAnimation';
import SEO from '@/components/common/SEO';
import SEOContentSection from '@/components/layout/SEOContentSection';
import { deityContent, homeContent } from '@/data/seoContent';

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

    // Haptic Feedback (Premium Feel)
    if (navigator.vibrate) {
      try {
        // Different vibration for Mala completion
        if (currentCount === 107) { // next count will be 108
          navigator.vibrate([100, 50, 100]); // Two sharp pulses
        } else {
          navigator.vibrate(5); // Tiny tick
        }
      } catch (e) {
        // Ignore vibration errors
      }
    }

    if (onIncrement) onIncrement();

    const burstId = burstIdRef.current++;
    setBursts(prev => [...prev, { id: burstId, x, y }]);
  }, [onIncrement, currentCount]);

  // Determine content source
  const isHome = !urlNaam;
  const contentKey = isHome ? 'Home' : (deityContent[activeNaam] ? activeNaam : null);
  const currentContent = isHome ? homeContent : (deityContent[activeNaam] || {});

  // Prepare SEO Props
  const seoTitle = currentContent.title || `${activeNaam} Japa Counter`;
  const seoDesc = currentContent.description || `Track your ${activeNaam} Mantra Chanting online.`;
  const seoKeywords = currentContent.keywords || [];

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDesc}
        keywords={seoKeywords}
        url={window.location.href}
      />

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
            getHindiName={getHindiName}
            isDesktop={isDesktop}
            showCelebration={showCelebration}
            isPaused={isPaused}
          />
        </div>
      </div>

      {/* Rich Content - Uses Guru Card Style */}
      <SEOContentSection content={currentContent.content} />

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
