'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Brain, Zap, Activity, Waves, ShoppingBag, Watch, Shirt, Shield } from 'lucide-react';

export default function TechnologyPage() {
  const steps = [
    {
      number: '01',
      title: 'Estímulo Sensorial',
      description: 'Contacto directo y adaptativo de la estructura textil con la piel.',
      icon: <Waves className="w-5 h-5" />,
      color: '#FF7A5C',
    },
    {
      number: '02',
      title: 'Recepción e Información',
      description: 'Captación de estímulos táctiles que viajan hacia el sistema nervioso central.',
      icon: <Activity className="w-5 h-5" />,
      color: '#7DD3FC',
    },
    {
      number: '03',
      title: 'Percepción y Conciencia',
      description: 'Procesamiento de la información para aumentar la conciencia del movimiento y la propiocepción del atleta.',
      icon: <Brain className="w-5 h-5" />,
      color: '#FF5A5F',
    },
    {
      number: '04',
      title: 'Respuesta Muscular',
      description: 'Optimización del control, la coordinación y la activación muscular efectiva durante el esfuerzo.',
      icon: <Zap className="w-5 h-5" />,
      color: '#38BDF8',
    },
  ];

  const comingSoon = [
    { id: 'gloves', name: 'Guantes', icon: <Shield className="w-5 h-5" /> },
    { id: 'tshirts', name: 'Camisetas', icon: <Shirt className="w-5 h-5" /> },
    { id: 'socks', name: 'Medias', icon: <Watch className="w-5 h-5" /> },
    { id: 'jersey', name: 'Jersey', icon: <ShoppingBag className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors mb-8 text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver a la tienda
        </Link>

        {/* HERO de Tecnología */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <span className="px-4 py-1.5 bg-[#FF7A5C]/10 border border-[#FF7A5C]/20 rounded-full text-[#FF7A5C] text-[10px] font-medium tracking-widest uppercase">
              BESTIGE · Somatosensory Technology
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            La tecnología que conecta
            <br />
            <span className="bg-gradient-to-r from-[#FF7A5C] via-[#FF5A5F] to-[#7DD3FC] bg-clip-text text-transparent">
              la piel con el movimiento
            </span>
          </h1>

          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-light">
            En <span className="text-white font-medium">Bestige</span> redefinimos la interacción entre el atleta y su equipamiento mediante el desarrollo de{' '}
            <span className="text-[#FF7A5C] font-medium">Tecnología Somatosensorial</span>.
          </p>
        </motion.div>

        {/* Sección de introducción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 backdrop-blur-sm mb-16 overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FF7A5C]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#7DD3FC]/10 rounded-full blur-3xl" />

          <div className="relative">
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Diseñamos prendas técnicas de alto rendimiento equipadas con <span className="text-white font-medium">superficies y estructuras integradas</span> que generan estímulos táctiles estratégicos sobre la piel.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Esta interacción continua aporta <span className="text-[#7DD3FC] font-medium">información sensorial clave</span> para optimizar la percepción biomecánica y potenciar la relación <span className="text-white font-medium">músculo-prenda</span> en cada entrenamiento o competencia.
            </p>
          </div>
        </motion.div>

        {/* Sección: Mecanismo de Acción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#FF7A5C]" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">Mecanismo de Acción</h2>
              <Sparkles className="w-4 h-4 text-[#7DD3FC]" />
            </div>
            <p className="text-gray-400 text-xs max-w-2xl mx-auto leading-relaxed">
              El ecosistema somatosensorial de Bestige opera a través de un circuito continuo de retroalimentación fisiológica
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative p-5 rounded-xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 backdrop-blur-sm overflow-hidden group hover:border-white/20 transition-all duration-300"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(to right, ${step.color}, transparent)` }}
                />

                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold border"
                    style={{
                      borderColor: `${step.color}40`,
                      background: `${step.color}10`,
                      color: step.color,
                    }}
                  >
                    {step.number}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span style={{ color: step.color }}>{step.icon}</span>
                      <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cita final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center py-10 border-t border-white/5"
        >
          <div className="inline-block px-6 py-4 rounded-2xl bg-gradient-to-r from-[#FF7A5C]/5 to-[#7DD3FC]/5 border border-white/10 backdrop-blur-sm">
            <p className="text-white font-bold text-lg tracking-wide mb-1">BESTIGE</p>
            <p className="text-gray-400 text-xs italic tracking-widest">
              Sentir para rendir
            </p>
          </div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-gray-400 text-xs mb-4">
            Descubre la tecnología somatosensorial en acción
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/products/cycling"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF7A5C] to-[#FF5A5F] hover:from-[#FF5A5F] hover:to-[#E63946] text-white rounded-full text-xs font-medium transition-all duration-300 shadow-lg shadow-[#FF7A5C]/20"
            >
              Ciclismo
            </Link>
            <Link
              href="/products/running"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7DD3FC] to-[#38BDF8] hover:from-[#38BDF8] hover:to-[#2563EB] text-white rounded-full text-xs font-medium transition-all duration-300 shadow-lg shadow-[#7DD3FC]/20"
            >
              Running
            </Link>
          </div>
        </motion.div>

        {/* SECCIÓN PRÓXIMAMENTE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 max-w-4xl mx-auto"
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
    </div>
  );
}