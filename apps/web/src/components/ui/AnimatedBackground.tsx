'use client';

import { useEffect, useRef } from 'react';

export function AnimatedBackground() {
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

    // Mismos colores que tenías
    const colors = [
      'rgba(59, 130, 246, 0.15)',   // Azul
      'rgba(139, 92, 246, 0.15)',   // Morado
      'rgba(6, 182, 212, 0.12)',    // Cian
      'rgba(236, 72, 153, 0.10)',   // Rosa
      'rgba(251, 191, 36, 0.08)',   // Dorado
    ];

    // Círculos grandes (como las partículas de tsparticles)
    const circles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;
    }> = [];

    for (let i = 0; i < 20; i++) {
      circles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 80 + Math.random() * 200,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
      });
    }

    // Partículas pequeñas (como los puntos de tsparticles)
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1 + Math.random() * 4,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: 0.1 + Math.random() * 0.3,
      });
    }

    // Líneas de conexión (como los links de tsparticles)
    function drawLinks() {
      if (!ctx) return;   // ← Verificación de ctx
      const linkDistance = 150;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < linkDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - distance / linkDistance)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      if (!ctx || !canvas) return;   // ← Verificación de ctx y canvas
      ctx.clearRect(0, 0, width, height);

      // Dibujar círculos de colores
      circles.forEach((circle) => {
        circle.x += circle.speedX;
        circle.y += circle.speedY;

        if (circle.x < -circle.radius) circle.x = width + circle.radius;
        if (circle.x > width + circle.radius) circle.x = -circle.radius;
        if (circle.y < -circle.radius) circle.y = height + circle.radius;
        if (circle.y > height + circle.radius) circle.y = -circle.radius;

        const gradient = ctx.createRadialGradient(
          circle.x, circle.y, 0,
          circle.x, circle.y, circle.radius
        );
        gradient.addColorStop(0, circle.color);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Dibujar partículas
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      // Dibujar líneas de conexión
      drawLinks();

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