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

  // Cada tipo de cookie con su color triádico
  const cookieTypes = [
    {
      id: 'essential',
      icon: <Shield className="w-4 h-4" />,
      title: 'Esenciales',
      description: 'Necesarias para el funcionamiento básico del sitio: carrito de compras, sesión de usuario, seguridad y procesamiento de pagos.',
      required: true,
      color: '#FF5A36',
    },
    {
      id: 'performance',
      icon: <BarChart3 className="w-4 h-4" />,
      title: 'Rendimiento',
      description: 'Nos ayudan a entender cómo los visitantes usan el sitio (Google Analytics, métricas anónimas) para mejorar la experiencia.',
      required: false,
      color: '#38BDF8',
    },
    {
      id: 'functional',
      icon: <Settings className="w-4 h-4" />,
      title: 'Funcionalidad',
      description: 'Recuerdan tus preferencias (idioma, región, tamaño de letra) para ofrecerte una experiencia personalizada.',
      required: false,
      color: '#E8B94A',
    },
    {
      id: 'marketing',
      icon: <Megaphone className="w-4 h-4" />,
      title: 'Marketing',
      description: 'Permiten mostrarte anuncios personalizados de BESTIGE en otras plataformas (Meta, Google Ads) y medir su efectividad.',
      required: false,
      color: '#C17A4B',
    },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[150] p-4 md:p-6"
        >
          <div className="relative max-w-6xl mx-auto bg-[#0A0A0A]/98 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            {/* Línea superior triádica */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF5A36] via-[#38BDF8] to-[#E8B94A]" />

            {/* Banner principal */}
            {view === 'banner' && (
              <div className="p-6 md:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF5A36]/20 to-[#38BDF8]/20 border border-[#FF5A36]/30 flex items-center justify-center text-[#FF5A36] flex-shrink-0 shadow-[0_0_20px_rgba(255,90,54,0.3)]">
                      <Cookie className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-white font-bold text-base tracking-tight">
                          Respetamos tu privacidad
                        </h3>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FF5A36]/10 via-[#38BDF8]/10 to-[#E8B94A]/10 border border-[#FF5A36]/20 text-[#FF5A36] tracking-widest uppercase font-medium">
                          Cookies
                        </span>
                      </div>
                      <p className="text-white/60 text-xs leading-relaxed">
                        Utilizamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar contenido. Puedes aceptar todas, rechazar las no esenciales o configurar tus preferencias. Lee nuestra{' '}
                        <Link href="/cookies" className="text-[#FF5A36] hover:text-[#38BDF8] underline transition-colors">
                          política de cookies
                        </Link>{' '}
                        y{' '}
                        <Link href="/privacidad" className="text-[#FF5A36] hover:text-[#38BDF8] underline transition-colors">
                          política de privacidad
                        </Link>
                        .
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0">
                    <button
                      onClick={() => setView('config')}
                      className="px-5 py-3 border border-[#FF5A36]/30 hover:border-[#FF5A36]/60 text-white/70 hover:text-white rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold transition-all hover:bg-[#FF5A36]/5"
                    >
                      Configurar
                    </button>
                    <button
                      onClick={handleRejectAll}
                      className="px-5 py-3 border border-white/15 hover:border-white/30 text-white/70 hover:text-white rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold transition-all"
                    >
                      Solo esenciales
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="px-5 py-3 btn-orange whitespace-nowrap"
                    >
                      Aceptar todas
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Vista de configuración */}
            {view === 'config' && (
              <div className="max-h-[80vh] overflow-y-auto">
                {/* Header config */}
                <div className="sticky top-0 bg-[#0A0A0A] border-b border-white/10 px-6 md:px-8 py-4 flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setView('banner')}
                      className="text-white/60 hover:text-[#FF5A36] transition-colors"
                      aria-label="Volver"
                    >
                      ←
                    </button>
                    <h3 className="text-white font-bold text-base">
                      {hasConsented ? 'Preferencias de cookies' : 'Configurar cookies'}
                    </h3>
                  </div>
                  {hasConsented && (
                    <button
                      onClick={handleClose}
                      className="text-white/40 hover:text-[#FF5A36] transition-colors"
                      aria-label="Cerrar"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Descripción */}
                <div className="px-6 md:px-8 py-6 border-b border-white/5">
                  <p className="text-white/60 text-xs leading-relaxed">
                    {hasConsented
                      ? 'Puedes cambiar tus preferencias en cualquier momento. Los cambios se aplicarán inmediatamente.'
                      : 'Puedes elegir qué tipo de cookies aceptar. Las cookies esenciales son obligatorias para que el sitio funcione.'}
                  </p>
                </div>

                {/* Lista de tipos */}
                <div className="divide-y divide-white/5">
                  {cookieTypes.map((type) => (
                    <div key={type.id} className="px-6 md:px-8 py-5">
                      <div className="flex items-start gap-4">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 border"
                          style={{
                            backgroundColor: `${type.color}15`,
                            borderColor: `${type.color}40`,
                            color: type.color,
                          }}
                        >
                          {type.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-4 mb-2">
                            <div className="flex items-center gap-2">
                              <h4 className="text-white font-semibold text-sm">
                                {type.title}
                              </h4>
                              {type.required && (
                                <span
                                  className="text-[9px] px-2 py-0.5 rounded-full tracking-widest uppercase font-medium border"
                                  style={{
                                    backgroundColor: `${type.color}10`,
                                    borderColor: `${type.color}30`,
                                    color: type.color,
                                  }}
                                >
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
                                    ? type.color
                                    : undefined,
                                  boxShadow: preferences[type.id as keyof typeof preferences]
                                    ? `0 0 15px ${type.color}80`
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
                <div className="sticky bottom-0 bg-[#0A0A0A] border-t border-white/10 px-6 md:px-8 py-5 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleRejectAll}
                    className="flex-1 px-5 py-3 border border-white/15 hover:border-white/30 text-white/70 hover:text-white rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold transition-all"
                  >
                    Rechazar todas
                  </button>
                  <button
                    onClick={handleSaveCustom}
                    className="flex-1 px-5 py-3 bg-white text-black hover:bg-gray-100 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold transition-all"
                  >
                    Guardar preferencias
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 px-5 py-3 btn-orange"
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