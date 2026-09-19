'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ScrollText, ChevronDown } from 'lucide-react';

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

    // Ocultar el hint cuando empieza a scrollear
    if (scrollTop > 20) {
      setShowScrollHint(false);
    }

    // Habilitar cuando llega al final (o casi al final)
    if (scrollTop + clientHeight >= scrollHeight - 30) {
      setHasScrolledToBottom(true);
      setShowScrollHint(false);
    }
  };

  const handleAccept = () => {
    if (!accepted) return;
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
          style={{ maxHeight: '90vh' }}
        >
          {/* Línea superior triádica */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF5A36] via-[#38BDF8] to-[#E8B94A] z-10" />

          {/* Header */}
          <div className="px-5 md:px-8 pt-6 md:pt-8 pb-4 border-b border-white/10 relative overflow-hidden flex-shrink-0">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FF5A36]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF5A36]/20 to-[#38BDF8]/20 border border-[#FF5A36]/30 flex items-center justify-center text-[#FF5A36] shadow-[0_0_20px_rgba(255,90,54,0.3)]">
                  <ScrollText className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-medium tracking-[0.3em] uppercase gradient-text-triad">
                  Antes de continuar
                </p>
              </div>
              <h2 className="text-xl md:text-3xl font-bold text-white mb-2">
                Términos y Condiciones
              </h2>
              <p className="text-white/50 text-[11px] md:text-xs leading-relaxed">
                Para navegar en BESTIGE, necesitas leer y aceptar nuestros términos y condiciones.
              </p>
            </div>
          </div>

          {/* Contenido scrollable - CON SCROLL VISIBLE */}
          <div className="relative flex-1 min-h-0">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="h-full overflow-y-auto px-5 md:px-8 py-5 md:py-6 text-white/60 text-[11px] md:text-xs leading-relaxed space-y-4 terms-scroll"
              style={{
                maxHeight: '45vh',
                scrollbarWidth: 'thin',
                scrollbarColor: '#FF5A36 #0A0A0A',
              }}
            >
              <p>
                Bienvenido a <span className="text-white font-medium">Bestige</span>. Los presentes términos y condiciones regulan el acceso, navegación, compra y utilización de los productos y servicios ofrecidos a través de nuestra página web oficial.
              </p>
              <p>
                Bestige es una marca desarrollada por <span className="text-white">FITHAB INNOVATION CI SAS</span>, empresa legalmente constituida bajo las leyes de la República de Colombia.
              </p>
              <p>
                Al ingresar a nuestra plataforma, realizar una compra o utilizar nuestros servicios, el usuario acepta los presentes términos y condiciones.
              </p>
              <p>
                <span className="text-[#FF5A36] font-medium">1. Información general:</span> FITHAB INNOVATION CI SAS · NIT: 9016922526 · Correo: bestigesomatosensorial@gmail.com
              </p>
              <p>
                <span className="text-[#38BDF8] font-medium">2. Aceptación:</span> El usuario declara que al acceder al sitio web ha leído, comprendido y aceptado las condiciones establecidas.
              </p>
              <p>
                <span className="text-[#E8B94A] font-medium">3. Uso del sitio:</span> Está prohibido utilizar la plataforma con fines fraudulentos, intentar acceder a áreas restringidas o copiar contenido protegido.
              </p>
              <p>
                <span className="text-[#C17A4B] font-medium">4. Propiedad intelectual:</span> Todos los elementos asociados a Bestige son propiedad de FITHAB INNOVATION CI SAS.
              </p>
              <p>
                <span className="text-[#FF5A36] font-medium">5. Naturaleza del producto:</span> Las prendas Bestige no son dispositivos médicos ni sustituyen tratamientos médicos.
              </p>
              <p>
                <span className="text-[#38BDF8] font-medium">6. Pagos:</span> Una compra será considerada confirmada únicamente cuando el pago haya sido aprobado.
              </p>
              <p>
                <span className="text-[#E8B94A] font-medium">7. Envíos:</span> Los productos serán enviados mediante operadores logísticos autorizados.
              </p>
              <p>
                <span className="text-[#C17A4B] font-medium">8. Datos personales:</span> FITHAB INNOVATION CI SAS protegerá la información conforme a la legislación colombiana vigente.
              </p>
              <p>
                <span className="text-[#FF5A36] font-medium">9. Legislación:</span> Los presentes términos se rigen por las leyes de la República de Colombia.
              </p>
              <p className="pt-4 border-t border-white/10">
                Al hacer clic en <span className="text-white font-medium">"Aceptar y continuar"</span>, confirmas que has leído y aceptado todos los términos y condiciones de BESTIGE.
              </p>
              <p className="gradient-text-triad text-xs font-medium pb-2">
                ✓ Has llegado al final. Ahora puedes aceptar los términos.
              </p>
            </div>

            {/* Indicador de scroll flotante */}
            <AnimatePresence>
              {showScrollHint && !hasScrolledToBottom && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
                >
                  <div className="flex flex-col items-center gap-1 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-[#FF5A36]/40 shadow-[0_0_20px_rgba(255,90,54,0.3)]">
                    <ChevronDown className="w-4 h-4 text-[#FF5A36] animate-bounce" />
                    <span className="text-[9px] text-white/80 tracking-widest uppercase font-medium whitespace-nowrap">
                      Desplázate
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-5 md:px-8 py-5 md:py-6 border-t border-white/10 bg-black/40 space-y-4 relative overflow-hidden flex-shrink-0">
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#E8B94A]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
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
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      accepted
                        ? 'bg-gradient-to-br from-[#FF5A36] to-[#38BDF8] border-[#FF5A36] shadow-[0_0_15px_rgba(255,90,54,0.5)]'
                        : hasScrolledToBottom
                        ? 'border-[#FF5A36]/60 group-hover:border-[#FF5A36] animate-pulse'
                        : 'border-white/15 opacity-50'
                    }`}
                  >
                    {accepted && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                  </div>
                </div>
                <span
                  className={`text-[11px] md:text-xs leading-relaxed transition-colors ${
                    hasScrolledToBottom ? 'text-white/80' : 'text-white/30'
                  }`}
                >
                  He leído y acepto los{' '}
                  <Link href="/terminos" className="text-[#FF5A36] hover:text-[#38BDF8] underline transition-colors">
                    términos y condiciones
                  </Link>{' '}
                  de BESTIGE.
                  {!hasScrolledToBottom && (
                    <span className="block text-[10px] text-[#FF5A36] mt-1 font-medium">
                      * Desplázate hasta el final para habilitar
                    </span>
                  )}
                </span>
              </label>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleReject}
                  className="flex-1 py-3 border border-white/15 hover:border-[#FF5A36]/50 text-white/60 hover:text-[#FF5A36] rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold transition-all"
                >
                  Rechazar
                </button>
                <button
                  onClick={handleAccept}
                  disabled={!accepted || !hasScrolledToBottom}
                  className={`flex-1 py-3 rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold transition-all ${
                    accepted && hasScrolledToBottom
                      ? 'btn-orange'
                      : 'bg-white/10 text-white/30 cursor-not-allowed'
                  }`}
                >
                  Aceptar y continuar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}