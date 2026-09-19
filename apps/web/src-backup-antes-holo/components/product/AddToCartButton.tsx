'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/cart-store';
import { ShoppingCart, Check, Loader2 } from 'lucide-react';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    originalPrice: number;
    images: string[];
    category: 'running' | 'cycling';
  };
  selectedSize: string;
  selectedColor: string;
}

export function AddToCartButton({ product, selectedSize, selectedColor }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Por favor selecciona talla y color');
      return;
    }

    setIsAdding(true);

    // Simular un pequeño delay para feedback visual
    setTimeout(() => {
      addItem({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        originalPrice: product.originalPrice,
        quantity: 1,
        size: selectedSize,
        color: selectedColor,
        image: product.images[0] || '/images/products/placeholder.jpg',
        category: product.category,
      });

      setIsAdding(false);
      setIsAdded(true);

      // Resetear el estado después de 2 segundos
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }, 500);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding || isAdded}
      className={`
        w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300
        flex items-center justify-center gap-2
        ${isAdded 
          ? 'bg-green-500 text-white' 
          : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-[1.02]'
        }
        disabled:opacity-70 disabled:cursor-not-allowed
      `}
    >
      {isAdding ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Agregando...</span>
        </>
      ) : isAdded ? (
        <>
          <Check className="w-5 h-5" />
          <span>¡Agregado!</span>
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5" />
          <span>Añadir al Carrito</span>
        </>
      )}
    </button>
  );
}