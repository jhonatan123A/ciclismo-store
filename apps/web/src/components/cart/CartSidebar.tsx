'use client';

import { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import Link from 'next/link';

export function CartSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice, getSavings, clearCart } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const savings = getSavings();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) {
    return (
      <button
        className="relative text-white hover:text-[#FF5A36] transition-colors"
        aria-label="Abrir carrito"
      >
        <ShoppingBag className="w-5 h-5" />
      </button>
    );
  }

  return (
    <>
      {/* Botón para abrir */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative text-white hover:text-[#FF5A36] transition-colors"
        aria-label="Abrir carrito"
      >
        <ShoppingBag className="w-5 h-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#FF5A36] text-white text-[9px] rounded-full flex items-center justify-center font-bold shadow-[0_0_10px_rgba(255,90,54,0.6)]">
            {totalItems}
          </span>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full sm:w-[440px] bg-black border-l border-white/10 z-[101] 
          transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 relative overflow-hidden">
          {/* Glow triádico en el header */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF5A36]/5 via-[#38BDF8]/5 to-[#E8B94A]/5 pointer-events-none" />

          <div className="relative">
            <h2 className="text-white font-bold text-base tracking-tight">
              Carrito
            </h2>
            {totalItems > 0 && (
              <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase mt-1">
                {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
              </p>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-[#FF5A36] hover:bg-[#FF5A36]/5 transition-all"
            aria-label="Cerrar carrito"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Contenido */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
            <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center mb-6">
              <ShoppingBag className="w-8 h-8 text-white/30" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Tu carrito está vacío</h3>
            <p className="text-white/40 text-xs leading-relaxed max-w-xs mb-8">
              Explora nuestros productos y comienza tu experiencia BESTIGE
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="px-7 py-3 btn-orange text-[10px] tracking-[0.2em] uppercase font-semibold"
            >
              Ver productos
            </button>
          </div>
        ) : (
          <>
            {/* Lista de productos */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white/[0.02] rounded-xl border border-white/10 hover:border-[#FF5A36]/30 transition-all hover:shadow-[0_0_30px_rgba(255,90,54,0.06)]"
                >
                  {/* Imagen */}
                  <div className="w-20 h-20 rounded-lg bg-[#0A0A0A] overflow-hidden flex-shrink-0 border border-white/5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/products/placeholder.jpg';
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-white font-medium text-sm truncate">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-white/30 hover:text-[#FF5A36] transition-colors flex-shrink-0"
                        aria-label="Eliminar producto"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-white/40 mt-1 tracking-wider uppercase">
                      <span>{item.size}</span>
                      <span className="w-1 h-1 bg-[#FF5A36] rounded-full" />
                      <span>{item.color}</span>
                    </div>

                    {/* Precio */}
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-white font-semibold text-sm">
                        ${(item.price * item.quantity).toLocaleString('es-CO')}
                      </span>
                      {item.originalPrice > item.price && (
                        <>
                          <span className="text-[10px] text-white/30 line-through">
                            ${(item.originalPrice * item.quantity).toLocaleString('es-CO')}
                          </span>
                          <span className="text-[10px] text-[#FF5A36] font-medium tracking-wider">
                            -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                          </span>
                        </>
                      )}
                    </div>

                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-white/15 rounded-full hover:border-[#FF5A36]/40 transition-colors">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-white/60 hover:text-[#FF5A36] transition-colors"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white text-xs w-6 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-white/60 hover:text-[#FF5A36] transition-colors"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 px-6 py-5 space-y-4 bg-black relative">
              {/* Glow triádico en el footer */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#FF5A36]/5 via-transparent to-transparent pointer-events-none" />

              <div className="relative">
                {/* Resumen */}
                <div className="space-y-2">
                  {savings > 0 && (
                    <div className="flex justify-between text-[11px] text-[#FF5A36] tracking-wider">
                      <span className="uppercase">Ahorro</span>
                      <span className="font-medium">${savings.toLocaleString('es-CO')}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-baseline pt-2 border-t border-white/5">
                    <span className="text-eyebrow text-white/60">Total</span>
                    <span className="text-white font-bold text-xl">
                      ${totalPrice.toLocaleString('es-CO')}
                    </span>
                  </div>
                </div>

                {/* Botones */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="py-3 text-center bg-transparent border border-white/15 hover:border-[#FF5A36]/50 text-white rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold transition-all"
                  >
                    Ver carrito
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={() => setIsOpen(false)}
                    className="py-3 text-center btn-orange text-[10px] tracking-[0.2em] uppercase font-semibold"
                  >
                    Pagar
                  </Link>
                </div>

                <button
                  onClick={clearCart}
                  className="w-full text-center text-[10px] text-white/30 hover:text-[#FF5A36] transition-colors tracking-wider uppercase mt-4"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}