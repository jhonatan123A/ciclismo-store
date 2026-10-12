'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check } from 'lucide-react';
import { useLocalStorageFlag } from '@/hooks/useLocalStorageFlag';

// ============================================
// CONTENIDO DE LA INTRO ÚNICA
// ============================================

const INTRO = {
  iconSrc: '/images/icons-bestige/bestige-01.png',
  eyebrow: 'TECNOLOGÍA SOMATOSENSORIAL',
  title: 'No es ropa deportiva.\nEs tecnología que interactúa\ncon tu cuerpo.',
  description:
    'Prendas con tecnología somatosensorial integrada para interactuar con tu piel durante el movimiento.',
  accentColor: '#BFAE85',
  primaryCtaHref: '/technology',
  primaryCtaText: 'Conocer la tecnología',
  secondaryCtaHref: '/products/cycling',
  secondaryCtaText: 'Ver productos',
};

const STORAGE_KEY = 'bestige-welcome-modal-seen';
const DELAY_MS = 2500; // 2.5 segundos

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export function WelcomeModal() {
  const [hasSeen, setHasSeen, isHydrated] = useLocalStorageFlag(
    STORAGE_KEY,
    false
  );
  const [isOpen, setIsOpen] = useState(false);
  const [showDontShowAgain, setShowDontShowAgain] = useState(false);

  // Mostrar el modal después del delay (solo si no se ha visto)
  useEffect(() => {
    if (!isHydrated || hasSeen) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, [isHydrated, hasSeen]);

  // ✅ FIX SCROLL: bloquear scroll mientras el modal está abierto.
  // Al cerrar, SIEMPRE liberar con 'unset' (no restaurar el valor previo,
  // porque puede ser 'hidden' de otro modal → quedaría bloqueado para siempre).
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  // Cerrar con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (showDontShowAgain) {
      setHasSeen(true);
    }
  };

  const handleFinish = () => {
    setHasSeen(true);
    setIsOpen(false);
  };

  // No renderizar nada hasta que se hidrate (evita parpadeo)
  if (!isHydrated) return null;

  const { accentColor } = INTRO;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg md:max-w-2xl bg-[#0A0A0D] border border-white/10 rounded-3xl overflow-hidden pointer-events-auto shadow-[0_0_80px_-20px_rgba(191,174,133,0.4)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fondo con efecto sutil dorado */}
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: `radial-gradient(circle at top right, ${accentColor}15, transparent 60%)`,
                  }}
                />
                <div
                  className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-30"
                  style={{ backgroundColor: `${accentColor}25` }}
                />
              </div>

              {/* Botón cerrar */}
              <button
                onClick={handleClose}
                aria-label="Cerrar"
                className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-white/5 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Contenido */}
              <div className="relative p-8 md:p-12 space-y-8">
                {/* Onda BESTIGE + eyebrow */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                    <img
                      src={INTRO.iconSrc}
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
                  <p
                    className="text-[10px] tracking-[0.35em] uppercase font-bold"
                    style={{ color: accentColor }}
                  >
                    {INTRO.eyebrow}
                  </p>
                </div>

                {/* Texto principal */}
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-[1.15] whitespace-pre-line">
                    {INTRO.title}
                  </h2>
                  <p className="text-white/60 text-sm md:text-base leading-relaxed">
                    {INTRO.description}
                  </p>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col gap-3">
                  {/* Botón principal */}
                  <Link
                    href={INTRO.primaryCtaHref}
                    onClick={handleFinish}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-black text-xs tracking-[0.15em] uppercase font-bold transition-all hover:gap-3"
                    style={{ backgroundColor: accentColor }}
                  >
                    {INTRO.primaryCtaText}
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {/* Botón secundario */}
                  <Link
                    href={INTRO.secondaryCtaHref}
                    onClick={handleFinish}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white text-xs tracking-[0.15em] uppercase font-bold hover:border-white/40 hover:bg-white/5 transition-all"
                  >
                    {INTRO.secondaryCtaText}
                  </Link>
                </div>
              </div>

              {/* Footer discreto: checkbox "No volver a mostrar" */}
              <div className="relative px-8 md:px-12 pb-5 flex justify-center">
                <label className="inline-flex items-center gap-2 cursor-pointer group opacity-60 hover:opacity-100 transition-opacity">
                  <span className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={showDontShowAgain}
                      onChange={(e) =>
                        setShowDontShowAgain(e.target.checked)
                      }
                      className="peer sr-only"
                    />
                    <span className="w-3 h-3 rounded-sm border border-white/20 peer-checked:border-[#BFAE85] peer-checked:bg-[#BFAE85] transition-colors flex items-center justify-center">
                      {showDontShowAgain && (
                        <Check className="w-2.5 h-2.5 text-white" />
                      )}
                    </span>
                  </span>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-white/40 group-hover:text-white/60 transition-colors">
                    No volver a mostrar
                  </span>
                </label>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}