"use client";

import { motion } from 'framer-motion';
import { Zap, Shield, Activity, Droplets } from 'lucide-react';

export function TechnologySection() {
  const benefits = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Activación Muscular',
      description: 'Estimula la musculatura durante el ejercicio para máximo rendimiento',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Protección Contra Caídas',
      description: 'Tecnología patentada que reduce la abrasión en caso de deslizamientos',
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: 'Estabilidad',
      description: 'Mejora la estabilidad muscular y la propiocepción',
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: 'Drenaje y Recuperación',
      description: 'Favorece el drenaje de líquidos y metabolitos, reduce la fatiga',
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              CIENCIA APLICADA
            </span>
            <br />
            <span className="text-3xl md:text-4xl text-gray-300">AL DEPORTE</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            BESTIGE transforma la prenda deportiva en una herramienta de alto rendimiento,
            combinando tecnología patentada con principios de Kinesio Taping.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-400 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm max-w-2xl mx-auto italic">
            &quot;Bestige: innovación que protege, acompaña y potencia el movimiento.&quot;
          </p>
        </div>
      </div>
    </section>
  );
}