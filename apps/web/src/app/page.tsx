'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProductShowcase } from '@/components/home/ProductShowcase';

export default function Home() {
  const [showUI, setShowUI] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowUI(true), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const goldTitanium = '#BFAE85';
  const goldLight = '#E5DCC0';
  const goldDark = '#8F7E45';

  const particles = [
    { left: '75%', top: '24%', delay: 0, size: 2, pulse: true },
    { left: '22%', top: '58%', size: 2, pulse: false },
    { left: '46%', top: '80%', delay: 8, size: 2, pulse: true },
  ];

  const beneficios = [
    {
      num: '01',
      titulo: 'Conexión sensorial',
      texto: 'La tecnología acompaña la información que recibe tu cuerpo.',
    },
    {
      num: '02',
      titulo: 'Control y estabilidad',
      texto: 'Una percepción corporal más precisa durante el movimiento.',
    },
    {
      num: '03',
      titulo: 'Movimiento optimizado',
      texto: 'Diseñada para acompañar cada etapa de tu entrenamiento.',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* ═══════════════════════════════════════════ */}
      {/* SECCIÓN 1: HERO NUEVO */}
      {/* ═══════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          background: '#0A0A0A',
          color: '#fff',
          overflow: 'hidden',
          fontFamily: 'Satoshi, sans-serif',
        }}
      >
        {/* FONDO: ondas + partículas */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            overflow: 'hidden',
          }}
        >
          <svg
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="wavePure" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0" />
                <stop offset="100%" stopColor="#000000" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="waveTitanium" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0f0f0f" stopOpacity="0" />
                <stop offset="100%" stopColor="#0f0f0f" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="lineSensorialMain" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#BFAE85" stopOpacity="0" />
                <stop offset="50%" stopColor="#E5DCC0" stopOpacity="0.004" />
                <stop offset="100%" stopColor="#BFAE85" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="lineSensorialSecond" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#BFAE85" stopOpacity="0" />
                <stop offset="50%" stopColor="#BFAE85" stopOpacity="0.002" />
                <stop offset="100%" stopColor="#BFAE85" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path
              d="M0,660 Q400,610 800,660 T1600,640 L1600,800 L0,800 Z"
              fill="url(#wavePure)"
            />
            <path
              d="M0,540 Q500,510 900,540 T1600,530 L1600,650 L0,650 Z"
              fill="url(#waveTitanium)"
              opacity="0.18"
            />
            <path
              d="M-100,280 C120,235 260,320 420,285 C580,250 720,335 880,300 C1040,265 1200,330 1400,290"
              fill="none"
              stroke="url(#lineSensorialMain)"
              strokeWidth="0.02"
              strokeLinecap="round"
            />
            <path
              d="M-100,470 C180,445 380,490 560,465 C740,440 920,485 1100,460 C1240,440 1320,455 1400,450"
              fill="none"
              stroke="url(#lineSensorialSecond)"
              strokeWidth="0.015"
              strokeLinecap="round"
            />
          </svg>

          <div className="particles-container">
            {particles.map((p, i) => (
              <span
                key={i}
                className={p.pulse ? 'particle particle-pulse' : 'particle particle-static'}
                style={{
                  left: p.left,
                  top: p.top,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  animationDelay: p.pulse ? `${p.delay}s` : undefined,
                }}
              />
            ))}
          </div>
        </div>

        {/* PRENDA */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            display: 'flex',
            justifyContent: isMobile ? 'center' : 'flex-end',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {isMobile ? (
            <img
              src="/images/hero/hero-prenda.png"
              alt="Prenda BESTIGE"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
                display: 'block',
                filter: 'contrast(1.4) saturate(0.65) brightness(0.9) hue-rotate(-12deg) sepia(0.12)',
              }}
            />
          ) : (
            <img
              src="/images/hero/hero-prenda.png"
              alt="Prenda BESTIGE"
              style={{
                height: '100%',
                width: 'auto',
                maxWidth: 'none',
                objectFit: 'cover',
                objectPosition: 'center center',
                display: 'block',
                filter: 'contrast(1.35) saturate(0.65) brightness(0.85) hue-rotate(-12deg) sepia(0.1)',
              }}
            />
          )}
        </div>

        {/* DEGRADADO */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: isMobile
              ? 'linear-gradient(180deg, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.5) 20%, rgba(10,10,10,0.6) 40%, rgba(10,10,10,0.95) 65%, rgba(10,10,10,1) 100%)'
              : 'linear-gradient(180deg, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.35) 20%, rgba(10,10,10,0.4) 40%, rgba(10,10,10,0.85) 65%, rgba(10,10,10,1) 100%), linear-gradient(90deg, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.3) 40%, rgba(10,10,10,0) 60%)',
          }}
        />

        {/* Animación respirada */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background:
              'linear-gradient(105deg, transparent 48%, rgba(191, 174, 133, 0.004) 50%, transparent 52%)',
            backgroundSize: '300% 100%',
            animation: 'waveBreath 120s linear infinite',
            pointerEvents: 'none',
          }}
        />

        <style jsx>{`
          @keyframes waveBreath {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          .particles-container {
            position: absolute;
            inset: 0;
          }
          .particle {
            position: absolute;
            border-radius: 50%;
            background: #E5DCC0;
            box-shadow: 0 0 2px rgba(191, 174, 133, 0.2);
          }
          .particle-static {
            opacity: 0.18;
          }
          .particle-pulse {
            animation: sensorPulse 60s ease-in-out infinite;
            opacity: 0;
          }
          @keyframes sensorPulse {
            0%, 100% {
              opacity: 0;
              transform: scale(0.85);
            }
            30% {
              opacity: 0.3;
              transform: scale(1);
            }
            60% {
              opacity: 0.12;
              transform: scale(0.95);
            }
          }
        `}</style>

        {/* CONTENIDO */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: isMobile ? 'flex-end' : 'center',
            padding: isMobile ? '5rem 1.75rem 8rem' : '7rem 3rem',
            opacity: showUI ? 1 : 0,
            transform: showUI ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1.2s ease-out',
          }}
        >
          <div style={{ maxWidth: isMobile ? '100%' : '580px', textAlign: 'left' }}>
            <div style={{ marginBottom: isMobile ? '2rem' : '3.5rem' }}>
              <p
                style={{
                  fontSize: isMobile ? '0.75rem' : '0.7rem',
                  fontWeight: 500,
                  letterSpacing: isMobile ? '0.4em' : '0.5em',
                  color: goldTitanium,
                  textTransform: 'uppercase',
                  marginBottom: '0.85rem',
                }}
              >
                Somatosensory Technology
              </p>
              <div
                style={{
                  height: '0.5px',
                  width: '28px',
                  background: `linear-gradient(90deg, ${goldTitanium} 0%, transparent 100%)`,
                }}
              />
            </div>

            <h2
              style={{
                fontSize: isMobile ? 'clamp(1.9rem, 6.8vw, 2.6rem)' : 'clamp(2rem, 4vw, 3.8rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                marginBottom: isMobile ? '2.5rem' : '2.5rem',
              }}
            >
              <span style={{ color: '#fff', display: 'block', marginBottom: '0.25rem' }}>
                No solo vistes
              </span>
              <span
                style={{ color: '#fff', display: 'block', marginBottom: isMobile ? '2.25rem' : '1.75rem' }}
              >
                una prenda.
              </span>
              <span
                style={{
                  fontStyle: 'normal',
                  fontFamily: 'Satoshi, system-ui, sans-serif',
                  fontWeight: 300,
                  display: 'block',
                  fontSize: isMobile ? '1.05em' : '0.95em',
                  letterSpacing: '0.02em',
                  lineHeight: isMobile ? 1.15 : 1.1,
                  background: `linear-gradient(180deg, ${goldLight} 0%, ${goldTitanium} 50%, ${goldDark} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Conectas con tu cuerpo.
              </span>
            </h2>

            <Link
              href="/nosotros"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                padding: isMobile ? '1.3rem 2.5rem' : '1.1rem 2.25rem',
                background:
                  'linear-gradient(135deg, rgba(191,174,133,0.03) 0%, rgba(10,10,10,0.95) 50%, rgba(191,174,133,0.03) 100%)',
                border: isMobile ? `1.5px solid ${goldTitanium}` : `1px solid ${goldTitanium}`,
                color: '#fff',
                fontSize: isMobile ? '0.85rem' : '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '999px',
                boxShadow: `0 0 15px rgba(191, 174, 133, 0.06), inset 0 0 10px rgba(191, 174, 133, 0.02)`,
                transition: 'all 0.4s ease',
                width: isMobile ? '100%' : 'auto',
                maxWidth: isMobile ? '380px' : 'none',
              }}
            >
              Explora BESTIGE
              <span style={{ color: goldTitanium, fontSize: '1rem' }}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECCIÓN 2: TECNOLOGÍA */}
      {/* ═══════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          padding: isMobile ? '6rem 1.75rem' : '10rem 3rem',
          background: '#0A0A0A',
          overflow: 'hidden',
          fontFamily: 'Satoshi, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            overflow: 'hidden',
          }}
        >
          <svg
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="techWave" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0" />
                <stop offset="100%" stopColor="#0f0f0f" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <path
              d="M0,700 Q400,660 800,700 T1600,680 L1600,800 L0,800 Z"
              fill="url(#techWave)"
            />
          </svg>
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {/* Título + explicación */}
          <div
            style={{
              maxWidth: '900px',
              marginBottom: isMobile ? '4rem' : '6rem',
            }}
          >
            <p
              style={{
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.5em',
                color: goldTitanium,
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}
            >
              La tecnología
            </p>
            <h2
              style={{
                fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#fff',
                marginBottom: '2rem',
              }}
            >
              La tecnología que conecta
              <br />
              <span
                style={{
                  fontFamily: 'Satoshi, system-ui, sans-serif',
                  fontWeight: 300,
                  background: `linear-gradient(180deg, ${goldLight} 0%, ${goldTitanium} 50%, ${goldDark} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                tu cuerpo con el movimiento.
              </span>
            </h2>
            <p
              style={{
                fontSize: isMobile ? '1rem' : '1.15rem',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.7)',
                fontWeight: 300,
                maxWidth: '640px',
              }}
            >
              Las superficies somatosensoriales integradas interactúan con tu piel para
              mejorar la percepción corporal y acompañar cada movimiento con mayor control,
              estabilidad y precisión.
            </p>
          </div>

          {/* VIDEO 1: La prenda */}
          <div style={{ marginBottom: isMobile ? '3rem' : '4rem' }}>
            <p
              style={{
                fontSize: isMobile ? '0.7rem' : '0.75rem',
                letterSpacing: '0.3em',
                color: goldTitanium,
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
                fontWeight: 500,
              }}
            >
              01 — La prenda
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: isMobile ? '2rem' : '8rem',
                alignItems: 'center',
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: isMobile ? '1.5rem' : '2rem',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '1rem',
                    lineHeight: 1.2,
                  }}
                >
                  La tecnología empieza en la prenda.
                </h3>
                <p
                  style={{
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    lineHeight: 1.7,
                    color: 'rgba(255,255,255,0.6)',
                    fontWeight: 300,
                  }}
                >
                  Superficies somatosensoriales integradas que interactúan con tu piel para
                  acompañar cada movimiento.
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  style={{
                    width: '100%',
                    maxWidth: isMobile ? '100%' : '320px',
                    position: 'relative',
                    borderRadius: isMobile ? '16px' : '20px',
                    overflow: 'hidden',
                    border: `0.5px solid rgba(191, 174, 133, 0.6)`,
                    boxShadow: `0 0 50px rgba(191, 174, 133, 0.06)`,
                    background: '#0A0A0A',
                  }}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/images/hero/hero-poster.jpg"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      aspectRatio: '9 / 16',
                      objectFit: 'cover',
                    }}
                  >
                    <source src="/videos/hero-bg.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>

          {/* TRANSICIÓN */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: isMobile ? '3rem' : '4rem',
              padding: isMobile ? '2rem 0' : '2.5rem 0',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: isMobile ? '200px' : '320px',
                height: '2px',
                margin: '0 auto 2.5rem',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(90deg, transparent 0%, rgba(191, 174, 133, 0.25) 50%, transparent 100%)`,
                  height: '1px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    width: '2px',
                    height: '2px',
                    borderRadius: '50%',
                    background: goldTitanium,
                    boxShadow: `0 0 1.5px rgba(191, 174, 133, 0.2)`,
                    transform: 'translateY(-50%)',
                    animation: `travelDot 10s linear infinite`,
                    animationDelay: `${i * 2}s`,
                    opacity: 0,
                  }}
                />
              ))}
            </div>

            <p
              style={{
                fontSize: isMobile ? '1.75rem' : '3rem',
                fontWeight: 300,
                fontStyle: 'italic',
                letterSpacing: '-0.01em',
                color: '#fff',
                margin: 0,
                marginBottom: '1.5rem',
                lineHeight: 1.15,
              }}
            >
              De la superficie
              <br />
              <span
                style={{
                  background: `linear-gradient(180deg, ${goldLight} 0%, ${goldTitanium} 50%, ${goldDark} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                al movimiento.
              </span>
            </p>
            <p
              style={{
                fontSize: isMobile ? '0.85rem' : '0.95rem',
                color: 'rgba(255,255,255,0.45)',
                fontWeight: 300,
                maxWidth: '480px',
                margin: '0 auto',
                lineHeight: 1.7,
              }}
            >
              La tecnología interactúa con tu cuerpo
              <br />
              en cada etapa del movimiento.
            </p>
          </div>

          {/* VIDEO 2: El sistema */}
          <div style={{ marginBottom: isMobile ? '6rem' : '10rem' }}>
            <p
              style={{
                fontSize: isMobile ? '0.7rem' : '0.75rem',
                letterSpacing: '0.3em',
                color: goldTitanium,
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
                fontWeight: 500,
              }}
            >
              02 — El sistema
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: isMobile ? '2rem' : '8rem',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  order: isMobile ? 2 : 1,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    maxWidth: isMobile ? '100%' : '320px',
                    position: 'relative',
                    borderRadius: isMobile ? '16px' : '20px',
                    overflow: 'hidden',
                    border: `0.5px solid rgba(191, 174, 133, 0.6)`,
                    boxShadow: `0 0 50px rgba(191, 174, 133, 0.06)`,
                    background: '#0A0A0A',
                  }}
                >
                  <video
                    loop
                    controls
                    playsInline
                    preload="metadata"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      aspectRatio: '9 / 16',
                      objectFit: 'cover',
                    }}
                  >
                    <source src="/videos/somatosensorial-h264.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              <div style={{ order: isMobile ? 1 : 2 }}>
                <h3
                  style={{
                    fontSize: isMobile ? '1.5rem' : '2rem',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '1rem',
                    lineHeight: 1.2,
                  }}
                >
                  Cuando la tecnología conecta con tu cuerpo.
                </h3>
                <p
                  style={{
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    lineHeight: 1.7,
                    color: 'rgba(255,255,255,0.6)',
                    fontWeight: 300,
                  }}
                >
                  La tecnología interactúa con tu piel para acompañar la percepción del
                  movimiento y mejorar la conexión entre tu cuerpo y la actividad.
                </p>
              </div>
            </div>
          </div>

          {/* Beneficios */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: isMobile ? '3rem' : '5rem',
              maxWidth: '1100px',
              margin: '0 auto',
            }}
          >
            {beneficios.map((b, i) => (
              <div key={i}>
                <p
                  style={{
                    fontSize: isMobile ? '0.7rem' : '0.75rem',
                    letterSpacing: '0.3em',
                    color: goldTitanium,
                    marginBottom: '1.5rem',
                    fontWeight: 500,
                  }}
                >
                  {b.num}
                </p>
                <h3
                  style={{
                    fontSize: isMobile ? '1.25rem' : '1.5rem',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '1rem',
                    lineHeight: 1.2,
                  }}
                >
                  {b.titulo}
                </h3>
                <p
                  style={{
                    fontSize: isMobile ? '0.9rem' : '0.95rem',
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.6)',
                    fontWeight: 300,
                  }}
                >
                  {b.texto}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Animación puntos */}
        <style jsx global>{`
          @keyframes travelDot {
            0% {
              left: 0%;
              opacity: 0;
            }
            15% {
              opacity: 0.3;
            }
            50% {
              opacity: 0.5;
            }
            85% {
              opacity: 0.3;
            }
            100% {
              left: 100%;
              opacity: 0;
            }
          }
        `}</style>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECCIÓN 3: PRODUCTOS (INTACTO) */}
      {/* ═══════════════════════════════════════════ */}
      <ProductShowcase />
    </div>
  );
}