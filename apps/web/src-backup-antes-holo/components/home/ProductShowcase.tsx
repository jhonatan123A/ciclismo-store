'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Zap, ShoppingBag, Watch, Shirt } from 'lucide-react';

export function ProductShowcase() {
  const products = [
    {
      id: 'cycling',
      name: 'Bestige Ciclismo',
      description: 'Tecnología diseñada para conectar con tu piel y acompañar tu rendimiento sobre la bicicleta.',
      href: '/products/cycling',
      icon: <Shield className="w-4 h-4" />,
      image: '/images/products/cards/cycling-card.jpg',
      tag: 'Performance Cycling',
      price: '$486.000',
      originalPrice: '$640.000',
      discount: '-24%',
      fullPrice: '$640.000',
    },
    {
      id: 'running',
      name: 'Bestige Running',
      description: 'Tecnología diseñada para conectar con tu piel y potenciar cada zancada.',
      href: '/products/running',
      icon: <Zap className="w-4 h-4" />,
      image: '/images/products/cards/running-card.jpg',
      tag: 'Performance Running',
      price: '$399.000',
      originalPrice: '$529.000',
      discount: '-24%',
      fullPrice: '$529.000',
    },
  ];

  const comingSoon = [
    { id: 'gloves', name: 'Guantes', icon: <Shield className="w-4 h-4" /> },
    { id: 'tshirts', name: 'Camisetas', icon: <Shirt className="w-4 h-4" /> },
    { id: 'socks', name: 'Medias', icon: <Watch className="w-4 h-4" /> },
    { id: 'jersey', name: 'Jersey', icon: <ShoppingBag className="w-4 h-4" /> },
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6 md:px-10 max-w-7xl">
        {/* Header de la sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-eyebrow text-[#FF7A5C] mb-5 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#FF7A5C]" />
            Nuestros productos
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight max-w-3xl">
            Tecnología somatosensorial
            <br />
            <span className="text-white/50">para amateurs y profesionales</span>
          </h2>
          <p className="text-white/40 text-sm max-w-2xl leading-relaxed">
            Diseñada para interactuar con tu cuerpo y acompañar la precisión natural de tu movimiento.
          </p>
        </motion.div>

        {/* Productos disponibles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 bg-[#0A0A0A] transition-all duration-500 flex flex-col"
            >
              {/* IMAGEN CON ANIMACIÓN FLOTANTE */}
              <div className="relative w-full h-80 overflow-hidden flex items-center justify-center p-2">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  animate={{
                    y: [0, -10, 0, 10, 0],
                    scale: [1.2, 1.32, 1.25, 1.35, 1.2],
                    rotate: [0, 1.5, -1.5, 1, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />

                {/* Overlay gradiente inferior */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 pointer-events-none" />

                {/* Tag superior */}
                <div className="absolute top-5 left-5 flex items-center gap-2 z-10">
                  <div className="p-1.5 bg-black/60 backdrop-blur-md rounded-lg text-[#FF7A5C] border border-white/10">
                    {product.icon}
                  </div>
                  <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-white/80 text-[10px] font-medium tracking-[0.15em] uppercase">
                    {product.tag}
                  </span>
                </div>
              </div>

              {/* CONTENIDO */}
              <div className="p-7 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-white/40 mb-6 text-xs leading-relaxed">
                  {product.description}
                </p>

                {/* Precio */}
                <div className="mb-6 pb-6 border-b border-white/5">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-white">{product.price}</span>
                    <span className="text-sm text-white/30 line-through">{product.originalPrice}</span>
                    <span className="text-xs text-[#FF7A5C] font-medium tracking-wider">{product.discount}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-white/40 tracking-[0.15em] uppercase">
                      Precio lanzamiento
                    </span>
                    <span className="text-[10px] text-white/30 tracking-[0.1em]">
                      Valor futuro: {product.fullPrice}
                    </span>
                  </div>
                </div>

                {/* Info extra */}
                <div className="flex items-center gap-2 text-[10px] text-white/30 mb-5 tracking-wider uppercase">
                  <span>Somatosensorial</span>
                  <span className="w-1 h-1 bg-white/20 rounded-full" />
                  <span>Tallas XS · S · M · L</span>
                </div>

                {/* BOTÓN */}
                <Link
                  href={product.href}
                  className="mt-auto inline-flex items-center justify-between w-full px-5 py-3 bg-white text-black rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-white/90 transition-all duration-300 group/btn"
                >
                  <span>Ver la tecnología</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SECCIÓN PRÓXIMAMENTE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="pb-8 border-b border-white/10 mb-10">
            <p className="text-eyebrow text-white/40 mb-3">Próximamente</p>
            <p className="text-white/50 text-sm max-w-2xl leading-relaxed">
              Seguimos trabajando para traer más productos con nuestra tecnología somatosensorial.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {comingSoon.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04] transition-all"
              >
                <div className="flex flex-col gap-5">
                  <div className="text-white/30 group-hover:text-[#FF7A5C] transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium mb-1">{item.name}</h4>
                    <span className="text-[9px] text-white/30 tracking-[0.25em] uppercase">
                      Próximamente
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}