'use client';

import Link from 'next/link';
import { Instagram, Mail } from 'lucide-react';
import { openCookiesBanner } from '@/hooks/useCookieConsent';

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black/80 backdrop-blur-xl mt-24 overflow-hidden">
      {/* Glow triádico de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-[#FF5A36]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-[#38BDF8]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E8B94A]/3 rounded-full blur-3xl" />
      </div>

      {/* Línea triádica superior */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF5A36] via-[#38BDF8] to-[#E8B94A] opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Columna 1: Marca */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="inline-block mb-4 group"
            >
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
                className="w-8 h-8 rounded-full border border-white/10 hover:border-[#FF5A36]/50 flex items-center justify-center text-white/60 hover:text-[#FF5A36] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,90,54,0.3)]"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:bestigesomatosensorial@gmail.com"
                className="w-8 h-8 rounded-full border border-white/10 hover:border-[#38BDF8]/50 flex items-center justify-center text-white/60 hover:text-[#38BDF8] transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Columna 2: Productos */}
          <div>
            <h4 className="text-eyebrow text-white/80 mb-4 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-[#FF5A36]" />
              Productos
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products/cycling"
                  className="text-white/40 hover:text-[#FF5A36] text-xs transition-colors duration-300"
                >
                  Ciclismo
                </Link>
              </li>
              <li>
                <Link
                  href="/products/running"
                  className="text-white/40 hover:text-[#FF5A36] text-xs transition-colors duration-300"
                >
                  Running
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Compañía */}
          <div>
            <h4 className="text-eyebrow text-white/80 mb-4 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-[#38BDF8]" />
              Compañía
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/nosotros"
                  className="text-white/40 hover:text-[#38BDF8] text-xs transition-colors duration-300"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/technology"
                  className="text-white/40 hover:text-[#38BDF8] text-xs transition-colors duration-300"
                >
                  Tecnología
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Legal */}
          <div>
            <h4 className="text-eyebrow text-white/80 mb-4 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-[#E8B94A]" />
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terminos"
                  className="text-white/40 hover:text-[#E8B94A] text-xs transition-colors duration-300"
                >
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidad"
                  className="text-white/40 hover:text-[#E8B94A] text-xs transition-colors duration-300"
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-white/40 hover:text-[#E8B94A] text-xs transition-colors duration-300"
                >
                  Política de cookies
                </Link>
              </li>
              <li>
                <button
                  onClick={() => openCookiesBanner()}
                  className="text-white/40 hover:text-[#E8B94A] text-xs transition-colors duration-300 text-left"
                >
                  Preferencias de cookies
                </button>
              </li>
              <li>
                <a
                  href="mailto:bestigesomatosensorial@gmail.com"
                  className="text-white/40 hover:text-[#E8B94A] text-xs transition-colors duration-300"
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
              className="text-white/30 hover:text-[#FF5A36] transition-colors duration-300"
            >
              Términos
            </Link>
            <span className="w-1 h-1 bg-[#FF5A36] rounded-full" />
            <Link
              href="/privacidad"
              className="text-white/30 hover:text-[#38BDF8] transition-colors duration-300"
            >
              Privacidad
            </Link>
            <span className="w-1 h-1 bg-[#38BDF8] rounded-full" />
            <Link
              href="/cookies"
              className="text-white/30 hover:text-[#E8B94A] transition-colors duration-300"
            >
              Cookies
            </Link>
            <span className="w-1 h-1 bg-[#E8B94A] rounded-full" />
            <button
              onClick={() => openCookiesBanner()}
              className="text-white/30 hover:text-[#C17A4B] transition-colors duration-300"
            >
              Preferencias
            </button>
            <span className="w-1 h-1 bg-[#C17A4B] rounded-full" />
            <a
              href="mailto:bestigesomatosensorial@gmail.com"
              className="text-white/30 hover:text-[#FF5A36] transition-colors duration-300"
            >
              bestigesomatosensorial@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}