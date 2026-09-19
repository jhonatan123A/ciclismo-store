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
      <div className="relative min-h-screen pt-24 pb-16 px-6 flex items-center justify-center overflow-hidden">
        {/* Glow triádico de fondo */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#FF5A36]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#38BDF8]/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E8B94A]/3 rounded-full blur-3xl" />
        </div>

        <div className="max-w-md w-full text-center">
          <p className="text-eyebrow text-[#FF5A36] mb-6 flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-gradient-to-r from-[#FF5A36] via-[#38BDF8] to-[#E8B94A]" />
            Carrito
          </p>
          <h1 className="display-hero text-[clamp(2rem,5vw,3.5rem)] text-white mb-6">
            Tu carrito
            <br />
            <span className="gradient-text-triad">está vacío.</span>
          </h1>
          <p className="text-white/40 text-sm mb-10 leading-relaxed">
            Explora nuestra tecnología somatosensorial y comienza tu experiencia BESTIGE.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-7 py-3.5 btn-orange text-[10px] tracking-[0.2em] uppercase font-semibold"
          >
            <ArrowLeft className="w-3 h-3" />
            Explorar productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6 md:px-10 overflow-hidden">
      {/* Glow triádico de fondo */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-[#FF5A36]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#38BDF8]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#E8B94A]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-[#FF5A36] transition-colors mb-10 text-[11px] tracking-[0.2em] uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Seguir comprando
        </Link>

        {/* Header */}
        <div className="flex items-end justify-between mb-10 pb-6 border-b border-white/10">
          <div>
            <p className="text-eyebrow text-[#FF5A36] mb-3 flex items-center gap-3">
              <span className="w-6 h-[1px] bg-gradient-to-r from-[#FF5A36] via-[#38BDF8] to-[#E8B94A]" />
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
            className="text-[10px] text-white/30 hover:text-[#FF5A36] transition-colors tracking-[0.2em] uppercase"
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
                className="group flex gap-5 p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#FF5A36]/30 transition-all hover:shadow-[0_0_40px_rgba(255,90,54,0.08)]"
              >
                {/* Imagen */}
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-lg bg-white/5 overflow-hidden flex-shrink-0 ring-1 ring-white/5 group-hover:ring-[#FF5A36]/30 transition-all">
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
                          <span className="w-1 h-1 bg-[#FF5A36] rounded-full" />
                          <span>{item.color}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-white/30 hover:text-[#FF5A36] transition-colors flex-shrink-0"
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
                        className="w-7 h-7 rounded border border-white/15 hover:border-[#FF5A36]/50 flex items-center justify-center text-white/60 hover:text-[#FF5A36] transition-all"
                        aria-label="Disminuir"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-white text-sm w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded border border-white/15 hover:border-[#FF5A36]/50 flex items-center justify-center text-white/60 hover:text-[#FF5A36] transition-all"
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
                        <p className="text-[10px] text-[#FF5A36] tracking-wider mt-0.5">
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
            <div className="lg:sticky lg:top-24 p-6 rounded-2xl border border-white/10 bg-white/[0.02] relative overflow-hidden">
              {/* Glow triádico en el resumen */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FF5A36]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative">
                <p className="text-eyebrow text-white/40 mb-5">Resumen del pedido</p>

                <div className="space-y-3 text-sm pb-5 border-b border-white/10">
                  <div className="flex justify-between text-white/60">
                    <span className="text-xs tracking-wider">Subtotal</span>
                    <span>${(totalPrice + savings).toLocaleString('es-CO')}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-[#FF5A36]">
                      <span className="text-xs tracking-wider">Ahorro</span>
                      <span className="font-medium">-${savings.toLocaleString('es-CO')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-white/60">
                    <span className="text-xs tracking-wider">Envío</span>
                    <span className="text-[#FF5A36] font-medium">Gratis</span>
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
                  className="block w-full py-4 btn-orange text-[10px] tracking-[0.2em] uppercase font-semibold text-center group"
                >
                  <span className="inline-flex items-center gap-2">
                    Proceder al pago
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>

                <Link
                  href="/"
                  className="block w-full text-center mt-4 text-[10px] text-white/40 hover:text-[#FF5A36] transition-colors tracking-wider uppercase"
                >
                  Seguir comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}