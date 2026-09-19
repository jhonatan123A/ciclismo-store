'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Brain, Zap, Activity, Waves, ShoppingBag, Watch, Shirt, Shield } from 'lucide-react';

export default function TechnologyPage() {
  const steps = [
    {
      number: '01',
      title: 'Estímulo Sensorial',
      description: 'Contacto directo y adaptativo de la estructura textil con la piel.',
      icon: <Waves className="w-5 h-5" />,
      color: '#FF5A36',
    },
    {
      number: '02',
      title: 'Recepción e Información',
      description: 'Captación de estímulos táctiles que viajan hacia el sistema nervioso central.',
      icon: <Activity className="w-5 h-5" />,
      color: '#38BDF8',
    },
    {
      number: '03',
      title: 'Percepción y Conciencia',
      description: 'Procesamiento de la información para aumentar la conciencia del movimiento y la propiocepción del atleta.',
      icon: <Brain className="w-5 h-5" />,
      color: '#E8B94A',
    },
    {
      number: '04',
      title: 'Respuesta Muscular',
      description: 'Optimización del control, la coordinación y la activación muscular efectiva durante el esfuerzo.',
      icon: <Zap className="w-5 h-5" />,
      color: '#C17A4B',
    },
  ];

  const comingSoon = [
    { id: 'gloves', name: 'Guantes', icon: <Shield className="w-4 h-4" />, color: '#FF5A36' },
    { id: 'tshirts', name: 'Camisetas', icon: <Shirt className="w-4 h-4" />, color: '#38BDF8' },
    { id: 'socks', name: 'Medias', icon: <Watch className="w-4 h-4" />, color: '#E8B94A' },
    { id: 'jersey', name: 'Jersey', icon: <ShoppingBag className="w-4 h-4" />, color: '#C17A4B' },
  ];

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6 md:px-10 overflow-hidden">
      {/* Glow triádico de fondo */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-[#FF5A36]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#38BDF8]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#E8B94A]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-[#FF5A36] transition-colors mb-10 text-[11px] tracking-[0.2em] uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver
        </Link>

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <p className="text-eyebrow text-[#FF5A36] mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-gradient-to-r from-[#FF5A36] via-[#38BDF8] to-[#E8B94A]" />
            Somatosensory Technology
          </p>

          <h1 className="display-hero text-[clamp(2.5rem,7vw,6rem)] mb-8 max-w-4xl">
            <span className="text-white">La tecnología que</span>
            <br />
            <span className="text-white">conecta la piel</span>
            <br />
            <span className="gradient-text-triad italic font-light normal-case tracking-tight">
              con el movimiento.
            </span>
          </h1>

          <p className="text-white/50 max-w-2xl text-sm md:text-base leading-relaxed">
            En <span className="text-white font-medium">Bestige</span> redefinimos la interacción entre el atleta y su equipamiento mediante el desarrollo de <span className="text-[#FF5A36] font-medium">Tecnología Somatosensorial</span>.
          </p>
        </motion.div>

        {/* Introducción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-2xl border border-white/10 bg-white/[0.02] mb-24 relative overflow-hidden card-neural"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FF5A36]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#38BDF8]/5 rounded-full blur-3xl" />

          <div className="relative">
            <p className="text-white/50 text-sm md:text-base leading-relaxed mb-4">
              Diseñamos Prendas Funcionales de alto rendimiento equipadas con <span className="text-white font-medium">superficies y estructuras integradas</span> que generan estímulos táctiles estratégicos sobre la piel.
            </p>
            <p className="text-white/50 text-sm md:text-base leading-relaxed">
              Esta interacción continua aporta <span className="text-white font-medium">información sensorial clave</span> para optimizar la percepción biomecánica y potenciar la relación <span className="text-white font-medium">músculo-prenda</span> en cada entrenamiento o competencia.
            </p>
          </div>
        </motion.div>

        {/* Mecanismo de acción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="mb-10 pb-6 border-b border-white/10">
            <p className="text-eyebrow text-white/40 mb-3">Mecanismo de acción</p>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
              Un circuito continuo de retroalimentación
            </h2>
            <p className="text-white/40 text-sm max-w-2xl leading-relaxed">
              El ecosistema somatosensorial de Bestige opera a través de un circuito continuo de retroalimentación fisiológica.
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
                className="group relative p-6 md:p-7 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all overflow-hidden"
                style={{
                  borderColor: `${step.color}15`,
                }}
              >
                {/* Línea superior de color */}
                <div
                  className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, ${step.color}, transparent)`,
                    boxShadow: `0 0 10px ${step.color}`,
                  }}
                />

                {/* Glow al hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${step.color}10, transparent 70%)`,
                  }}
                />

                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <span
                      className="text-eyebrow font-medium"
                      style={{ color: step.color }}
                    >
                      {step.number}
                    </span>
                    <span
                      className="transition-colors"
                      style={{ color: step.color }}
                    >
                      {step.icon}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cita */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center py-16 border-t border-b border-white/10 mb-24 relative overflow-hidden"
        >
          {/* Glow triádico */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#FF5A36]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#38BDF8]/5 rounded-full blur-3xl" />

          <div className="relative">
            <p className="text-eyebrow text-[#FF5A36] mb-4">BESTIGE</p>
            <p className="text-3xl md:text-5xl font-bold gradient-text-triad italic">
              Sentir para rendir.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <p className="text-eyebrow text-white/40 mb-6">
            Descubre la tecnología en acción
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/products/cycling"
              className="inline-flex items-center gap-3 px-7 py-3.5 btn-orange text-[10px] tracking-[0.2em] uppercase font-semibold group"
            >
              Ciclismo
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/products/running"
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-transparent border border-[#38BDF8]/40 hover:border-[#38BDF8]/80 text-white rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-[#38BDF8]/5 hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] transition-all group"
            >
              Running
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>

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
                className="group relative p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all overflow-hidden"
              >
                {/* Glow al hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${item.color}15, transparent 70%)`,
                  }}
                />

                <div className="relative flex flex-col gap-5">
                  <div
                    className="transition-colors"
                    style={{ color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium mb-1">{item.name}</h4>
                    <span className="text-[9px] text-white/30 tracking-[0.25em] uppercase">
                      Próximamente
                    </span>
                  </div>
                </div>

                {/* Línea inferior */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, ${item.color}, transparent)`,
                    boxShadow: `0 0 10px ${item.color}`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}