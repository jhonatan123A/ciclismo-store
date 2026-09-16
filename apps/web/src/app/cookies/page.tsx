'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CookiesPage() {
  const sections = [
    {
      number: '01',
      title: '¿Qué son las cookies?',
      content: 'Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (computador, tablet o móvil) cuando visitas un sitio web. Permiten que el sitio recuerde información sobre tu visita, como tus preferencias de idioma, el contenido de tu carrito de compras y otras configuraciones.',
    },
    {
      number: '02',
      title: '¿Qué tipos de cookies usamos?',
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
      content: (
        <>
          <p>Puedes modificar tus preferencias de cookies en cualquier momento:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1.5">
            <li>Haciendo clic en <span className="text-[#FF7A5C]">"Configurar cookies"</span> en el banner inicial.</li>
            <li>Desde el enlace <span className="text-[#FF7A5C]">"Preferencias de cookies"</span> en el footer del sitio.</li>
            <li>Desde la configuración de tu navegador (Chrome, Safari, Firefox, Edge).</li>
          </ul>
        </>
      ),
    },
    {
      number: '04',
      title: 'Cookies de terceros',
      content: 'Algunos servicios que usamos (Google Analytics, PayPal, Meta Pixel) pueden establecer sus propias cookies. Estas se rigen por las políticas de privacidad de cada proveedor. No tenemos control sobre ellas, pero puedes gestionarlas desde tu navegador.',
    },
    {
      number: '05',
      title: 'Duración de las cookies',
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
      content: 'Puedes retirar tu consentimiento en cualquier momento haciendo clic en "Preferencias de cookies" en el footer, o eliminando las cookies desde la configuración de tu navegador. Esto no afecta la legalidad del tratamiento previo.',
    },
    {
      number: '07',
      title: 'Actualizaciones',
      content: 'Esta política puede actualizarse para reflejar cambios en nuestras prácticas o por requisitos legales. Te notificaremos cuando hagamos cambios significativos.',
    },
    {
      number: '08',
      title: 'Contacto',
      content: (
        <>
          <p>Para consultas sobre cookies y privacidad:</p>
          <p className="mt-2"><a href="mailto:bestigesomatosensorial@gmail.com" className="text-[#FF7A5C] hover:underline">bestigesomatosensorial@gmail.com</a></p>
          <p className="mt-1">FITHAB INNOVATION CI SAS · NIT: 9016922526</p>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-10 text-[11px] tracking-[0.2em] uppercase"
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
          <p className="text-eyebrow text-[#FF7A5C] mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#FF7A5C]" />
            Documento legal
          </p>
          <h1 className="display-hero text-[clamp(2rem,5vw,4rem)] text-white mb-6">
            Política de
            <br />
            Cookies.
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
              className="pb-8 border-b border-white/5 last:border-0"
            >
              <div className="flex items-start gap-6">
                <span className="text-eyebrow text-[#FF7A5C] mt-1">{section.number}</span>
                <div className="flex-1">
                  <h2 className="text-white font-bold text-base md:text-lg mb-3">{section.title}</h2>
                  <div className="text-white/50 text-sm leading-relaxed">{section.content}</div>
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        <div className="text-center mt-16 pt-10 border-t border-white/5">
          <p className="text-white/40 text-xs mb-6">¿Quieres revisar también nuestros términos generales?</p>
          <Link
            href="/terminos"
            className="inline-flex items-center gap-3 px-7 py-3.5 bg-white text-black rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-gray-100 transition-all"
          >
            Ver términos y condiciones
          </Link>
        </div>
      </div>
    </div>
  );
}