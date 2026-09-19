'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function CookiesPage() {
  const sections = [
    {
      number: '01',
      title: '¿Qué son las cookies?',
      color: '#FF5A36',
      content: 'Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (computador, tablet o móvil) cuando visitas un sitio web. Permiten que el sitio recuerde información sobre tu visita, como tus preferencias de idioma, el contenido de tu carrito de compras y otras configuraciones.',
    },
    {
      number: '02',
      title: '¿Qué tipos de cookies usamos?',
      color: '#38BDF8',
      content: (
        <div className="space-y-4">
          <div>
            <p className="text-white/80 font-medium mb-1">🔒 Cookies esenciales</p>
            <p>Necesarias para el funcionamiento básico del sitio. Sin ellas, no podrías navegar ni realizar compras. Incluyen gestión de sesión, carrito de compras, seguridad y procesamiento de pagos.</p>
          </div>
          <div>
            <p className="text-white/80 font-medium mb-1">📊 Cookies de rendimiento</p>
            <p>Nos ayudan a entender cómo usas el sitio (páginas más visitadas, tiempo de permanencia). Usamos Google Analytics para obtener métricas anónimas y mejorar la experiencia.</p>
          </div>
          <div>
            <p className="text-white/80 font-medium mb-1">⚙️ Cookies de funcionalidad</p>
            <p>Recuerdan tus preferencias (idioma, región, tamaño de letra) para ofrecerte una experiencia personalizada en cada visita.</p>
          </div>
          <div>
            <p className="text-white/80 font-medium mb-1">📢 Cookies de marketing</p>
            <p>Permiten mostrarte anuncios personalizados de BESTIGE en otras plataformas (Meta, Google Ads) y medir la efectividad de nuestras campañas.</p>
          </div>
        </div>
      ),
    },
    {
      number: '03',
      title: '¿Cómo gestionar tus preferencias?',
      color: '#E8B94A',
      content: (
        <>
          <p>Puedes modificar tus preferencias de cookies en cualquier momento:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1.5">
            <li>Haciendo clic en <span className="text-[#FF5A36]">"Configurar cookies"</span> en el banner inicial.</li>
            <li>Desde el enlace <span className="text-[#38BDF8]">"Preferencias de cookies"</span> en el footer del sitio.</li>
            <li>Desde la configuración de tu navegador (Chrome, Safari, Firefox, Edge).</li>
          </ul>
        </>
      ),
    },
    {
      number: '04',
      title: 'Cookies de terceros',
      color: '#C17A4B',
      content: 'Algunos servicios que usamos (Google Analytics, PayPal, Meta Pixel) pueden establecer sus propias cookies. Estas se rigen por las políticas de privacidad de cada proveedor. No tenemos control sobre ellas, pero puedes gestionarlas desde tu navegador.',
    },
    {
      number: '05',
      title: 'Duración de las cookies',
      color: '#FF5A36',
      content: (
        <>
          <p>Las cookies pueden ser:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1.5">
            <li><span className="text-white/80">De sesión:</span> Se eliminan al cerrar el navegador.</li>
            <li><span className="text-white/80">Persistentes:</span> Permanecen en tu dispositivo por un tiempo definido (ej. 30 días, 1 año).</li>
          </ul>
        </>
      ),
    },
    {
      number: '06',
      title: 'Retirar el consentimiento',
      color: '#38BDF8',
      content: 'Puedes retirar tu consentimiento en cualquier momento haciendo clic en "Preferencias de cookies" en el footer, o eliminando las cookies desde la configuración de tu navegador. Esto no afecta la legalidad del tratamiento previo.',
    },
    {
      number: '07',
      title: 'Actualizaciones',
      color: '#E8B94A',
      content: 'Esta política puede actualizarse para reflejar cambios en nuestras prácticas o por requisitos legales. Te notificaremos cuando hagamos cambios significativos.',
    },
    {
      number: '08',
      title: 'Contacto',
      color: '#C17A4B',
      content: (
        <>
          <p>Para consultas sobre cookies y privacidad:</p>
          <p className="mt-2"><a href="mailto:bestigesomatosensorial@gmail.com" className="text-[#FF5A36] hover:underline transition-colors">bestigesomatosensorial@gmail.com</a></p>
          <p className="mt-1">FITHAB INNOVATION CI SAS · NIT: 9016922526</p>
        </>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6 md:px-10 overflow-hidden">
      {/* Glow triádico de fondo */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-[#FF5A36]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#38BDF8]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#E8B94A]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-[#FF5A36] transition-colors mb-10 text-[11px] tracking-[0.2em] uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 pb-10 border-b border-white/10"
        >
          <p className="text-eyebrow text-[#FF5A36] mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-gradient-to-r from-[#FF5A36] via-[#38BDF8] to-[#E8B94A]" />
            Documento legal
          </p>
          <h1 className="display-hero text-[clamp(2rem,5vw,4rem)] mb-6">
            <span className="text-white">Política de</span>
            <br />
            <span className="gradient-text-triad">Cookies.</span>
          </h1>
          <p className="text-white/40 text-xs tracking-wider">
            Última actualización: 14 de septiembre de 2026 · Versión 1.0
          </p>
        </motion.div>

        <div className="space-y-10">
          {sections.map((section, index) => (
            <motion.section
              key={section.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
              viewport={{ once: true }}
              className="group pb-8 border-b border-white/5 last:border-0"
            >
              <div className="flex items-start gap-6">
                <span
                  className="text-eyebrow mt-1"
                  style={{ color: section.color }}
                >
                  {section.number}
                </span>
                <div className="flex-1">
                  <h2 className="text-white font-bold text-base md:text-lg mb-3 flex items-center gap-2">
                    <span
                      className="w-1 h-1 rounded-full"
                      style={{
                        backgroundColor: section.color,
                        boxShadow: `0 0 8px ${section.color}`,
                      }}
                    />
                    {section.title}
                  </h2>
                  <div className="text-white/50 text-sm leading-relaxed">{section.content}</div>
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        {/* CTA Final */}
        <div className="text-center mt-16 pt-10 border-t border-white/5">
          <p className="text-white/40 text-xs mb-6">¿Quieres revisar también nuestras políticas?</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/terminos"
              className="inline-flex items-center gap-2 px-7 py-3.5 btn-orange text-[10px] tracking-[0.2em] uppercase font-semibold group"
            >
              Ver términos
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/privacidad"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent border border-[#38BDF8]/40 hover:border-[#38BDF8]/80 text-white rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-[#38BDF8]/5 hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] transition-all group"
            >
              Política de privacidad
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}