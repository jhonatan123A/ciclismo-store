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

  // Cargar preferencias actuales cuando se abre
  useEffect(() => {
    if (consent) {
      setPreferences({
        performance: consent.preferences.performance,
        functional: consent.preferences.functional,
        marketing: consent.preferences.marketing,
      });
    }
  }, [consent]);

  // Escuchar cuando se quiere abrir el banner desde el footer
  const handleOpenFromFooter = useCallback(() => {
    setIsVisible(true);
    setView('config'); // Abrir directamente en la vista de configuración
  }, []);

  useOpenCookiesBannerListener(handleOpenFromFooter);

  // Mostrar automáticamente si no ha consentido
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
    // Solo cerrar si ya había consentido antes (no en la primera visita)
    if (hasConsented) {
      setIsVisible(false);
      setView('banner');
    }
  };

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
          <div className="max-w-6xl mx-auto bg-[#0A0A0A]/98 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            {/* Banner principal */}
            {view === 'banner' && (
              <div className="p-6 md:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-[#FF7A5C]/10 border border-[#FF7A5C]/20 flex items-center justify-center text-[#FF7A5C] flex-shrink-0">
                      <Cookie className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-white font-bold text-base tracking-tight">
                          Respetamos tu privacidad
                        </h3>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#FF7A5C]/10 border border-[#FF7A5C]/20 text-[#FF7A5C] tracking-widest uppercase font-medium">
                          Cookies
                        </span>
                      </div>
                      <p className="text-white/60 text-xs leading-relaxed">
                        Utilizamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar contenido. Puedes aceptar todas, rechazar las no esenciales o configurar tus preferencias. Lee nuestra{' '}
                        <Link href="/cookies" className="text-[#FF7A5C] hover:underline">
                          política de cookies
                        </Link>{' '}
                        y{' '}
                        <Link href="/privacidad" className="text-[#FF7A5C] hover:underline">
                          política de privacidad
                        </Link>
                        .
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0">
                    <button
                      onClick={() => setView('config')}
                      className="px-5 py-3 border border-white/15 hover:border-white/30 text-white/70 hover:text-white rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold transition-all"
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
                      className="px-5 py-3 bg-white text-black hover:bg-gray-100 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold transition-all whitespace-nowrap"
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
                      className="text-white/60 hover:text-white transition-colors"
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
                      className="text-white/40 hover:text-white transition-colors"
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
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          type.required
                            ? 'bg-[#FF7A5C]/10 border border-[#FF7A5C]/20 text-[#FF7A5C]'
                            : 'bg-white/5 border border-white/10 text-white/60'
                        }`}>
                          {type.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-4 mb-2">
                            <div className="flex items-center gap-2">
                              <h4 className="text-white font-semibold text-sm">
                                {type.title}
                              </h4>
                              {type.required && (
                                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#FF7A5C]/10 border border-[#FF7A5C]/20 text-[#FF7A5C] tracking-widest uppercase font-medium">
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
                                    ? 'bg-[#FF7A5C]'
                                    : 'bg-white/10'
                                }`}
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
                    className="flex-1 px-5 py-3 bg-[#FF7A5C] text-white hover:bg-[#FF5A5F] rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold transition-all"
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