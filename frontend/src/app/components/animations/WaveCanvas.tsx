'use client';

/**
 * Wave Canvas Animation
 * Smooth wave animation for footer background
 */

import { useEffect, useRef } from 'react';

export default function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setCanvasSize();

    let animationId: number;
    let frame = 0;

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw multiple waves
      const waves = [
        { amplitude: 20, frequency: 0.02, speed: 0.03, color: 'rgba(99, 102, 241, 0.1)' },
        { amplitude: 15, frequency: 0.03, speed: 0.02, color: 'rgba(139, 92, 246, 0.1)' },
        { amplitude: 25, frequency: 0.015, speed: 0.025, color: 'rgba(236, 72, 153, 0.1)' },
      ];

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);

        for (let x = 0; x < canvas.width; x++) {
          const y =
            canvas.height / 2 +
            Math.sin(x * wave.frequency + frame * wave.speed) * wave.amplitude;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      frame++;
      animationId = requestAnimationFrame(drawWave);
    };

    drawWave();

    // Handle resize
    const handleResize = () => {
      setCanvasSize();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 w-full h-32 pointer-events-none"
    />
  );
}

