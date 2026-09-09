'use client';

import { useEffect, useMemo, useState } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Container, ISourceOptions } from '@tsparticles/engine';

export function AnimatedBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    // Cargar el motor de partículas
    const initParticles = async () => {
      try {
        // Importar dinámicamente el motor
        const { initParticlesEngine } = await import('@tsparticles/react');
        await initParticlesEngine(async (engine) => {
          await loadSlim(engine);
        });
        setInit(true);
      } catch (error) {
        console.error('Error initializing particles:', error);
        // Si falla, igual mostramos el fondo
        setInit(true);
      }
    };

    initParticles();
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: 'grab',
          },
          onClick: {
            enable: true,
            mode: 'push',
          },
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 0.2,
            },
          },
          push: {
            quantity: 4,
          },
        },
      },
      particles: {
        color: {
          value: ['#3b82f6', '#8b5cf6', '#06b6d4', '#ec4899', '#fbbf24'],
        },
        links: {
          color: '#3b82f6',
          distance: 150,
          enable: true,
          opacity: 0.15,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'out',
          },
          random: true,
          speed: 0.8,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.4,
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 4 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
}