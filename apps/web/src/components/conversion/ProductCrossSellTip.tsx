'use client';

import { useEffect, useState } from 'react';
import { FloatingTip } from './FloatingTip';

// ============================================
// TIPOS
// ============================================

interface ProductCrossSellTipProps {
  /** Categoría del producto actual */
  currentProduct: 'cycling' | 'running';
}

// ============================================
// CONFIGURACIÓN POR PRODUCTO
// ============================================

const goldTitanium = '#BFAE85';

const CONFIG = {
  cycling: {
    eyebrow: '¿También corres?',
    title: 'Conoce nuestra tecnología para running',
    description:
      'Misma tecnología somatosensorial. Diseñada para kilómetros reales.',
    ctaText: 'Ver pantaloneta de running',
    ctaHref: '/products/running',
    accentColor: goldTitanium,
    iconSrc: '/images/icons-bestige/bestige-02.png',
  },
  running: {
    eyebrow: '¿También entrenas sobre dos ruedas?',
    title: 'Conoce nuestra tecnología para ciclismo',
    description:
      'Con protección contra caídas. Diseñada por y para ciclistas profesionales.',
    ctaText: 'Ver badana de ciclismo',
    ctaHref: '/products/cycling',
    accentColor: goldTitanium,
    iconSrc: '/images/icons-bestige/bestige-01.png',
  },
};

const DELAY_MS = 25000; // 25 segundos
const STORAGE_KEY = 'bestige-crosssell-dismissed';

// ============================================
// COMPONENTE
// ============================================

export function ProductCrossSellTip({
  currentProduct,
}: ProductCrossSellTipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionDismissed, setSessionDismissed] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  // Cargar estado de "ya cerrado" al montar
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored === 'true') {
        setSessionDismissed(true);
      }
    } catch {
      // sessionStorage no disponible → seguimos sin persistencia
    }
  }, []);

  // Mostrar el popup tras 25s, o antes si el usuario hizo scroll al 70%
  useEffect(() => {
    if (sessionDismissed) return;
    if (hasShown) return;

    const open = () => {
      setIsOpen(true);
      setHasShown(true);
    };

    const timer = setTimeout(open, DELAY_MS);

    const handleScroll = () => {
      const scrolled =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight * 0.7;
      if (scrolled) {
        clearTimeout(timer);
        open();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentProduct, sessionDismissed, hasShown]);

  const handleClose = () => {
    setIsOpen(false);
    setSessionDismissed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // silencio si sessionStorage falla
    }
  };

  const config = CONFIG[currentProduct];

  return (
    <FloatingTip
      isOpen={isOpen}
      onClose={handleClose}
      eyebrow={config.eyebrow}
      title={config.title}
      description={config.description}
      ctaText={config.ctaText}
      ctaHref={config.ctaHref}
      accentColor={config.accentColor}
      icon={
        <img
          src={config.iconSrc}
          alt=""
          style={{
            width: '160%',
            height: '160%',
            objectFit: 'contain',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      }
    />
  );
}