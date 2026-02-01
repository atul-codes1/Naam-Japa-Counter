import React, { useRef } from 'react';

const BubbleBurst = ({ position, onFinish }) => {
    const style = useRef({});

    if (!style.current.animation) {
        const angle = Math.random() * 2 * Math.PI;
        const dist = 25;
        const size = 4 + Math.random() * 4;
        const offsetX = Math.cos(angle) * dist;
        const offsetY = Math.sin(angle) * dist;

        style.current = {
            position: 'absolute',
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: `${size}px`,
            height: `${size}px`,
            '--tx': `${offsetX}px`,
            '--ty': `${offsetY}px`,
            animation: 'bubbleBurst 0.6s ease-out forwards',
        };
    }

    return (
        <div
            className="bubble-burst"
            style={style.current}
            onAnimationEnd={onFinish}
        />
    );
};

export default BubbleBurst;
