'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

export interface FloatingTipProps {
  isOpen: boolean;
  onClose: () => void;
  onDismissForever?: () => void;
  eyebrow?: string;
  title: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  accentColor?: string;
  icon?: React.ReactNode;
  showDismissForever?: boolean;
  enterDelay?: number;
}

export function FloatingTip({
  isOpen,
  onClose,
  eyebrow,
  title,
  ctaText = 'Ver más',
  ctaHref,
  onCtaClick,
  accentColor = '#BFAE85',
}: FloatingTipProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleCtaClick = () => {
    if (onCtaClick) onCtaClick();
    if (ctaHref) {
      setTimeout(() => onClose(), 100);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 8, scale: 0.98 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.98 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            fixed z-40 pointer-events-auto
            left-5 bottom-5 right-5
            sm:right-auto sm:left-6 sm:bottom-6 sm:max-w-[190px]
          "
          role="complementary"
          aria-label="Sugerencia"
        >
          <div
            className="
              relative overflow-hidden rounded-md
              bg-[#0A0A0A]/95 backdrop-blur-md
              border
              shadow-[0_2px_12px_-6px_rgba(0,0,0,0.55)]
            "
            style={{ borderColor: `${accentColor}20` }}
          >
            <div className="relative px-2.5 py-1.5 pr-6">
              <p className="text-[9px] text-white/60 leading-tight">
                {eyebrow && (
                  <span
                    className="font-semibold"
                    style={{ color: accentColor }}
                  >
                    {eyebrow}{' '}
                  </span>
                )}
                <span className="text-white/70">{title}</span>
              </p>

              {(ctaHref || onCtaClick) && (
                <div className="pt-0.5">
                  {ctaHref ? (
                    <Link
                      href={ctaHref}
                      onClick={handleCtaClick}
                      className="
                        inline-flex items-center gap-0.5
                        text-[8.5px] tracking-[0.1em] uppercase font-bold
                        transition-all hover:gap-1
                      "
                      style={{ color: accentColor }}
                    >
                      {ctaText}
                      <ArrowRight className="w-2 h-2" />
                    </Link>
                  ) : (
                    <button
                      onClick={handleCtaClick}
                      className="
                        inline-flex items-center gap-0.5
                        text-[8.5px] tracking-[0.1em] uppercase font-bold
                        transition-all hover:gap-1
                      "
                      style={{ color: accentColor }}
                    >
                      {ctaText}
                      <ArrowRight className="w-2 h-2" />
                    </button>
                  )}
                </div>
              )}

              <button
                onClick={onClose}
                aria-label="Cerrar sugerencia"
                className="absolute top-1 right-1 p-0.5 rounded hover:bg-white/5 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}