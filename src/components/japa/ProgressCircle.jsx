import React, { useState, useEffect, useRef, useCallback } from 'react';
import BubbleBurst from '../animation/BubbleBurst';
import CelebrationStars from '../animation/CelebrationStars';

const ProgressCircle = ({ count, size, showCelebration, secondsElapsed, formatTime }) => {
    const progress = (count % 109) / 108;
    const [scale, setScale] = useState(1);
    const [bubbles, setBubbles] = useState([]);
    const bubbleIdRef = useRef(0);

    useEffect(() => {
        setScale(0.8);
        const timer = setTimeout(() => setScale(1), 150);
        return () => clearTimeout(timer);
    }, [count]);

    // Trigger bubble burst on count change
    useEffect(() => {
        if (count > 0) {
            // Calculate tip position
            const radius = size / 2 - 10;
            const angle = (progress * 2 * Math.PI) - (Math.PI / 2); // -90 degrees offset
            const centerX = size / 2;
            const centerY = size / 2;
            const tipX = centerX + (radius * Math.cos(angle));
            const tipY = centerY + (radius * Math.sin(angle));

            // Create multiple small bubbles
            const newBubbles = [];
            const bubbleCount = 3 + Math.floor(Math.random() * 3); // 3-5 bubbles

            for (let i = 0; i < bubbleCount; i++) {
                newBubbles.push({
                    id: bubbleIdRef.current++,
                    x: tipX,
                    y: tipY,
                });
            }

            setBubbles(prev => [...prev, ...newBubbles]);
        }
    }, [count, progress, size]);

    const removeBubble = useCallback((id) => {
        setBubbles(prev => prev.filter(b => b.id !== id));
    }, []);

    const circumference = 2 * Math.PI * (size / 2 - 10);
    const strokeDashoffset = circumference - (progress * circumference);

    return (
        <div className="progress-circle-wrapper" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="progress-svg">
                <defs>
                    <linearGradient id="japaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FF4081" />
                        <stop offset="100%" stopColor="#FF80AB" />
                    </linearGradient>
                </defs>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={size / 2 - 10}
                    className="progress-track"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={size / 2 - 10}
                    className="progress-bar"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
            </svg>

            <div
                className="progress-text-premium"
                style={{
                    transform: `scale(${scale})`
                }}
            >
                <span className="main-number" style={{ fontSize: size * 0.32 }}>
                    {count}
                </span>
                <span className="goal-number" style={{ fontSize: size * 0.12, marginTop: '5px', opacity: 0.6 }}>
                    / 108
                </span>
                <span className="progress-timer-mini">
                    {formatTime ? formatTime(secondsElapsed) : '00:00'}
                </span>
            </div>

            {/* Bubble bursts at progress tip */}
            {bubbles.map(bubble => (
                <BubbleBurst
                    key={bubble.id}
                    position={{ x: bubble.x, y: bubble.y }}
                    onFinish={() => removeBubble(bubble.id)}
                />
            ))}

            {/* Celebration stars on mala completion */}
            {showCelebration && <CelebrationStars size={size} />}
        </div>
    );
};

export default ProgressCircle;
