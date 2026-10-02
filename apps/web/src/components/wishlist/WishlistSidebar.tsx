'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlistStore } from '@/lib/wishlist-store';
import { useCartStore } from '@/lib/cart-store';

export function WishlistSidebar() {
  const { items, isOpen, closeWishlist, removeItem, getTotalItems } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addItem);

  const totalItems = getTotalItems();

  // Bloquear scroll cuando está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleAddToCart = (item: typeof items[0]) => {
    addToCart({
      productId: item.productId,
      name: item.name,
      slug: item.slug,
      price: item.price,
      originalPrice: item.originalPrice,
      quantity: 1,
      size: 'M', // Talla por defecto
      color: 'Negro',
      image: item.image,
      category: item.category,
    });
    // No lo removemos de wishlist (el usuario decide)
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWishlist}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0A0A0A] border-l border-white/10 z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FF5A36]/20 to-[#38BDF8]/20 border border-[#FF5A36]/30 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-[#FF5A36] fill-[#FF5A36]" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-sm tracking-wide">Favoritos</h2>
                  <p className="text-white/40 text-[10px] tracking-wider uppercase">
                    {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
                  </p>
                </div>
              </div>
              <button
                onClick={closeWishlist}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Contenido */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <Heart className="w-16 h-16 text-white/20 mb-4" />
                <h3 className="text-white font-semibold text-base mb-2">
                  Tu lista está vacía
                </h3>
                <p className="text-white/50 text-sm mb-6 max-w-xs">
                  Guarda tus productos favoritos para no perderlos de vista.
                </p>
                <Link
                  href="/"
                  onClick={closeWishlist}
                  className="inline-flex items-center gap-2 px-6 py-3 btn-orange text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full"
                >
                  Explorar productos
                </Link>
              </div>
            ) : (
              <>
                {/* Lista */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.productId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#FF5A36]/20 transition-all"
                    >
                      <Link href={`/products/${item.category === 'cycling' ? 'cycling' : 'running'}`} onClick={closeWishlist}>
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
                      </Link>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <Link
                              href={`/products/${item.category === 'cycling' ? 'cycling' : 'running'}`}
                              onClick={closeWishlist}
                              className="text-white font-medium text-sm hover:text-[#FF5A36] transition-colors line-clamp-2"
                            >
                              {item.name}
                            </Link>
                            <button
                              onClick={() => removeItem(item.productId)}
                              className="text-white/30 hover:text-red-400 transition-colors flex-shrink-0"
                              aria-label="Quitar de favoritos"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-white/40 text-[10px] tracking-wider uppercase">
                            {item.category === 'cycling' ? 'Ciclismo' : 'Running'}
                          </p>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-2">
                          <span className="text-white font-semibold text-sm">
                            ${item.price.toLocaleString('es-CO')}
                          </span>
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF5A36]/10 hover:bg-[#FF5A36]/20 border border-[#FF5A36]/30 text-[#FF5A36] text-[9px] tracking-wider uppercase font-semibold transition-all"
                          >
                            <ShoppingCart className="w-3 h-3" />
                            Al carrito
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-black/40">
                  <Link
                    href="/wishlist"
                    onClick={closeWishlist}
                    className="block w-full py-4 text-center btn-orange text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full"
                  >
                    Ver todos mis favoritos
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}