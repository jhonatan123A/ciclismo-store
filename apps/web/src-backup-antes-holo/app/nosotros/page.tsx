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
    },
    {
      number: '02',
      title: 'Estímulo',
      description: 'Genera una experiencia sensorial que acompaña la percepción corporal.',
    },
    {
      number: '03',
      title: 'Percepción',
      description: 'El cuerpo recibe y procesa esa información.',
    },
    {
      number: '04',
      title: 'Movimiento',
      description: 'La información sensorial participa en la coordinación y respuesta muscular.',
    },
  ];

  const valores = [
    {
      title: 'Ciencia aplicada',
      description: 'Transformamos conocimiento del cuerpo humano en soluciones deportivas innovadoras.',
    },
    {
      title: 'Innovación',
      description: 'Creamos tecnología textil con un propósito: mejorar la relación entre el atleta y su movimiento.',
    },
    {
      title: 'Rendimiento humano',
      description: 'Creemos que la evolución deportiva comienza entendiendo mejor las capacidades naturales del cuerpo.',
    },
    {
      title: 'Precisión',
      description: 'Cada detalle de nuestra tecnología busca aportar una experiencia superior al deportista.',
    },
    {
      title: 'Evolución constante',
      description: 'Investigamos nuevas formas de conectar ciencia, deporte y tecnología para impulsar el futuro del rendimiento humano.',
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
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-white/40 hover:text-white transition-colors mb-10 text-[11px] tracking-[0.2em] uppercase"
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
          <p className="text-eyebrow text-[#FF7A5C] mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#FF7A5C]" />
            Nosotros
          </p>

          <h1 className="display-hero text-[clamp(2.2rem,6vw,5rem)] text-white mb-8">
            Cuando la fatiga aparece,
            <br />
            <span className="text-white/80">la conexión con tu cuerpo importa.</span>
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
              Por esta razón, desarrollamos prendas con <span className="text-[#FF7A5C]">tecnología somatosensorial</span>, una innovación diseñada para interactuar con la piel mediante estímulos que acompañan la percepción corporal y la respuesta natural del cuerpo durante la actividad física.
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
          <p className="text-eyebrow text-[#FF7A5C] mb-4 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#FF7A5C]" />
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
                className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#FF7A5C]/30 transition-all"
              >
                <p className="text-eyebrow text-[#FF7A5C] mb-2">{step.number}</p>
                <h3 className="text-white font-semibold text-sm mb-2">{step.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{step.description}</p>
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
            className="p-6 md:p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[#FF7A5C]/5 to-transparent"
          >
            <div className="w-10 h-10 rounded-lg bg-[#FF7A5C]/10 border border-[#FF7A5C]/20 flex items-center justify-center text-[#FF7A5C] mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-label text-[#FF7A5C] mb-3">Nuestra misión</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Desarrollar prendas deportivas de innovación tecnológica que integren ciencia, diseño y conocimiento del cuerpo humano para crear una conexión avanzada entre piel, percepción y movimiento.
            </p>
            <p className="text-white/60 text-sm leading-relaxed mt-3">
              Buscamos acompañar a los deportistas en la búsqueda de un mejor rendimiento, mayor control corporal y una experiencia optimizada durante el esfuerzo físico, especialmente en momentos donde la fatiga y la exigencia deportiva ponen a prueba la capacidad de adaptación del cuerpo.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[#7DD3FC]/5 to-transparent"
          >
            <div className="w-10 h-10 rounded-lg bg-[#7DD3FC]/10 border border-[#7DD3FC]/20 flex items-center justify-center text-[#7DD3FC] mb-4">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-label text-[#7DD3FC] mb-3">Nuestra visión</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Convertirnos en una marca referente mundial en tecnología deportiva somatosensorial, transformando la manera en que los atletas entienden y conectan con su cuerpo.
            </p>
            <p className="text-white/60 text-sm leading-relaxed mt-3">
              A través de la innovación textil y el conocimiento científico del movimiento humano, buscamos acompañar el rendimiento deportivo en momentos donde la precisión, la estabilidad y la conexión corporal son determinantes.
            </p>
          </motion.div>
        </div>

        {/* PROPUESTA DE VALOR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative p-6 md:p-10 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 backdrop-blur-sm mb-20 overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FF7A5C]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#7DD3FC]/10 rounded-full blur-3xl" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-4 h-4 text-[#FF7A5C]" />
              <p className="text-eyebrow text-[#FF7A5C]">Nuestra propuesta de valor</p>
            </div>

            <h2 className="display-large text-2xl md:text-3xl text-white mb-6">
              Cuando la fatiga aparece,
              <br />
              <span className="text-white/80">la conexión con tu cuerpo importa.</span>
            </h2>

            <p className="text-white/60 text-sm mb-6">
              Bestige está diseñada para deportistas que buscan:
            </p>

            <ul className="space-y-3 mb-8">
              {propuestaValor.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A5C] mt-2 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-white/50 text-xs leading-relaxed italic border-l-2 border-[#FF7A5C]/50 pl-4">
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
            <Heart className="w-4 h-4 text-[#FF7A5C]" />
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
                className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all"
              >
                <h4 className="text-white font-semibold text-sm mb-2">{valor.title}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{valor.description}</p>
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
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-gray-100 transition-all duration-300"
            >
              Ver tecnología
            </Link>
            <Link
              href="/products/cycling"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase border border-white/20 hover:border-white/40 transition-all duration-300"
            >
              Ver productos
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}