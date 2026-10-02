'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { useWishlistStore } from '@/lib/wishlist-store';
import { useCartStore } from '@/lib/cart-store';

export default function WishlistPage() {
  const { items, removeItem, clearWishlist, getTotalItems } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addItem);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = getTotalItems();

  const handleAddToCart = (item: typeof items[0]) => {
    addToCart({
      productId: item.productId,
      name: item.name,
      slug: item.slug,
      price: item.price,
      originalPrice: item.originalPrice,
      quantity: 1,
      size: 'M',
      color: 'Negro',
      image: item.image,
      category: item.category,
    });
  };

  // Placeholder en SSR (evita hydration mismatch)
  if (!mounted) {
    return (
      <div className="relative min-h-screen pt-24 pb-16 px-6 md:px-10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="py-20 flex justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#FF5A36] border-t-transparent animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  // Estado vacío
  if (items.length === 0) {
    return (
      <div className="relative min-h-screen pt-24 pb-16 px-6 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#FF5A36]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#38BDF8]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-md w-full text-center">
          <p className="text-eyebrow text-[#FF5A36] mb-6 flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-gradient-to-r from-[#FF5A36] via-[#38BDF8] to-[#E8B94A]" />
            Favoritos
          </p>
          <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-white/30" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Tu lista está vacía
          </h1>
          <p className="text-white/40 text-sm mb-10 leading-relaxed">
            Guarda tus productos favoritos para no perderlos de vista. Toca el corazón en cualquier producto.
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
      {/* Glow triádico */}
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
              Tu lista
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              Favoritos
            </h1>
            <p className="text-white/40 text-xs mt-2 tracking-wider">
              {totalItems} {totalItems === 1 ? 'producto guardado' : 'productos guardados'}
            </p>
          </div>
          <button
            onClick={clearWishlist}
            className="text-[10px] text-white/30 hover:text-[#FF5A36] transition-colors tracking-[0.2em] uppercase"
          >
            Vaciar lista
          </button>
        </div>

        {/* Lista */}
        <div className="space-y-4">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={item.productId}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group flex flex-col md:flex-row gap-5 p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#FF5A36]/30 transition-all"
              >
                {/* Imagen */}
                <Link
                  href={`/products/${item.category === 'cycling' ? 'cycling' : 'running'}`}
                  className="w-full md:w-32 h-32 rounded-lg bg-white/5 overflow-hidden flex-shrink-0 ring-1 ring-white/5 group-hover:ring-[#FF5A36]/30 transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/products/placeholder.jpg';
                    }}
                  />
                </Link>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <Link
                          href={`/products/${item.category === 'cycling' ? 'cycling' : 'running'}`}
                          className="text-white font-bold text-lg hover:text-[#FF5A36] transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase mt-1">
                          {item.category === 'cycling' ? 'Ciclismo' : 'Running'}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-white/30 hover:text-red-400 transition-colors flex-shrink-0"
                        aria-label="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-baseline gap-3 mt-3">
                      <span className="text-white text-xl font-bold">
                        ${item.price.toLocaleString('es-CO')}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="text-sm text-white/30 line-through">
                          ${item.originalPrice.toLocaleString('es-CO')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex flex-wrap gap-3 mt-5">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-orange text-[10px] tracking-[0.15em] uppercase font-semibold transition-all"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Añadir al carrito
                    </button>
                    <Link
                      href={`/products/${item.category === 'cycling' ? 'cycling' : 'running'}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:border-white/30 text-white/60 hover:text-white text-[10px] tracking-[0.15em] uppercase font-semibold transition-all"
                    >
                      Ver producto
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}