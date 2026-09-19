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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          ? 'bg-black/70 backdrop-blur-xl border-b border-[#FF5A36]/10'
          : 'bg-gradient-to-b from-black/80 to-transparent border-b border-transparent'
      }`}
      style={{ fontFamily: 'var(--font-display)' }}
    >
      {/* Línea de acento triádica inferior */}
      <div
        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF5A36] via-[#38BDF8] to-[#E8B94A] opacity-30 transition-opacity duration-500"
        style={{ width: isScrolled ? '100%' : '0%' }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* LOGO */}
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
            <span className="text-white font-black text-base md:text-lg tracking-[0.35em] group-hover:text-[#FF5A36] transition-colors duration-300">
              BESTIGE
            </span>
          </Link>

          {/* NAVEGACIÓN CENTRADA */}
          <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item, index) => {
              const colors = ['#FF5A36', '#38BDF8', '#E8B94A', '#C17A4B'];
              const color = colors[index % colors.length];
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-white/60 hover:text-white text-[10px] tracking-[0.28em] uppercase font-medium transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full"
                    style={{
                      background: `linear-gradient(90deg, ${color}, transparent)`,
                      boxShadow: `0 0 8px ${color}`,
                    }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ACCIONES */}
          <div className="flex items-center gap-3 z-10">
            <Link
              href="/nosotros"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-[#FF5A36]/30 hover:border-[#FF5A36]/60 text-white rounded-full text-[10px] tracking-[0.25em] uppercase font-medium transition-all duration-300 group hover:bg-[#FF5A36]/5 hover:shadow-[0_0_20px_rgba(255,90,54,0.15)]"
            >
              Nuestra historia
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <CartSidebar />

            <button
              className="lg:hidden text-white hover:text-[#FF5A36] transition-colors"
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
              {navItems.map((item, index) => {
                const colors = ['#FF5A36', '#38BDF8', '#E8B94A', '#C17A4B'];
                const color = colors[index % colors.length];
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-white/70 hover:text-white transition-colors text-xs tracking-[0.28em] uppercase font-medium flex items-center gap-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span
                      className="w-2 h-[1px] transition-all"
                      style={{
                        background: color,
                        boxShadow: `0 0 8px ${color}`,
                      }}
                    />
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/nosotros"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#FF5A36]/30 text-white rounded-full text-[10px] tracking-[0.25em] uppercase font-medium w-fit mt-2 hover:bg-[#FF5A36]/5 transition-colors"
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