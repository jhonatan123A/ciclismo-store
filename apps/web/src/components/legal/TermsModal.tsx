'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';

export function TermsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const accepted = localStorage.getItem('bestige-terms-accepted');
    if (!accepted) {
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Bloquear scroll del body mientras el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

    if (scrollTop > 20) {
      setShowScrollHint(false);
    }

    // Si el contenido cabe completo (sin necesidad de scroll) → habilitar directo
    const contentFitsWithoutScroll = scrollHeight <= clientHeight + 5;
    if (contentFitsWithoutScroll) {
      setHasScrolledToBottom(true);
      setShowScrollHint(false);
      return;
    }

    // Tolerancia ampliada a 80px
    if (scrollTop + clientHeight >= scrollHeight - 80) {
      setHasScrolledToBottom(true);
      setShowScrollHint(false);
    }
  };

  const handleAccept = () => {
    localStorage.setItem('bestige-terms-accepted', 'true');
    localStorage.setItem('bestige-terms-date', new Date().toISOString());
    setIsOpen(false);
  };

  const handleReject = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 md:p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden card-neural flex flex-col"
          style={{ height: '92vh' }}
        >
          {/* Línea superior dorada */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#BFAE85] to-transparent z-10" />

          {/* ═══════════════════════════════════════════ */}
          {/* ZONA 1: HEADER */}
          {/* ═══════════════════════════════════════════ */}
          <div className="px-5 md:px-8 pt-6 md:pt-7 pb-4 border-b border-white/10 relative overflow-hidden flex-shrink-0">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#BFAE85]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#BFAE85]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/icons-bestige/bestige-01.png"
                    alt=""
                    style={{
                      width: '170%',
                      height: '170%',
                      objectFit: 'contain',
                      objectPosition: 'center',
                      display: 'block',
                    }}
                  />
                </div>
              </div>
              <h2 className="text-lg md:text-2xl font-bold text-white mb-1.5">
                Tu compra, nuestra prioridad
              </h2>
              <p className="text-white/50 text-[11px] md:text-xs leading-relaxed">
                Revisa esta información antes de finalizar tu compra.
              </p>
            </div>
          </div>

          {/* ═══════════════════════════════════════════ */}
          {/* BLOQUE DE CONFIANZA */}
          {/* ═══════════════════════════════════════════ */}
          <div className="px-5 md:px-8 py-3 border-b border-white/5 bg-[#BFAE85]/[0.02] flex-shrink-0">
            <p className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#BFAE85] mb-2.5">
              Tu compra está protegida
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              <div className="flex items-center gap-2">
                <Check className="w-3 h-3 text-[#BFAE85] flex-shrink-0" strokeWidth={3} />
                <span className="text-white/70 text-[10px] md:text-[11px]">Compra segura</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3 h-3 text-[#BFAE85] flex-shrink-0" strokeWidth={3} />
                <span className="text-white/70 text-[10px] md:text-[11px]">Datos protegidos</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3 h-3 text-[#BFAE85] flex-shrink-0" strokeWidth={3} />
                <span className="text-white/70 text-[10px] md:text-[11px]">Envíos confiables</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3 h-3 text-[#BFAE85] flex-shrink-0" strokeWidth={3} />
                <span className="text-white/70 text-[10px] md:text-[11px]">Transparencia en cada compra</span>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════ */}
          {/* ZONA 2: ÁREA DE LECTURA */}
          {/* ═══════════════════════════════════════════ */}
          <div className="relative flex-1 min-h-0 overflow-hidden">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="h-full w-full overflow-y-auto px-5 md:px-8 py-5 md:py-6 text-white/60 text-[11px] md:text-xs leading-relaxed terms-scroll"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#BFAE85 #0A0A0A',
              }}
            >
              <div className="space-y-3 mb-5">
                <p>
                  Bienvenido a <span className="text-white font-medium">Bestige</span>. Los presentes términos y condiciones regulan el acceso, navegación, compra y utilización de los productos y servicios ofrecidos a través de nuestra página web oficial.
                </p>
                <p>
                  Bestige es una marca desarrollada por <span className="text-white">FITHAB INNOVATION CI SAS</span>, empresa legalmente constituida bajo las leyes de la República de Colombia.
                </p>
                <p>
                  Al ingresar a nuestra plataforma, realizar una compra o utilizar nuestros servicios, el usuario acepta los presentes términos y condiciones.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-white font-semibold text-[11px] md:text-xs mb-1.5 tracking-wide">
                  1. Información general
                </h3>
                <div className="h-[1px] bg-[#BFAE85]/15 mb-2" />
                <p>
                  FITHAB INNOVATION CI SAS · NIT: 9016922526 · Correo: bestigesomatosensorial@gmail.com
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-white font-semibold text-[11px] md:text-xs mb-1.5 tracking-wide">
                  2. Aceptación
                </h3>
                <div className="h-[1px] bg-[#BFAE85]/15 mb-2" />
                <p>
                  El usuario declara que al acceder al sitio web ha leído, comprendido y aceptado las condiciones establecidas.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-white font-semibold text-[11px] md:text-xs mb-1.5 tracking-wide">
                  3. Uso del sitio
                </h3>
                <div className="h-[1px] bg-[#BFAE85]/15 mb-2" />
                <p>
                  Está prohibido utilizar la plataforma con fines fraudulentos, intentar acceder a áreas restringidas o copiar contenido protegido.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-white font-semibold text-[11px] md:text-xs mb-1.5 tracking-wide">
                  4. Propiedad intelectual
                </h3>
                <div className="h-[1px] bg-[#BFAE85]/15 mb-2" />
                <p>
                  Todos los elementos asociados a Bestige son propiedad de FITHAB INNOVATION CI SAS.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-white font-semibold text-[11px] md:text-xs mb-1.5 tracking-wide">
                  5. Naturaleza del producto
                </h3>
                <div className="h-[1px] bg-[#BFAE85]/15 mb-2" />
                <p>
                  Las prendas Bestige no son dispositivos médicos ni sustituyen tratamientos médicos.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-white font-semibold text-[11px] md:text-xs mb-1.5 tracking-wide">
                  6. Pagos
                </h3>
                <div className="h-[1px] bg-[#BFAE85]/15 mb-2" />
                <p>
                  Una compra será considerada confirmada únicamente cuando el pago haya sido aprobado.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-white font-semibold text-[11px] md:text-xs mb-1.5 tracking-wide">
                  7. Envíos
                </h3>
                <div className="h-[1px] bg-[#BFAE85]/15 mb-2" />
                <p>
                  Los productos serán enviados mediante operadores logísticos autorizados.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-white font-semibold text-[11px] md:text-xs mb-1.5 tracking-wide">
                  8. Datos personales
                </h3>
                <div className="h-[1px] bg-[#BFAE85]/15 mb-2" />
                <p>
                  FITHAB INNOVATION CI SAS protegerá la información conforme a la legislación colombiana vigente.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-white font-semibold text-[11px] md:text-xs mb-1.5 tracking-wide">
                  9. Legislación
                </h3>
                <div className="h-[1px] bg-[#BFAE85]/15 mb-2" />
                <p>
                  Los presentes términos se rigen por las leyes de la República de Colombia.
                </p>
              </div>
            </div>

            <AnimatePresence>
              {showScrollHint && !hasScrolledToBottom && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10"
                >
                  <div className="flex flex-col items-center gap-1 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-[#BFAE85]/40 shadow-[0_0_20px_rgba(191,174,133,0.3)]">
                    <ChevronDown className="w-4 h-4 text-[#BFAE85] animate-bounce" />
                    <span className="text-[9px] text-white/80 tracking-widest uppercase font-medium whitespace-nowrap">
                      Revisar condiciones
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ═══════════════════════════════════════════ */}
          {/* FRANJA DE FINALIZACIÓN */}
          {/* ═══════════════════════════════════════════ */}
          <AnimatePresence>
            {hasScrolledToBottom && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden flex-shrink-0"
              >
                <div className="px-5 md:px-8 py-2 border-t border-[#BFAE85]/15">
                  <p className="text-[10px] md:text-[11px] text-[#BFAE85]/80 font-medium text-center tracking-wide">
                    ✓ Información revisada. Puedes continuar.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ═══════════════════════════════════════════ */}
          {/* ZONA 3: ACCIÓN */}
          {/* ═══════════════════════════════════════════ */}
          <div className="px-5 md:px-8 pt-3 md:pt-4 pb-4 md:pb-5 flex-shrink-0 border-t border-white/10 bg-black/40">
            <div className="space-y-2.5">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    disabled={!hasScrolledToBottom}
                    className="peer sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                      accepted
                        ? 'bg-gradient-to-br from-[#BFAE85] to-[#8F7E45] border-[#BFAE85] shadow-[0_0_15px_rgba(191,174,133,0.5)]'
                        : hasScrolledToBottom
                        ? 'border-[#BFAE85]/60 group-hover:border-[#BFAE85] animate-pulse'
                        : 'border-white/15 opacity-50'
                    }`}
                  >
                    {accepted && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                  </div>
                </div>
                <span
                  className={`text-[11px] md:text-xs leading-snug transition-colors ${
                    hasScrolledToBottom ? 'text-white/80' : 'text-white/30'
                  }`}
                >
                  Confirmo que leí y acepto los{' '}
                  <Link href="/terminos" className="text-[#BFAE85] hover:text-[#E5DCC0] underline transition-colors">
                    términos y condiciones
                  </Link>{' '}
                  de BESTIGE.
                  {!hasScrolledToBottom && (
                    <span className="block text-[10px] text-[#BFAE85] mt-0.5 font-medium">
                      * Revisa las condiciones para habilitar
                    </span>
                  )}
                </span>
              </label>

              <div className="text-center pt-1">
                <p className="text-white/50 text-[10px] md:text-[11px] tracking-wide">
                  Gracias por elegir BESTIGE.
                </p>
                <p className="text-white/30 italic text-[9px] md:text-[10px] mt-0.5">
                  Diseñamos prendas para acompañar tu movimiento.
                </p>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleReject}
                  className="flex-1 py-3 border border-white/15 hover:border-[#BFAE85]/50 text-white/60 hover:text-[#BFAE85] rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold transition-all"
                >
                  Volver
                </button>
                <motion.button
                  type="button"
                  onClick={handleAccept}
                  disabled={!accepted || !hasScrolledToBottom}
                  animate={
                    accepted && hasScrolledToBottom
                      ? { scale: [1, 1.03, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  style={{
                    pointerEvents: accepted && hasScrolledToBottom ? 'auto' : 'none',
                    position: 'relative',
                    zIndex: 20,
                  }}
                  className={`flex-1 py-3 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-500 ${
                    accepted && hasScrolledToBottom
                      ? 'bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.3),0_0_45px_rgba(191,174,133,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.5),0_0_65px_rgba(191,174,133,0.3)]'
                      : 'bg-white/10 text-white/30 cursor-not-allowed'
                  }`}
                >
                  Aceptar y continuar
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}