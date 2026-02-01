import React from 'react';
import ProgressCircle from './ProgressCircle';
import AestheticStatCard from './AestheticStatCard';

const CenteredLayout = ({
    activeNaam, currentCount, malaCount, totalJapa, todaysJapa,
    secondsElapsed, formatTime, getHindiName, isDesktop, showCelebration
}) => {
    return (
        <div className="centered-layout">
            <h1 className="title-text">
                {getHindiName(activeNaam)} नाम जप
            </h1>

            <div className="timer-badge" style={{ marginTop: '15px' }}>
                <span className="timer-icon">⏰</span>
                <span className="timer-text">{formatTime(secondsElapsed)}</span>
            </div>

            <div style={{ marginTop: '30px' }}>
                <ProgressCircle count={currentCount} size={180} showCelebration={showCelebration} />
            </div>

            <div className="stats-container" style={{ marginTop: '30px' }} aria-label="Spiritual Chanting Statistics">
                <AestheticStatCard icon="📿" title="Malas" value={malaCount.toString()} isCompact={true} />
                <AestheticStatCard icon="🌸" title="Total" value={totalJapa.toString()} isCompact={true} />
                <AestheticStatCard icon="📅" title="Today" value={todaysJapa.toString()} isCompact={true} />
            </div>
        </div>
    );
};

export default CenteredLayout;
