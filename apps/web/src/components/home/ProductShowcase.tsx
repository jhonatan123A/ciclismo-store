'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, Zap, ShoppingBag, Watch, Shirt } from 'lucide-react';

export function ProductShowcase() {
  const products = [
    {
      id: 'cycling',
      name: 'Bestige Ciclismo',
      description: 'Tecnología diseñada para conectar con tu piel y acompañar tu rendimiento sobre la bicicleta.',
      href: '/products/cycling',
      icon: <Shield className="w-5 h-5" />,
      image: '/images/products/cards/cycling-card.jpg',
      color: 'from-[#FF7A5C]/20 to-[#FF5A5F]/10',
      border: 'border-[#FF7A5C]/30',
      tag: '🚴‍♂️ Performance Cycling',
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
      icon: <Zap className="w-5 h-5" />,
      image: '/images/products/cards/running-card.jpg',
      color: 'from-[#7DD3FC]/20 to-[#38BDF8]/10',
      border: 'border-[#7DD3FC]/30',
      tag: '🏃‍♂️ Performance Running',
      price: '$399.000',
      originalPrice: '$529.000',
      discount: '-24%',
      fullPrice: '$529.000',
    },
  ];

  const comingSoon = [
    { id: 'gloves', name: 'Guantes', icon: <Shield className="w-5 h-5" /> },
    { id: 'tshirts', name: 'Camisetas', icon: <Shirt className="w-5 h-5" /> },
    { id: 'socks', name: 'Medias', icon: <Watch className="w-5 h-5" /> },
    { id: 'jersey', name: 'Jersey', icon: <ShoppingBag className="w-5 h-5" /> },
  ];

  return (
    <section className="py-24 bg-black/30">
      <div className="container mx-auto px-4">
        {/* Header de la sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <span className="px-4 py-2 bg-[#FF7A5C]/10 border border-[#FF7A5C]/20 rounded-full text-[#FF7A5C] text-sm font-medium">
              1️⃣ Innovación que conecta con tu movimiento
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestros{' '}
            <span className="bg-gradient-to-r from-[#FF7A5C] to-[#7DD3FC] bg-clip-text text-transparent">
              Productos
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tecnología somatosensorial diseñada para interactuar con tu cuerpo y acompañar la precisión natural de tu movimiento
          </p>
        </motion.div>

        {/* Productos disponibles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl overflow-hidden group border ${product.border} bg-black/40 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-[#FF7A5C]/20 flex flex-col`}
            >
              {/* CONTENEDOR DE LA IMAGÉNES MÁS GRANDE Y ANIMADA */}
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
                
                {/* Overlay degradado inferior */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none" />

                {/* Tag superior */}
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                  <div className="p-1.5 bg-black/60 backdrop-blur-md rounded-lg text-[#FF7A5C] border border-white/10">
                    {product.icon}
                  </div>
                  <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg text-white text-[10px] font-medium">
                    {product.tag}
                  </span>
                </div>
              </div>

              {/* CONTENIDO DEBAJO DE LA IMAGEN */}
              <div className="p-6 flex-1 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-300 mb-3 text-xs leading-relaxed">
                  {product.description}
                </p>

                <div className="mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">{product.price}</span>
                    <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
                    <span className="text-xs text-[#7DD3FC] font-medium">{product.discount}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 mt-1">
                    <span className="text-[10px] text-[#FF7A5C] font-medium">
                      Precio Lanzamiento
                    </span>
                    <span className="text-[10px] text-[#7DD3FC] font-medium">
                      Valor Futuro de Colección: {product.fullPrice}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-3">
                  <span>Tecnología somatosensorial</span>
                  <span className="w-1 h-1 bg-gray-600 rounded-full" />
                  <span>📐 Tallas: XS, S, M, L</span>
                </div>

                {/* BOTÓN */}
                <Link
                  href={product.href}
                  className="inline-flex items-center justify-between w-full px-4 py-2 bg-gradient-to-r from-[#FF7A5C] to-[#FF5A5F] hover:from-[#FF5A5F] hover:to-[#E63946] text-white rounded-lg font-medium transition-all duration-300 text-xs group-hover:shadow-lg group-hover:shadow-[#FF7A5C]/25"
                >
                  <span>Ver la tecnología</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SECCIÓN PRÓXIMAMENTE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#FF7A5C]" />
              <h3 className="text-lg font-semibold text-white">Próximamente</h3>
              <Sparkles className="w-4 h-4 text-[#7DD3FC]" />
            </div>
            <p className="text-xs text-gray-400 font-light max-w-2xl mx-auto">
              Seguimos trabajando para traer más productos con nuestra Tecnología Somatosensorial x Bestige
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {comingSoon.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative p-5 bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-xl overflow-hidden group hover:border-[#FF7A5C]/30 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="p-2.5 bg-gradient-to-br from-[#FF7A5C]/10 to-[#7DD3FC]/10 rounded-lg text-gray-400 group-hover:text-[#FF7A5C] transition-colors">
                    {item.icon}
                  </div>
                  <h4 className="text-sm font-medium text-white">{item.name}</h4>
                  <span className="text-[10px] text-[#FF7A5C] font-medium px-2 py-0.5 bg-[#FF7A5C]/10 rounded-full border border-[#FF7A5C]/20">
                    Próximamente
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}