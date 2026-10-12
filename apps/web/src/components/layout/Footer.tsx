'use client';

import Link from 'next/link';
import { Instagram, Mail } from 'lucide-react';
import { openCookiesBanner } from '@/hooks/useCookieConsent';

export function Footer() {
  const goldTitanium = '#BFAE85';

  return (
    <footer className="relative border-t border-white/10 bg-[#0A0A0A] mt-24 overflow-hidden">
      {/* Glow dorado sutil de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-[#BFAE85]/3 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-[#BFAE85]/2 rounded-full blur-3xl" />
      </div>

      {/* Línea dorada superior */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#BFAE85] to-transparent opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Columna 1: Marca */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4 group">
              <span className="text-white font-black text-lg tracking-[0.35em] group-hover:opacity-80 transition-opacity">
                BESTIGE
              </span>
            </Link>
            <p className="text-white/40 text-[11px] leading-relaxed max-w-xs">
              Tecnología somatosensorial que conecta la piel con el movimiento.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 hover:border-[#BFAE85]/50 flex items-center justify-center text-white/60 hover:text-[#BFAE85] transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:bestigesomatosensorial@gmail.com"
                className="w-8 h-8 rounded-full border border-white/10 hover:border-[#BFAE85]/50 flex items-center justify-center text-white/60 hover:text-[#BFAE85] transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Columna 2: Productos */}
          <div>
            <h4 className="text-eyebrow text-white/80 mb-4 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-[#BFAE85]" />
              Productos
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products/cycling"
                  className="text-white/40 hover:text-[#BFAE85] text-xs transition-colors duration-300"
                >
                  Ciclismo
                </Link>
              </li>
              <li>
                <Link
                  href="/products/running"
                  className="text-white/40 hover:text-[#BFAE85] text-xs transition-colors duration-300"
                >
                  Running
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Compañía */}
          <div>
            <h4 className="text-eyebrow text-white/80 mb-4 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-[#BFAE85]" />
              Compañía
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/nosotros"
                  className="text-white/40 hover:text-[#BFAE85] text-xs transition-colors duration-300"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/technology"
                  className="text-white/40 hover:text-[#BFAE85] text-xs transition-colors duration-300"
                >
                  Tecnología
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Legal */}
          <div>
            <h4 className="text-eyebrow text-white/80 mb-4 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-[#BFAE85]" />
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terminos"
                  className="text-white/40 hover:text-[#BFAE85] text-xs transition-colors duration-300"
                >
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidad"
                  className="text-white/40 hover:text-[#BFAE85] text-xs transition-colors duration-300"
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-white/40 hover:text-[#BFAE85] text-xs transition-colors duration-300"
                >
                  Política de cookies
                </Link>
              </li>
              <li>
                <button
                  onClick={() => openCookiesBanner()}
                  className="text-white/40 hover:text-[#BFAE85] text-xs transition-colors duration-300 text-left"
                >
                  Preferencias de cookies
                </button>
              </li>
              <li>
                <a
                  href="mailto:bestigesomatosensorial@gmail.com"
                  className="text-white/40 hover:text-[#BFAE85] text-xs transition-colors duration-300"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-[10px] tracking-wider text-center md:text-left">
            © {new Date().getFullYear()} BESTIGE · FITHAB INNOVATION CI SAS · Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] tracking-wider">
            <Link
              href="/terminos"
              className="text-white/30 hover:text-[#BFAE85] transition-colors duration-300"
            >
              Términos
            </Link>
            <span className="w-1 h-1 bg-[#BFAE85]/60 rounded-full" />
            <Link
              href="/privacidad"
              className="text-white/30 hover:text-[#BFAE85] transition-colors duration-300"
            >
              Privacidad
            </Link>
            <span className="w-1 h-1 bg-[#BFAE85]/60 rounded-full" />
            <Link
              href="/cookies"
              className="text-white/30 hover:text-[#BFAE85] transition-colors duration-300"
            >
              Cookies
            </Link>
            <span className="w-1 h-1 bg-[#BFAE85]/60 rounded-full" />
            <button
              onClick={() => openCookiesBanner()}
              className="text-white/30 hover:text-[#BFAE85] transition-colors duration-300"
            >
              Preferencias
            </button>
            <span className="w-1 h-1 bg-[#BFAE85]/60 rounded-full" />
            <a
              href="mailto:bestigesomatosensorial@gmail.com"
              className="text-white/30 hover:text-[#BFAE85] transition-colors duration-300"
            >
              bestigesomatosensorial@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}