'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/cart-store';
import { products } from '@/lib/products';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Check, Loader2, ChevronLeft, ChevronRight, Truck } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function RunningProductPage() {
  const product = products.find(p => p.slug === 'banda-running');
  const [selectedSize, setSelectedSize] = useState('M');
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  
  // ESTADO PARA CONTROLAR LA APARICIÓN DE LA INTERFAZ
  const [showUI, setShowUI] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  // TEMPORIZADOR: El atleta se ve solo por 1.8 segundos antes de mostrar el producto e interfaz
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowUI(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen pt-24 px-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Producto no encontrado</h1>
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
    <div className="relative min-h-screen pt-24 pb-16 px-6 md:px-10 overflow-hidden bg-black">
      {/* 1. IMAGEN DEL ATLETA (AHORA CON bg-cover Y bg-top PARA ELIMINAR BORDES) */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-top bg-no-repeat z-0 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: 'url("/images/products/backgrounds/running-bg.jpg")',
        }}
      />

      {/* 2. OVERLAY OSCURO */}
      <div 
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 z-1 ${
          showUI ? 'bg-black/60' : 'bg-black/0'
        }`} 
      />

      {/* 3. INTERFAZ COMPLETA */}
      <div 
        className={`relative z-10 max-w-7xl mx-auto transition-all duration-1000 ease-out ${
          showUI 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-12 pointer-events-none'
        }`}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-[11px] tracking-[0.2em] uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Carrusel de imágenes de la Badana */}
          <div className="space-y-3">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-sm">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation={{
                  prevEl: '.swiper-button-prev-custom',
                  nextEl: '.swiper-button-next-custom',
                }}
                pagination={{
                  clickable: true,
                  bulletClass: 'swiper-pagination-bullet !bg-white/20 !w-1.5 !h-1.5',
                  bulletActiveClass: 'swiper-pagination-bullet-active !bg-[#FF7A5C] !w-5 !rounded-full',
                }}
                spaceBetween={0}
                slidesPerView={1}
                className="relative aspect-square"
              >
                {product.images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={img}
                        alt={`${product.name} - ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/products/placeholder.jpg';
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))}

                <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/60 hover:bg-black backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all border border-white/10">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/60 hover:bg-black backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all border border-white/10">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </Swiper>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden aspect-square border border-white/10 hover:border-[#FF7A5C]/50 transition-all cursor-pointer bg-[#0A0A0A]/80 backdrop-blur-sm"
                >
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

          {/* Panel de Compras y Tallas */}
          <div className="lg:sticky lg:top-24 lg:self-start z-10">
            <div 
              className="p-6 md:p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md relative overflow-hidden"
              style={{
                maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%), linear-gradient(to right, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 100%), linear-gradient(to right, black 90%, transparent 100%)',
              }}
            >
              <p className="text-eyebrow text-[#FF7A5C] mb-4 flex items-center gap-3">
                <span className="w-6 h-[1px] bg-[#FF7A5C]" />
                Performance Running
              </p>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                {product.name}
              </h1>

              <p className="text-white/70 text-sm leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Precio */}
              <div className="mb-8 pb-8 border-b border-white/10">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-bold text-white">
                    ${product.price.toLocaleString('es-CO')}
                  </span>
                  <span className="text-sm text-white/40 line-through">
                    ${product.originalPrice.toLocaleString('es-CO')}
                  </span>
                  <span className="text-xs text-[#FF7A5C] font-medium tracking-wider">
                    -{product.discount}%
                  </span>
                </div>
                <p className="text-[10px] text-white/40 tracking-wide">
                  Precio lanzamiento — Valor futuro de colección: ${product.originalPrice.toLocaleString('es-CO')}
                </p>
              </div>

              {/* Talla */}
              <div className="mb-8 relative z-20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-eyebrow text-white/60">Talla</h3>
                  <button className="text-[10px] text-white/40 hover:text-white transition-colors tracking-wider uppercase">
                    Guía de tallas
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 rounded-lg border text-xs font-semibold tracking-wider transition-all ${
                        selectedSize === size
                          ? 'border-white bg-white text-black'
                          : 'border-white/15 hover:border-white/40 text-white/70'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="mb-8">
                <h3 className="text-eyebrow text-white/60 mb-4">Color</h3>
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2.5 rounded-lg border border-white/30 bg-white/5 text-white flex items-center gap-2.5 text-xs tracking-wider">
                    <span className="w-3 h-3 rounded-full bg-black border border-white/30" />
                    Negro
                  </div>
                </div>
                <p className="text-[10px] text-white/30 mt-2 tracking-wide">
                  Más colores disponibles próximamente
                </p>
              </div>

              {/* Botón carrito */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding || isAdded}
                className={`
                  w-full py-4 rounded-full font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300
                  flex items-center justify-center gap-2 relative z-20
                  ${isAdded
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-black hover:bg-gray-100'
                  }
                  disabled:opacity-70 disabled:cursor-not-allowed
                `}
              >
                {isAdding ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Agregando...
                  </>
                ) : isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    ¡Agregado!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Añadir al carrito
                  </>
                )}
              </button>

              {/* Envío */}
              <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-white/40 tracking-wider uppercase">
                <Truck className="w-3.5 h-3.5 text-[#FF7A5C]" />
                Envío gratis a toda Colombia
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}