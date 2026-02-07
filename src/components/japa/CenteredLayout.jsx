import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressCircle from './ProgressCircle';
import AestheticStatCard from './AestheticStatCard';

const CenteredLayout = ({
    activeNaam, currentCount, malaCount, totalJapa, todaysJapa,
    secondsElapsed, formatTime, getHindiName, isDesktop, showCelebration
}) => {
    return (
        <div className="centered-layout flex flex-col items-center w-full">
            <h1
                className="title-text animate-fade-in-down"
            >
                {getHindiName(activeNaam)} नाम जप
            </h1>



            {/* Aesthetic Stats Button - Moved Above */}
            {/* Aesthetic Stats Button - Moved Above */}
            <div
                className="flex gap-4 justify-center items-center w-full mb-6 z-20 relative"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}
            >
                <button
                    className="view-stats-btn animate-fade-in-up delay-200"
                    style={{
                        width: '150px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '0 8px',
                        background: 'rgba(255, 255, 255, 0.4)'
                    }}
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering tap count
                        window.location.href = '/statistics';
                    }}
                    aria-label="Save My Progress"
                >
                    <span className="stats-icon">📊</span>
                    <span className="stats-label text-xs font-medium">Save Progress</span>
                </button>

                <button
                    className="view-stats-btn animate-fade-in-up delay-250"
                    style={{
                        width: '150px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '0 8px',
                        background: 'rgba(255, 255, 255, 0.4)'
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = '/leaderboard';
                    }}
                    aria-label="Check my Rank"
                >
                    <span className="stats-icon">🏆</span>
                    <span className="stats-label text-xs font-medium">Check Rank</span>
                </button>
            </div>

            <div
                className="progress-circle-container animate-zoom-in delay-300"
            >
                <ProgressCircle
                    count={currentCount}
                    size={180}
                    showCelebration={showCelebration}
                    secondsElapsed={secondsElapsed}
                    formatTime={formatTime}
                />
            </div>

            <div
                className="stats-container stats-wrapper animate-slide-up delay-500"
                aria-label="Spiritual Chanting Statistics"
            >
                <AestheticStatCard icon="📿" title="Malas" value={malaCount.toString()} isCompact={true} />
                <AestheticStatCard icon="🌸" title="Total" value={totalJapa.toString()} isCompact={true} />
                <AestheticStatCard icon="📅" title="Today" value={todaysJapa.toString()} isCompact={true} />
            </div>
        </div>
    );
};

export default CenteredLayout;
