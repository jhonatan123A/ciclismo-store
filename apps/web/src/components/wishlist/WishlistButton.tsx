'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useWishlistStore, type WishlistItem } from '@/lib/wishlist-store';

interface WishlistButtonProps {
  item: Omit<WishlistItem, 'addedAt'>;
  variant?: 'icon' | 'button';
  className?: string;
}

export function WishlistButton({ item, variant = 'icon', className = '' }: WishlistButtonProps) {
  const { toggleItem, isInWishlist } = useWishlistStore();
  const [isFavorite, setIsFavorite] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Evitar hydration mismatch
  useEffect(() => {
    setMounted(true);
    setIsFavorite(isInWishlist(item.productId));
  }, [item.productId, isInWishlist]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(item);
    setIsFavorite(!isFavorite);
  };

  if (!mounted) {
    // Placeholder en SSR
    if (variant === 'icon') {
      return (
        <button
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${className}`}
          aria-label="Añadir a favoritos"
        >
          <Heart className="w-4 h-4" />
        </button>
      );
    }
    return null;
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={handleClick}
        aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all border ${
          isFavorite
            ? 'bg-[#FF5A36] border-[#FF5A36] text-white shadow-[0_0_20px_rgba(255,90,54,0.4)]'
            : 'bg-black/40 border-white/20 text-white/60 hover:border-[#FF5A36]/50 hover:text-[#FF5A36]'
        } ${className}`}
      >
        <Heart
          className={`w-4 h-4 transition-all ${isFavorite ? 'fill-white' : ''}`}
        />
      </button>
    );
  }

  // Variant "button" - botón completo con texto
  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold transition-all border ${
        isFavorite
          ? 'bg-[#FF5A36]/10 border-[#FF5A36]/40 text-[#FF5A36]'
          : 'bg-white/5 border-white/10 text-white/60 hover:border-[#FF5A36]/40 hover:text-[#FF5A36]'
      } ${className}`}
    >
      <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-[#FF5A36]' : ''}`} />
      {isFavorite ? 'En favoritos' : 'Añadir a favoritos'}
    </button>
  );
}