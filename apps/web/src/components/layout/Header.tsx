"use client";

import Link from 'next/link';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold text-white">BESTIGE</span>
              <span className="text-xs text-gray-400 font-light">®</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white hover:text-blue-400 transition-colors">
              Inicio
            </Link>
            <Link href="/products/running" className="text-white hover:text-blue-400 transition-colors">
              Running
            </Link>
            <Link href="/products/cycling" className="text-white hover:text-blue-400 transition-colors">
              Ciclismo
            </Link>
            <Link href="/technology" className="text-white hover:text-blue-400 transition-colors">
              Tecnología
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="text-white hover:text-blue-400 transition-colors">
              <ShoppingBag className="w-6 h-6" />
            </button>
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
          <nav className="flex flex-col p-4 space-y-4">
            <Link href="/" className="text-white hover:text-blue-400 transition-colors">
              Inicio
            </Link>
            <Link href="/products/running" className="text-white hover:text-blue-400 transition-colors">
              Running
            </Link>
            <Link href="/products/cycling" className="text-white hover:text-blue-400 transition-colors">
              Ciclismo
            </Link>
            <Link href="/technology" className="text-white hover:text-blue-400 transition-colors">
              Tecnología
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}