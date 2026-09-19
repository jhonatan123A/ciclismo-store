'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TerminosPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-10 text-[11px] tracking-[0.2em] uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver
        </Link>

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 pb-10 border-b border-white/10"
        >
          <p className="text-eyebrow text-[#FF7A5C] mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#FF7A5C]" />
            Legal
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
            Términos y Condiciones
            <br />
            <span className="text-white/60">de Uso y Compra</span>
          </h1>
          <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-white/40">
            <FileText className="w-3.5 h-3.5" />
            <span>Versión 1.0</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>14 Septiembre 2026</span>
          </div>
        </motion.div>

        {/* CONTENIDO COMPLETO */}
        <div className="space-y-12 text-white/60 text-sm leading-[1.8]">

          {/* Introducción */}
          <div className="space-y-4">
            <p>
              Bienvenido a <span className="text-white font-medium">Bestige</span>. Los presentes términos y condiciones regulan el acceso, navegación, compra y utilización de los productos y servicios ofrecidos a través de nuestra página web oficial y demás canales autorizados de comunicación.
            </p>
            <p>
              Bestige es una marca desarrollada por <span className="text-white font-medium">FITHAB INNOVATION CI SAS</span>, empresa legalmente constituida bajo las leyes de la República de Colombia, enfocada en la creación de soluciones deportivas innovadoras mediante la integración de tecnología textil, ciencia del movimiento y principios relacionados con la percepción somatosensorial.
            </p>
            <p>
              Nuestra misión es desarrollar prendas deportivas que acompañen la experiencia del movimiento humano, combinando innovación, funcionalidad y conocimiento aplicado al rendimiento deportivo.
            </p>
            <p>
              Al ingresar a nuestra plataforma, realizar una compra o utilizar nuestros servicios, el usuario acepta los presentes términos y condiciones, así como las políticas complementarias relacionadas con compras, privacidad, tratamiento de datos personales, envíos, cambios y garantías.
            </p>
          </div>

          {/* 1. INFORMACIÓN GENERAL */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-eyebrow text-[#FF7A5C]">01</span>
              <h2 className="text-white font-bold text-base md:text-lg tracking-tight">
                Información general de la empresa
              </h2>
            </div>
            <p className="mb-4">La presente plataforma es propiedad de:</p>
            <ul className="space-y-2 pl-5 border-l border-white/10">
              <li><span className="text-white/80">Razón social:</span> FITHAB INNOVATION CI SAS</li>
              <li><span className="text-white/80">NIT:</span> 9016922526</li>
              <li><span className="text-white/80">Marca comercial:</span> Bestige</li>
              <li>
                <span className="text-white/80">Correo oficial:</span>{' '}
                <a href="mailto:bestigesomatosensorial@gmail.com" className="text-[#FF7A5C] hover:underline">
                  bestigesomatosensorial@gmail.com
                </a>
              </li>
              <li><span className="text-white/80">Web:</span> bestige-somatosensory-norbertowilches.com</li>
            </ul>
            <p className="mt-4">
              FITHAB INNOVATION CI SAS será denominada en adelante como &quot;Bestige&quot;, &quot;la marca&quot;, &quot;la compañía&quot; o &quot;la empresa&quot;.
            </p>
          </section>

          {/* 2. ACEPTACIÓN */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-eyebrow text-[#FF7A5C]">02</span>
              <h2 className="text-white font-bold text-base md:text-lg tracking-tight">
                Aceptación de los términos
              </h2>
            </div>
            <p>
              El usuario declara que al acceder al sitio web, navegar por la plataforma o adquirir productos ofrecidos por Bestige, ha leído, comprendido y aceptado las condiciones establecidas en este documento.
            </p>
            <p className="mt-4">
              Estos términos tienen como finalidad establecer las condiciones bajo las cuales Bestige ofrece sus productos, protege los derechos de sus usuarios y establece las responsabilidades correspondientes entre la empresa y el comprador.
            </p>
            <p className="mt-4">
              Bestige podrá actualizar, modificar o complementar estos términos cuando existan cambios legales, comerciales, tecnológicos o administrativos que lo requieran.
            </p>
            <p className="mt-4">
              Las modificaciones serán publicadas en la página web oficial y entrarán en vigencia desde su fecha de publicación.
            </p>
          </section>

          {/* 3. IDENTIDAD */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-eyebrow text-[#FF7A5C]">03</span>
              <h2 className="text-white font-bold text-base md:text-lg tracking-tight">
                Identidad y propósito de Bestige
              </h2>
            </div>
            <p>
              Bestige es una marca enfocada en el desarrollo de prendas deportivas de innovación tecnológica, creadas para acompañar el rendimiento físico y la conexión entre el cuerpo y el movimiento.
            </p>
            <p className="mt-4">
              La marca integra conocimientos provenientes del deporte de alto rendimiento, fisioterapia, biomecánica y percepción corporal para desarrollar productos orientados a mejorar la experiencia del usuario durante la actividad física.
            </p>
            <p className="mt-4">
              Bestige busca transformar la relación entre las personas y sus prendas deportivas mediante soluciones textiles funcionales, innovadoras y diseñadas alrededor del movimiento humano.
            </p>
          </section>

          {/* 4. USO DEL SITIO */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-eyebrow text-[#FF7A5C]">04</span>
              <h2 className="text-white font-bold text-base md:text-lg tracking-tight">
                Uso del sitio web
              </h2>
            </div>
            <p>
              El usuario se compromete a utilizar el sitio web oficial de Bestige de manera responsable, respetando la legislación vigente y los derechos de la compañía.
            </p>
            <p className="mt-4 mb-3 text-white/80">Está prohibido:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Utilizar la plataforma con fines fraudulentos.</li>
              <li>Intentar acceder a áreas restringidas del sistema.</li>
              <li>Interferir con la seguridad o funcionamiento del sitio web.</li>
              <li>Copiar, reproducir o distribuir contenido protegido de Bestige sin autorización.</li>
              <li>Utilizar la identidad visual, fotografías, diseños o información comercial de la marca con fines no autorizados.</li>
            </ul>
            <p className="mt-4">
              Bestige podrá restringir el acceso a usuarios que realicen actividades que afecten la seguridad, operación o reputación de la empresa.
            </p>
          </section>

          {/* 5. PROPIEDAD INTELECTUAL */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-eyebrow text-[#FF7A5C]">05</span>
              <h2 className="text-white font-bold text-base md:text-lg tracking-tight">
                Propiedad intelectual
              </h2>
            </div>
            <p className="mb-3">Todos los elementos asociados a Bestige, incluyendo:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nombre comercial.</li>
              <li>Logotipo.</li>
              <li>Diseños de prendas.</li>
              <li>Material audiovisual.</li>
              <li>Fotografías.</li>
              <li>Textos.</li>
              <li>Elementos gráficos.</li>
              <li>Conceptos de comunicación.</li>
              <li>Desarrollo de marca.</li>
            </ul>
            <p className="mt-4">
              son propiedad de FITHAB INNOVATION CI SAS o cuentan con las autorizaciones correspondientes para su utilización.
            </p>
            <p className="mt-4">
              Cualquier reproducción, modificación o uso comercial no autorizado podrá generar las acciones legales correspondientes.
            </p>
          </section>

          {/* 6. INFORMACIÓN DE PRODUCTOS */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-eyebrow text-[#FF7A5C]">06</span>
              <h2 className="text-white font-bold text-base md:text-lg tracking-tight">
                Información de los productos
              </h2>
            </div>
            <p>
              Bestige proporciona información detallada sobre sus productos buscando garantizar una experiencia clara y transparente para el usuario.
            </p>
            <p className="mt-4 mb-3 text-white/80">La información publicada puede incluir:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Características del producto.</li>
              <li>Materiales.</li>
              <li>Diseño.</li>
              <li>Tallas disponibles.</li>
              <li>Recomendaciones de uso.</li>
              <li>Funcionalidades.</li>
            </ul>
            <p className="mt-4">
              Las imágenes y representaciones digitales pueden presentar pequeñas diferencias debido a factores externos como iluminación, configuración de pantalla o procesos de fabricación textil. Estas diferencias no serán consideradas defectos del producto.
            </p>
          </section>

          {/* 7. NATURALEZA DEL PRODUCTO */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-eyebrow text-[#FF7A5C]">07</span>
              <h2 className="text-white font-bold text-base md:text-lg tracking-tight">
                Naturaleza del producto y alcance tecnológico
              </h2>
            </div>
            <p>
              Las prendas Bestige son productos deportivos diseñados para acompañar la experiencia del movimiento mediante características textiles orientadas a la percepción corporal y la interacción usuario-prenda.
            </p>
            <p className="mt-4">
              Bestige desarrolla soluciones inspiradas en principios relacionados con el sistema somatosensorial y el rendimiento deportivo.
            </p>
            <p className="mt-4 mb-3 text-white/80">El usuario reconoce que:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Las prendas Bestige no son dispositivos médicos.</li>
              <li>No sustituyen tratamientos médicos, procesos de rehabilitación ni recomendaciones profesionales.</li>
              <li>No realizan diagnósticos ni tratamientos de condiciones de salud.</li>
              <li>Los resultados pueden variar según factores individuales como condición física, entrenamiento, hábitos deportivos y características personales.</li>
            </ul>
            <p className="mt-4">
              La prenda debe utilizarse como complemento dentro de una práctica deportiva adecuada.
            </p>
          </section>

          {/* 8. COMPRA */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-eyebrow text-[#FF7A5C]">08</span>
              <h2 className="text-white font-bold text-base md:text-lg tracking-tight">
                Compra y responsabilidad del usuario
              </h2>
            </div>
            <p>
              El usuario deberá proporcionar información correcta y completa durante el proceso de compra.
            </p>
            <p className="mt-4 mb-3 text-white/80">El comprador será responsable de verificar:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nombre del destinatario.</li>
              <li>Dirección de entrega.</li>
              <li>Número de contacto.</li>
              <li>Producto seleccionado.</li>
              <li>Talla escogida.</li>
            </ul>
            <p className="mt-4">
              Bestige no será responsable por retrasos o inconvenientes derivados de información incorrecta suministrada por el cliente.
            </p>
          </section>

          {/* 9. PAGOS */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-eyebrow text-[#FF7A5C]">09</span>
              <h2 className="text-white font-bold text-base md:text-lg tracking-tight">
                Pagos y facturación
              </h2>
            </div>
            <p>
              Los pagos realizados mediante la plataforma estarán sujetos a los mecanismos de validación establecidos por los proveedores financieros autorizados. Una compra será considerada confirmada únicamente cuando el pago haya sido aprobado.
            </p>
            <p className="mt-4">
              FITHAB INNOVATION CI SAS realizará la facturación correspondiente conforme a las disposiciones tributarias vigentes en Colombia.
            </p>
          </section>

          {/* 10. ENVÍOS */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-eyebrow text-[#FF7A5C]">10</span>
              <h2 className="text-white font-bold text-base md:text-lg tracking-tight">
                Envíos y entrega
              </h2>
            </div>
            <p>
              Los productos serán enviados mediante operadores logísticos autorizados por Bestige.
            </p>
            <p className="mt-4 mb-3 text-white/80">Los tiempos de entrega dependerán de:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Lugar de destino.</li>
              <li>Disponibilidad del producto.</li>
              <li>Operación logística.</li>
              <li>Situaciones externas que puedan afectar el transporte.</li>
            </ul>
            <p className="mt-4">
              Bestige proporcionará información necesaria para facilitar el seguimiento del pedido.
            </p>
          </section>

          {/* 11. CAMBIOS */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-eyebrow text-[#FF7A5C]">11</span>
              <h2 className="text-white font-bold text-base md:text-lg tracking-tight">
                Cambios, garantías y devoluciones
              </h2>
            </div>
            <p>
              Se mantienen las condiciones generales descritas anteriormente y serán ajustadas según la política definitiva aprobada por FITHAB INNOVATION CI SAS.
            </p>
          </section>

          {/* 12. DATOS */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-eyebrow text-[#FF7A5C]">12</span>
              <h2 className="text-white font-bold text-base md:text-lg tracking-tight">
                Tratamiento de datos personales
              </h2>
            </div>
            <p>
              FITHAB INNOVATION CI SAS, como responsable del tratamiento de datos personales, protegerá la información suministrada por sus usuarios conforme a la legislación colombiana vigente.
            </p>
            <p className="mt-4 mb-3 text-white/80">Los datos podrán utilizarse para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Procesar compras.</li>
              <li>Gestionar entregas.</li>
              <li>Brindar atención al cliente.</li>
              <li>Mejorar productos y servicios.</li>
              <li>Enviar información comercial cuando exista autorización.</li>
            </ul>
            <p className="mt-4">El usuario podrá ejercer sus derechos mediante el correo:</p>
            <p className="mt-2">
              <a href="mailto:bestigesomatosensorial@gmail.com" className="text-[#FF7A5C] hover:underline">
                bestigesomatosensorial@gmail.com
              </a>
            </p>
          </section>

          {/* 13. CONTACTO */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-eyebrow text-[#FF7A5C]">13</span>
              <h2 className="text-white font-bold text-base md:text-lg tracking-tight">
                Contacto oficial
              </h2>
            </div>
            <p>Para solicitudes, peticiones, quejas, reclamos o información adicional:</p>
            <ul className="space-y-2 pl-5 mt-4 border-l border-white/10">
              <li>
                <span className="text-white/80">Correo:</span>{' '}
                <a href="mailto:bestigesomatosensorial@gmail.com" className="text-[#FF7A5C] hover:underline">
                  bestigesomatosensorial@gmail.com
                </a>
              </li>
              <li>
                <span className="text-white/80">Web:</span> bestige-somatosensory-norbertowilches.com
              </li>
            </ul>
          </section>

          {/* 14. LEGISLACIÓN */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-eyebrow text-[#FF7A5C]">14</span>
              <h2 className="text-white font-bold text-base md:text-lg tracking-tight">
                Legislación aplicable
              </h2>
            </div>
            <p>
              Los presentes términos y condiciones se rigen por las leyes de la República de Colombia.
            </p>
            <p className="mt-4">
              Cualquier diferencia relacionada con la utilización del sitio web, compra de productos o prestación de servicios será gestionada inicialmente mediante mecanismos de comunicación directa entre el usuario y FITHAB INNOVATION CI SAS.
            </p>
          </section>

          {/* ACEPTACIÓN */}
          <section className="pt-10 border-t border-white/10">
            <p className="text-eyebrow text-[#FF7A5C] mb-3">Aceptación</p>
            <p className="text-white/70">
              Al realizar una compra, registrarse o utilizar los canales oficiales de Bestige, el usuario manifiesta haber leído, comprendido y aceptado los presentes términos y condiciones.
            </p>
          </section>
        </div>

        {/* CTA FINAL */}
        <div className="text-center mt-20 pt-10 border-t border-white/5">
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-7 py-3.5 bg-white text-black rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase hover:bg-gray-100 transition-all duration-300"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}