// src/components/GlitchWrapper.jsx
import React, { useEffect, useRef } from 'react';
import { PowerGlitch } from 'powerglitch';

export default function GlitchWrapper({ children }) {
  const glitchRef = useRef();

  useEffect(() => {
    const glitch = PowerGlitch.glitch(glitchRef.current, {
      playMode: 'always',
      createContainers: true,
      hideOverflow: false,
      timing: {
        duration: 3000, // Total glitch interval (3 sec)
        iterations: Infinity,
        easing: 'ease-in-out',
      },
      glitchTimeSpan: {
        start: 0,
        end: 0.7, // Glitch effect lasts 70% of the duration
      },
    });

    return () => glitch.stop();
  }, []);

  return <div ref={glitchRef}>{children}</div>;
}
