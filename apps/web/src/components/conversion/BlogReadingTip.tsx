'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Zap, Sparkles } from 'lucide-react';
import { FloatingTip } from './FloatingTip';
import { useLocalStorageFlag } from '@/hooks/useLocalStorageFlag';

// ============================================
// CONFIGURACIÓN
// ============================================

const STORAGE_KEY_DISMISSED = 'bestige-blog-tips-dismissed';

/**
 * Tips que aparecen mientras el usuario lee un post.
 * Orden: Ambos → Ciclismo → Running.
 */
const TIPS = [
  {
    id: 'both',
    appearAfterMs: 8000,
    eyebrow: 'LO MÁS NUEVO',
    title: 'Ver prenda somatosensorial',
    description:
      'La prenda de running y ciclismo con tecnología somatosensorial interna. Diseñada en Colombia, probada en Europa y Norteamérica.',
    ctaText: 'Ver prenda somatosensorial',
    ctaHref: '/products',
    accentColor: '#E8B94A',
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    id: 'cycling',
    appearAfterMs: 25000,
    eyebrow: 'PARA CICLISTAS',
    title: 'Ver prenda somatosensorial',
    description:
      'Prenda somatosensorial diseñada por una familia con más de 40 años en el ciclismo profesional colombiano.',
    ctaText: 'Ver prenda somatosensorial',
    ctaHref: '/products/cycling',
    accentColor: '#FF5A36',
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    id: 'running',
    appearAfterMs: 40000,
    eyebrow: 'PARA CORREDORES',
    title: 'Ver prenda somatosensorial',
    description:
      'Activa tu sistema somatosensorial con una prenda que integra estructuras que generan estímulos táctiles sobre la piel y acompañan la percepción del movimiento.',
    ctaText: 'Ver prenda somatosensorial',
    ctaHref: '/products/running',
    accentColor: '#38BDF8',
    icon: <Zap className="w-4 h-4" />,
  },
];

const AUTO_CLOSE_MS = 14000; // 14 segundos por tip
const RESET_DELAY_MS = 500;

// ============================================
// COMPONENTE
// ============================================

export function BlogReadingTip() {
  const [dismissedForever, setDismissedForever, isHydrated] =
    useLocalStorageFlag(STORAGE_KEY_DISMISSED, false);
  const [currentTipIndex, setCurrentTipIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Programar la aparición de cada tip
  useEffect(() => {
    if (!isHydrated || dismissedForever) return;

    const timers: NodeJS.Timeout[] = [];

    TIPS.forEach((tip, index) => {
      const timer = setTimeout(() => {
        setCurrentTipIndex(index);
        setIsOpen(true);
      }, tip.appearAfterMs);

      timers.push(timer);
    });

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [isHydrated, dismissedForever]);

  // Auto-cerrar el tip actual después de 14 seg
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      setIsOpen(false);
      setTimeout(() => setCurrentTipIndex(null), RESET_DELAY_MS);
    }, AUTO_CLOSE_MS);

    return () => clearTimeout(timer);
  }, [isOpen, currentTipIndex]);

  if (!isHydrated) return null;
  if (dismissedForever) return null;
  if (currentTipIndex === null) return null;

  const tip = TIPS[currentTipIndex];

  return (
    <FloatingTip
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        setTimeout(() => setCurrentTipIndex(null), RESET_DELAY_MS);
      }}
      onDismissForever={() => setDismissedForever(true)}
      eyebrow={tip.eyebrow}
      title={tip.title}
      description={tip.description}
      ctaText={tip.ctaText}
      ctaHref={tip.ctaHref}
      accentColor={tip.accentColor}
      icon={tip.icon}
      showDismissForever
    />
  );
}