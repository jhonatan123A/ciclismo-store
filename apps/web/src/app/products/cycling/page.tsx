'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/cart-store';
import { products } from '@/lib/products';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Check, Loader2, ChevronLeft, ChevronRight, Truck } from 'lucide-react';
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
          <h1 className="text-xl text-white">Producto no encontrado</h1>
          <Link href="/" className="text-[#FF7A5C] hover:underline text-sm">Volver a la tienda</Link>
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
    <div className="min-h-screen pt-20 pb-8 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors mb-4 text-xs">
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver a la tienda
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Carrusel de imágenes - más pequeño */}
          <div className="space-y-2">
            <div className="glass-premium rounded-xl overflow-hidden p-1.5">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation={{
                  prevEl: '.swiper-button-prev',
                  nextEl: '.swiper-button-next',
                }}
                pagination={{
                  clickable: true,
                  bulletClass: 'swiper-pagination-bullet !bg-gray-600 !w-1 !h-1',
                  bulletActiveClass: 'swiper-pagination-bullet-active !bg-[#FF7A5C] !w-3 !rounded-full',
                }}
                spaceBetween={8}
                slidesPerView={1}
                className="relative aspect-square max-w-[380px] mx-auto"
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

                <button className="swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all border border-white/10">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button className="swiper-button-next absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all border border-white/10">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </Swiper>
            </div>

            <div className="grid grid-cols-3 gap-1.5 max-w-[380px] mx-auto">
              {product.images.map((img, index) => (
                <div key={index} className="glass-premium rounded-lg overflow-hidden aspect-square cursor-pointer hover:ring-1 hover:ring-[#FF7A5C] transition-all">
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

          {/* Detalles del producto - más pequeños */}
          <div className="max-w-md">
            <span className="inline-block px-2.5 py-0.5 bg-[#FF7A5C]/20 border border-[#FF7A5C]/30 rounded-full text-[#FF7A5C] text-[9px] font-medium mb-2">
              🚴‍♂️ Ciclismo
            </span>
            <h1 className="text-xl md:text-2xl font-bold text-white mb-1.5 leading-tight">{product.name}</h1>
            <p className="text-gray-400 mb-3 text-xs leading-relaxed">{product.description}</p>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-white">${product.price.toLocaleString()}</span>
              <span className="text-xs text-gray-400 line-through">${product.originalPrice.toLocaleString()}</span>
              <span className="text-xs text-[#7DD3FC] font-medium">-{product.discount}%</span>
            </div>

            <div className="mb-4">
              <h3 className="text-[10px] font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Selecciona tu talla</h3>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-8 rounded-md border transition-all text-xs font-medium ${
                      selectedSize === size
                        ? 'border-[#FF7A5C] bg-[#FF7A5C]/20 text-white shadow-md shadow-[#FF7A5C]/20'
                        : 'border-white/20 hover:border-white/50 text-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <h3 className="text-[10px] font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Color disponible</h3>
              <div className="flex flex-wrap gap-1.5">
                <div className="px-2.5 py-1.5 rounded-md border border-[#FF7A5C]/30 bg-[#FF7A5C]/10 text-white flex items-center gap-1.5 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-black border border-white/20" />
                  Negro
                </div>
              </div>
              <p className="text-[9px] text-gray-500 mt-1.5">Más colores disponibles próximamente</p>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isAdding || isAdded}
              className={`
                w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-300
                flex items-center justify-center gap-1.5
                ${isAdded
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-to-r from-[#FF7A5C] via-[#FF5A5F] to-[#E63946] hover:from-[#FF5A5F] hover:via-[#E63946] hover:to-[#C1121F] text-white hover:shadow-lg hover:shadow-[#FF7A5C]/30'
                }
                disabled:opacity-70 disabled:cursor-not-allowed
              `}
            >
              {isAdding ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Agregando...</span>
                </>
              ) : isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>¡Agregado!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Añadir al Carrito</span>
                </>
              )}
            </button>

            {/* Solo Envío Gratis */}
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
              <Truck className="w-3 h-3 text-[#FF7A5C]" />
              <span>Envío gratis a toda Colombia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}