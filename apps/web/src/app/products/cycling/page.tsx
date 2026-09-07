'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/cart-store';
import { products } from '@/lib/products';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Check, Loader2 } from 'lucide-react';

export default function CyclingProductPage() {
  const product = products.find(p => p.slug === 'banda-ciclismo');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Negro');
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <div className="min-h-screen bg-black pt-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl text-white">Producto no encontrado</h1>
          <Link href="/" className="text-blue-400 hover:underline">Volver a la tienda</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsAdding(true);
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
      setTimeout(() => setIsAdded(false), 2000);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-black pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Volver a la tienda
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imagen del producto */}
          <div className="glass rounded-2xl overflow-hidden">
            <img
              src={product.images[0] || '/images/products/placeholder.jpg'}
              alt={product.name}
              className="w-full h-[400px] object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/products/placeholder.jpg';
              }}
            />
          </div>

          {/* Detalles del producto */}
          <div>
            <span className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-xs font-medium mb-4">
              🚴‍♂️ Ciclismo
            </span>
            <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
            <p className="text-gray-400 mb-4">{product.description}</p>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-white">${product.price.toLocaleString()}</span>
              <span className="text-lg text-gray-400 line-through">${product.originalPrice.toLocaleString()}</span>
              <span className="text-sm text-green-400 font-medium">-{product.discount}%</span>
            </div>

            {/* Selección de talla */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Selecciona tu talla</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      selectedSize === size
                        ? 'border-blue-500 bg-blue-500/20 text-white'
                        : 'border-white/20 hover:border-white/50 text-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Selección de color */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Selecciona tu color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      selectedColor === color
                        ? 'border-blue-500 bg-blue-500/20 text-white'
                        : 'border-white/20 hover:border-white/50 text-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Botón Agregar al carrito */}
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
          </div>
        </div>
      </div>
    </div>
  );
}