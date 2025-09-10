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

    // Create stars
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

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.prevX = star.x;
        star.prevY = star.y;
        star.z -= 0.3;

        if (star.z <= 0) {
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
          star.z = 1000;
        }

        const x = (star.x - canvas.width / 2) * (200 / star.z) + canvas.width / 2;
        const y = (star.y - canvas.height / 2) * (200 / star.z) + canvas.height / 2;

        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
          const opacity = Math.min(1, (1000 - star.z) / 1000);
          const size = Math.max(0.3, (1000 - star.z) / 300);
          
          // Create more varied star colors
          const colorVariation = Math.random();
          let starColor;
          if (colorVariation < 0.7) {
            // White stars (most common)
            starColor = `rgba(255, 255, 255, ${opacity})`;
          } else if (colorVariation < 0.85) {
            // Blue-white stars
            starColor = `rgba(200, 220, 255, ${opacity})`;
          } else if (colorVariation < 0.95) {
            // Yellow-white stars
            starColor = `rgba(255, 248, 200, ${opacity})`;
          } else {
            // Rare blue stars
            starColor = `rgba(150, 180, 255, ${opacity})`;
          }

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = starColor;
          ctx.fill();

          // Draw star trail with matching color
          if (star.prevX !== 0 && star.prevY !== 0) {
            ctx.beginPath();
            ctx.moveTo(star.prevX, star.prevY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = starColor.replace(/[\d.]+\)$/g, `${opacity * 0.2})`);
            ctx.lineWidth = 0.3;
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
