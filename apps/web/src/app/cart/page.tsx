'use client';

import { useCartStore } from '@/lib/cart-store';
import Link from 'next/link';
import { Trash2, Minus, Plus, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice, getSavings, clearCart } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const savings = getSavings();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Tu Carrito</h1>
          <div className="glass rounded-2xl p-12">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl text-white font-medium mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-400 mb-6">Explora nuestros productos y comienza tu experiencia BESTIGE</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">
            Tu Carrito
            <span className="text-gray-400 text-lg font-normal ml-2">
              ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})
            </span>
          </h1>
          <button
            onClick={clearCart}
            className="text-sm text-gray-500 hover:text-red-400 transition-colors"
          >
            Vaciar carrito
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-6 glass rounded-xl"
              >
                <div className="w-24 h-24 rounded-lg bg-white/5 overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/products/placeholder.jpg';
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold">{item.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>Talla: {item.size}</span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full" />
                    <span>Color: {item.color}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xl font-bold text-white">
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                    {item.originalPrice > item.price && (
                      <span className="text-sm text-gray-400 line-through">
                        ${(item.originalPrice * item.quantity).toLocaleString()}
                      </span>
                    )}
                    {item.originalPrice > item.price && (
                      <span className="text-xs text-green-400 font-medium">
                        -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <Minus className="w-4 h-4 text-white" />
                    </button>
                    <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto p-2 bg-white/10 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen */}
          <div className="lg:col-span-1">
            <div className="glass rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-4">Resumen</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal ({totalItems} productos)</span>
                  <span>${(totalPrice + savings).toLocaleString()}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Ahorro</span>
                    <span>-${savings.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full mt-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-center transition-colors"
              >
                Proceder al Pago
              </Link>

              <Link
                href="/"
                className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Seguir comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}