'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { CartSidebar } from '@/components/cart/CartSidebar';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  const navItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Running', href: '/products/running' },
    { label: 'Ciclismo', href: '/products/cycling' },
    { label: 'Tecnología', href: '/technology' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo BESTIGE con imagen */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-38 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center overflow-hidden">
              <img 
                src="/images/brand/logo.png" 
                alt="BESTIGE" 
                className="w-full h-full object-cover p-1"
                onError={(e) => {
                  // Si no carga la imagen, mostrar la B
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="text-white font-bold text-lg absolute"></span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white tracking-tight">
                BESTIGE
              </span>
              <span className="text-[10px] text-gray-500 font-light tracking-widest uppercase">
                Somatosensorial
              </span>
            </div>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-gray-400 hover:text-white transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Acciones - Carrito */}
          <div className="flex items-center gap-4">
            <CartSidebar />
            <button
              className="md:hidden text-gray-400 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menú Móvil */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-white/5">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}