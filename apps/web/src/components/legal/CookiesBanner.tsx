'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Shield, BarChart3, Settings, Megaphone } from 'lucide-react';
import { useCookieConsent, useOpenCookiesBannerListener } from '@/hooks/useCookieConsent';

type ViewMode = 'banner' | 'config';

export function CookiesBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [view, setView] = useState<ViewMode>('banner');
  const [preferences, setPreferences] = useState({
    performance: false,
    functional: false,
    marketing: false,
  });

  const { consent, hasConsented, isLoaded, acceptAll, rejectAll, saveCustom } = useCookieConsent();

  useEffect(() => {
    if (consent) {
      setPreferences({
        performance: consent.preferences.performance,
        functional: consent.preferences.functional,
        marketing: consent.preferences.marketing,
      });
    }
  }, [consent]);

  const handleOpenFromFooter = useCallback(() => {
    setIsVisible(true);
    setView('config');
  }, []);

  useOpenCookiesBannerListener(handleOpenFromFooter);

  useEffect(() => {
    if (!isLoaded) return;
    if (hasConsented) return;

    const timer = setTimeout(() => setIsVisible(true), 2500);
    return () => clearTimeout(timer);
  }, [isLoaded, hasConsented]);

  const handleAcceptAll = () => {
    acceptAll();
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    rejectAll();
    setIsVisible(false);
  };

  const handleSaveCustom = () => {
    saveCustom(preferences);
    setIsVisible(false);
  };

  const handleClose = () => {
    if (hasConsented) {
      setIsVisible(false);
      setView('banner');
    }
  };

  // Tipos de cookies — todos en dorado titanio
  const cookieTypes = [
    {
      id: 'essential',
      icon: <Shield className="w-4 h-4" />,
      title: 'Esenciales',
      description: 'Necesarias para el funcionamiento básico del sitio: carrito de compras, sesión de usuario, seguridad y procesamiento de pagos.',
      required: true,
    },
    {
      id: 'performance',
      icon: <BarChart3 className="w-4 h-4" />,
      title: 'Rendimiento',
      description: 'Nos ayudan a entender cómo los visitantes usan el sitio (Google Analytics, métricas anónimas) para mejorar la experiencia.',
      required: false,
    },
    {
      id: 'functional',
      icon: <Settings className="w-4 h-4" />,
      title: 'Funcionalidad',
      description: 'Recuerdan tus preferencias (idioma, región, tamaño de letra) para ofrecerte una experiencia personalizada.',
      required: false,
    },
    {
      id: 'marketing',
      icon: <Megaphone className="w-4 h-4" />,
      title: 'Marketing',
      description: 'Permiten mostrarte anuncios personalizados de BESTIGE en otras plataformas (Meta, Google Ads) y medir su efectividad.',
      required: false,
    },
  ];

  const goldTitanium = '#BFAE85';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[150] p-2 md:p-3"
        >
          <div className="relative max-w-5xl mx-auto bg-[#0A0A0A] border border-[#BFAE85]/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] overflow-hidden">
            {/* Línea superior dorada — más sutil */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#BFAE85]/60 to-transparent" />

            {/* Banner principal — COMPACTO */}
            {view === 'banner' && (
              <div className="px-4 py-2.5 md:px-5 md:py-3">
                <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#BFAE85]/10 border border-[#BFAE85]/25 flex items-center justify-center text-[#BFAE85] flex-shrink-0">
                      <Cookie className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-white font-semibold text-[13px] tracking-tight">
                          Respetamos tu privacidad
                        </h3>
                        <span className="text-[8.5px] px-1.5 py-0.5 rounded-full bg-[#BFAE85]/10 border border-[#BFAE85]/20 text-[#BFAE85] tracking-widest uppercase font-medium">
                          Cookies
                        </span>
                      </div>
                      <p className="text-white/60 text-[12px] leading-snug">
                        Usamos cookies para mejorar tu experiencia en BESTIGE. Puedes elegir tus preferencias o aceptar para continuar.
                      </p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1">
                        <Link href="/cookies" className="text-[#BFAE85] hover:text-[#E5DCC0] underline text-[11px] transition-colors">
                          Política de cookies
                        </Link>
                        <span className="text-white/20 text-[11px]">·</span>
                        <Link href="/privacidad" className="text-[#BFAE85] hover:text-[#E5DCC0] underline text-[11px] transition-colors">
                          Política de privacidad
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Botones — jerarquía: Aceptar (principal) · Solo esenciales (secundario) · Configurar (terciario) */}
                  <div className="flex flex-row flex-wrap lg:flex-nowrap gap-2 lg:flex-shrink-0">
                    <button
                      onClick={handleAcceptAll}
                      className="px-4 py-2 rounded-full text-black text-[10.5px] tracking-[0.12em] uppercase font-bold whitespace-nowrap transition-all hover:shadow-[0_0_20px_rgba(191,174,133,0.4)] hover:scale-[1.02]"
                      style={{ background: goldTitanium }}
                    >
                      Aceptar todas
                    </button>
                    <button
                      onClick={handleRejectAll}
                      className="px-4 py-2 border border-white/20 hover:border-white/40 text-white/80 hover:text-white rounded-full text-[10.5px] tracking-[0.12em] uppercase font-semibold transition-all"
                    >
                      Solo esenciales
                    </button>
                    <button
                      onClick={() => setView('config')}
                      className="px-3.5 py-2 text-white/50 hover:text-[#BFAE85] rounded-full text-[10.5px] tracking-[0.12em] uppercase font-medium transition-all underline-offset-4 hover:underline"
                    >
                      Configurar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Vista de configuración */}
            {view === 'config' && (
              <div className="max-h-[80vh] overflow-y-auto">
                {/* Header config */}
                <div className="sticky top-0 bg-[#0A0A0A] border-b border-white/10 px-5 md:px-6 py-3 flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setView('banner')}
                      className="text-white/60 hover:text-[#BFAE85] transition-colors"
                      aria-label="Volver"
                    >
                      ←
                    </button>
                    <h3 className="text-white font-bold text-sm">
                      {hasConsented ? 'Preferencias de cookies' : 'Configurar cookies'}
                    </h3>
                  </div>
                  {hasConsented && (
                    <button
                      onClick={handleClose}
                      className="text-white/40 hover:text-[#BFAE85] transition-colors"
                      aria-label="Cerrar"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Descripción */}
                <div className="px-5 md:px-6 py-3.5 border-b border-white/5">
                  <p className="text-white/60 text-xs leading-relaxed">
                    {hasConsented
                      ? 'Puedes cambiar tus preferencias en cualquier momento. Los cambios se aplicarán inmediatamente.'
                      : 'Puedes elegir qué tipo de cookies aceptar. Las cookies esenciales son obligatorias para que el sitio funcione.'}
                  </p>
                </div>

                {/* Lista de tipos */}
                <div className="divide-y divide-white/5">
                  {cookieTypes.map((type) => (
                    <div key={type.id} className="px-5 md:px-6 py-3.5">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border border-[#BFAE85]/25 bg-[#BFAE85]/5 text-[#BFAE85]">
                          {type.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-4 mb-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-white font-semibold text-sm">
                                {type.title}
                              </h4>
                              {type.required && (
                                <span className="text-[9px] px-2 py-0.5 rounded-full tracking-widest uppercase font-medium border border-[#BFAE85]/30 bg-[#BFAE85]/10 text-[#BFAE85]">
                                  Siempre activas
                                </span>
                              )}
                            </div>
                            {!type.required && (
                              <button
                                onClick={() => setPreferences({
                                  ...preferences,
                                  [type.id]: !preferences[type.id as keyof typeof preferences],
                                })}
                                className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
                                  preferences[type.id as keyof typeof preferences]
                                    ? ''
                                    : 'bg-white/10'
                                }`}
                                style={{
                                  backgroundColor: preferences[type.id as keyof typeof preferences]
                                    ? goldTitanium
                                    : undefined,
                                  boxShadow: preferences[type.id as keyof typeof preferences]
                                    ? `0 0 15px ${goldTitanium}80`
                                    : undefined,
                                }}
                                aria-label={`Activar ${type.title}`}
                              >
                                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                                  preferences[type.id as keyof typeof preferences]
                                    ? 'translate-x-[22px]'
                                    : 'translate-x-0.5'
                                }`} />
                              </button>
                            )}
                          </div>
                          <p className="text-white/50 text-xs leading-relaxed">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Acciones */}
                <div className="sticky bottom-0 bg-[#0A0A0A] border-t border-white/10 px-5 md:px-6 py-3.5 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleRejectAll}
                    className="flex-1 px-5 py-2.5 border border-white/15 hover:border-white/30 text-white/70 hover:text-white rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold transition-all"
                  >
                    Rechazar todas
                  </button>
                  <button
                    onClick={handleSaveCustom}
                    className="flex-1 px-5 py-2.5 bg-white text-black hover:bg-gray-100 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold transition-all"
                  >
                    Guardar preferencias
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 px-5 py-2.5 rounded-full text-black text-[10px] tracking-[0.15em] uppercase font-bold transition-all hover:shadow-[0_0_20px_rgba(191,174,133,0.35)]"
                    style={{ background: goldTitanium }}
                  >
                    Aceptar todas
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}