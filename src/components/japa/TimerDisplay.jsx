import React, { useState, useEffect } from 'react';

const TimerDisplay = ({ isPaused }) => {
    const [secondsElapsed, setSecondsElapsed] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            if (!isPaused) {
                setSecondsElapsed(prev => prev + 1);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [isPaused]);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };

    return (
        <span className="timer-text">
            {formatTime(secondsElapsed)}
        </span>
    );
};

export default React.memo(TimerDisplay);
