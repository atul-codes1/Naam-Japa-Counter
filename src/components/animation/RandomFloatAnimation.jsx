import React, { useRef } from 'react';

const RandomFloatAnimation = ({ position, naam, onFinish }) => {
  const style = useRef({});

  if (!style.current.animation) {
    const angleDeg = Math.random() * 90 + 30;
    const angle = -angleDeg * Math.PI / 180;
    const distance = 120;

    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    const verticalOffset = -40; // start 20px above tap

    style.current = {
      left: `${position.x}px`,
      top: `${position.y + verticalOffset}px`, // <-- shift above tap
      '--tx': `${tx}px`,
      '--ty': `${ty}px`,
      animation: 'floatUp 2s cubic-bezier(0.215, 0.61, 0.355, 1) forwards',
    };
  }

  return (
    <div
      className="float-animation"
      style={style.current}
      onAnimationEnd={onFinish}
    >
      {naam}
    </div>
  );
};

export default RandomFloatAnimation;
