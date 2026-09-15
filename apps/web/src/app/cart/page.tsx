'use client';

import { useCartStore } from '@/lib/cart-store';
import Link from 'next/link';
import { Trash2, Minus, Plus, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice, getSavings, clearCart } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const savings = getSavings();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-6 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <p className="text-eyebrow text-[#FF7A5C] mb-6 flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#FF7A5C]" />
            Carrito
          </p>
          <h1 className="display-hero text-[clamp(2rem,5vw,3.5rem)] text-white mb-6">
            Tu carrito
            <br />
            <span className="text-white/60">está vacío.</span>
          </h1>
          <p className="text-white/40 text-sm mb-10 leading-relaxed">
            Explora nuestra tecnología somatosensorial y comienza tu experiencia BESTIGE.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-7 py-3.5 bg-white text-black rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-gray-100 transition-all"
          >
            <ArrowLeft className="w-3 h-3" />
            Explorar productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-10 text-[11px] tracking-[0.2em] uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Seguir comprando
        </Link>

        {/* Header */}
        <div className="flex items-end justify-between mb-10 pb-6 border-b border-white/10">
          <div>
            <p className="text-eyebrow text-[#FF7A5C] mb-3 flex items-center gap-3">
              <span className="w-6 h-[1px] bg-[#FF7A5C]" />
              Tu selección
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              Carrito
            </h1>
            <p className="text-white/40 text-xs mt-2 tracking-wider">
              {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-[10px] text-white/30 hover:text-red-400 transition-colors tracking-[0.2em] uppercase"
          >
            Vaciar
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Productos */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex gap-5 p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all"
              >
                {/* Imagen */}
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-lg bg-white/5 overflow-hidden flex-shrink-0">
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
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-white font-bold text-base mb-1">{item.name}</h3>
                        <div className="flex items-center gap-2 text-[10px] text-white/40 tracking-wider uppercase">
                          <span>Talla {item.size}</span>
                          <span className="w-1 h-1 bg-white/20 rounded-full" />
                          <span>{item.color}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-white/30 hover:text-red-400 transition-colors flex-shrink-0"
                        aria-label="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Precio + Controles */}
                  <div className="flex items-end justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded border border-white/15 hover:border-white/40 flex items-center justify-center text-white/60 hover:text-white transition-all"
                        aria-label="Disminuir"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-white text-sm w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded border border-white/15 hover:border-white/40 flex items-center justify-center text-white/60 hover:text-white transition-all"
                        aria-label="Aumentar"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="flex items-baseline gap-2">
                        <span className="text-white font-bold">
                          ${(item.price * item.quantity).toLocaleString('es-CO')}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-[10px] text-white/30 line-through">
                            ${(item.originalPrice * item.quantity).toLocaleString('es-CO')}
                          </span>
                        )}
                      </div>
                      {item.originalPrice > item.price && (
                        <p className="text-[10px] text-[#FF7A5C] tracking-wider mt-0.5">
                          -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Resumen */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <p className="text-eyebrow text-white/40 mb-5">Resumen del pedido</p>

              <div className="space-y-3 text-sm pb-5 border-b border-white/10">
                <div className="flex justify-between text-white/60">
                  <span className="text-xs tracking-wider">Subtotal</span>
                  <span>${(totalPrice + savings).toLocaleString('es-CO')}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-[#FF7A5C]">
                    <span className="text-xs tracking-wider">Ahorro</span>
                    <span>-${savings.toLocaleString('es-CO')}</span>
                  </div>
                )}
                <div className="flex justify-between text-white/60">
                  <span className="text-xs tracking-wider">Envío</span>
                  <span className="text-[#FF7A5C]">Gratis</span>
                </div>
              </div>

              <div className="flex items-baseline justify-between py-5 mb-6">
                <span className="text-white/40 text-xs tracking-[0.2em] uppercase">Total</span>
                <span className="text-white text-2xl font-bold">
                  ${totalPrice.toLocaleString('es-CO')}
                </span>
              </div>

              <Link
                href="/checkout"
                className="block w-full py-4 bg-white text-black rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold text-center hover:bg-gray-100 transition-all group"
              >
                <span className="inline-flex items-center gap-2">
                  Proceder al pago
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                href="/"
                className="block w-full text-center mt-4 text-[10px] text-white/40 hover:text-white transition-colors tracking-wider uppercase"
              >
                Seguir comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}