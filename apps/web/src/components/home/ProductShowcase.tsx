'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';

export function ProductShowcase() {
  const products = [
    {
      id: 'cycling',
      name: 'Banda de Ciclismo',
      description: 'Protección + rendimiento. Tecnología patentada contra caídas.',
      href: '/products/cycling',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-blue-600/20 to-purple-600/20',
      border: 'border-blue-500/30',
      tag: '🚴‍♂️ Protección + Rendimiento',
      price: '$399.000',
      originalPrice: '$529.000',
      discount: '-24%',
    },
    {
      id: 'running',
      name: 'Banda de Running',
      description: 'Rendimiento y recuperación. Activación muscular avanzada.',
      href: '/products/running',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-green-600/20 to-blue-600/20',
      border: 'border-green-500/30',
      tag: '🏃‍♂️ Rendimiento + Recuperación',
      price: '$399.000',
      originalPrice: '$529.000',
      discount: '-24%',
    },
  ];

  return (
    <section className="py-24 bg-black/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium">
              ✨ Tecnología de Vanguardia
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestros{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Productos
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tecnología somatosensorial de vanguardia para deportistas de alto rendimiento
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
                  <div className="p-2 bg-white/10 rounded-lg text-blue-400">
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
                  <span>🧬 Tecnología somatosensorial</span>
                  <span className="w-1 h-1 bg-gray-600 rounded-full" />
                  <span>📐 Tallas: XS, S, M, L</span>
                </div>

                <Link
                  href={product.href}
                  className="inline-flex items-center justify-between w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all duration-300 group-hover:shadow-lg"
                >
                  <span>Ver producto</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}