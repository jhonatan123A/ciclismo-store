'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';

export function ProductShowcase() {
  const products = [
    {
      id: 'cycling',
      name: 'Bestige Ciclismo',
      description: 'Tecnología diseñada para conectar con tu piel y acompañar tu rendimiento sobre la bicicleta.',
      href: '/products/cycling',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-red-600/20 to-red-500/10',
      border: 'border-red-500/30',
      tag: '🚴‍♂️ Performance Cycling',
      price: '$640.000',
      originalPrice: '$486.400',
      discount: '-24% - Precio Lanzamiento $486.000 - Valor Futuro de Colección: $640.000',
    },
    {
      id: 'running',
      name: 'Bestige Running',
      description: 'Tecnología diseñada para conectar con tu piel y potenciar cada zancada.',
      href: '/products/running',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-green-600/20 to-green-500/10',
      border: 'border-green-500/30',
      tag: '🏃‍♂️ Performance Running',
      price: '$399.000',
      originalPrice: '$529.000',
      discount: '-24% - Precio Lanzamiento $399.000 - Valor Futuro de Colección: $529.000',
    },
  ];

  return (
    <section className="py-24 bg-black/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <span className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm font-medium">
              1️⃣ Innovación que conecta con tu movimiento
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestros{' '}
            <span className="bg-gradient-to-r from-red-500 to-green-500 bg-clip-text text-transparent">
              Productos
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tecnología somatosensorial diseñada para interactuar con tu cuerpo y acompañar la precisión natural de tu movimiento
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative p-8 bg-gradient-to-br ${product.color} backdrop-blur-sm border ${product.border} rounded-2xl overflow-hidden group`}
            >
              {/* Efecto de brillo */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/10 rounded-lg text-red-400">
                    {product.icon}
                  </div>
                  <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white text-xs font-medium">
                    {product.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-gray-300 mb-4 text-sm">{product.description}</p>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-white">{product.price}</span>
                  <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                  <span className="text-sm text-green-400 font-medium">{product.discount}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                  <span>Tecnología somatosensorial</span>
                  <span className="w-1 h-1 bg-gray-600 rounded-full" />
                  <span>📐 Tallas: XS, S, M, L</span>
                </div>

                {/* BOTÓN MEJORADO CON MOVIMIENTO */}
                <Link
                  href={product.href}
                  className="inline-flex items-center justify-between w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-medium transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-500/25 group-hover:scale-[1.02]"
                >
                  <span>Ver la tecnología</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform group-hover:rotate-12" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}