'use client';

import { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import Link from 'next/link';

export function CartSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice, getSavings, clearCart } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const savings = getSavings();

  // Cerrar con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      {/* Botón para abrir */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative text-white hover:text-blue-400 transition-colors"
        aria-label="Abrir carrito"
      >
        <ShoppingBag className="w-6 h-6" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full sm:w-[450px] bg-black/95 backdrop-blur-xl 
          border-l border-white/10 z-50 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">
            Carrito
            {totalItems > 0 && (
              <span className="text-sm text-gray-400 font-normal ml-2">
                ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})
              </span>
            )}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Cerrar carrito"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Contenido */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[70vh] text-center px-6">
            <ShoppingBag className="w-20 h-20 text-gray-600 mb-4" />
            <h3 className="text-xl text-white font-medium mb-2">Tu carrito está vacío</h3>
            <p className="text-gray-400 text-sm">Explora nuestros productos y comienza tu experiencia BESTIGE</p>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
            >
              Ver productos
            </button>
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100%-80px)]">
            {/* Lista de productos */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
                >
                  {/* Imagen */}
                  <div className="w-20 h-20 rounded-lg bg-white/5 overflow-hidden flex-shrink-0">
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
                    <h4 className="text-white font-medium text-sm truncate">{item.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>Talla: {item.size}</span>
                      <span className="w-1 h-1 bg-gray-600 rounded-full" />
                      <span>Color: {item.color}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-white font-semibold">
                        ${(item.price * item.quantity).toLocaleString('es-CO')}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        ${(item.originalPrice * item.quantity).toLocaleString('es-CO')}
                      </span>
                      <span className="text-xs text-green-400 font-medium">
                        -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                      </span>
                    </div>

                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-1 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus className="w-4 h-4 text-gray-400" />
                      </button>
                      <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="w-4 h-4 text-gray-400" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto p-1 hover:bg-red-500/20 rounded transition-colors"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer del carrito */}
            <div className="border-t border-white/10 p-4 space-y-4">
              {/* Resumen */}
              <div className="space-y-2 text-sm">
                {savings > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Ahorro</span>
                    <span>${savings.toLocaleString('es-CO')}</span>
                  </div>
                )}
                <div className="flex justify-between text-white font-semibold text-lg">
                  <span>Total</span>
                  <span>${totalPrice.toLocaleString('es-CO')}</span>
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    window.location.href = '/cart';
                  }}
                  className="flex-1 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  Ver Carrito
                </button>
                <button
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
                >
                  Proceder al Pago
                </button>
              </div>

              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-gray-500 hover:text-red-400 transition-colors"
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}