'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function TechnologyPage() {
  const goldTitanium = '#BFAE85';
  const goldLight = '#E5DCC0';
  const goldDark = '#8F7E45';

  const steps = [
    {
      number: '01',
      title: 'Contacto',
      description:
        'La estructura interna de la prenda interactúa con la piel durante la actividad deportiva.',
    },
    {
      number: '02',
      title: 'Estímulo',
      description:
        'El movimiento genera estímulos sensoriales diseñados para acompañar la percepción corporal.',
    },
    {
      number: '03',
      title: 'Percepción',
      description:
        'Tu cuerpo recibe señales. Bestige acompaña esa comunicación natural.',
    },
    {
      number: '04',
      title: 'Movimiento',
      description:
        'El cuerpo utiliza esa información como parte de su proceso natural de control y coordinación.',
    },
  ];

  const pilares = [
    {
      title: 'Diseño textil',
      description: 'Estructuras internas desarrolladas para interactuar con la piel.',
    },
    {
      title: 'Ciencia del movimiento',
      description: 'Comprensión del cuerpo humano aplicada al rendimiento.',
    },
    {
      title: 'Tecnología somatosensorial',
      description: 'Innovación integrada dentro de la prenda.',
    },
  ];

  const comingSoon = [
    { id: 'gloves', name: 'Guantes' },
    { id: 'tshirts', name: 'Camisetas' },
    { id: 'socks', name: 'Medias' },
    { id: 'jersey', name: 'Jersey' },
  ];

  return (
    <div
      className="relative min-h-screen pt-24 pb-16 overflow-hidden"
      style={{
        background: '#0A0A0A',
        fontFamily: 'Satoshi, sans-serif',
      }}
    >
      {/* Glow dorado sutil de fondo */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute top-20 -left-40 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'rgba(191, 174, 133, 0.04)' }}
        />
        <div
          className="absolute top-1/2 -right-40 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'rgba(191, 174, 133, 0.03)' }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'rgba(191, 174, 133, 0.02)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-[#BFAE85] transition-colors mb-10 text-[11px] tracking-[0.2em] uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver
        </Link>

        {/* ═══════════════════════════════════════════ */}
        {/* 1. HERO */}
        {/* ═══════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24 relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div>
              <p
                className="text-[10px] tracking-[0.5em] uppercase font-medium mb-6 flex items-center gap-3"
                style={{ color: goldTitanium }}
              >
                <span
                  className="w-8 h-[1px]"
                  style={{
                    background: `linear-gradient(90deg, ${goldTitanium} 0%, transparent 100%)`,
                  }}
                />
                Tecnología Bestige
              </p>

              <h1 className="text-[clamp(2rem,4.8vw,3.8rem)] font-black leading-[1.08] tracking-[-0.03em] mb-8">
                <span className="text-white">La tecnología que conecta</span>
                <br />
                <span
                  style={{
                    fontFamily: 'Satoshi, system-ui, sans-serif',
                    fontWeight: 300,
                    background: `linear-gradient(180deg, ${goldLight} 0%, ${goldTitanium} 50%, ${goldDark} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  la piel con el movimiento.
                </span>
              </h1>

              <p className="text-white/60 text-sm md:text-base leading-relaxed font-light max-w-xl">
                Bestige desarrolla prendas con tecnología somatosensorial
                integrada, diseñadas para interactuar con la piel y acompañar la
                percepción corporal durante el movimiento.
              </p>
            </div>

            {/* Foto del atleta + ondas sutiles + fade inferior */}
            <div className="relative w-full flex items-center justify-center">
              <div
                className="relative w-full max-w-md overflow-hidden"
                style={{
                  aspectRatio: '3 / 4',
                  borderRadius: '20px',
                }}
              >
                {/* Foto con zoom a la zona de la prenda */}
                <img
                  src="/images/technology/athlete.png"
                  alt="Prenda Bestige"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 30%',
                    transform: 'scale(1.6)',
                    transformOrigin: 'center 30%',
                    filter: 'contrast(1.08) saturate(0.85) brightness(0.95)',
                  }}
                />

                {/* Fade negro en los bordes — integra la imagen con la página */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `
                      linear-gradient(180deg, #0A0A0A 0%, transparent 18%, transparent 60%, #0A0A0A 95%, #0A0A0A 100%),
                      linear-gradient(90deg, #0A0A0A 0%, transparent 15%, transparent 85%, #0A0A0A 100%)
                    `,
                  }}
                />

                {/* 3 ondas doradas sutiles sobre la prenda */}
                <svg
                  viewBox="0 0 400 600"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <linearGradient id="waveGold" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={goldTitanium} stopOpacity="0" />
                      <stop offset="50%" stopColor={goldLight} stopOpacity="0.6" />
                      <stop offset="100%" stopColor={goldTitanium} stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="waveGold2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={goldTitanium} stopOpacity="0" />
                      <stop offset="50%" stopColor={goldTitanium} stopOpacity="0.4" />
                      <stop offset="100%" stopColor={goldTitanium} stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Onda 1 — zona alta de la prenda */}
                  <motion.path
                    d="M 60 380 Q 130 360 200 370 T 340 380"
                    fill="none"
                    stroke="url(#waveGold)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.7 }}
                    transition={{ duration: 3, delay: 0.5, ease: 'easeInOut' }}
                  />

                  {/* Onda 2 — zona media (donde está el logo BESTIGE) */}
                  <motion.path
                    d="M 60 440 Q 130 420 200 430 T 340 440"
                    fill="none"
                    stroke="url(#waveGold2)"
                    strokeWidth="0.8"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.55 }}
                    transition={{ duration: 3, delay: 1, ease: 'easeInOut' }}
                  />

                  {/* Onda 3 — zona baja de la prenda */}
                  <motion.path
                    d="M 60 500 Q 130 480 200 490 T 340 500"
                    fill="none"
                    stroke="url(#waveGold)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.7 }}
                    transition={{ duration: 3, delay: 1.5, ease: 'easeInOut' }}
                  />

                  {/* Punto dorado de referencia — sobre la zona de las ondas */}
                  <motion.circle
                    cx="200"
                    cy="440"
                    r="2.5"
                    fill={goldLight}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 0.9, 0.5, 0.9], scale: [0, 1, 0.85, 1] }}
                    transition={{
                      duration: 3,
                      delay: 2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />
                </svg>

                {/* Etiqueta flotante */}
                <div
                  className="absolute bottom-4 left-0 text-[9px] tracking-[0.3em] uppercase font-medium"
                  style={{ color: 'rgba(191, 174, 133, 0.6)' }}
                >
                  Prenda · Piel · Sistema nervioso
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════ */}
        {/* 2. POR QUÉ IMPORTA — La fatiga */}
        {/* ═══════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-24 max-w-3xl"
        >
          <p
            className="text-[10px] tracking-[0.5em] uppercase font-medium mb-5"
            style={{ color: goldTitanium }}
          >
            Por qué importa
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.05] tracking-[-0.03em] mb-6">
            <span className="block text-white">Cuando aparece la fatiga,</span>
            <span
              className="block"
              style={{
                fontFamily: 'Satoshi, system-ui, sans-serif',
                fontWeight: 300,
                background: `linear-gradient(180deg, ${goldLight} 0%, ${goldTitanium} 50%, ${goldDark} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              la conexión con tu cuerpo se vuelve determinante.
            </span>
          </h2>
          <div className="space-y-4">
            <p className="text-white/60 text-sm md:text-base leading-relaxed font-light">
              En deportes donde cada segundo importa, la diferencia está en la
              capacidad del atleta para entender y controlar su propio
              movimiento.
            </p>
            <p className="text-white/50 text-sm md:text-base leading-relaxed font-light">
              Bestige combina conocimiento del cuerpo humano, diseño textil e
              innovación tecnológica para crear prendas pensadas para momentos
              donde la precisión y la conexión corporal son fundamentales.
            </p>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════ */}
        {/* 3. EL CUERPO YA TIENE UN SISTEMA DE INFORMACIÓN */}
        {/* ═══════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-2xl border border-white/10 mb-24 relative overflow-hidden"
          style={{ background: 'rgba(255, 255, 255, 0.02)' }}
        >
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(191, 174, 133, 0.05)' }}
          />

          <div className="relative">
            <p
              className="text-[10px] tracking-[0.5em] uppercase font-medium mb-5"
              style={{ color: goldTitanium }}
            >
              El cuerpo ya tiene un sistema de información
            </p>
            <h2 className="text-2xl md:text-4xl font-black text-white mb-6 leading-[1.1] tracking-[-0.02em] max-w-3xl">
              Antes de cada movimiento existe una comunicación constante.
            </h2>
            <div className="space-y-4 max-w-3xl">
              <p className="text-white/60 text-sm md:text-base leading-relaxed font-light">
                Entre la piel, el sistema nervioso y los músculos existe una
                comunicación continua que permite percibir posición, contacto y
                movimiento.
              </p>
              <p className="text-white/60 text-sm md:text-base leading-relaxed font-light">
                La piel no solo es una barrera externa. Es una fuente permanente
                de información. Bestige nace para trabajar sobre esa conexión.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════ */}
        {/* 4. CÓMO FUNCIONA — 4 pasos */}
        {/* ═══════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="mb-12 pb-6 border-b border-white/10">
            <p
              className="text-[10px] tracking-[0.5em] uppercase font-medium mb-3"
              style={{ color: goldTitanium }}
            >
              ¿Cómo funciona?
            </p>
            <h2 className="text-2xl md:text-4xl font-black text-white leading-[1.1] tracking-[-0.02em] mb-4">
              Cuatro etapas de una misma conexión.
            </h2>
            <p className="text-white/50 text-sm md:text-base leading-relaxed font-light max-w-2xl">
              La tecnología Bestige funciona mediante una interacción continua
              entre prenda, piel y sistema nervioso.
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
                className="group relative p-6 md:p-8 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, ${goldTitanium}, transparent)`,
                    boxShadow: `0 0 10px ${goldTitanium}`,
                  }}
                />

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, rgba(191, 174, 133, 0.08), transparent 70%)`,
                  }}
                />

                <div className="relative">
                  <span
                    className="text-[10px] tracking-[0.4em] font-medium uppercase mb-6 block"
                    style={{ color: goldTitanium }}
                  >
                    {step.number}
                  </span>
                  <h3 className="text-white font-bold text-lg md:text-xl mb-3 tracking-[-0.01em]">
                    {step.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════ */}
        {/* 5. APLICACIÓN — Ciclismo / Running */}
        {/* ═══════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="mb-8 pb-6 border-b border-white/10">
            <p
              className="text-[10px] tracking-[0.5em] uppercase font-medium mb-3"
              style={{ color: goldTitanium }}
            >
              Diseñada para el movimiento real
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-white leading-[1.15] tracking-[-0.02em] max-w-3xl">
              Cada disciplina tiene necesidades diferentes.
            </h2>
            <p className="text-white/50 text-sm md:text-base leading-relaxed font-light max-w-2xl mt-4">
              Desde la bicicleta hasta la carrera, desarrollamos tecnologías
              específicas para acompañar distintas formas de movimiento.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/products/cycling"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-black text-[10px] tracking-[0.2em] uppercase font-bold group transition-all hover:gap-4"
              style={{ background: goldTitanium }}
            >
              Ciclismo
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/products/running"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-transparent text-white text-[10px] tracking-[0.2em] uppercase font-bold transition-all group hover:gap-4"
              style={{
                border: `1px solid rgba(191, 174, 133, 0.4)`,
              }}
            >
              Running
              <ArrowRight className="w-3.5 h-3.5" style={{ color: goldTitanium }} />
            </Link>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════ */}
        {/* 6. TRES DISCIPLINAS */}
        {/* ═══════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="mb-12 pb-6 border-b border-white/10">
            <p
              className="text-[10px] tracking-[0.5em] uppercase font-medium mb-3"
              style={{ color: goldTitanium }}
            >
              Ciencia + Deporte + Innovación
            </p>
            <h2 className="text-2xl md:text-4xl font-black text-white leading-[1.1] tracking-[-0.02em] max-w-3xl">
              Bestige nace de la unión entre tres disciplinas.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pilares.map((pilar, index) => (
              <motion.div
                key={pilar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 md:p-8 rounded-xl border border-white/10 bg-white/[0.02]"
              >
                <h3
                  className="text-base md:text-lg font-bold mb-3 tracking-[-0.01em]"
                  style={{ color: goldTitanium }}
                >
                  {pilar.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed font-light">
                  {pilar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════ */}
        {/* 7. CIERRE — Sentir para rendir */}
        {/* ═══════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center py-20 mb-24 relative overflow-hidden"
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div
            className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(191, 174, 133, 0.06)' }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(191, 174, 133, 0.05)' }}
          />

          <div className="relative max-w-3xl mx-auto px-6">
            <p
              className="text-[10px] tracking-[0.5em] uppercase font-medium mb-8"
              style={{ color: goldTitanium }}
            >
              El futuro del rendimiento humano
            </p>

            <p className="text-white/70 text-base md:text-lg leading-relaxed font-light mb-3">
              El futuro del rendimiento no está solamente en hacer más.
            </p>
            <p className="text-white/70 text-base md:text-lg leading-relaxed font-light mb-12">
              Está en entender mejor tu cuerpo.
            </p>

            <p
              className="text-[11px] tracking-[0.5em] uppercase font-bold mb-4"
              style={{ color: goldTitanium }}
            >
              Bestige
            </p>

            <p
              className="text-4xl md:text-6xl font-black italic leading-tight"
              style={{
                background: `linear-gradient(180deg, ${goldLight} 0%, ${goldTitanium} 50%, ${goldDark} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Sentir para rendir.
            </p>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════ */}
        {/* 8. PRÓXIMAMENTE */}
        {/* ═══════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="pb-8 border-b border-white/10 mb-10">
            <p
              className="text-[10px] tracking-[0.5em] uppercase font-medium mb-3"
              style={{ color: goldTitanium }}
            >
              Próximamente
            </p>
            <p className="text-white/50 text-sm max-w-2xl leading-relaxed font-light">
              Seguimos trabajando para traer más productos con nuestra tecnología
              somatosensorial.
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
                <div className="relative">
                  <h4 className="text-white text-sm font-medium mb-2">
                    {item.name}
                  </h4>
                  <span
                    className="text-[9px] tracking-[0.25em] uppercase"
                    style={{ color: 'rgba(191, 174, 133, 0.5)' }}
                  >
                    Próximamente
                  </span>
                </div>

                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, ${goldTitanium}, transparent)`,
                    boxShadow: `0 0 10px ${goldTitanium}`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}