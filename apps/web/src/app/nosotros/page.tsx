'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Target, Heart, Eye, Award } from 'lucide-react';

export default function NosotrosPage() {
  const tecnologiaSteps = [
    {
      number: '01',
      title: 'Contacto',
      description: 'La prenda interactúa con la piel durante el movimiento.',
    },
    {
      number: '02',
      title: 'Estímulo',
      description: 'Genera información sensorial que acompaña la percepción corporal.',
    },
    {
      number: '03',
      title: 'Percepción',
      description: 'El cuerpo interpreta esa información y ajusta su respuesta.',
    },
    {
      number: '04',
      title: 'Movimiento',
      description: 'La conexión sensorial acompaña la coordinación corporal.',
    },
  ];

  const valores = [
    {
      title: 'Ciencia aplicada',
      description: 'Convertimos conocimiento del cuerpo humano en tecnología deportiva.',
    },
    {
      title: 'Precisión',
      description: 'Cada detalle está diseñado para acompañar el movimiento.',
    },
    {
      title: 'Innovación',
      description: 'Exploramos nuevas formas de conectar tecnología y cuerpo.',
    },
    {
      title: 'Rendimiento humano',
      description: 'La tecnología debe adaptarse al atleta, no al contrario.',
    },
  ];

  const propuestaValor = [
    'Mayor percepción corporal.',
    'Mejor control del movimiento.',
    'Acompañamiento durante esfuerzos prolongados.',
    'Una experiencia deportiva más consciente.',
  ];

  const goldTitanium = '#BFAE85';
  const goldLight = '#E5DCC0';
  const goldDark = '#8F7E45';

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-4 md:px-6 overflow-hidden bg-[#0A0A0A]">
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

      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-white/40 hover:text-[#BFAE85] transition-colors mb-10 text-[11px] tracking-[0.2em] uppercase"
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
          <p className="text-eyebrow text-[#BFAE85] mb-6 flex items-center gap-3">
            <span
              className="w-8 h-[1px]"
              style={{
                background: `linear-gradient(90deg, ${goldTitanium} 0%, transparent 100%)`,
              }}
            />
            Nuestra historia
          </p>

          <h1 className="display-hero text-[clamp(2.2rem,6vw,5rem)] mb-8">
            <span className="text-white">Cuando la fatiga aparece,</span>
            <br />
            <span
              style={{
                fontFamily: 'Satoshi, system-ui, sans-serif',
                fontWeight: 300,
                fontStyle: 'italic',
                background: `linear-gradient(180deg, ${goldLight} 0%, ${goldTitanium} 50%, ${goldDark} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textTransform: 'none',
                letterSpacing: '-0.01em',
              }}
            >
              la conexión con tu cuerpo importa.
            </span>
          </h1>

          <div className="max-w-3xl space-y-5 text-white/60 text-sm md:text-base leading-relaxed font-light">
            <p>
              En los momentos donde cada movimiento cuenta, el cuerpo necesita
              más que fuerza. Necesita información, respuesta y precisión.
            </p>
            <p>
              <span className="text-white">BESTIGE</span> nace para responder
              una pregunta: cómo la tecnología puede acompañar mejor la forma en
              que el cuerpo percibe, responde y evoluciona durante el movimiento.
            </p>
            <p>
              Desarrollamos prendas con{' '}
              <span className="text-[#BFAE85]">tecnología somatosensorial</span>,
              una innovación diseñada para interactuar con la piel mediante
              estímulos táctiles que acompañan la percepción corporal y la
              respuesta natural del cuerpo durante la actividad física.
            </p>
          </div>
        </motion.div>

        {/* EL ORIGEN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-eyebrow text-[#BFAE85] mb-4 flex items-center gap-3">
            <span
              className="w-8 h-[1px]"
              style={{
                background: `linear-gradient(90deg, ${goldTitanium} 0%, transparent 100%)`,
              }}
            />
            El origen
          </p>

          <h2 className="display-large text-2xl md:text-4xl text-white mb-6">
            Una pregunta nació desde el alto rendimiento.
          </h2>

          <div className="max-w-3xl space-y-5 text-white/60 text-sm md:text-base leading-relaxed font-light">
            <p className="text-white italic text-lg md:text-xl font-light border-l-2 border-[#BFAE85]/50 pl-5">
              ¿Qué pasaría si una prenda pudiera comunicarse mejor con el
              cuerpo?
            </p>
            <p>
              <span className="text-white">BESTIGE</span> nace de la unión entre
              una trayectoria familiar ligada al ciclismo de alto rendimiento y
              el conocimiento especializado del movimiento humano.
            </p>
            <p>
              La experiencia de{' '}
              <span className="text-white">Norberto Wilches</span> como ciclista
              profesional, junto al trabajo de investigación y fisioterapia de{' '}
              <span className="text-white">Jessica Cárdenas</span>, dieron origen
              a una marca creada para desarrollar tecnología textil enfocada en
              mejorar la conexión entre cuerpo y movimiento.
            </p>
            <p>
              Desde el deporte de alto rendimiento y el estudio del movimiento
              humano, identificamos un desafío fundamental: cuando aumenta la
              distancia, aparece la fatiga y cada movimiento exige mayor
              precisión, el cuerpo necesita mantener una comunicación eficiente
              entre sensación, percepción y respuesta muscular.
            </p>
          </div>
        </motion.div>

        {/* EL LEGADO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-eyebrow text-[#BFAE85] mb-4 flex items-center gap-3">
            <span
              className="w-8 h-[1px]"
              style={{
                background: `linear-gradient(90deg, ${goldTitanium} 0%, transparent 100%)`,
              }}
            />
            Una historia nacida desde el ciclismo de alto rendimiento
          </p>

          <h2 className="display-large text-2xl md:text-4xl text-white mb-6">
            Una historia construida sobre kilómetros de experiencia.
          </h2>

          <div className="max-w-3xl space-y-5 text-white/60 text-sm md:text-base leading-relaxed font-light">
            <p>
              BESTIGE nace desde una familia profundamente ligada al ciclismo
              colombiano.
            </p>
            <p>
              Durante más de cuatro décadas, el apellido Wilches ha estado
              relacionado con el ciclismo de alto rendimiento. El legado de{' '}
              <span className="text-white">Pablo Wilches</span>, protagonista de
              una época dorada del ciclismo nacional y participante en grandes
              competencias internacionales como el Tour de Francia, el Giro de
              Italia y la Vuelta a España, junto con la experiencia de{' '}
              <span className="text-white">Norberto Wilches</span> dentro del
              deporte competitivo, forman parte de la base desde la cual nace
              BESTIGE.
            </p>
            <p>
              Una historia construida sobre disciplina, kilómetros y una
              comprensión profunda de lo que ocurre cuando el cuerpo supera sus
              propios límites.
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
          <p className="text-eyebrow text-[#BFAE85] mb-4 flex items-center gap-3">
            <span
              className="w-8 h-[1px]"
              style={{
                background: `linear-gradient(90deg, ${goldTitanium} 0%, transparent 100%)`,
              }}
            />
            Nuestra tecnología
          </p>

          <h2 className="display-large text-2xl md:text-4xl text-white mb-4">
            La tecnología que conecta la piel con el movimiento.
          </h2>

          <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-2xl">
            El cuerpo recibe constantemente información a través de la piel.
            Bestige busca potenciar esa interacción mediante una prenda diseñada
            para acompañar el proceso natural del movimiento:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tecnologiaSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-5 rounded-xl border border-[#BFAE85]/15 bg-[#0A0A0A] transition-all overflow-hidden"
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
                  <p
                    className="text-eyebrow mb-2 font-medium"
                    style={{ color: goldTitanium }}
                  >
                    {step.number}
                  </p>
                  <h3 className="text-white font-semibold text-sm mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/50 text-xs leading-relaxed">
                    {step.description}
                  </p>
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
            className="relative p-6 md:p-8 rounded-2xl border border-[#BFAE85]/20 bg-gradient-to-br from-[#BFAE85]/5 to-transparent overflow-hidden"
          >
            <div
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'rgba(191, 174, 133, 0.10)' }}
            />
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-[#BFAE85]/10 border border-[#BFAE85]/20 flex items-center justify-center text-[#BFAE85] mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-label text-[#BFAE85] mb-3">Nuestra misión</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Crear prendas deportivas inteligentes que integren ciencia,
                diseño y tecnología textil para mejorar la relación entre el
                atleta y su movimiento.
              </p>
              <p className="text-white/60 text-sm leading-relaxed mt-3">
                Buscamos acompañar a los deportistas en la búsqueda de un mejor
                rendimiento, mayor control corporal y una experiencia optimizada
                durante el esfuerzo físico.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="relative p-6 md:p-8 rounded-2xl border border-[#BFAE85]/20 bg-gradient-to-br from-[#BFAE85]/5 to-transparent overflow-hidden"
          >
            <div
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'rgba(191, 174, 133, 0.10)' }}
            />
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-[#BFAE85]/10 border border-[#BFAE85]/20 flex items-center justify-center text-[#BFAE85] mb-4">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-label text-[#BFAE85] mb-3">Nuestra visión</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Transformar la manera en que los deportistas entienden la
                conexión entre cuerpo, tecnología y movimiento.
              </p>
              <p className="text-white/60 text-sm leading-relaxed mt-3">
                A través de la innovación textil y el conocimiento del
                movimiento humano, buscamos acompañar el rendimiento deportivo
                en momentos donde la precisión, la estabilidad y la conexión
                corporal son determinantes.
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
          className="relative p-6 md:p-10 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 backdrop-blur-sm mb-20 overflow-hidden"
        >
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl"
            style={{ background: 'rgba(191, 174, 133, 0.10)' }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl"
            style={{ background: 'rgba(191, 174, 133, 0.06)' }}
          />

          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-4 h-4 text-[#BFAE85]" />
              <p
                className="text-eyebrow"
                style={{ color: goldTitanium }}
              >
                Nuestra propuesta de valor
              </p>
            </div>

            <h2 className="display-large text-2xl md:text-3xl mb-6">
              <span className="text-white">Diseñada para cuando</span>
              <br />
              <span
                style={{
                  fontFamily: 'Satoshi, system-ui, sans-serif',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  background: `linear-gradient(180deg, ${goldLight} 0%, ${goldTitanium} 50%, ${goldDark} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                el cuerpo exige precisión.
              </span>
            </h2>

            <p className="text-white/60 text-sm mb-6">
              Bestige está diseñada para deportistas que buscan:
            </p>

            <ul className="space-y-3 mb-8">
              {propuestaValor.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{
                      backgroundColor: goldTitanium,
                      boxShadow: `0 0 8px ${goldTitanium}`,
                    }}
                  />
                  <span className="text-white/70 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-white/50 text-xs leading-relaxed italic border-l-2 border-[#BFAE85]/50 pl-4">
              Porque el rendimiento no solo depende de la fuerza, sino también
              de cómo el cuerpo percibe, responde y se adapta durante cada
              movimiento.
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
            <Heart className="w-4 h-4 text-[#BFAE85]" />
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Nuestros valores
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {valores.map((valor, index) => (
              <motion.div
                key={valor.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative p-5 rounded-xl border border-[#BFAE85]/15 bg-[#0A0A0A] transition-all overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, ${goldTitanium}, transparent)`,
                    boxShadow: `0 0 10px ${goldTitanium}`,
                  }}
                />
                <div className="relative">
                  <h4 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
                    <span
                      className="w-1 h-1 rounded-full"
                      style={{
                        backgroundColor: goldTitanium,
                        boxShadow: `0 0 6px ${goldTitanium}`,
                      }}
                    />
                    {valor.title}
                  </h4>
                  <p className="text-white/50 text-xs leading-relaxed">
                    {valor.description}
                  </p>
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
          <p className="text-white font-black text-2xl tracking-[0.35em] mb-4">
            BESTIGE
          </p>
          <p className="text-white/60 text-sm max-w-xl mx-auto leading-relaxed">
            La evolución de la conexión entre cuerpo, sensación y movimiento.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mt-10">
            <Link
              href="/technology"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-black text-[11px] font-semibold tracking-[0.2em] uppercase transition-all hover:shadow-[0_0_25px_rgba(191,174,133,0.4)] hover:scale-[1.02]"
              style={{ background: goldTitanium }}
            >
              Ver tecnología
            </Link>
            <Link
              href="/products/cycling"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent hover:bg-white/5 text-white rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase border border-[#BFAE85]/30 hover:border-[#BFAE85]/60 transition-all duration-300"
            >
              Ver productos
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}