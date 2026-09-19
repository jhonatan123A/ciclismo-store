'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function PrivacidadPage() {
  const sections = [
    {
      number: '01',
      title: 'Responsable del tratamiento',
      color: '#FF5A36',
      content: (
        <>
          <p>El responsable del tratamiento de tus datos personales es:</p>
          <ul className="space-y-1.5 mt-3">
            <li><span className="text-white/80">Razón social:</span> FITHAB INNOVATION CI SAS</li>
            <li><span className="text-white/80">NIT:</span> 9016922526</li>
            <li><span className="text-white/80">Marca comercial:</span> Bestige</li>
            <li><span className="text-white/80">Correo:</span> <a href="mailto:bestigesomatosensorial@gmail.com" className="text-[#FF5A36] hover:underline transition-colors">bestigesomatosensorial@gmail.com</a></li>
          </ul>
        </>
      ),
    },
    {
      number: '02',
      title: 'Datos que recopilamos',
      color: '#38BDF8',
      content: (
        <>
          <p>Recopilamos las siguientes categorías de datos:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1.5">
            <li><span className="text-white/80">Identificación:</span> Nombre, apellido, correo electrónico, teléfono, dirección de envío.</li>
            <li><span className="text-white/80">Pago:</span> Datos de facturación (procesados directamente por PayPal).</li>
            <li><span className="text-white/80">Navegación:</span> Dirección IP, tipo de dispositivo, navegador, páginas visitadas.</li>
            <li><span className="text-white/80">Preferencias:</span> Talla, color, historial de compras.</li>
          </ul>
        </>
      ),
    },
    {
      number: '03',
      title: 'Finalidad del tratamiento',
      color: '#E8B94A',
      content: (
        <>
          <p>Usamos tus datos para:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1.5">
            <li>Procesar tus pedidos y gestionar entregas.</li>
            <li>Brindar atención al cliente y responder consultas.</li>
            <li>Enviar información comercial (solo con tu autorización).</li>
            <li>Mejorar nuestros productos y servicios.</li>
            <li>Cumplir con obligaciones legales y tributarias.</li>
          </ul>
        </>
      ),
    },
    {
      number: '04',
      title: 'Base legal',
      color: '#C17A4B',
      content: (
        <>
          <p>Tratamos tus datos con base en:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1.5">
            <li><span className="text-white/80">Tu consentimiento:</span> Al aceptar términos y cookies.</li>
            <li><span className="text-white/80">Ejecución del contrato:</span> Para procesar tu compra.</li>
            <li><span className="text-white/80">Interés legítimo:</span> Para mejorar nuestros servicios.</li>
            <li><span className="text-white/80">Obligación legal:</span> Para cumplir con la ley colombiana.</li>
          </ul>
        </>
      ),
    },
    {
      number: '05',
      title: 'Tus derechos (Ley 1581 de Colombia)',
      color: '#FF5A36',
      content: (
        <>
          <p>Como titular de tus datos, tienes derecho a:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1.5">
            <li><span className="text-white/80">Conocer:</span> Qué datos tenemos sobre ti.</li>
            <li><span className="text-white/80">Actualizar:</span> Modificar datos incorrectos o desactualizados.</li>
            <li><span className="text-white/80">Rectificar:</span> Corregir información errónea.</li>
            <li><span className="text-white/80">Suprimir:</span> Solicitar la eliminación de tus datos.</li>
            <li><span className="text-white/80">Revocar:</span> Retirar tu autorización en cualquier momento.</li>
            <li><span className="text-white/80">Presentar quejas:</span> Ante la Superintendencia de Industria y Comercio.</li>
          </ul>
          <p className="mt-4">Para ejercer estos derechos, escríbenos a: <a href="mailto:bestigesomatosensorial@gmail.com" className="text-[#FF5A36] hover:underline transition-colors">bestigesomatosensorial@gmail.com</a></p>
        </>
      ),
    },
    {
      number: '06',
      title: 'Compartir datos con terceros',
      color: '#38BDF8',
      content: (
        <>
          <p>Compartimos datos con:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1.5">
            <li><span className="text-white/80">PayPal:</span> Para procesar pagos.</li>
            <li><span className="text-white/80">Operadores logísticos:</span> Para entregar tus productos.</li>
            <li><span className="text-white/80">Google Analytics:</span> Para métricas anónimas (solo si aceptas cookies de rendimiento).</li>
            <li><span className="text-white/80">Autoridades:</span> Cuando la ley lo requiera.</li>
          </ul>
        </>
      ),
    },
    {
      number: '07',
      title: 'Seguridad de los datos',
      color: '#E8B94A',
      content: 'Implementamos medidas técnicas y organizativas para proteger tus datos: cifrado SSL/TLS, acceso restringido, servidores seguros y cumplimiento de estándares internacionales. Sin embargo, ningún sistema es 100% infalible.',
    },
    {
      number: '08',
      title: 'Retención de datos',
      color: '#C17A4B',
      content: 'Conservamos tus datos mientras exista una relación comercial o hasta que solicites su eliminación. Los datos de facturación se conservan por 5 años por obligación tributaria.',
    },
    {
      number: '09',
      title: 'Transferencias internacionales',
      color: '#FF5A36',
      content: 'Algunos de nuestros proveedores (PayPal, Google) pueden almacenar datos en servidores fuera de Colombia. Estas transferencias cumplen con los estándares de protección exigidos por la Ley 1581.',
    },
    {
      number: '10',
      title: 'Menores de edad',
      color: '#38BDF8',
      content: 'Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos conscientemente datos de menores. Si eres padre/madre y crees que tu hijo nos proporcionó datos, contáctanos para eliminarlos.',
    },
    {
      number: '11',
      title: 'Cambios en esta política',
      color: '#E8B94A',
      content: 'Podemos actualizar esta política cuando sea necesario. Te notificaremos cambios significativos por correo electrónico o mediante un aviso en el sitio.',
    },
    {
      number: '12',
      title: 'Contacto',
      color: '#C17A4B',
      content: (
        <>
          <p>Para ejercer tus derechos o resolver dudas:</p>
          <p className="mt-2"><a href="mailto:bestigesomatosensorial@gmail.com" className="text-[#FF5A36] hover:underline transition-colors">bestigesomatosensorial@gmail.com</a></p>
          <p className="mt-1">FITHAB INNOVATION CI SAS · NIT: 9016922526 · Colombia</p>
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
            <span className="gradient-text-triad">Privacidad.</span>
          </h1>
          <p className="text-white/40 text-xs tracking-wider">
            Última actualización: 14 de septiembre de 2026 · Ley 1581 de 2012
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
          <p className="text-white/40 text-xs mb-6">¿Quieres revisar también nuestros términos generales?</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/terminos"
              className="inline-flex items-center gap-2 px-7 py-3.5 btn-orange text-[10px] tracking-[0.2em] uppercase font-semibold group"
            >
              Ver términos
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/cookies"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent border border-[#38BDF8]/40 hover:border-[#38BDF8]/80 text-white rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-[#38BDF8]/5 hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] transition-all group"
            >
              Política de cookies
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}