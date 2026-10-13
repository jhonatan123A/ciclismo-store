'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/lib/cart-store';
import Link from 'next/link';
import { Trash2, Minus, Plus, ArrowLeft, ArrowRight, Package, Truck, RefreshCw, Lock, Headphones, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackViewCart } from '@/lib/analytics';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice, getSavings, clearCart } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const savings = getSavings();

  useEffect(() => {
    if (items.length > 0) {
      trackViewCart(
        items.map((item) => ({
          item_id: item.productId,
          item_name: item.name,
          item_category: item.category,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
        totalPrice
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  if (items.length === 0) {
    return (
      <div className="relative min-h-screen pt-24 pb-16 px-6 flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#BFAE85]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#BFAE85]/4 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#BFAE85]/3 rounded-full blur-3xl" />
        </div>

        <div className="max-w-md w-full text-center">
          <p className="text-eyebrow text-[#BFAE85] mb-6 flex items-center justify-center gap-3">
            <span
              className="w-8 h-[1px]"
              style={{
                background: `linear-gradient(90deg, #BFAE85 0%, transparent 100%)`,
              }}
            />
            Tu equipamiento BESTIGE
          </p>
          <h1 className="display-hero text-[clamp(2rem,5vw,3.5rem)] text-white mb-6">
            Tu carrito
            <br />
            <span className="gradient-text-gold">está vacío.</span>
          </h1>
          <p className="text-white/40 text-sm mb-10 leading-relaxed">
            Explora nuestra tecnología somatosensorial y comienza tu experiencia BESTIGE.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-7 py-3.5 btn-gold text-[10px] tracking-[0.2em] uppercase font-semibold"
            >
              <ArrowLeft className="w-3 h-3" />
              Explorar productos
            </Link>
            <Link
              href="/orders"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/10 hover:border-[#BFAE85]/40 text-white/60 hover:text-white transition-all text-[10px] tracking-[0.2em] uppercase font-semibold"
            >
              <Package className="w-3.5 h-3.5 text-[#BFAE85]" />
              Mis Pedidos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-4 sm:px-6 md:px-10 overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-[#BFAE85]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#BFAE85]/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#BFAE85]/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-[#BFAE85] transition-colors text-[11px] tracking-[0.2em] uppercase"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Seguir comprando
          </Link>

          <Link
            href="/orders"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#BFAE85] transition-colors text-[11px] tracking-[0.2em] uppercase"
          >
            <Package className="w-3.5 h-3.5 text-[#BFAE85]" />
            Mis Pedidos
          </Link>
        </div>

        {/* Header */}
        <div className="flex items-end justify-between mb-10 pb-6 border-b border-white/10">
          <div>
            <p className="text-eyebrow text-[#BFAE85] mb-3 flex items-center gap-3">
              <span
                className="w-6 h-[1px]"
                style={{
                  background: `linear-gradient(90deg, #BFAE85 0%, transparent 100%)`,
                }}
              />
              Tu equipamiento
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              Tu equipamiento BESTIGE
            </h1>
            <p className="text-white/40 text-xs mt-2 tracking-wider">
              {totalItems} {totalItems === 1 ? 'producto seleccionado' : 'productos seleccionados'}
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-[10px] text-white/30 hover:text-[#BFAE85] transition-colors tracking-[0.2em] uppercase"
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
                className="group flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#BFAE85]/30 transition-all hover:shadow-[0_0_40px_rgba(191,174,133,0.08)]"
              >
                {/* Imagen */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-lg bg-[#0A0A0A] overflow-hidden flex-shrink-0 ring-1 ring-white/5 group-hover:ring-[#BFAE85]/30 transition-all mx-auto sm:mx-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain brightness-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/products/placeholder.jpg';
                    }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-white font-bold text-base sm:text-lg md:text-xl mb-2 break-words">
                          {item.name}
                        </h3>
                        <p className="text-white/40 text-[11px] mb-3 tracking-wide">
                          Tecnología somatosensorial integrada.
                        </p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] tracking-wider uppercase">
                          <span className="text-[#BFAE85] font-semibold">
                            {item.gender}
                          </span>
                          <span className="w-1 h-1 bg-white/20 rounded-full" />
                          <span className="text-white/40">
                            Cantidad: {item.quantity}
                          </span>
                          <span className="w-1 h-1 bg-white/20 rounded-full" />
                          <span className="text-white/40">Talla {item.size}</span>
                          <span className="w-1 h-1 bg-white/20 rounded-full" />
                          <span className="text-white/40">{item.color}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-white/30 hover:text-[#BFAE85] transition-colors flex-shrink-0"
                        aria-label="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Precio + Controles */}
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded border border-white/15 hover:border-[#BFAE85]/50 flex items-center justify-center text-white/60 hover:text-[#BFAE85] transition-all"
                        aria-label="Disminuir"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-white text-sm w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded border border-white/15 hover:border-[#BFAE85]/50 flex items-center justify-center text-white/60 hover:text-[#BFAE85] transition-all"
                        aria-label="Aumentar"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-left sm:text-right">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-white font-bold text-lg sm:text-xl md:text-2xl">
                          ${(item.price * item.quantity).toLocaleString('es-CO')}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-xs text-white/30 line-through">
                            ${(item.originalPrice * item.quantity).toLocaleString('es-CO')}
                          </span>
                        )}
                      </div>
                      {item.originalPrice > item.price && (
                        <p className="text-[10px] text-[#BFAE85] tracking-wider mt-0.5">
                          Ahorro: ${((item.originalPrice - item.price) * item.quantity).toLocaleString('es-CO')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Bloque discreto de tecnología */}
            <div className="pt-6 mt-6 border-t border-white/5">
              <p className="text-[9px] tracking-[0.35em] uppercase font-semibold text-[#BFAE85] mb-2">
                BESTIGE TECHNOLOGY
              </p>
              <p className="text-white/40 text-[11px] leading-relaxed max-w-md">
                Prendas desarrolladas para acompañar la conexión entre cuerpo y movimiento.
              </p>
            </div>
          </div>

          {/* Resumen */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 p-6 rounded-2xl border border-white/10 bg-white/[0.02] relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#BFAE85]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#BFAE85]/8 rounded-full blur-3xl pointer-events-none" />

              <div className="relative">
                {/* Bloque "Tu selección tecnológica" */}
                <div className="mb-6 pb-5 border-b border-white/10">
                  <p className="text-eyebrow text-[#BFAE85] mb-2">
                    Tu selección tecnológica
                  </p>
                  <p className="text-white/40 text-[11px] leading-relaxed">
                    {totalItems} {totalItems === 1 ? 'producto' : 'productos'} diseñados para acompañar tu rendimiento.
                  </p>
                </div>

                <div className="space-y-3 text-sm pb-5 border-b border-white/10">
                  <div className="flex justify-between text-white/60">
                    <span className="text-xs tracking-wider">Subtotal</span>
                    <span>${(totalPrice + savings).toLocaleString('es-CO')}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-[#BFAE85]">
                      <span className="text-xs tracking-wider font-semibold">Ahorro total</span>
                      <span className="font-bold text-base">-${savings.toLocaleString('es-CO')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-white/60">
                    <span className="text-xs tracking-wider">Envío</span>
                    <span className="text-[#BFAE85] font-medium">Gratis</span>
                  </div>
                </div>

                {/* Total con más jerarquía */}
                <div className="flex flex-col gap-1 py-5 mb-3">
                  <span className="text-[#BFAE85] text-[10px] tracking-[0.3em] uppercase font-semibold">
                    Total equipamiento
                  </span>
                  <span className="text-white text-3xl md:text-4xl font-bold leading-none">
                    ${totalPrice.toLocaleString('es-CO')}
                  </span>
                </div>

                {/* Frase emocional más visible */}
                <p className="text-white/60 text-xs italic mb-6 leading-relaxed">
                  Tecnología creada para acompañarte cuando el esfuerzo aumenta.
                </p>

                <Link
                  href="/checkout"
                  className="block w-full py-4 btn-gold text-[10px] tracking-[0.2em] uppercase font-semibold text-center group mb-3 shadow-[0_0_30px_rgba(191,174,133,0.35)] hover:scale-[1.02] transition-transform"
                >
                  <span className="inline-flex items-center gap-2">
                    Continuar al pago
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>

                {/* Ayuda con talla */}
                <div className="flex items-center justify-center gap-2 mb-5 text-[10px] text-white/40 text-center">
                  <MessageCircle className="w-3 h-3 text-[#BFAE85] flex-shrink-0" />
                  <span>¿Dudas con tu talla? Te ayudamos a elegir el ajuste ideal.</span>
                </div>

                {/* Bloque de confianza */}
                <div className="space-y-2.5 pb-5 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-3 text-white/60 text-[11px]">
                    <Truck className="w-3.5 h-3.5 text-[#BFAE85] flex-shrink-0" />
                    <span>Envíos gratis a Colombia</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60 text-[11px]">
                    <RefreshCw className="w-3.5 h-3.5 text-[#BFAE85] flex-shrink-0" />
                    <span>Cambios de talla disponibles</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60 text-[11px]">
                    <Lock className="w-3.5 h-3.5 text-[#BFAE85] flex-shrink-0" />
                    <span>Pago 100% seguro</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60 text-[11px]">
                    <Headphones className="w-3.5 h-3.5 text-[#BFAE85] flex-shrink-0" />
                    <span>Soporte BESTIGE</span>
                  </div>
                </div>

                <Link
                  href="/orders"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full border border-white/10 hover:border-[#BFAE85]/40 text-white/60 hover:text-white transition-all text-[10px] tracking-[0.2em] uppercase font-semibold mb-2"
                >
                  <Package className="w-3.5 h-3.5 text-[#BFAE85]" />
                  Consultar mis pedidos
                </Link>

                <Link
                  href="/"
                  className="block w-full text-center mt-2 text-[10px] text-white/40 hover:text-[#BFAE85] transition-colors tracking-wider uppercase"
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