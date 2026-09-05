"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function ProductShowcase() {
  const products = [
    {
      id: 'cycling',
      name: 'Banda de Ciclismo',
      description: 'Protección + rendimiento. Tecnología patentada contra caídas.',
      href: '/products/cycling',
      color: 'from-blue-500/20 to-purple-500/20',
      border: 'border-blue-500/30',
      tag: '🚴‍♂️ Protección + Rendimiento',
    },
    {
      id: 'running',
      name: 'Banda de Running',
      description: 'Rendimiento y recuperación. Activación muscular avanzada.',
      href: '/products/running',
      color: 'from-green-500/20 to-blue-500/20',
      border: 'border-green-500/30',
      tag: '🏃‍♂️ Rendimiento + Recuperación',
    },
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Nuestros Productos
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tecnología somatosensorial de vanguardia para deportistas de alto rendimiento
          </p>
          <div className="mt-4 flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm">
              🔵 Tecnología italiana patentada
            </span>
            <span className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm">
              🟢 Activación muscular
            </span>
            <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm">
              🟣 Recuperación avanzada
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative p-8 bg-gradient-to-br ${product.color} backdrop-blur-sm border ${product.border} rounded-2xl overflow-hidden group cursor-pointer`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="relative">
                <span className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white text-xs font-medium mb-4">
                  {product.tag}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-gray-300 mb-4">{product.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-white">$399.000</span>
                    <span className="text-sm text-gray-400 line-through">$529.000</span>
                    <span className="text-xs text-green-400 font-medium">-24%</span>
                  </div>
                  <Link
                    href={product.href}
                    className="inline-flex items-center px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-100 transition-colors group"
                  >
                    <span>Ver producto</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                  <span>🧬 Tecnología somatosensorial</span>
                  <span className="w-1 h-1 bg-gray-600 rounded-full" />
                  <span>📐 Tallas: XS, S, M, L</span>
                  <span className="w-1 h-1 bg-gray-600 rounded-full" />
                  <span>🎨 Colores: Negro, Gris, Café</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}