// src/components/VantaBackground.js
import React, { useEffect, useRef } from 'react';
import BIRDS from 'vanta/dist/vanta.birds.min';
import * as THREE from 'three';

const VantaBackground = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    const effect = BIRDS({
      el: vantaRef.current,
      THREE: THREE,
      backgroundColor: 0x3A0773,
      color1: 0x842EE5,
      color2: 0x2B0656,
    });

    return () => {
      if (effect) effect.destroy();
    };
  }, []);

  return <div ref={vantaRef} className="absolute top-0 right-0 bottom-0 left-0 z-0" />;
};

export default VantaBackground;
