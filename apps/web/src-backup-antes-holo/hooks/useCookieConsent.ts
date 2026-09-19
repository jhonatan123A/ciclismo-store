'use client';

import { useState, useEffect } from 'react';

export interface CookiePreferences {
  essential: true;
  performance: boolean;
  functional: boolean;
  marketing: boolean;
}

export interface ConsentData {
  preferences: CookiePreferences;
  timestamp: string;
  version: string;
  userAgent?: string;
}

const CONSENT_KEY = 'bestige-cookie-consent';
const CONSENT_VERSION = '1.0';

// Evento global para abrir el banner desde cualquier parte
const OPEN_BANNER_EVENT = 'bestige-open-cookies-banner';

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CONSENT_KEY);
      if (saved) {
        const parsed: ConsentData = JSON.parse(saved);
        if (parsed.version === CONSENT_VERSION) {
          setConsent(parsed);
        } else {
          localStorage.removeItem(CONSENT_KEY);
        }
      }
    } catch (error) {
      console.error('Error loading consent:', error);
    }
    setIsLoaded(true);
  }, []);

  const saveConsent = (preferences: CookiePreferences) => {
    const data: ConsentData = {
      preferences,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    };

    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
      setConsent(data);
      return true;
    } catch (error) {
      console.error('Error saving consent:', error);
      return false;
    }
  };

  const acceptAll = () => {
    return saveConsent({
      essential: true,
      performance: true,
      functional: true,
      marketing: true,
    });
  };

  const rejectAll = () => {
    return saveConsent({
      essential: true,
      performance: false,
      functional: false,
      marketing: false,
    });
  };

  const saveCustom = (preferences: Omit<CookiePreferences, 'essential'>) => {
    return saveConsent({
      essential: true,
      ...preferences,
    });
  };

  const revokeConsent = () => {
    try {
      localStorage.removeItem(CONSENT_KEY);
      setConsent(null);
      return true;
    } catch (error) {
      return false;
    }
  };

  const hasConsent = (type: keyof CookiePreferences): boolean => {
    if (!consent) return false;
    return consent.preferences[type];
  };

  return {
    consent,
    isLoaded,
    hasConsented: !!consent,
    acceptAll,
    rejectAll,
    saveCustom,
    revokeConsent,
    hasConsent,
  };
}

// ============================================
// FUNCIONES GLOBALES PARA ABRIR/ESCUCHAR EL BANNER
// ============================================

/**
 * Abre el banner de cookies desde cualquier parte del sitio
 * (útil para el botón "Preferencias de cookies" en el footer)
 */
export function openCookiesBanner() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(OPEN_BANNER_EVENT));
  }
}

/**
 * Hook para escuchar cuando se quiere abrir el banner
 * (usado por el componente CookiesBanner)
 */
export function useOpenCookiesBannerListener(callback: () => void) {
  useEffect(() => {
    const handler = () => callback();
    window.addEventListener(OPEN_BANNER_EVENT, handler);
    return () => window.removeEventListener(OPEN_BANNER_EVENT, handler);
  }, [callback]);
}

export { OPEN_BANNER_EVENT };