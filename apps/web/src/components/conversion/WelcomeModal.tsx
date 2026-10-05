'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Shield,
  Zap,
  Check,
} from 'lucide-react';
import { useLocalStorageFlag } from '@/hooks/useLocalStorageFlag';

// ============================================
// SLIDES DEL MODAL
// ============================================

const SLIDES = [
  {
    id: 1,
    icon: Zap,
    eyebrow: 'ÚNICO EN EL MUNDO',
    title: 'No es un conjunto más.\nEs la única prenda del mundo\ncon tecnología somatosensorial.',
    description:
      'Mientras la industria sigue vendiendo ropa, BESTIGE activa tu sistema nervioso desde la piel. Tecnología somatosensorial interna. Diseñada en Colombia. Probada en Europa y Norteamérica.',
    accentColor: '#E8B94A',
    ctaHref: '/blog/bestige-tecnologia-somatosensorial-vs-biomecanica',
    ctaText: 'Leer más',
  },
  {
    id: 2,
    icon: Sparkles,
    eyebrow: 'BESTIGE',
    title: 'BESTIGE no es ropa.\nEs tecnología somatosensorial.',
    description:
      'Cada prenda está diseñada para interactuar con tu sistema nervioso mientras te mueves. No es un eslogan. Es un principio científico.',
    accentColor: '#FF5A36',
  },
  {
    id: 3,
    icon: Shield,
    eyebrow: 'LA DIFERENCIA',
    title: 'Nuestra tecnología está dentro.\nEn contacto con tu piel.',
    description:
      'Otras marcas aplican tecnología por fuera. BESTIGE la aplica donde tiene sentido: en el interior de la prenda, donde ocurre la interacción con los mecanorreceptores cutáneos.',
    accentColor: '#38BDF8',
  },
];

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDontShowAgain, setShowDontShowAgain] = useState(false);

  // Mostrar el modal después del delay (solo si no se ha visto)
  useEffect(() => {
    if (!isHydrated || hasSeen) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, [isHydrated, hasSeen]);

  // Bloquear el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
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

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide((s) => s + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((s) => s - 1);
    }
  };

  const handleFinish = () => {
    setHasSeen(true);
    setIsOpen(false);
  };

  // No renderizar nada hasta que se hidrate (evita parpadeo)
  if (!isHydrated) return null;

  const slide = SLIDES[currentSlide];
  const Icon = slide.icon;
  const isLastSlide = currentSlide === SLIDES.length - 1;
  const hasCustomCta = !!slide.ctaHref;

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
              className="relative w-full max-w-lg md:max-w-2xl bg-[#0A0A0D] border border-white/10 rounded-3xl overflow-hidden pointer-events-auto shadow-[0_0_80px_-20px_rgba(255,90,54,0.4)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fondo con efecto neuronal sutil */}
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute inset-0 opacity-20 transition-colors duration-700"
                  style={{
                    background: `radial-gradient(circle at top right, ${slide.accentColor}15, transparent 60%)`,
                  }}
                />
                <div
                  className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-30 transition-colors duration-700"
                  style={{ backgroundColor: `${slide.accentColor}25` }}
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
                {/* Icono + eyebrow */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-500"
                    style={{
                      backgroundColor: `${slide.accentColor}15`,
                      border: `1px solid ${slide.accentColor}40`,
                    }}
                  >
                    <Icon
                      className="w-6 h-6 transition-colors duration-500"
                      style={{ color: slide.accentColor }}
                    />
                  </div>
                  <p
                    className="text-[10px] tracking-[0.35em] uppercase font-bold transition-colors duration-500"
                    style={{ color: slide.accentColor }}
                  >
                    {slide.eyebrow}
                  </p>
                </div>

                {/* Texto principal */}
                <div className="space-y-4 min-h-[180px] md:min-h-[200px]">
                  <motion.h2
                    key={`title-${slide.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-3xl md:text-4xl font-black tracking-tight text-white leading-[1.15] whitespace-pre-line"
                  >
                    {slide.title}
                  </motion.h2>
                  <motion.p
                    key={`desc-${slide.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="text-white/60 text-sm md:text-base leading-relaxed"
                  >
                    {slide.description}
                  </motion.p>
                </div>

                {/* Navegación de slides (dots) */}
                <div className="flex items-center justify-center gap-2">
                  {SLIDES.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => setCurrentSlide(i)}
                      aria-label={`Ir al slide ${i + 1}`}
                      className="group relative h-1 rounded-full overflow-hidden transition-all duration-300"
                      style={{
                        width: i === currentSlide ? '32px' : '8px',
                        backgroundColor:
                          i === currentSlide
                            ? slide.accentColor
                            : 'rgba(255,255,255,0.15)',
                      }}
                    />
                  ))}
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col gap-3">
                  {hasCustomCta ? (
                    // Slide con CTA personalizado (nuevo slide 1)
                    <>
                      <Link
                        href={slide.ctaHref!}
                        onClick={handleFinish}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-black text-xs tracking-[0.15em] uppercase font-bold transition-all hover:gap-3"
                        style={{
                          backgroundColor: slide.accentColor,
                        }}
                      >
                        {slide.ctaText}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={handleNext}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white text-xs tracking-[0.15em] uppercase font-bold hover:border-white/40 hover:bg-white/5 transition-all"
                      >
                        Siguiente
                      </button>
                    </>
                  ) : !isLastSlide ? (
                    // Slides intermedios: solo "Siguiente"
                    <button
                      onClick={handleNext}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-white text-xs tracking-[0.15em] uppercase font-bold transition-all hover:gap-3"
                      style={{
                        backgroundColor: slide.accentColor,
                      }}
                    >
                      Siguiente
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    // Último slide: botones finales
                    <>
                      <Link
                        href="/technology"
                        onClick={handleFinish}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-white text-xs tracking-[0.15em] uppercase font-bold transition-all hover:gap-3"
                        style={{
                          backgroundColor: slide.accentColor,
                        }}
                      >
                        Conocer BESTIGE
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link
                        href="/products/cycling"
                        onClick={handleFinish}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white text-xs tracking-[0.15em] uppercase font-bold hover:border-white/40 hover:bg-white/5 transition-all"
                      >
                        Ver productos
                      </Link>
                    </>
                  )}

                  {/* Botones prev/skip */}
                  <div className="flex items-center justify-between pt-2">
                    {currentSlide > 0 ? (
                      <button
                        onClick={handlePrev}
                        className="inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors"
                      >
                        <ArrowLeft className="w-3 h-3" />
                        Anterior
                      </button>
                    ) : (
                      <span />
                    )}

                    <label className="inline-flex items-center gap-2 cursor-pointer group">
                      <span className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={showDontShowAgain}
                          onChange={(e) =>
                            setShowDontShowAgain(e.target.checked)
                          }
                          className="peer sr-only"
                        />
                        <span className="w-4 h-4 rounded border border-white/20 peer-checked:border-[#FF5A36] peer-checked:bg-[#FF5A36] transition-colors flex items-center justify-center">
                          {showDontShowAgain && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </span>
                      </span>
                      <span className="text-[10px] tracking-widest uppercase text-white/40 group-hover:text-white/60 transition-colors">
                        No volver a mostrar
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Barra de progreso de autoplay */}
              <div className="relative h-0.5 bg-white/5">
                <motion.div
                  key={`progress-${slide.id}`}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 8, ease: 'linear' }}
                  className="absolute inset-y-0 left-0"
                  style={{ backgroundColor: slide.accentColor }}
                  onAnimationComplete={() => {
                    if (!isLastSlide) {
                      handleNext();
                    }
                  }}
                />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}