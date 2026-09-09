'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/cart-store';
import { products } from '@/lib/products';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Check, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function CyclingProductPage() {
  const product = products.find(p => p.slug === 'banda-ciclismo');
  const [selectedSize, setSelectedSize] = useState('M');
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <div className="min-h-screen pt-24 px-4">
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
        color: 'Negro',
        image: product.images[0] || '/images/products/placeholder.jpg',
        category: product.category,
      });
      setIsAdding(false);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }, 500);
  };

  return (
    <div className="min-h-screen pt-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Volver a la tienda
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Carrusel de imágenes */}
          <div className="space-y-4">
            <div className="glass-premium rounded-2xl overflow-hidden p-2">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation={{
                  prevEl: '.swiper-button-prev',
                  nextEl: '.swiper-button-next',
                }}
                pagination={{ 
                  clickable: true,
                  bulletClass: 'swiper-pagination-bullet !bg-gray-600',
                  bulletActiveClass: 'swiper-pagination-bullet-active !bg-blue-500',
                }}
                spaceBetween={10}
                slidesPerView={1}
                className="relative aspect-square"
              >
                {product.images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={img}
                        alt={`${product.name} - Imagen ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/products/placeholder.jpg';
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))}

                <button className="swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-all">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button className="swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-all">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </Swiper>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {product.images.map((img, index) => (
                <div key={index} className="glass-premium rounded-xl overflow-hidden aspect-square cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
                  <img
                    src={img}
                    alt={`Miniatura ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/products/placeholder.jpg';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Detalles del producto */}
          <div>
            <span className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-xs font-medium mb-4">
              🚴‍♂️ Ciclismo
            </span>
            <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
            <p className="text-gray-300 mb-4">{product.description}</p>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-white">${product.price.toLocaleString()}</span>
              <span className="text-lg text-gray-400 line-through">${product.originalPrice.toLocaleString()}</span>
              <span className="text-sm text-green-400 font-medium">-{product.discount}%</span>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-300 mb-3">Selecciona tu talla</h3>
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

            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-300 mb-3">Color disponible</h3>
              <div className="flex flex-wrap gap-2">
                <div className="px-4 py-2 rounded-lg border border-blue-500/30 bg-blue-500/10 text-white flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-black border border-white/20" />
                  Negro
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Más colores disponibles próximamente</p>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isAdding || isAdded}
              className={`
                w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300
                flex items-center justify-center gap-2
                ${isAdded 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white hover:scale-[1.02]'
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