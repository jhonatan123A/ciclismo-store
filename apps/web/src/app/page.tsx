'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Activity, Droplets, Sparkles, Cpu, Brain } from 'lucide-react';
import Link from 'next/link';
import { ProductShowcase } from '@/components/home/ProductShowcase';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Fondo */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-black to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[url('/images/hero/technology-info.jpg')] bg-cover bg-center opacity-20" />
        </div>

        {/* Patrón de fondo */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium backdrop-blur-sm">
                  🚀 Lanzamiento 2026
                </span>
                <span className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm font-medium backdrop-blur-sm">
                  Primeras 100 unidades
                </span>
                <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm font-medium backdrop-blur-sm">
                  Tecnología Italiana
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="text-white">Tecnología</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                  Somatosensorial
                </span>
              </h1>

              <p className="mt-6 text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed">
                Innovación textil que conecta con tu piel y potencia tu rendimiento.
                Tecnología italiana patentada para activación muscular y recuperación.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/products/cycling"
                  className="group inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-blue-600/25"
                >
                  <span>Descubrir Ciclismo</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/products/running"
                  className="group inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all duration-300 border border-white/10 backdrop-blur-sm"
                >
                  <span>Descubrir Running</span>
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-12 flex flex-wrap gap-8">
                <div>
                  <div className="text-2xl font-bold text-white">2</div>
                  <div className="text-sm text-gray-500">Productos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">4</div>
                  <div className="text-sm text-gray-500">Tallas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">3</div>
                  <div className="text-sm text-gray-500">Colores</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">-24%</div>
                  <div className="text-sm text-gray-500">Lanzamiento</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 text-sm flex flex-col items-center gap-2"
        >
          <span>Desplaza</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500 to-transparent" />
        </motion.div>
      </section>

      {/* Product Showcase */}
      <ProductShowcase />
    </div>
  );
}