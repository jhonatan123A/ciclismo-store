'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulse: number;
  pulseSpeed: number;
  color: string;
  colorRGB: string;
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const nodesRef = useRef<Node[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Paleta triádica
    const colors = [
      { hex: '#FF5A36', rgb: '255, 90, 54' },   // Naranja
      { hex: '#38BDF8', rgb: '56, 189, 248' },  // Cyan
      { hex: '#E8B94A', rgb: '232, 185, 74' },  // Dorado
    ];

    const createNodes = () => {
      const nodeCount = Math.min(80, Math.floor((width * height) / 20000));
      nodesRef.current = [];

      for (let i = 0; i < nodeCount; i++) {
        const baseRadius = 1 + Math.random() * 2;
        const colorIndex = Math.floor(Math.random() * colors.length);
        nodesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: baseRadius,
          baseRadius,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          color: colors[colorIndex].hex,
          colorRGB: colors[colorIndex].rgb,
        });
      }
    };

    createNodes();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      createNodes();
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      if (!ctx || !canvas) return;

      // Fondo oscuro
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height)
      );
      gradient.addColorStop(0, 'rgba(5, 5, 5, 0.95)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Actualizar nodos
      nodesRef.current.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        node.pulse += node.pulseSpeed;
        node.radius = node.baseRadius + Math.sin(node.pulse) * 0.5;

        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - node.x;
          const dy = mouseRef.current.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            const force = (200 - dist) / 200;
            node.x += dx * force * 0.008;
            node.y += dy * force * 0.008;
          }
        }
      });

      // Conexiones sinápticas con gradiente triádico
      const nodes = nodesRef.current;
      const connectionDistance = 150;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            let mouseBoost = 0;
            if (mouseRef.current.active) {
              const midX = (nodes[i].x + nodes[j].x) / 2;
              const midY = (nodes[i].y + nodes[j].y) / 2;
              const dxM = mouseRef.current.x - midX;
              const dyM = mouseRef.current.y - midY;
              const distM = Math.sqrt(dxM * dxM + dyM * dyM);
              if (distM < 150) {
                mouseBoost = (150 - distM) / 150;
              }
            }

            const opacity = (1 - dist / connectionDistance) * (0.15 + mouseBoost * 0.4);

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            // Gradiente entre los dos colores de los nodos
            const grad = ctx.createLinearGradient(
              nodes[i].x, nodes[i].y,
              nodes[j].x, nodes[j].y
            );
            grad.addColorStop(0, `rgba(${nodes[i].colorRGB}, ${opacity})`);
            grad.addColorStop(1, `rgba(${nodes[j].colorRGB}, ${opacity})`);

            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.5 + mouseBoost * 0.8;
            ctx.stroke();
          }
        }
      }

      // Dibujar nodos
      nodes.forEach((node) => {
        let mouseBoost = 0;
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - node.x;
          const dy = mouseRef.current.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            mouseBoost = (150 - dist) / 150;
          }
        }

        const pulseOpacity = 0.5 + Math.sin(node.pulse) * 0.3;
        const opacity = pulseOpacity + mouseBoost * 0.5;

        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * (4 + mouseBoost * 6)
        );
        gradient.addColorStop(0, `rgba(${node.colorRGB}, ${opacity * 0.8})`);
        gradient.addColorStop(0.5, `rgba(${node.colorRGB}, ${opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(${node.colorRGB}, 0)`);

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * (4 + mouseBoost * 6), 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${node.colorRGB}, ${opacity})`;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
}