import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Shield, Zap } from 'lucide-react';
import { NeuralFrame } from '@/components/neural/NeuralFrame';
import { formatPriceWithUsd, formatCop } from '@/lib/format-price';

// ============================================
// METADATA SEO
// ============================================

export const metadata: Metadata = {
  title: 'Productos | BESTIGE — Tecnología Somatosensorial',
  description:
    'Descubre las prendas BESTIGE con tecnología somatosensorial. Diseñadas para running y ciclismo. La única del mundo que activa tu sistema nervioso desde la piel.',
  keywords: [
    'BESTIGE productos',
    'badana ciclismo',
    'pantaloneta running',
    'tecnología somatosensorial',
    'ropa deportiva Colombia',
  ],
  openGraph: {
    title: 'Productos BESTIGE — Tecnología Somatosensorial',
    description:
      'Prendas con tecnología somatosensorial para running y ciclismo.',
    type: 'website',
  },
  alternates: {
    canonical: '/products',
  },
};

// ============================================
// PRODUCTOS
// ============================================

const PRODUCTS = [
  {
    id: 'cycling',
    name: 'Bestige Ciclismo',
    eyebrow: 'Performance Cycling',
    description:
      'Tecnología diseñada para conectar con tu piel y acompañar tu rendimiento sobre la bicicleta.',
    href: '/products/cycling',
    icon: Shield,
    accentColor: '#FF5A36',
    price: 640000,
    originalPrice: 719000,
    discount: '-11%',
    image: '/images/products/cards/cycling-card.jpg',
  },
  {
    id: 'running',
    name: 'Bestige Running',
    eyebrow: 'Performance Running',
    description:
      'Tecnología diseñada para conectar con tu piel y potenciar cada zancada.',
    href: '/products/running',
    icon: Zap,
    accentColor: '#38BDF8',
    price: 399000,
    originalPrice: 529000,
    discount: '-25%',
    image: '/images/products/cards/running-card.jpg',
  },
];

// ============================================
// PÁGINA
// ============================================

function ProductsContent() {
  return (
    <>
      <NeuralFrame />
      <main className="min-h-screen pt-24 pb-32 px-6 relative">
        {/* Fondo neuronal sutil */}
        <div className="fixed inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FF5A36]/5 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* HERO */}
          <section className="text-center mb-16 space-y-6">
            <p className="text-[#FF5A36] text-xs tracking-[0.3em] uppercase font-medium">
              Elige tu disciplina
            </p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.05] max-w-3xl mx-auto">
              Tecnología somatosensorial
              <br />
              <span className="gradient-text-triad italic font-light normal-case tracking-tight">
                para cada movimiento
              </span>
            </h1>
            <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Cada prenda está diseñada para interactuar con tu sistema
              nervioso desde la piel. Elige la que mejor se adapte a tu
              disciplina.
            </p>
          </section>

          {/* GRID DE PRODUCTOS */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRODUCTS.map((product) => {
              const Icon = product.icon;
              return (
                <Link
                  key={product.id}
                  href={product.href}
                  className="group block relative overflow-hidden rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-white/25 transition-all duration-500 hover:-translate-y-1"
                >
                  {/* Glow de acento */}
                  <div
                    className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-40"
                    style={{ backgroundColor: product.accentColor }}
                  />

                  {/* Imagen */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  </div>

                  {/* Contenido */}
                  <div className="relative p-8 space-y-5">
                    {/* Eyebrow + Icono */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: `${product.accentColor}15`,
                          border: `1px solid ${product.accentColor}40`,
                        }}
                      >
                        <Icon
                          className="w-4 h-4"
                          style={{ color: product.accentColor }}
                        />
                      </div>
                      <p
                        className="text-[10px] tracking-[0.3em] uppercase font-bold"
                        style={{ color: product.accentColor }}
                      >
                        {product.eyebrow}
                      </p>
                    </div>

                    {/* Título */}
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                      {product.name}
                    </h2>

                    {/* Descripción */}
                    <p className="text-white/50 text-sm leading-relaxed">
                      {product.description}
                    </p>

                    {/* Precio */}
                    <div className="pt-2 space-y-1">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="text-2xl font-bold text-white">
                          {formatCop(product.price)}
                        </span>
                        <span className="text-sm text-white/30 line-through">
                          {formatCop(product.originalPrice)}
                        </span>
                        <span
                          className="text-xs font-medium tracking-wider"
                          style={{ color: product.accentColor }}
                        >
                          {product.discount}
                        </span>
                      </div>
                      <p className="text-[10px] text-white/50 tracking-[0.1em]">
                        {formatPriceWithUsd(product.price)}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="pt-4">
                      <span
                        className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase font-bold transition-all group-hover:gap-3"
                        style={{ color: product.accentColor }}
                      >
                        Ver producto
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </section>

          {/* CTA FINAL */}
          <section className="mt-24 text-center space-y-6 py-16 border-t border-white/5">
            <p className="text-[#FF5A36] text-xs tracking-[0.3em] uppercase font-medium">
              Conoce BESTIGE
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight max-w-2xl mx-auto">
              La única del mundo con tecnología somatosensorial interna
            </h2>
            <p className="text-white/60 text-base max-w-xl mx-auto">
              Descubre por qué BESTIGE no se parece a ninguna otra marca.
            </p>
            <div className="pt-4">
              <Link
                href="/blog/bestige-tecnologia-somatosensorial-vs-biomecanica"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-bold tracking-wide rounded-full hover:border-[#FF5A36] hover:text-[#FF5A36] transition-all"
              >
                Leer el artículo
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#FF5A36] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}