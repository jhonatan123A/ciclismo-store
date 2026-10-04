'use client';

import { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { FloatingTip } from './FloatingTip';

// ============================================
// TIPOS
// ============================================

interface CartCrossSellTipProps {
  /** ¿El carrito tiene productos? */
  hasItems: boolean;
  /** ¿Qué producto tiene el carrito? (o null si tiene ambos o ninguno) */
  missingProduct: 'cycling' | 'running' | null;
  /** Si el subtotal ya alcanza envío gratis */
  hasFreeShipping?: boolean;
}

// ============================================
// CONFIGURACIÓN
// ============================================

const CONFIG = {
  cycling: {
    eyebrow: 'Sugerencia',
    title: '¿Agregas la badana de ciclismo?',
    description: 'Protección contra caídas. Diseñada por ciclistas profesionales.',
    ctaText: 'Ver badana de ciclismo',
    ctaHref: '/products/cycling',
    accentColor: '#38BDF8',
  },
  running: {
    eyebrow: 'Sugerencia',
    title: '¿Agregas la pantaloneta de running?',
    description: 'Tecnología somatosensorial para kilómetros reales.',
    ctaText: 'Ver pantaloneta de running',
    ctaHref: '/products/running',
    accentColor: '#E8B94A',
  },
};

const FREE_SHIPPING_THRESHOLD = 250000; // COP

// ============================================
// COMPONENTE
// ============================================

export function CartCrossSellTip({
  hasItems,
  missingProduct,
  hasFreeShipping = false,
}: CartCrossSellTipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionDismissed, setSessionDismissed] = useState(false);

  useEffect(() => {
    // Solo mostrar si:
    // 1. Hay items en el carrito
    // 2. Falta uno de los dos productos
    // 3. No se ha cerrado en esta sesión
    if (!hasItems || !missingProduct || sessionDismissed) {
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(() => setIsOpen(true), 1500);
    return () => clearTimeout(timer);
  }, [hasItems, missingProduct, sessionDismissed]);

  const handleClose = () => {
    setIsOpen(false);
    setSessionDismissed(true);
  };

  if (!missingProduct) return null;

  const config = CONFIG[missingProduct];

  // Añadir contexto de envío gratis si aplica
  const description = hasFreeShipping
    ? `${config.description} Envío gratis ya está activo.`
    : `${config.description} Envío gratis desde $${FREE_SHIPPING_THRESHOLD.toLocaleString('es-CO')}.`;

  return (
    <FloatingTip
      isOpen={isOpen}
      onClose={handleClose}
      eyebrow={config.eyebrow}
      title={config.title}
      description={description}
      ctaText={config.ctaText}
      ctaHref={config.ctaHref}
      accentColor={config.accentColor}
      icon={<ShoppingBag className="w-4 h-4" />}
    />
  );
}