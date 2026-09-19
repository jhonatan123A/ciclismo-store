'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Waves, Sliders, BarChart3, Leaf, X } from 'lucide-react';
import Link from 'next/link';
import { ProductShowcase } from '@/components/home/ProductShowcase';

export default function Home() {
  const [showUI, setShowUI] = useState(false);
  const [closedManually, setClosedManually] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowUI(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMousePos({
            x: e.clientX / window.innerWidth,
            y: e.clientY / window.innerHeight,
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: <Waves className="w-5 h-5" />,
      title: 'ESTIMULA',
      description: 'Tu sistema somatosensorial',
      color: '#FF5A36',
    },
    {
      icon: <Sliders className="w-5 h-5" />,
      title: 'MEJORA',
      description: 'Tu estabilidad',
      color: '#38BDF8',
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: 'OPTIMIZA',
      description: 'Tu rendimiento',
      color: '#E8B94A',
    },
    {
      icon: <Leaf className="w-5 h-5" />,
      title: 'DISEÑO TÉCNICO',
      description: 'Para la vida real',
      color: '#C17A4B',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* HERO SECTION PRINCIPAL - CAMBIADO DE h-screen A min-h-screen */}
      <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between bg-black">
        
        {/* FONDO */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero/hero-poster.jpg" 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-50"
            style={{
              transform: `scale(1.05) translate(${(mousePos.x - 0.5) * 20}px, ${(mousePos.y - 0.5) * 20}px)`,
              transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 700px 500px at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255, 90, 54, 0.1) 0%, transparent 50%),
                radial-gradient(ellipse 700px 500px at ${(1 - mousePos.x) * 100}% ${(1 - mousePos.y) * 100}%, rgba(56, 189, 248, 0.08) 0%, transparent 50%),
                radial-gradient(ellipse 800px 600px at 50% 50%, rgba(232, 185, 74, 0.05) 0%, transparent 60%)
              `,
              transition: 'background 1s ease',
            }}
          />
        </div>

        {/* CONTENIDO TEXTUAL */}
        <div 
          className={`relative z-10 flex-1 flex items-center w-full pt-24 pb-8 md:pt-28 md:pb-12 transition-all duration-1000 ease-out ${
            showUI 
              ? 'opacity-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        >
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
              
              {/* Columna izquierda: Título + CTA */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={showUI ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-eyebrow text-[#FF5A36] mb-5 md:mb-6 flex items-center gap-3">
                    <span className="w-6 md:w-8 h-[1px] bg-gradient-to-r from-[#FF5A36] via-[#38BDF8] to-[#E8B94A]" />
                    Somatosensorial
                  </p>

                  {/* TÍTULO - Ajustado para que quepa en PC */}
                  <h1 className="display-hero text-[clamp(2rem,5.5vw,6rem)] mb-5 md:mb-6 leading-[0.95]">
                    <span className="text-white">No solo vistes una</span>
                    <br />
                    <span className="text-white">prenda.</span>
                    <br />
                    <span className="gradient-text-triad italic font-light normal-case tracking-tight">
                      Conectas con tu cuerpo.
                    </span>
                  </h1>

                  <p className="text-white/80 text-xs md:text-sm leading-relaxed max-w-md mb-6 md:mb-8 font-light">
                    Prendas Funcionales que activan tu sistema somatosensorial para un mayor control, estabilidad y rendimiento.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/nosotros"
                      className="group inline-flex items-center gap-2 md:gap-3 px-5 md:px-7 py-3 md:py-3.5 btn-orange text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase"
                    >
                      <span>Descubre Bestige</span>
                      <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href="/products/cycling"
                      className="group inline-flex items-center gap-2 md:gap-3 px-5 md:px-7 py-3 md:py-3.5 btn-outline-orange text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase"
                    >
                      <span>Ver productos</span>
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* Columna derecha: Claims + VIDEO 360° */}
              <div className="lg:col-span-5">
                <div className="flex flex-col items-end gap-5 md:gap-6">
                  {/* Claims */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={showUI ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full space-y-3 md:space-y-4 lg:border-r border-white/20 lg:pr-8 text-right"
                  >
                    <div className="flex items-center justify-end gap-3 group cursor-pointer">
                      <p className="text-label text-white/80 group-hover:text-[#FF5A36] transition-colors text-[9px] md:text-[10px]">
                        Mejora la resistencia a la fatiga
                      </p>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36] shadow-[0_0_10px_#FF5A36]" />
                    </div>
                    <div className="flex items-center justify-end gap-3 group cursor-pointer">
                      <p className="text-label text-white/80 group-hover:text-[#38BDF8] transition-colors text-[9px] md:text-[10px]">
                        Más Conexión
                      </p>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]" />
                    </div>
                    <div className="flex items-center justify-end gap-3 group cursor-pointer">
                      <p className="text-label gradient-text-triad text-[9px] md:text-[10px]">
                        Más Rendimiento
                      </p>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8B94A] shadow-[0_0_10px_#E8B94A] scale-125" />
                    </div>
                  </motion.div>

                  {/* VIDEO 360° - TAMAÑO OPTIMIZADO PARA PC */}
                  <AnimatePresence>
                    {!closedManually && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: 20 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="relative w-64 sm:w-72 md:w-64 lg:w-56 xl:w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-black group card-neural ml-auto"
                      >
                        <button
                          onClick={() => setClosedManually(true)}
                          className="absolute top-2 right-2 z-20 bg-black/60 hover:bg-[#FF5A36]/20 text-white p-1.5 rounded-full backdrop-blur-md transition-all border border-[#FF5A36]/30"
                          aria-label="Cerrar video"
                        >
                          <X className="w-3 h-3" />
                        </button>

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

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                        <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-none">
                          <span className="inline-block px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full text-[9px] font-medium tracking-wider text-white border border-[#FF5A36]/30 uppercase">
                            Vista 360°
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
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
          <div className="container mx-auto px-3 sm:px-6 md:px-10 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="px-2 sm:px-4 md:px-6 py-4 md:py-5 flex items-center gap-2 md:gap-3 group hover:bg-white/5 transition-colors cursor-pointer relative"
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `linear-gradient(180deg, ${feature.color}, transparent)`,
                      boxShadow: `0 0 10px ${feature.color}`,
                    }}
                  />
                  <div
                    className="transition-colors flex-shrink-0"
                    style={{ color: feature.color }}
                  >
                    {feature.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-[9px] md:text-[10px] font-semibold tracking-[0.15em] md:tracking-[0.2em] uppercase truncate">
                      {feature.title}
                    </p>
                    <p className="text-white/50 text-[9px] md:text-[10px] truncate">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Product Showcase */}
      <ProductShowcase />
    </div>
  );
}