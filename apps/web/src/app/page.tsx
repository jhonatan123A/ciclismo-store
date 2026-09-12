'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { ProductShowcase } from '@/components/home/ProductShowcase';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Sin fondos extra, usa el fondo del layout */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badges con colores BESTIGE */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 bg-[#FF7A5C]/20 border border-[#FF7A5C]/30 rounded-full text-[#FF7A5C] text-sm font-medium backdrop-blur-sm">
                  BE
                </span>
                <span className="px-4 py-2 bg-[#7DD3FC]/20 border border-[#7DD3FC]/30 rounded-full text-[#7DD3FC] text-sm font-medium backdrop-blur-sm">
                  Una señal a tu cuerpo
                </span>
                <span className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white/80 text-sm font-medium backdrop-blur-sm">
                  Tecnología Italiana
                </span>
              </div>

              {/* Título con gradiente naranja coral → rojo coral → cyan */}
              <div className="space-y-2">
                <p className="text-sm text-gray-300 font-light tracking-[0.3em] uppercase">
                  BESTIGE • MOVE DIFFERENTLY
                </p>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight">
                  <span className="text-white">No es solo</span>
                  <br />
                  <span className="bg-gradient-to-r from-[#FF7A5C] via-[#FF5A5F] to-[#7DD3FC] bg-clip-text text-transparent">
                    una prenda.
                  </span>
                  <br />
                  <span className="text-white text-4xl md:text-5xl lg:text-6xl">Es una señal.</span>
                </h1>
              </div>

              <p className="mt-6 text-xl md:text-2xl text-gray-200 max-w-2xl leading-relaxed">
                Tecnología somatosensorial que conecta con tu piel y potencia tu rendimiento.
                <br />
                <span className="text-gray-300 text-base">
                  Innovación italiana patentada para activación muscular, estabilidad y recuperación.
                </span>
              </p>

              {/* Botones con colores BESTIGE */}
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/products/cycling"
                  className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF7A5C] to-[#E63946] hover:from-[#FF5A5F] hover:to-[#E63946] text-white rounded-full font-medium transition-all duration-300 shadow-lg shadow-[#FF7A5C]/25"
                >
                  <span>Tecnología para Ciclismo</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/products/running"
                  className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#7DD3FC] to-[#2563EB] hover:from-[#38BDF8] hover:to-[#2563EB] text-white rounded-full font-medium transition-all duration-300 shadow-lg shadow-[#7DD3FC]/25"
                >
                  <span>Tecnología para Running</span>
                </Link>
              </div>

              {/* Stats con colores BESTIGE */}
              <div className="mt-16 flex flex-wrap gap-10">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-[#FF7A5C]">2</div>
                  <div className="text-sm text-gray-400">Productos</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-white">4</div>
                  <div className="text-sm text-gray-400">Tallas</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-[#7DD3FC]">-24%</div>
                  <div className="text-sm text-gray-400">Lanzamiento</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-[#38BDF8] animate-pulse">⚡</div>
                  <div className="text-sm text-gray-400">Tecnología viva</div>
                </div>
              </div>

              {/* Frase final */}
              <div className="mt-12 flex items-center gap-3 text-sm">
                <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF7A5C] to-[#7DD3FC] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </span>
                <span className="text-gray-300 font-light tracking-wide">
                  BESTIGE — Más que una prenda, una conexión.
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator con colores BESTIGE */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 text-sm flex flex-col items-center gap-2"
        >
          <span>Desplaza</span>
          <div className="w-0.5 h-10 bg-gradient-to-b from-[#FF7A5C] via-[#7DD3FC] to-transparent rounded-full" />
        </motion.div>
      </section>

      {/* Product Showcase */}
      <ProductShowcase />
    </div>
  );
}