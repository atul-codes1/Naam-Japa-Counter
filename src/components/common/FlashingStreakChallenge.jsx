import React, { useState, useEffect } from 'react';

const FlashingStreakChallenge = () => {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        let forward = false;
        const interval = setInterval(() => {
            setOpacity(prev => {
                if (prev >= 1) forward = false;
                if (prev <= 0.25) forward = true;
                return forward ? prev + 0.025 : prev - 0.025;
            });
        }, 40);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="streak-challenge" style={{ opacity }}>
            <span className="streak-fire-icon">🔥</span>
            <span className="streak-text">Streak Challenge</span>
        </div>
    );
};

export default FlashingStreakChallenge;
