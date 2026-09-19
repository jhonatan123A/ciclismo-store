"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Waves, Sliders, BarChart3, Leaf } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  const features = [
    {
      icon: <Waves className="w-5 h-5" />,
      title: 'ESTIMULA',
      description: 'Tu sistema somatosensorial',
    },
    {
      icon: <Sliders className="w-5 h-5" />,
      title: 'MEJORA',
      description: 'Tu estabilidad',
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: 'OPTIMIZA',
      description: 'Tu rendimiento',
    },
    {
      icon: <Leaf className="w-5 h-5" />,
      title: 'DISEÑO TÉCNICO',
      description: 'Para la vida real',
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      {/* VIDEO DE FONDO (si existe) O IMAGEN POSTER */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero/hero-poster.jpg"
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Overlay para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      </div>

      {/* Patrón sutil de fondo */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative flex-1 flex items-center w-full pt-32 pb-16">
        <div className="container mx-auto px-6 md:px-10 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Columna izquierda: Contenido principal */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Badge superior */}
                <p className="text-[#FF7A5C] text-[10px] tracking-[0.4em] font-medium mb-6 uppercase">
                  Somatosensorial
                </p>

                {/* Título grande estilo Nike */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[0.95] tracking-tight mb-8">
                  Rendimiento
                  <br />
                  que se siente
                  <br />
                  <span className="italic font-light text-white/90">
                    desde adentro
                  </span>
                </h1>

                {/* Subtítulo */}
                <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-md mb-8 font-light">
                  Prendas Funcionales que activan tu sistema somatosensorial para un mayor control, estabilidad y rendimiento.
                </p>

                {/* Botón pill estilo Nike */}
                <Link
                  href="/technology"
                  className="group inline-flex items-center gap-3 px-7 py-3.5 bg-white text-black rounded-full text-xs font-semibold tracking-wide hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/10"
                >
                  <span className="uppercase tracking-widest">
                    Explora la tecnología
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* Columna derecha: Claims */}
            <div className="lg:col-span-5 lg:text-right">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-4"
              >
                <div className="border-l-2 border-white/20 lg:border-l-0 lg:border-r-2 pl-4 lg:pl-0 lg:pr-4">
                  <p className="text-white text-xs tracking-[0.3em] uppercase font-light">
                    Más conexión
                  </p>
                </div>
                <div className="border-l-2 border-white/20 lg:border-l-0 lg:border-r-2 pl-4 lg:pl-0 lg:pr-4">
                  <p className="text-white text-xs tracking-[0.3em] uppercase font-light">
                    Más control
                  </p>
                </div>
                <div className="border-l-2 border-[#FF7A5C] lg:border-l-0 lg:border-r-2 pl-4 lg:pl-0 lg:pr-4">
                  <p className="text-[#FF7A5C] text-xs tracking-[0.3em] uppercase font-medium">
                    Más rendimiento
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* BARRA INFERIOR DE FEATURES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative w-full border-t border-white/10 backdrop-blur-md bg-black/40"
      >
        <div className="container mx-auto px-6 md:px-10 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="px-4 md:px-6 py-5 flex items-center gap-3 group hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="text-white/70 group-hover:text-[#FF7A5C] transition-colors">
                  {feature.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-[10px] font-semibold tracking-widest uppercase truncate">
                    {feature.title}
                  </p>
                  <p className="text-gray-500 text-[10px] truncate">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}