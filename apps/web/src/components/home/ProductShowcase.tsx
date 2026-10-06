'use client';

import { ArrowRight, Shield, Zap, ShoppingBag, Watch, Shirt } from 'lucide-react';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';
import { formatPriceWithUsd, formatCop } from '@/lib/format-price';

export function ProductShowcase() {
  // ✅ Activa las animaciones CSS al hacer scroll
  useFadeInOnScroll();

  const products = [
    {
      id: 'cycling',
      name: 'Bestige Ciclismo',
      description: 'Tecnología diseñada para conectar con tu piel y acompañar tu rendimiento sobre la bicicleta.',
      href: '/products/cycling',
      icon: <Shield className="w-4 h-4" />,
      image: '/images/products/cards/cycling-card.jpg',
      tag: 'Performance Cycling',
      price: 640000,
      originalPrice: 719000,
      discount: '-11%',
      fullPrice: 719000,
      accentColor: '#FF5A36',
    },
    {
      id: 'running',
      name: 'Bestige Running',
      description: 'Tecnología diseñada para conectar con tu piel y potenciar cada zancada.',
      href: '/products/running',
      icon: <Zap className="w-4 h-4" />,
      image: '/images/products/cards/running-card.jpg',
      tag: 'Performance Running',
      price: 399000,
      originalPrice: 529000,
      discount: '-25%',
      fullPrice: 529000,
      accentColor: '#38BDF8',
    },
  ];

  const comingSoon = [
    { id: 'gloves', name: 'Guantes', icon: <Shield className="w-4 h-4" />, color: '#FF5A36' },
    { id: 'tshirts', name: 'Camisetas', icon: <Shirt className="w-4 h-4" />, color: '#38BDF8' },
    { id: 'socks', name: 'Medias', icon: <Watch className="w-4 h-4" />, color: '#E8B94A' },
    { id: 'jersey', name: 'Jersey', icon: <ShoppingBag className="w-4 h-4" />, color: '#C17A4B' },
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#FF5A36]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#38BDF8]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 md:px-10 max-w-7xl relative z-10">
        <div data-animate className="mb-16">
          <p className="text-eyebrow gradient-text-triad mb-5 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-gradient-to-r from-[#FF5A36] via-[#38BDF8] to-[#E8B94A]" />
            Nuestros productos
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight max-w-3xl">
            Tecnología somatosensorial
            <br />
            <span className="gradient-text-premium">para amateurs y profesionales</span>
          </h2>
          <p className="text-white/40 text-sm max-w-2xl leading-relaxed">
            Diseñada para interactuar con tu cuerpo y acompañar la precisión natural de tu movimiento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {products.map((product, index) => (
            <div
              key={product.id}
              data-animate
              style={{ animationDelay: `${index * 0.15}s` }}
              className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 bg-[#0A0A0A] transition-all duration-500 flex flex-col"
            >
              <div className="relative w-full h-80 overflow-hidden flex items-center justify-center p-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain animate-float"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 pointer-events-none" />
                <div className="absolute top-5 left-5 flex items-center gap-2 z-10">
                  <div
                    className="p-1.5 bg-black/60 backdrop-blur-md rounded-lg border border-white/10"
                    style={{ color: product.accentColor }}
                  >
                    {product.icon}
                  </div>
                  <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-white/80 text-[10px] font-medium tracking-[0.15em] uppercase">
                    {product.tag}
                  </span>
                </div>
              </div>

              <div className="p-7 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-white/40 mb-6 text-xs leading-relaxed">
                  {product.description}
                </p>

                <div className="mb-6 pb-6 border-b border-white/5">
                  <div className="flex items-baseline gap-2 mb-2 flex-wrap">
                    <span className="text-3xl font-bold text-white">
                      {formatCop(product.price)}
                    </span>
                    <span className="text-sm text-white/30 line-through">
                      {formatCop(product.originalPrice)}
                    </span>
                    <span className="text-xs font-medium tracking-wider" style={{ color: product.accentColor }}>
                      {product.discount}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-white/50 tracking-[0.1em]">
                      {formatPriceWithUsd(product.price)}
                    </span>
                    <span className="text-[10px] text-white/30 tracking-[0.1em]">
                      Valor futuro de colección: {formatCop(product.fullPrice)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-white/30 mb-5 tracking-wider uppercase">
                  <span>Somatosensorial</span>
                  <span className="w-1 h-1 bg-white/20 rounded-full" />
                  <span>Tallas XS · S · M · L</span>
                </div>

                <a
                  href={product.href}
                  className="mt-auto inline-flex items-center justify-between w-full px-5 py-3 bg-white text-black rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-white/90 transition-all duration-300 cursor-pointer"
                >
                  <span>Ver prenda somatosensorial</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div data-animate className="pb-8 border-b border-white/10 mb-10">
            <p className="text-eyebrow text-white/40 mb-3">Próximamente</p>
            <p className="text-white/50 text-sm max-w-2xl leading-relaxed">
              Seguimos trabajando para traer más productos con nuestra tecnología somatosensorial.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {comingSoon.map((item, index) => (
              <div
                key={item.id}
                data-animate
                style={{ animationDelay: `${index * 0.08}s` }}
                className="group relative p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all overflow-hidden"
              >
                <div className="relative flex flex-col gap-5">
                  <div className="transition-colors" style={{ color: item.color }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium mb-1">{item.name}</h4>
                    <span className="text-[9px] text-white/30 tracking-[0.25em] uppercase">Próximamente</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}