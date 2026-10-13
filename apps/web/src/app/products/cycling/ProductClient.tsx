'use client';

import { useState, useEffect } from 'react';
import { useCartStore, type CartGender } from '@/lib/cart-store';
import { products } from '@/lib/products';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Check, Loader2, ChevronLeft, ChevronRight, Truck } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ReviewsSection } from '@/components/reviews/ReviewsSection';
import { WishlistButton } from '@/components/wishlist/WishlistButton';
import { ProductCrossSellTip } from '@/components/conversion/ProductCrossSellTip';
import { trackViewItem, trackAddToCart } from '@/lib/analytics';
import { formatPriceWithUsd, formatCop } from '@/lib/format-price';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ProductClient() {
  const product = products.find(p => p.slug === 'banda-ciclismo');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedGender, setSelectedGender] = useState<CartGender>('Masculino');
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  // ✅ Trackear vista del producto
  useEffect(() => {
    if (product) {
      trackViewItem({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-screen pt-24 px-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl text-white mb-4">Producto no encontrado</h1>
          <Link href="/" className="text-[#BFAE85] hover:underline text-sm">Volver a la tienda</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      const firstImage = typeof product.images[0] === 'string' ? product.images[0] : product.images[0].src;

      addItem({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        originalPrice: product.originalPrice,
        quantity: 1,
        size: selectedSize,
        color: 'Negro',
        gender: selectedGender,
        image: firstImage || '/images/products/placeholder.jpg',
        category: product.category,
      });

      // ✅ Trackear agregar al carrito
      trackAddToCart({
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: 1,
        size: selectedSize,
        color: 'Negro',
      });

      setIsAdding(false);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }, 500);
  };

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6 md:px-10 overflow-hidden bg-black">
      {/* Fondo negro sólido */}
      <div className="absolute inset-0 w-full h-full bg-black z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-[#BFAE85] transition-colors mb-8 text-[11px] tracking-[0.2em] uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* CARRUSEL + Tarjetas de tecnología */}
          <div className="space-y-3">
            <div className="relative">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation={{
                  prevEl: '.swiper-button-prev-custom',
                  nextEl: '.swiper-button-next-custom',
                }}
                pagination={{
                  clickable: true,
                  bulletClass: 'swiper-pagination-bullet !bg-white/20 !w-1.5 !h-1.5',
                  bulletActiveClass: 'swiper-pagination-bullet-active !bg-[#BFAE85] !w-5 !rounded-full',
                }}
                spaceBetween={0}
                slidesPerView={1}
                className="relative aspect-square"
              >
                {product.images.map((item, index) => {
                  const src = typeof item === 'string' ? item : item.src;
                  const badge = typeof item === 'string' ? undefined : item.badge;
                  const isVideo = src.endsWith('.mp4');
                  return (
                    <SwiperSlide key={index}>
                      <div className="w-full h-full flex items-center justify-center relative">
                        {badge && (
                          <span className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-md bg-[#BFAE85]/95 backdrop-blur-sm text-black text-[10px] tracking-[0.2em] uppercase font-bold shadow-[0_0_20px_rgba(191,174,133,0.3)]">
                            {badge}
                          </span>
                        )}
                        {isVideo && (
                          <span className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-md bg-black/70 backdrop-blur-sm text-[#BFAE85] text-[10px] tracking-[0.2em] uppercase font-semibold border border-[#BFAE85]/30">
                            Diseñada desde cada detalle
                          </span>
                        )}
                        {isVideo ? (
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-contain"
                          >
                            <source src={src} type="video/mp4" />
                          </video>
                        ) : (
                          <img
                            src={src}
                            alt={`${product.name} - ${index + 1}`}
                            className="w-full h-full object-contain brightness-125 contrast-110"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/products/placeholder.jpg';
                            }}
                          />
                        )}
                      </div>
                    </SwiperSlide>
                  );
                })}

                <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/60 hover:bg-[#BFAE85]/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-[#BFAE85] transition-all border border-white/10 hover:border-[#BFAE85]/50">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/60 hover:bg-[#BFAE85]/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-[#BFAE85] transition-all border border-white/10 hover:border-[#BFAE85]/50">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </Swiper>
            </div>

            {/* Miniaturas */}
            <div className="grid grid-cols-3 gap-3">
              {product.images.map((item, index) => {
                const src = typeof item === 'string' ? item : item.src;
                const badge = typeof item === 'string' ? undefined : item.badge;
                const isVideo = src.endsWith('.mp4');
                return (
                  <div
                    key={index}
                    className="aspect-square transition-opacity cursor-pointer opacity-90 hover:opacity-100 relative"
                  >
                    {badge && (
                      <span className="absolute top-1.5 right-1.5 z-10 px-1.5 py-0.5 rounded bg-[#BFAE85]/95 text-black text-[7.5px] tracking-widest uppercase font-bold">
                        {badge}
                      </span>
                    )}
                    {isVideo ? (
                      <video
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-contain"
                      >
                        <source src={src} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={src}
                        alt={`Miniatura ${index + 1}`}
                        className="w-full h-full object-contain brightness-125 contrast-110"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/products/placeholder.jpg';
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* 3 Tarjetas de tecnología — narrativa ciclismo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-8">
              {/* Card 1: Tecnología Somatosensorial */}
              <div className="pt-4 px-5 pb-5 rounded-xl border border-[#BFAE85]/15 bg-[#0A0A0A] relative overflow-hidden">
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-[0.06] pointer-events-none"
                  style={{ background: '#BFAE85' }}
                />
                <div className="relative">
                  <p
                    className="text-[9px] tracking-[0.35em] uppercase font-semibold mb-2.5"
                    style={{ color: '#BFAE85' }}
                  >
                    Tecnología Somatosensorial
                  </p>
                  <h3 className="text-white text-base font-bold mb-3 leading-tight">
                    Conexión durante cada kilómetro
                  </h3>
                  <ul className="space-y-1.5">
                    {[
                      'Interacción entre prenda, piel y movimiento.',
                      'Estímulos táctiles que acompañan la percepción corporal.',
                      'Mayor conexión durante esfuerzos prolongados.',
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="text-white/60 text-[11.5px] leading-relaxed flex gap-2"
                      >
                        <span className="text-[#BFAE85] flex-shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card 2: Protección Ciclista */}
              <div className="pt-4 px-5 pb-5 rounded-xl border border-[#BFAE85]/15 bg-[#0A0A0A] relative overflow-hidden">
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-[0.06] pointer-events-none"
                  style={{ background: '#BFAE85' }}
                />
                <div className="relative">
                  <p
                    className="text-[9px] tracking-[0.35em] uppercase font-semibold mb-2.5"
                    style={{ color: '#BFAE85' }}
                  >
                    Protección Ciclista
                  </p>
                  <h3 className="text-white text-base font-bold mb-3 leading-tight">
                    Diseñada para la exigencia real
                  </h3>
                  <ul className="space-y-1.5">
                    {[
                      'Protección patentada contra caídas.',
                      'Mayor resistencia al roce con el asfalto.',
                      'Seguridad adicional en situaciones de riesgo.',
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="text-white/60 text-[11.5px] leading-relaxed flex gap-2"
                      >
                        <span className="text-[#BFAE85] flex-shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card 3: Diseño de Rendimiento */}
              <div className="pt-4 px-5 pb-5 rounded-xl border border-[#BFAE85]/15 bg-[#0A0A0A] relative overflow-hidden">
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-[0.06] pointer-events-none"
                  style={{ background: '#BFAE85' }}
                />
                <div className="relative">
                  <p
                    className="text-[9px] tracking-[0.35em] uppercase font-semibold mb-2.5"
                    style={{ color: '#BFAE85' }}
                  >
                    Diseño de Rendimiento
                  </p>
                  <h3 className="text-white text-base font-bold mb-3 leading-tight">
                    Comodidad durante largas distancias
                  </h3>
                  <ul className="space-y-1.5">
                    {[
                      'Ajuste anatómico.',
                      'Compresión equilibrada.',
                      'Costuras planas para mayor comodidad.',
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="text-white/60 text-[11.5px] leading-relaxed flex gap-2"
                      >
                        <span className="text-[#BFAE85] flex-shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* DETALLES */}
          <div className="lg:sticky lg:top-24 lg:self-start z-10">
            <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md relative overflow-hidden">
              <p className="text-eyebrow text-[#BFAE85] mb-4 flex items-center gap-3">
                <span className="w-6 h-[1px] bg-gradient-to-r from-[#BFAE85] via-[#E5DCC0] to-[#8F7E45]" />
                Performance Cycling
              </p>

              {/* ✅ Título con botón de wishlist */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  {product.name}
                </h1>
                <WishlistButton
                  item={{
                    productId: product.id,
                    name: product.name,
                    slug: product.slug,
                    price: product.price,
                    originalPrice: product.originalPrice,
                    image: typeof product.images[0] === 'string' ? product.images[0] : product.images[0].src,
                    category: product.category,
                  }}
                />
              </div>

              <p className="text-white/70 text-sm leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Precio */}
              <div className="mb-8 pb-8 border-b border-white/10">
                <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                  <span className="text-3xl font-bold text-white">
                    {formatCop(product.price)}
                  </span>
                  <span className="text-sm text-white/40 line-through">
                    {formatCop(product.originalPrice)}
                  </span>
                  <span className="text-xs text-[#BFAE85] font-medium tracking-wider">
                    -{product.discount}%
                  </span>
                </div>
                <p className="text-[10px] text-white/50 tracking-wide mb-1">
                  {formatPriceWithUsd(product.price)}
                </p>
                <p className="text-[10px] text-white/40 tracking-wide">
                  Precio lanzamiento — Valor futuro de colección: {formatCop(product.originalPrice)}
                </p>
              </div>

              {/* Género */}
              <div className="mb-8 relative z-20">
                <h3 className="text-eyebrow text-white/60 mb-4">Género</h3>
                <div className="grid grid-cols-2 gap-2">
                  {(['Masculino', 'Femenino'] as CartGender[]).map((gender) => (
                    <button
                      key={gender}
                      onClick={() => setSelectedGender(gender)}
                      className={`h-12 rounded-lg border text-xs font-semibold tracking-wider transition-all ${
                        selectedGender === gender
                          ? 'border-[#BFAE85] bg-[#BFAE85] text-white shadow-[0_0_25px_rgba(191,174,133,0.4)]'
                          : 'border-white/15 hover:border-[#BFAE85]/50 text-white/70 hover:text-white'
                      }`}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>

              {/* Talla */}
              <div className="mb-8 relative z-20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-eyebrow text-white/60">Talla</h3>
                  <button className="text-[10px] text-white/40 hover:text-[#BFAE85] transition-colors tracking-wider uppercase">
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
                          ? 'border-[#BFAE85] bg-[#BFAE85] text-white shadow-[0_0_25px_rgba(191,174,133,0.4)]'
                          : 'border-white/15 hover:border-[#BFAE85]/50 text-white/70 hover:text-white'
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
                  <div className="px-4 py-2.5 rounded-lg border border-[#BFAE85]/40 bg-[#BFAE85]/5 text-white flex items-center gap-2.5 text-xs tracking-wider shadow-[0_0_20px_rgba(191,174,133,0.15)]">
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
                    : 'bg-[#BFAE85] text-black hover:bg-[#E5DCC0] hover:shadow-[0_0_40px_rgba(191,174,133,0.4)] hover:scale-[1.02]'
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
                <Truck className="w-3.5 h-3.5 text-[#BFAE85]" />
                Envío gratis a toda Colombia
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Sección de reseñas */}
        <ReviewsSection
          productId={product.id}
          productName={product.name}
        />
      </div>

      {/* ✅ Cross-sell tip: sugiere la badana de running */}
      <ProductCrossSellTip currentProduct="cycling" />
    </div>
  );
}