'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Lightbulb } from 'lucide-react';
import { FloatingTip } from './FloatingTip';
import { useLocalStorageFlag } from '@/hooks/useLocalStorageFlag';

// ============================================
// CONFIGURACIÓN
// ============================================

const STORAGE_KEY_DISMISSED = 'bestige-blog-tips-dismissed';

/**
 * Tips que aparecen mientras el usuario lee un post.
 * Cada uno aparece en un tiempo específico.
 */
const TIPS = [
  {
    id: 'tech',
    appearAfterMs: 8000,
    eyebrow: '¿Sabías?',
    title: 'La única del mundo con tecnología somatosensorial interna.',
    description:
      'Otras marcas aplican tecnología por fuera. BESTIGE la aplica donde tiene sentido: en contacto directo con tu piel.',
    ctaText: 'Conocer la tecnología',
    ctaHref: '/technology',
    accentColor: '#FF5A36',
    icon: <Lightbulb className="w-4 h-4" />,
  },
  {
    id: 'cycling',
    appearAfterMs: 25000,
    eyebrow: 'Para ciclistas',
    title: 'Badana de ciclismo con protección contra caídas.',
    description:
      'Diseñada por una familia con 40+ años en el ciclismo profesional colombiano.',
    ctaText: 'Ver badana de ciclismo',
    ctaHref: '/products/cycling',
    accentColor: '#38BDF8',
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    id: 'running',
    appearAfterMs: 45000,
    eyebrow: 'Para corredores',
    title: 'Pantaloneta de running con tecnología somatosensorial.',
    description:
      'Activación muscular, mejor recuperación y menos fatiga. Diseñada para kilómetros reales.',
    ctaText: 'Ver pantaloneta de running',
    ctaHref: '/products/running',
    accentColor: '#E8B94A',
    icon: <BookOpen className="w-4 h-4" />,
  },
];

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

  // Auto-cerrar el tip actual después de 20 seg (para que no quede pegado)
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      setIsOpen(false);
      // Después de cerrar, permitir que el siguiente tip aparezca
      setTimeout(() => setCurrentTipIndex(null), 500);
    }, 20000);

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
        setTimeout(() => setCurrentTipIndex(null), 500);
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