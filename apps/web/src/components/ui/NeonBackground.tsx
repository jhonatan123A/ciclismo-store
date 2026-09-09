'use client';

import { useEffect, useRef } from 'react';

export function NeonBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Colores neón: cian y verde azulado
    const neonColors = [
      'rgba(6, 182, 212, 0.06)',   // Cian
      'rgba(20, 184, 166, 0.06)',  // Verde azulado
      'rgba(6, 182, 212, 0.04)',   // Cian claro
      'rgba(20, 184, 166, 0.04)',  // Verde azulado claro
    ];

    // Crear círculos de humo neón
    const circles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;
      opacity: number;
      grow: number;
    }> = [];

    for (let i = 0; i < 30; i++) {
      circles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 60 + Math.random() * 250,
        color: neonColors[Math.floor(Math.random() * neonColors.length)],
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: 0.3 + Math.random() * 0.5,
        grow: 0.5 + Math.random() * 0.5,
      });
    }

    // Partículas de neón
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }> = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1 + Math.random() * 3,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: 0.1 + Math.random() * 0.3,
        color: Math.random() > 0.5 ? '#06b6d4' : '#14b8a6',
      });
    }

    // Ondas de neón
    const waves: Array<{
      y: number;
      amplitude: number;
      frequency: number;
      speed: number;
      phase: number;
      color: string;
      width: number;
    }> = [];

    for (let i = 0; i < 5; i++) {
      waves.push({
        y: height * (0.1 + i * 0.2),
        amplitude: 20 + Math.random() * 60,
        frequency: 0.003 + Math.random() * 0.005,
        speed: 0.2 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        color: i % 2 === 0 ? 'rgba(6, 182, 212, 0.03)' : 'rgba(20, 184, 166, 0.03)',
        width: 1.5 + Math.random() * 1.5,
      });
    }

    let time = 0;

    function drawNeonGlow(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.5, color.replace('0.06', '0.03'));
      gradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Brillo interno
      const innerGradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 0.3);
      innerGradient.addColorStop(0, color.replace('0.06', '0.12'));
      innerGradient.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(x, y, radius * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = innerGradient;
      ctx.fill();
    }

    function animate() {
      time += 0.005;
      ctx.clearRect(0, 0, width, height);

      // Fondo oscuro
      const bgGradient = ctx.createRadialGradient(
        width * 0.5, height * 0.5, 0,
        width * 0.5, height * 0.5, width * 0.8
      );
      bgGradient.addColorStop(0, '#0a0a0a');
      bgGradient.addColorStop(1, '#000000');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Dibujar círculos de humo neón
      circles.forEach((circle) => {
        circle.x += circle.speedX;
        circle.y += circle.speedY;
        circle.radius += Math.sin(time + circle.x * 0.001) * circle.grow * 0.1;

        if (circle.x < -circle.radius) circle.x = width + circle.radius;
        if (circle.x > width + circle.radius) circle.x = -circle.radius;
        if (circle.y < -circle.radius) circle.y = height + circle.radius;
        if (circle.y > height + circle.radius) circle.y = -circle.radius;

        drawNeonGlow(ctx, circle.x, circle.y, circle.radius, circle.color);
      });

      // Dibujar partículas de neón
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        gradient.addColorStop(0, p.color + '80');
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '60';
        ctx.fill();
      });

      // Dibujar ondas de neón
      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, wave.y);

        for (let x = 0; x <= width; x += 2) {
          const y = wave.y +
            Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude +
            Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 0.7 + wave.phase * 0.5) * wave.amplitude * 0.4;

          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.width;
        ctx.shadowColor = wave.color;
        ctx.shadowBlur = 20;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
}