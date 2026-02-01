import React, { useRef } from 'react';

const CelebrationStars = ({ size }) => {
    const starCount = 12;
    const stars = Array.from({ length: starCount }, (_, i) => ({
        id: i,
        angle: (i / starCount) * 2 * Math.PI,
        delay: i * 50,
        size: 20 + Math.random() * 15,
        color: Math.random() > 0.5 ? '#FFD700' : '#FF4081',
    }));

    return (
        <>
            {stars.map(star => (
                <CelebrationStar
                    key={star.id}
                    angle={star.angle}
                    delay={star.delay}
                    starSize={star.size}
                    color={star.color}
                    circleSize={size}
                />
            ))}
        </>
    );
};

const CelebrationStar = ({ angle, delay, starSize, color, circleSize }) => {
    const style = useRef({});

    if (!style.current.animation) {
        const radius = circleSize / 2;
        const distance = 60;
        // Start position (center edge)
        const startX = radius + (Math.cos(angle) * radius);
        const startY = radius + (Math.sin(angle) * radius);

        // End translation relative to start
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        style.current = {
            position: 'absolute',
            left: `${startX}px`,
            top: `${startY}px`,
            fontSize: `${starSize}px`,
            color: color,
            '--tx': `${tx}px`,
            '--ty': `${ty}px`,
            animation: 'starBurst 1.5s ease-out forwards',
            animationDelay: `${delay}ms`,
            opacity: 0, // Start invisible until animation starts
        };
    }

    return (
        <div
            className="celebration-star"
            style={style.current}
        >
            ✨
        </div>
    );
};

export default CelebrationStars;
