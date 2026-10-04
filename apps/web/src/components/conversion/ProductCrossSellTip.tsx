'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
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

const CONFIG = {
  cycling: {
    eyebrow: '¿También corres?',
    title: 'Conoce la pantaloneta de running',
    description:
      'Misma tecnología somatosensorial. Diseñada para kilómetros reales.',
    ctaText: 'Ver pantaloneta de running',
    ctaHref: '/products/running',
    accentColor: '#E8B94A',
  },
  running: {
    eyebrow: '¿También pedaleas?',
    title: 'Conoce la badana de ciclismo',
    description:
      'Con protección contra caídas. Diseñada por y para ciclistas profesionales.',
    ctaText: 'Ver badana de ciclismo',
    ctaHref: '/products/cycling',
    accentColor: '#38BDF8',
  },
};

const DELAY_MS = 5000; // 5 segundos

// ============================================
// COMPONENTE
// ============================================

export function ProductCrossSellTip({
  currentProduct,
}: ProductCrossSellTipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionDismissed, setSessionDismissed] = useState(false);

  useEffect(() => {
    if (sessionDismissed) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, [currentProduct, sessionDismissed]);

  const handleClose = () => {
    setIsOpen(false);
    setSessionDismissed(true);
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
      icon={<ArrowRight className="w-4 h-4" />}
    />
  );
}