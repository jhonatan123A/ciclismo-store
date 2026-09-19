'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Waves, Sliders, BarChart3, Leaf, X } from 'lucide-react';
import Link from 'next/link';
import { ProductShowcase } from '@/components/home/ProductShowcase';

export default function Home() {
  const [showUI, setShowUI] = useState(false);
  const [hideVideoOnScroll, setHideVideoOnScroll] = useState(false);
  const [closedManually, setClosedManually] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowUI(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  // Oculta el video en miniatura automáticamente al hacer scroll hacia abajo
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setHideVideoOnScroll(true);
      } else {
        setHideVideoOnScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="min-h-screen bg-black text-white relative">
      {/* HERO SECTION PRINCIPAL */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col justify-between bg-zinc-950">
        
        {/* FONDO ELEGANTE CON POSTER / GRADIENTE */}
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="/images/hero/hero-poster.jpg" 
            alt="Hero background" 
            className="w-full h-full object-cover filter blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>

        {/* CONTENIDO TEXTUAL */}
        <div 
          className={`relative z-10 flex-1 flex items-center w-full pt-32 pb-16 transition-all duration-1000 ease-out ${
            showUI 
              ? 'opacity-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        >
          <div className="container mx-auto px-6 md:px-10 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Columna izquierda: Título + CTA */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={showUI ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-eyebrow text-[#FF7A5C] mb-6 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-[#FF7A5C]" />
                    Somatosensorial
                  </p>

                  <h1 className="display-hero text-[clamp(3rem,8vw,7.5rem)] text-white mb-8 leading-[0.95]">
                    No solo vistes una
                    <br />
                    prenda
                    <br />
                    <span className="italic font-light text-white/90 normal-case tracking-tight">Conectas con tu cuerpo</span>
                  </h1>

                  <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-md mb-8 font-light">
                    Prendas Funcionales que activan tu sistema somatosensorial para un mayor control, estabilidad y rendimiento.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/nosotros"
                      className="group inline-flex items-center gap-3 px-7 py-3.5 bg-white text-black rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-gray-100 transition-all duration-300 shadow-2xl"
                    >
                      <span>Descubrir la ciencia</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href="/products/cycling"
                      className="group inline-flex items-center gap-3 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase border border-white/30 hover:border-white/60 backdrop-blur-md transition-all duration-300"
                    >
                      <span>Ver productos</span>
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* Columna derecha: Claims */}
              <div className="lg:col-span-5 lg:text-right">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={showUI ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-5 lg:border-r border-white/20 lg:pr-8"
                >
                  <div className="flex items-center justify-end gap-3 border-l-2 lg:border-l-0 lg:border-r-0 border-white/20 pl-4 lg:pl-0">
                    <p className="text-label text-white/80">Mejora la resistencia a la fatiga sobre la distancia</p>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  </div>
                  <div className="flex items-center justify-end gap-3 border-l-2 lg:border-l-0 lg:border-r-0 border-white/20 pl-4 lg:pl-0">
                    <p className="text-label text-white/80">Más Conexión</p>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  </div>
                  <div className="flex items-center justify-end gap-3 border-l-2 lg:border-l-0 lg:border-r-0 border-[#FF7A5C] pl-4 lg:pl-0">
                    <p className="text-label text-[#FF7A5C]">Más Rendimiento</p>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A5C] scale-125" />
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </div>

        {/* BARRA INFERIOR DE FEATURES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showUI ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`relative z-10 w-full border-t border-white/10 backdrop-blur-md bg-black/40 transition-all duration-1000 ${
            showUI ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="container mx-auto px-6 md:px-10 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="px-4 md:px-6 py-5 flex items-center gap-3 group hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="text-white/70 group-hover:text-[#FF7A5C] transition-colors flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-[10px] font-semibold tracking-[0.2em] uppercase truncate">
                      {feature.title}
                    </p>
                    <p className="text-white/50 text-[10px] truncate">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* REPRODUCTOR DE VIDEO COMPACTO Y NÍTIDO (TIPO WIDGET REEL FLOTANTE) */}
      <AnimatePresence>
        {!hideVideoOnScroll && !closedManually && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 md:bottom-28 md:right-10 z-50 w-44 md:w-56 aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black backdrop-blur-lg group"
          >
            {/* Botón para cerrar manualmente */}
            <button
              onClick={() => setClosedManually(true)}
              className="absolute top-3 right-3 z-20 bg-black/60 hover:bg-black text-white p-1.5 rounded-full backdrop-blur-md transition-all"
              aria-label="Cerrar video"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Video en su relación de aspecto original perfecta sin recortar */}
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/images/hero/hero-poster.jpg"
              className="w-full h-full object-cover rounded-2xl"
            >
              <source src="/videos/hero-bg.mp4" type="video/mp4" />
            </video>

            {/* Etiqueta flotante */}
            <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-none">
              <span className="inline-block px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full text-[9px] font-medium tracking-wider text-white/90 border border-white/10 uppercase">
                Vista previa 360°
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Showcase */}
      <ProductShowcase />
    </div>
  );
}