'use client';

import { ArrowRight } from 'lucide-react';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';
import { formatPriceWithUsd, formatCop } from '@/lib/format-price';

export function ProductShowcase() {
  useFadeInOnScroll();

  const goldTitanium = '#BFAE85';
  const goldLight = '#E5DCC0';
  const goldDark = '#8F7E45';

  const products = [
    {
      id: 'cycling',
      name: 'Cycling Somatosensorial',
      description: 'Tecnología somatosensorial diseñada para acompañar tu postura, estabilidad y rendimiento sobre la bicicleta.',
      href: '/products/cycling',
      icon: '/images/icons-bestige/bestige-01.png',
      image: '/images/products/cards/cycling-card.jpg',
      tag: 'Performance Cycling',
      price: 640000,
      originalPrice: 719000,
      discount: '-11%',
      fullPrice: 719000,
    },
    {
      id: 'running',
      name: 'Running Somatosensorial',
      description: 'Tecnología somatosensorial diseñada para acompañar cada zancada y mejorar la percepción del movimiento.',
      href: '/products/running',
      icon: '/images/icons-bestige/bestige-02.png',
      image: '/images/products/cards/running-card.jpg',
      tag: 'Performance Running',
      price: 399000,
      originalPrice: 529000,
      discount: '-25%',
      fullPrice: 529000,
    },
  ];

  const comingSoon = [
    { id: 'gloves', name: 'Guantes', icon: '/images/icons-bestige/bestige-03.png' },
    { id: 'tshirts', name: 'Camisetas', icon: '/images/icons-bestige/bestige-04.png' },
    { id: 'socks', name: 'Medias', icon: '/images/icons-bestige/bestige-05.png' },
    { id: 'jersey', name: 'Jersey', icon: '/images/icons-bestige/bestige-06.png' },
  ];

  return (
    <section
      style={{
        position: 'relative',
        padding: '6rem 0',
        background: '#0A0A0A',
        overflow: 'hidden',
        fontFamily: 'Satoshi, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '25%',
            width: '500px',
            height: '500px',
            background: 'rgba(191, 174, 133, 0.03)',
            borderRadius: '50%',
            filter: 'blur(120px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: '25%',
            width: '500px',
            height: '500px',
            background: 'rgba(191, 174, 133, 0.02)',
            borderRadius: '50%',
            filter: 'blur(120px)',
          }}
        />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.75rem',
        }}
      >
        {/* Título */}
        <div data-animate style={{ marginBottom: '4rem' }}>
          <p
            style={{
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.5em',
              color: goldTitanium,
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <span
              style={{
                width: '28px',
                height: '0.5px',
                background: `linear-gradient(90deg, ${goldTitanium} 0%, transparent 100%)`,
                display: 'inline-block',
              }}
            />
            Colección BESTIGE
          </p>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
              maxWidth: '720px',
            }}
          >
            Productos diseñados
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
              para el movimiento.
            </span>
          </h2>
          <p
            style={{
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.5)',
              maxWidth: '560px',
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Descubre nuestras prendas con tecnología somatosensorial aplicada a cada disciplina.
          </p>
        </div>

        {/* 2 tarjetas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '6rem',
          }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              data-animate
              style={{
                animationDelay: `${index * 0.15}s`,
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                border: `0.5px solid rgba(191, 174, 133, 0.3)`,
                background: '#0A0A0A',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.5s ease',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '320px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem',
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="animate-float"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    filter: 'contrast(1.1) saturate(0.9)',
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 0%, transparent 60%, #0A0A0A 100%)',
                    pointerEvents: 'none',
                  }}
                />
                {/* Icono BESTIGE + etiqueta */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    left: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    zIndex: 10,
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      background: 'rgba(10,10,10,0.75)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '10px',
                      border: `0.5px solid rgba(191, 174, 133, 0.4)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={product.icon}
                      alt=""
                      style={{
                        width: '160%',
                        height: '160%',
                        objectFit: 'contain',
                        objectPosition: 'center',
                        display: 'block',
                      }}
                    />
                  </div>
                  <span
                    style={{
                      padding: '0.35rem 0.75rem',
                      background: 'rgba(10,10,10,0.75)',
                      backdropFilter: 'blur(10px)',
                      border: `0.5px solid rgba(191, 174, 133, 0.4)`,
                      borderRadius: '999px',
                      color: goldTitanium,
                      fontSize: '0.6rem',
                      fontWeight: 500,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {product.tag}
                  </span>
                </div>
              </div>

              <div
                style={{
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}
              >
                <h3
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '0.5rem',
                    lineHeight: 1.2,
                  }}
                >
                  {product.name}
                </h3>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem',
                    fontWeight: 300,
                  }}
                >
                  {product.description}
                </p>

                <div
                  style={{
                    paddingBottom: '1.5rem',
                    borderBottom: `0.5px solid rgba(191, 174, 133, 0.2)`,
                    marginBottom: '1.5rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '0.5rem',
                      marginBottom: '0.5rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '1.75rem',
                        fontWeight: 700,
                        color: '#fff',
                      }}
                    >
                      {formatCop(product.price)}
                    </span>
                    <span
                      style={{
                        fontSize: '0.85rem',
                        color: 'rgba(255,255,255,0.3)',
                        textDecoration: 'line-through',
                      }}
                    >
                      {formatCop(product.originalPrice)}
                    </span>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 500,
                        letterSpacing: '0.1em',
                        color: goldTitanium,
                      }}
                    >
                      {product.discount}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span
                      style={{
                        fontSize: '0.65rem',
                        color: 'rgba(255,255,255,0.4)',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {formatPriceWithUsd(product.price)}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.6rem',
                    color: 'rgba(255,255,255,0.35)',
                    marginBottom: '1.5rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  <span>Somatosensorial</span>
                  <span
                    style={{
                      width: '3px',
                      height: '3px',
                      background: 'rgba(191, 174, 133, 0.4)',
                      borderRadius: '50%',
                    }}
                  />
                  <span>Tallas XS · S · M · L</span>
                </div>

                <a
                  href={product.href}
                  style={{
                    marginTop: 'auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.9rem 1.5rem',
                    background: 'transparent',
                    border: `1px solid ${goldTitanium}`,
                    color: '#fff',
                    borderRadius: '999px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: `0 0 15px rgba(191, 174, 133, 0.06), inset 0 0 10px rgba(191, 174, 133, 0.02)`,
                    cursor: 'pointer',
                  }}
                >
                  <span>Ver producto</span>
                  <ArrowRight className="w-3.5 h-3.5" style={{ color: goldTitanium }} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Próximamente */}
        <div>
          <div
            data-animate
            style={{
              paddingBottom: '2rem',
              borderBottom: `0.5px solid rgba(191, 174, 133, 0.2)`,
              marginBottom: '2.5rem',
            }}
          >
            <p
              style={{
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.4em',
                color: 'rgba(191, 174, 133, 0.7)',
                textTransform: 'uppercase',
                marginBottom: '0.85rem',
              }}
            >
              Próximamente
            </p>
            <p
              style={{
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.45)',
                maxWidth: '560px',
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              Nuevas prendas están en desarrollo para llevar nuestra tecnología somatosensorial a más disciplinas.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem',
            }}
          >
            {comingSoon.map((item, index) => (
              <div
                key={item.id}
                data-animate
                style={{
                  animationDelay: `${index * 0.08}s`,
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: `0.5px solid rgba(191, 174, 133, 0.2)`,
                  background: 'rgba(191, 174, 133, 0.02)',
                  transition: 'all 0.3s ease',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={item.icon}
                    alt=""
                    style={{
                      width: '160%',
                      height: '160%',
                      objectFit: 'contain',
                      objectPosition: 'center',
                      display: 'block',
                    }}
                  />
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      color: '#fff',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {item.name}
                  </h4>
                  <span
                    style={{
                      fontSize: '0.6rem',
                      color: 'rgba(191, 174, 133, 0.5)',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Próximamente
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}