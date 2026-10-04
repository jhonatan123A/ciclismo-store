'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

// ============================================
// TIPOS
// ============================================

export interface FloatingTipProps {
  /** Si el tip está visible */
  isOpen: boolean;
  /** Callback al cerrar */
  onClose: () => void;
  /** Callback opcional al hacer click en "No volver a mostrar" */
  onDismissForever?: () => void;
  /** Eyebrow (texto pequeño arriba) */
  eyebrow?: string;
  /** Título principal del tip */
  title: string;
  /** Descripción opcional */
  description?: string;
  /** Texto del botón CTA */
  ctaText?: string;
  /** URL del CTA */
  ctaHref?: string;
  /** Callback alternativo al hacer click en CTA (si no quieres usar ctaHref) */
  onCtaClick?: () => void;
  /** Color de acento */
  accentColor?: string;
  /** Icono opcional */
  icon?: React.ReactNode;
  /** Si debe mostrar el botón "No volver a mostrar" */
  showDismissForever?: boolean;
  /** Delay de entrada (ms) — útil para animaciones escalonadas */
  enterDelay?: number;
}

// ============================================
// COMPONENTE
// ============================================

export function FloatingTip({
  isOpen,
  onClose,
  onDismissForever,
  eyebrow,
  title,
  description,
  ctaText = 'Ver más',
  ctaHref,
  onCtaClick,
  accentColor = '#FF5A36',
  icon,
  showDismissForever = false,
  enterDelay = 0,
}: FloatingTipProps) {
  const [showDismissOption, setShowDismissOption] = useState(false);

  // Auto-reducir motion si el usuario lo pidió
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    }
    // Si hay ctaHref, el Link navega. Cerrar el tip después.
    if (ctaHref) {
      setTimeout(() => onClose(), 100);
    }
  };

  const handleDismissForever = () => {
    if (onDismissForever) {
      onDismissForever();
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 20, scale: 0.98 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.4,
            delay: prefersReducedMotion ? 0 : enterDelay / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            fixed z-40 pointer-events-auto
            right-3 bottom-3 left-3
            sm:left-auto sm:right-4 sm:bottom-4 sm:max-w-sm
          "
          role="complementary"
          aria-label="Sugerencia"
        >
          <div
            className="
              relative overflow-hidden rounded-2xl
              bg-[#0A0A0D]/95 backdrop-blur-xl
              border border-white/10
              shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]
            "
          >
            {/* Glow de acento */}
            <div
              className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: accentColor }}
            />

            {/* Barra lateral de acento */}
            <div
              className="absolute left-0 top-0 bottom-0 w-0.5"
              style={{ backgroundColor: accentColor }}
            />

            {/* Contenido */}
            <div className="relative p-4 sm:p-5 space-y-3">
              {/* Header */}
              <div className="flex items-start gap-3">
                {icon && (
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: `${accentColor}15`,
                      border: `1px solid ${accentColor}40`,
                    }}
                  >
                    <span style={{ color: accentColor }}>{icon}</span>
                  </div>
                )}

                <div className="flex-1 min-w-0 space-y-1">
                  {eyebrow && (
                    <p
                      className="text-[9px] tracking-[0.25em] uppercase font-bold"
                      style={{ color: accentColor }}
                    >
                      {eyebrow}
                    </p>
                  )}
                  <p className="text-white text-sm font-bold leading-snug">
                    {title}
                  </p>
                  {description && (
                    <p className="text-white/60 text-[12px] leading-relaxed">
                      {description}
                    </p>
                  )}
                </div>

                {/* Botón cerrar */}
                <button
                  onClick={onClose}
                  aria-label="Cerrar sugerencia"
                  className="flex-shrink-0 p-1.5 -mr-1 -mt-1 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* CTA */}
              {(ctaHref || onCtaClick) && (
                <div className="pt-1">
                  {ctaHref ? (
                    <Link
                      href={ctaHref}
                      onClick={handleCtaClick}
                      className="
                        inline-flex items-center gap-2
                        text-[11px] tracking-[0.15em] uppercase font-bold
                        transition-all hover:gap-3
                      "
                      style={{ color: accentColor }}
                    >
                      {ctaText}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <button
                      onClick={handleCtaClick}
                      className="
                        inline-flex items-center gap-2
                        text-[11px] tracking-[0.15em] uppercase font-bold
                        transition-all hover:gap-3
                      "
                      style={{ color: accentColor }}
                    >
                      {ctaText}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

              {/* Botón "No volver a mostrar" */}
              {showDismissForever && (
                <div className="pt-1 border-t border-white/5">
                  {!showDismissOption ? (
                    <button
                      onClick={() => setShowDismissOption(true)}
                      className="text-[10px] tracking-widest uppercase text-white/30 hover:text-white/50 transition-colors"
                    >
                      No volver a mostrar
                    </button>
                  ) : (
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <span className="text-[10px] text-white/40">
                        ¿Confirmar?
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleDismissForever}
                          className="text-[10px] tracking-widest uppercase font-bold text-white/70 hover:text-white transition-colors"
                        >
                          Sí
                        </button>
                        <span className="text-white/20">·</span>
                        <button
                          onClick={() => setShowDismissOption(false)}
                          className="text-[10px] tracking-widest uppercase text-white/40 hover:text-white/60 transition-colors"
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Línea de progreso sutil */}
            <div className="relative h-0.5 bg-white/[0.03]">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 12, ease: 'linear' }}
                className="absolute inset-y-0 left-0 opacity-60"
                style={{ backgroundColor: accentColor }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}