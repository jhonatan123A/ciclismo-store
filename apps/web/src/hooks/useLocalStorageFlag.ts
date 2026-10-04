'use client';

import { useEffect, useState } from 'react';

/**
 * Hook para manejar banderas persistentes en localStorage.
 * 
 * Uso típico:
 *   const [seen, setSeen] = useLocalStorageFlag('welcome-modal-seen', false);
 *   if (!seen) { ...mostrar modal... setSeen(true); }
 * 
 * Características:
 * - SSR-safe (no rompe con Next.js Server Components)
 * - Auto-serializa/deserializa JSON
 * - Sincroniza entre pestañas del mismo navegador
 */
export function useLocalStorageFlag(
  key: string,
  initialValue: boolean = false
): [boolean, (value: boolean) => void, boolean] {
  const [value, setValue] = useState<boolean>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  // Leer el valor inicial en el cliente (después de hidratación)
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        setValue(JSON.parse(stored));
      }
    } catch (error) {
      console.warn(`⚠️ localStorage read error for "${key}":`, error);
    }
    setIsHydrated(true);
  }, [key]);

  // Setter que también escribe en localStorage
  const setStoredValue = (newValue: boolean) => {
    setValue(newValue);
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.warn(`⚠️ localStorage write error for "${key}":`, error);
    }
  };

  // Sincronización entre pestañas
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(`⚠️ StorageEvent parse error for "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [value, setStoredValue, isHydrated];
}

/**
 * Similar al anterior, pero para guardar un timestamp (fecha de última visita).
 */
export function useLocalStorageTimestamp(
  key: string
): [number | null, (value: number) => void, boolean] {
  const [value, setValue] = useState<number | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        setValue(JSON.parse(stored));
      }
    } catch (error) {
      console.warn(`⚠️ localStorage read error for "${key}":`, error);
    }
    setIsHydrated(true);
  }, [key]);

  const setStoredValue = (newValue: number) => {
    setValue(newValue);
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.warn(`⚠️ localStorage write error for "${key}":`, error);
    }
  };

  return [value, setStoredValue, isHydrated];
}