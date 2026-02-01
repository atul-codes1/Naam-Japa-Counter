import React, { useState, useEffect } from 'react';
import { interpolateColor } from '../../utils/helpers';

const FullCenteredBackground = () => {
    const [animValue, setAnimValue] = useState(0);

    useEffect(() => {
        let startTime = Date.now();
        let animationId;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = (elapsed % 20000) / 20000;
            const value = progress < 0.5
                ? progress * 2
                : 2 - (progress * 2);

            setAnimValue(value);
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, []);

    const color1 = interpolateColor('#FFF9FA', '#FFE4E8', animValue);

    return (
        <div
            className="background"
            style={{
                background: `radial-gradient(circle at center, ${color1} ${20 * (1 + animValue * 0.2)}%, #FCE4EC 100%)`,
            }}
        />
    );
};

export default FullCenteredBackground;
