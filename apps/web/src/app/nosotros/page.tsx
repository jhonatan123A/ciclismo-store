'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Target, Heart, Eye, Award } from 'lucide-react';

export default function NosotrosPage() {
  const tecnologiaSteps = [
    {
      number: '01',
      title: 'Contacto',
      description: 'La prenda interactúa con la piel durante la actividad física.',
      color: '#FF5A36',
    },
    {
      number: '02',
      title: 'Estímulo',
      description: 'Genera una experiencia sensorial que acompaña la percepción corporal.',
      color: '#38BDF8',
    },
    {
      number: '03',
      title: 'Percepción',
      description: 'El cuerpo recibe y procesa esa información.',
      color: '#E8B94A',
    },
    {
      number: '04',
      title: 'Movimiento',
      description: 'La información sensorial participa en la coordinación y respuesta muscular.',
      color: '#C17A4B',
    },
  ];

  const valores = [
    {
      title: 'Ciencia aplicada',
      description: 'Transformamos conocimiento del cuerpo humano en soluciones deportivas innovadoras.',
      color: '#FF5A36',
    },
    {
      title: 'Innovación',
      description: 'Creamos tecnología textil con un propósito: mejorar la relación entre el atleta y su movimiento.',
      color: '#38BDF8',
    },
    {
      title: 'Rendimiento humano',
      description: 'Creemos que la evolución deportiva comienza entendiendo mejor las capacidades naturales del cuerpo.',
      color: '#E8B94A',
    },
    {
      title: 'Precisión',
      description: 'Cada detalle de nuestra tecnología busca aportar una experiencia superior al deportista.',
      color: '#C17A4B',
    },
    {
      title: 'Evolución constante',
      description: 'Investigamos nuevas formas de conectar ciencia, deporte y tecnología para impulsar el futuro del rendimiento humano.',
      color: '#FF5A36',
    },
  ];

  const propuestaValor = [
    'Mayor percepción corporal.',
    'Mejor control del movimiento.',
    'Una experiencia deportiva optimizada.',
    'Acompañamiento durante esfuerzos prolongados.',
    'Una conexión más consciente entre cuerpo y rendimiento.',
  ];

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-4 md:px-6 overflow-hidden">
      {/* Glow triádico de fondo */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-[#FF5A36]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#38BDF8]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#E8B94A]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-white/40 hover:text-[#FF5A36] transition-colors mb-10 text-[11px] tracking-[0.2em] uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver
        </Link>

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-eyebrow text-[#FF5A36] mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-gradient-to-r from-[#FF5A36] via-[#38BDF8] to-[#E8B94A]" />
            Nosotros
          </p>

          <h1 className="display-hero text-[clamp(2.2rem,6vw,5rem)] mb-8">
            <span className="text-white">Cuando la fatiga aparece,</span>
            <br />
            <span className="gradient-text-triad italic font-light normal-case tracking-tight">
              la conexión con tu cuerpo importa.
            </span>
          </h1>

          <div className="max-w-3xl space-y-5 text-white/60 text-sm md:text-base leading-relaxed font-light">
            <p>
              Bestige nace con una visión diferente del rendimiento deportivo: entender que el movimiento humano no comienza únicamente en los músculos, sino en la <span className="text-white">comunicación constante entre la piel, el sistema nervioso y el cerebro</span>.
            </p>
            <p>
              Creada desde la experiencia del ciclista profesional <span className="text-white">Norberto Wilches</span> y el conocimiento especializado de la fisioterapeuta <span className="text-white">Jessica Cárdenas</span>, Bestige surge como una marca enfocada en desarrollar tecnología deportiva que permita una <span className="text-white">conexión más profunda entre el cuerpo y el movimiento</span>.
            </p>
            <p>
              A través de la experiencia en el deporte de alto rendimiento y el estudio del movimiento humano, identificamos un desafío fundamental: cuando aumenta la distancia, aparece la fatiga y cada movimiento exige mayor precisión, el cuerpo necesita mantener una comunicación eficiente entre sensación, percepción y respuesta muscular.
            </p>
            <p>
              Por esta razón, desarrollamos prendas con <span className="text-[#FF5A36]">tecnología somatosensorial</span>, una innovación diseñada para interactuar con la piel mediante estímulos que acompañan la percepción corporal y la respuesta natural del cuerpo durante la actividad física.
            </p>
          </div>
        </motion.div>

        {/* NUESTRA TECNOLOGÍA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-eyebrow text-[#FF5A36] mb-4 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-gradient-to-r from-[#FF5A36] via-[#38BDF8] to-[#E8B94A]" />
            Nuestra tecnología
          </p>

          <h2 className="display-large text-2xl md:text-4xl text-white mb-4">
            La tecnología que conecta la piel con el movimiento.
          </h2>

          <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-2xl">
            El cuerpo recibe constantemente información a través de la piel. Bestige busca potenciar esa interacción mediante una prenda diseñada para generar una experiencia sensorial que acompaña el proceso natural del movimiento:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tecnologiaSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-5 rounded-xl border border-white/10 bg-white/[0.02] transition-all overflow-hidden"
                style={{ borderColor: `${step.color}15` }}
              >
                {/* Línea superior */}
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
                  <p className="text-eyebrow mb-2 font-medium" style={{ color: step.color }}>
                    {step.number}
                  </p>
                  <h3 className="text-white font-semibold text-sm mb-2">{step.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* MISIÓN Y VISIÓN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative p-6 md:p-8 rounded-2xl border border-[#FF5A36]/20 bg-gradient-to-br from-[#FF5A36]/5 to-transparent overflow-hidden card-neural"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FF5A36]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-[#FF5A36]/10 border border-[#FF5A36]/20 flex items-center justify-center text-[#FF5A36] mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-label text-[#FF5A36] mb-3">Nuestra misión</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Desarrollar prendas deportivas de innovación tecnológica que integren ciencia, diseño y conocimiento del cuerpo humano para crear una conexión avanzada entre piel, percepción y movimiento.
              </p>
              <p className="text-white/60 text-sm leading-relaxed mt-3">
                Buscamos acompañar a los deportistas en la búsqueda de un mejor rendimiento, mayor control corporal y una experiencia optimizada durante el esfuerzo físico, especialmente en momentos donde la fatiga y la exigencia deportiva ponen a prueba la capacidad de adaptación del cuerpo.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="relative p-6 md:p-8 rounded-2xl border border-[#38BDF8]/20 bg-gradient-to-br from-[#38BDF8]/5 to-transparent overflow-hidden card-neural"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center text-[#38BDF8] mb-4">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-label text-[#38BDF8] mb-3">Nuestra visión</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Convertirnos en una marca referente mundial en tecnología deportiva somatosensorial, transformando la manera en que los atletas entienden y conectan con su cuerpo.
              </p>
              <p className="text-white/60 text-sm leading-relaxed mt-3">
                A través de la innovación textil y el conocimiento científico del movimiento humano, buscamos acompañar el rendimiento deportivo en momentos donde la precisión, la estabilidad y la conexión corporal son determinantes.
              </p>
            </div>
          </motion.div>
        </div>

        {/* PROPUESTA DE VALOR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative p-6 md:p-10 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 backdrop-blur-sm mb-20 overflow-hidden card-neural"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FF5A36]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#38BDF8]/10 rounded-full blur-3xl" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-4 h-4 text-[#FF5A36]" />
              <p className="text-eyebrow gradient-text-triad">Nuestra propuesta de valor</p>
            </div>

            <h2 className="display-large text-2xl md:text-3xl mb-6">
              <span className="text-white">Cuando la fatiga aparece,</span>
              <br />
              <span className="gradient-text-triad italic font-light normal-case tracking-tight">la conexión con tu cuerpo importa.</span>
            </h2>

            <p className="text-white/60 text-sm mb-6">
              Bestige está diseñada para deportistas que buscan:
            </p>

            <ul className="space-y-3 mb-8">
              {propuestaValor.map((item, index) => {
                const colors = ['#FF5A36', '#38BDF8', '#E8B94A', '#C17A4B', '#FF5A36'];
                const color = colors[index % colors.length];
                return (
                  <li key={index} className="flex items-start gap-3">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{
                        backgroundColor: color,
                        boxShadow: `0 0 8px ${color}`,
                      }}
                    />
                    <span className="text-white/70 text-sm">{item}</span>
                  </li>
                );
              })}
            </ul>

            <p className="text-white/50 text-xs leading-relaxed italic border-l-2 border-[#FF5A36]/50 pl-4">
              Porque el rendimiento no solo depende de la fuerza, sino también de cómo el cuerpo percibe, responde y se adapta durante cada movimiento.
            </p>
          </div>
        </motion.div>

        {/* NUESTROS VALORES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <Heart className="w-4 h-4 text-[#FF5A36]" />
            <h2 className="text-xl md:text-2xl font-bold text-white">Nuestros valores</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {valores.map((valor, index) => (
              <motion.div
                key={valor.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative p-5 rounded-xl border border-white/10 bg-white/[0.02] transition-all overflow-hidden"
                style={{ borderColor: `${valor.color}15` }}
              >
                <div
                  className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, ${valor.color}, transparent)`,
                    boxShadow: `0 0 10px ${valor.color}`,
                  }}
                />
                <div className="relative">
                  <h4 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
                    <span
                      className="w-1 h-1 rounded-full"
                      style={{
                        backgroundColor: valor.color,
                        boxShadow: `0 0 6px ${valor.color}`,
                      }}
                    />
                    {valor.title}
                  </h4>
                  <p className="text-white/50 text-xs leading-relaxed">{valor.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CIERRE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center py-12 border-t border-white/10"
        >
          <p className="text-white font-black text-2xl tracking-[0.35em] mb-4">BESTIGE</p>
          <p className="text-white/60 text-sm max-w-xl mx-auto leading-relaxed">
            La evolución de la conexión entre cuerpo, sensación y movimiento.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mt-10">
            <Link
              href="/technology"
              className="inline-flex items-center gap-2 px-7 py-3.5 btn-orange text-[11px] font-semibold tracking-[0.2em] uppercase"
            >
              Ver tecnología
            </Link>
            <Link
              href="/products/cycling"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase border border-white/20 hover:border-[#FF5A36]/50 transition-all duration-300"
            >
              Ver productos
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}