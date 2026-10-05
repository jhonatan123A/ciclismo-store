'use client';

import { useEffect } from 'react';

/**
 * Hook que activa animaciones CSS al hacer scroll.
 * 
 * Busca todos los elementos con `[data-animate]` y les agrega la clase
 * `animate-fade-in-up` cuando entran al viewport por primera vez.
 * 
 * Uso:
 *   useFadeInOnScroll();
 * 
 * Y en el HTML:
 *   <div data-animate style={{ animationDelay: '0.15s' }}>...</div>
 */
export function useFadeInOnScroll() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}