'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ScrollText } from 'lucide-react';

export function TermsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const accepted = localStorage.getItem('bestige-terms-accepted');
    if (!accepted) {
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setHasScrolledToBottom(true);
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
        className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#FF7A5C]/10 border border-[#FF7A5C]/20 flex items-center justify-center text-[#FF7A5C]">
                <ScrollText className="w-5 h-5" />
              </div>
              <p className="text-[10px] text-[#FF7A5C] font-medium tracking-[0.3em] uppercase">
                Antes de continuar
              </p>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Términos y Condiciones
            </h2>
            <p className="text-white/50 text-xs leading-relaxed">
              Para navegar en BESTIGE, necesitas leer y aceptar nuestros términos y condiciones.
            </p>
          </div>

          {/* Contenido scrollable */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="px-6 md:px-8 py-6 max-h-[40vh] overflow-y-auto text-white/60 text-xs leading-relaxed space-y-4"
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
              <span className="text-white font-medium">1. Información general:</span> FITHAB INNOVATION CI SAS · NIT: 9016922526 · Correo: bestigesomatosensorial@gmail.com
            </p>
            <p>
              <span className="text-white font-medium">2. Aceptación:</span> El usuario declara que al acceder al sitio web ha leído, comprendido y aceptado las condiciones establecidas.
            </p>
            <p>
              <span className="text-white font-medium">3. Uso del sitio:</span> Está prohibido utilizar la plataforma con fines fraudulentos, intentar acceder a áreas restringidas o copiar contenido protegido.
            </p>
            <p>
              <span className="text-white font-medium">4. Propiedad intelectual:</span> Todos los elementos asociados a Bestige son propiedad de FITHAB INNOVATION CI SAS.
            </p>
            <p>
              <span className="text-white font-medium">5. Naturaleza del producto:</span> Las prendas Bestige no son dispositivos médicos ni sustituyen tratamientos médicos.
            </p>
            <p>
              <span className="text-white font-medium">6. Pagos:</span> Una compra será considerada confirmada únicamente cuando el pago haya sido aprobado.
            </p>
            <p>
              <span className="text-white font-medium">7. Envíos:</span> Los productos serán enviados mediante operadores logísticos autorizados.
            </p>
            <p>
              <span className="text-white font-medium">8. Datos personales:</span> FITHAB INNOVATION CI SAS protegerá la información conforme a la legislación colombiana vigente.
            </p>
            <p>
              <span className="text-white font-medium">9. Legislación:</span> Los presentes términos se rigen por las leyes de la República de Colombia.
            </p>
            <p className="pt-4 border-t border-white/10">
              Al hacer clic en <span className="text-white font-medium">"Aceptar y continuar"</span>, confirmas que has leído y aceptado todos los términos y condiciones de BESTIGE.
            </p>
            <p className="text-[#FF7A5C] text-xs">
              ← Desplázate hasta el final para aceptar
            </p>
          </div>

          {/* Footer */}
          <div className="px-6 md:px-8 py-6 border-t border-white/10 bg-black/40 space-y-4">
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
                      ? 'bg-[#FF7A5C] border-[#FF7A5C]'
                      : hasScrolledToBottom
                      ? 'border-white/40 group-hover:border-white/60'
                      : 'border-white/15 opacity-50'
                  }`}
                >
                  {accepted && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>
              </div>
              <span
                className={`text-xs leading-relaxed transition-colors ${
                  hasScrolledToBottom ? 'text-white/80' : 'text-white/30'
                }`}
              >
                He leído y acepto los{' '}
                <Link href="/terminos" className="text-[#FF7A5C] hover:underline">
                  términos y condiciones
                </Link>{' '}
                de BESTIGE.
                {!hasScrolledToBottom && (
                  <span className="block text-[10px] text-white/40 mt-1">
                    * Desplázate hasta el final para habilitar
                  </span>
                )}
              </span>
            </label>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleReject}
                className="flex-1 py-3 border border-white/15 hover:border-white/30 text-white/60 hover:text-white rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold transition-all"
              >
                Rechazar
              </button>
              <button
                onClick={handleAccept}
                disabled={!accepted || !hasScrolledToBottom}
                className={`flex-1 py-3 rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold transition-all ${
                  accepted && hasScrolledToBottom
                    ? 'bg-[#FF7A5C] text-white hover:bg-[#FF5A5F]'
                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                }`}
              >
                Aceptar y continuar
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}