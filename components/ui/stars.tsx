'use client';

import { useEffect, useRef } from 'react';

interface StarsBackgroundProps {
  className?: string;
}

export function StarsBackground({ className = '' }: StarsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star field configuration
    const stars: Array<{
      x: number;
      y: number;
      z: number;
      prevX: number;
      prevY: number;
    }> = [];

    // Create stars with more randomization
    const numStars = 300;
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        prevX: 0,
        prevY: 0,
      });
    }

    // Animation loop with more randomization
    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star, index) => {
        star.prevX = star.x;
        star.prevY = star.y;
        
        // More randomized movement speed
        const speedVariation = 0.1 + (Math.sin(Date.now() * 0.001 + index * 0.1) * 0.1);
        star.z -= 0.2 + speedVariation;

        if (star.z <= 0) {
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
          star.z = 800 + Math.random() * 400; // Vary reset depth
        }

        // Add slight random drift
        const driftX = (Math.random() - 0.5) * 0.5;
        const driftY = (Math.random() - 0.5) * 0.5;
        
        const x = (star.x - canvas.width / 2) * (200 / star.z) + canvas.width / 2 + driftX;
        const y = (star.y - canvas.height / 2) * (200 / star.z) + canvas.height / 2 + driftY;

        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
          const opacity = Math.min(1, (1000 - star.z) / 1000);
          const size = Math.max(0.2, (1000 - star.z) / 400) + Math.random() * 0.3;
          
          // More varied star colors with twinkling effect
          const colorVariation = Math.random();
          const twinkle = 0.8 + Math.random() * 0.4; // Twinkling effect
          let starColor;
          if (colorVariation < 0.6) {
            // White stars (most common)
            starColor = `rgba(255, 255, 255, ${opacity * twinkle})`;
          } else if (colorVariation < 0.8) {
            // Blue-white stars
            starColor = `rgba(200, 220, 255, ${opacity * twinkle})`;
          } else if (colorVariation < 0.95) {
            // Yellow-white stars
            starColor = `rgba(255, 248, 200, ${opacity * twinkle})`;
          } else {
            // Rare blue stars
            starColor = `rgba(150, 180, 255, ${opacity * twinkle})`;
          }

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = starColor;
          ctx.fill();

          // Draw star trail with more variation
          if (star.prevX !== 0 && star.prevY !== 0) {
            ctx.beginPath();
            ctx.moveTo(star.prevX, star.prevY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = starColor.replace(/[\d.]+\)$/g, `${opacity * 0.15 * twinkle})`);
            ctx.lineWidth = 0.2 + Math.random() * 0.2;
            ctx.stroke();
          }
        }

        star.x = x;
        star.y = y;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ background: 'transparent' }}
    />
  );
}
