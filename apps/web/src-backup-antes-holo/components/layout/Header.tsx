'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { CartSidebar } from '@/components/cart/CartSidebar';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  // Efecto de scroll para cambiar el fondo del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ MENÚ ACTUALIZADO: Sin "Ciencia", "Nosotros" apunta a /nosotros
  const navItems = [
    { label: 'Tecnología', href: '/technology' },
    { label: 'Running', href: '/products/running' },
    { label: 'Ciclismo', href: '/products/cycling' },
    { label: 'Nosotros', href: '/nosotros' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/70 backdrop-blur-xl border-b border-white/5'
          : 'bg-gradient-to-b from-black/80 to-transparent border-b border-transparent'
      }`}
      style={{ fontFamily: 'var(--font-display)' }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* LOGO - Estilo Nike minimalista */}
          <Link href="/" className="flex items-center gap-2 group z-10">
            <div className="relative w-7 h-7 flex items-center justify-center">
              <img
                src="/images/brand/logo.png"
                alt="BESTIGE"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <span className="text-white font-black text-base md:text-lg tracking-[0.35em] group-hover:text-[#FF7A5C] transition-colors duration-300">
              BESTIGE
            </span>
          </Link>

          {/* NAVEGACIÓN CENTRADA - Desktop */}
          <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white/60 hover:text-white text-[10px] tracking-[0.28em] uppercase font-medium transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#FF7A5C] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* ACCIONES - Carrito + CTA */}
          <div className="flex items-center gap-3 z-10">
            {/* ✅ CTA pill - Ahora lleva a /nosotros con texto "Nuestra historia" */}
            <Link
              href="/nosotros"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-white/15 hover:border-white/40 text-white rounded-full text-[10px] tracking-[0.25em] uppercase font-medium transition-all duration-300 group hover:bg-white/5"
            >
              Nuestra historia
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Carrito (mantiene tu componente) */}
            <CartSidebar />

            {/* Botón menú móvil */}
            <button
              className="lg:hidden text-white hover:text-[#FF7A5C] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Abrir menú"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* MENÚ MÓVIL */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-white/10 bg-black/95 backdrop-blur-xl">
            <nav className="flex flex-col space-y-5">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-white/70 hover:text-white transition-colors text-xs tracking-[0.28em] uppercase font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/nosotros"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white rounded-full text-[10px] tracking-[0.25em] uppercase font-medium w-fit mt-2 hover:bg-white/5 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Nuestra historia
                <ArrowRight className="w-3 h-3" />
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}