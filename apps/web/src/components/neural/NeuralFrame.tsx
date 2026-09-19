'use client';

import { useEffect, useState } from 'react';

export function NeuralFrame() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  // Optimización de listener de mouse con rAF
  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMousePos({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Listener de scroll de alta precisión
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Posiciones relativas
  const mouseXRel = typeof window !== 'undefined' ? mousePos.x / window.innerWidth : 0.5;
  const mouseYRel = typeof window !== 'undefined' ? mousePos.y / window.innerHeight : 0.5;

  return (
    <>
      {/* ============================================================
          1. MARCO SUPERIOR (ESCÁNER NERVIOSO)
          ============================================================ */}
      <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
        {/* Línea base somatosensorial */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#FF5A36]/20 to-transparent" />

        {/* Haz de escaneo reactivo al mouse */}
        <div
          className="h-[1px] bg-gradient-to-r from-transparent via-[#FF5A36] to-transparent opacity-80"
          style={{
            transform: `translateX(${mouseXRel * 100 - 50}%)`,
            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 0 10px rgba(255, 90, 54, 0.8)',
          }}
        />

        {/* Esquina superior izquierda - Nodo Receptor */}
        <div className="absolute top-0 left-0">
          <div className="w-14 h-[1px] bg-gradient-to-r from-[#FF5A36]/80 to-transparent" />
          <div className="w-[1px] h-14 bg-gradient-to-b from-[#FF5A36]/80 to-transparent absolute top-0 left-0" />
          <div className="w-2 h-2 absolute top-[3px] left-[3px]">
            <div className="w-full h-full bg-[#FF5A36] rounded-full animate-ping shadow-[0_0_10px_#FF5A36]" />
          </div>
        </div>

        {/* Esquina superior derecha - Nodo Receptor */}
        <div className="absolute top-0 right-0">
          <div className="w-14 h-[1px] bg-gradient-to-l from-[#FF5A36]/80 to-transparent" />
          <div className="w-[1px] h-14 bg-gradient-to-b from-[#FF5A36]/80 to-transparent absolute top-0 right-0" />
          <div className="w-2 h-2 absolute top-[3px] right-[3px]">
            <div className="w-full h-full bg-[#FF5A36] rounded-full animate-ping shadow-[0_0_10px_#FF5A36]" />
          </div>
        </div>

        {/* Barra telemetría de scroll somática */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#FF5A36] via-sky-400 to-[#FF5A36]"
          style={{
            width: `${scrollProgress * 100}%`,
            transition: 'width 0.15s ease-out',
            boxShadow: '0 0 14px rgba(255, 90, 54, 0.9)',
          }}
        />
      </div>

      {/* ============================================================
          2. MARCO INFERIOR (RETROALIMENTACIÓN BIOMÉTRICA)
          ============================================================ */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] pointer-events-none">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#38BDF8]/20 to-transparent" />

        {/* Esquina inferior izquierda */}
        <div className="absolute bottom-0 left-0">
          <div className="w-14 h-[1px] bg-gradient-to-r from-[#38BDF8]/70 to-transparent" />
          <div className="w-[1px] h-14 bg-gradient-to-t from-[#38BDF8]/70 to-transparent absolute bottom-0 left-0" />
          <div className="w-2 h-2 absolute bottom-[3px] left-[3px]">
            <div className="w-full h-full bg-[#38BDF8] rounded-full animate-pulse shadow-[0_0_8px_#38BDF8]" />
          </div>
        </div>

        {/* Esquina inferior derecha */}
        <div className="absolute bottom-0 right-0">
          <div className="w-14 h-[1px] bg-gradient-to-l from-[#38BDF8]/70 to-transparent" />
          <div className="w-[1px] h-14 bg-gradient-to-t from-[#38BDF8]/70 to-transparent absolute bottom-0 right-0" />
          <div className="w-2 h-2 absolute bottom-[3px] right-[3px]">
            <div className="w-full h-full bg-[#38BDF8] rounded-full animate-pulse shadow-[0_0_8px_#38BDF8]" />
          </div>
        </div>
      </div>

      {/* ============================================================
          3. LATERALES RECEPTORES (SENSORES EJE Y)
          ============================================================ */}
      <div className="fixed top-0 bottom-0 left-0 z-[100] pointer-events-none">
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#FF5A36]/15 to-transparent" />

        {/* Módulos cinéticos laterales */}
        <div
          className="absolute top-[35%] left-1 flex flex-col gap-1.5"
          style={{
            opacity: 0.4 + mouseYRel * 0.5,
            transition: 'opacity 0.4s ease',
          }}
        >
          <div className="w-[2px] h-3 bg-[#FF5A36]/50 shadow-[0_0_6px_#FF5A36]" />
          <div className="w-[2px] h-8 bg-[#FF5A36]/80 shadow-[0_0_8px_#FF5A36]" />
          <div className="w-[2px] h-2 bg-[#FF5A36]/30" />
        </div>
      </div>

      <div className="fixed top-0 bottom-0 right-0 z-[100] pointer-events-none">
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#38BDF8]/15 to-transparent" />

        <div
          className="absolute top-[35%] right-1 flex flex-col gap-1.5 items-end"
          style={{
            opacity: 0.4 + (1 - mouseYRel) * 0.5,
            transition: 'opacity 0.4s ease',
          }}
        >
          <div className="w-[2px] h-2 bg-[#38BDF8]/30" />
          <div className="w-[2px] h-5 bg-[#38BDF8]/60 shadow-[0_0_6px_#38BDF8]" />
          <div className="w-[2px] h-8 bg-[#38BDF8]/90 shadow-[0_0_8px_#38BDF8]" />
        </div>
      </div>

      {/* ============================================================
          4. IMPULSOS NERVOSOS FLOTANTES EN EL BORDE
          ============================================================ */}
      <div className="fixed inset-0 z-[99] pointer-events-none overflow-hidden">
        {/* Pulsos axonales superiores */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`top-${i}`}
            className="absolute w-[2.5px] h-[2.5px] rounded-full bg-[#FF5A36]"
            style={{
              top: '5px',
              left: `${12 + i * 15}%`,
              animation: `neuralPulse ${1.8 + i * 0.25}s ease-in-out infinite`,
              animationDelay: `${i * 0.12}s`,
              boxShadow: '0 0 10px #FF5A36',
            }}
          />
        ))}

        {/* Pulsos axonales inferiores */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`bottom-${i}`}
            className="absolute w-[2.5px] h-[2.5px] rounded-full bg-[#38BDF8]"
            style={{
              bottom: '5px',
              left: `${18 + i * 13}%`,
              animation: `neuralPulse ${2.2 + i * 0.2}s ease-in-out infinite`,
              animationDelay: `${i * 0.18}s`,
              boxShadow: '0 0 10px #38BDF8',
            }}
          />
        ))}
      </div>

      {/* ============================================================
          5. ONDA DE TRANSMISIÓN SINÁPTICA (SCROLL PULSE)
          ============================================================ */}
      <div
        className="fixed left-0 right-0 h-[1px] z-[101] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, #FF5A36, #38BDF8, transparent)',
          top: `${scrollProgress * 100}%`,
          transition: 'top 0.08s ease-out',
          opacity: 0.7,
          boxShadow: '0 0 18px rgba(255, 90, 54, 0.8)',
        }}
      />
    </>
  );
}