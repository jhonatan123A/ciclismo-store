'use client';

import Link from 'next/link';
import { Instagram, Mail } from 'lucide-react';
import { openCookiesBanner } from '@/hooks/useCookieConsent';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/80 backdrop-blur-xl mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Columna 1: Marca */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-white font-black text-lg tracking-[0.35em] mb-4 inline-block">
              BESTIGE
            </Link>
            <p className="text-white/40 text-[11px] leading-relaxed max-w-xs">
              Tecnología somatosensorial que conecta la piel con el movimiento.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-white/60 hover:text-white transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:bestigesomatosensorial@gmail.com"
                className="w-8 h-8 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-white/60 hover:text-white transition-all"
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Columna 2: Productos */}
          <div>
            <h4 className="text-eyebrow text-white/80 mb-4">Productos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products/cycling" className="text-white/40 hover:text-white text-xs transition-colors">
                  Ciclismo
                </Link>
              </li>
              <li>
                <Link href="/products/running" className="text-white/40 hover:text-white text-xs transition-colors">
                  Running
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Compañía */}
          <div>
            <h4 className="text-eyebrow text-white/80 mb-4">Compañía</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/nosotros" className="text-white/40 hover:text-white text-xs transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/technology" className="text-white/40 hover:text-white text-xs transition-colors">
                  Tecnología
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Legal */}
          <div>
            <h4 className="text-eyebrow text-white/80 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terminos" className="text-white/40 hover:text-white text-xs transition-colors">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-white/40 hover:text-white text-xs transition-colors">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-white/40 hover:text-white text-xs transition-colors">
                  Política de cookies
                </Link>
              </li>
              <li>
                <button
                  onClick={() => openCookiesBanner()}
                  className="text-white/40 hover:text-white text-xs transition-colors text-left"
                >
                  Preferencias de cookies
                </button>
              </li>
              <li>
                <a
                  href="mailto:bestigesomatosensorial@gmail.com"
                  className="text-white/40 hover:text-white text-xs transition-colors"
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
            <Link href="/terminos" className="text-white/30 hover:text-white/60 transition-colors">
              Términos
            </Link>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <Link href="/privacidad" className="text-white/30 hover:text-white/60 transition-colors">
              Privacidad
            </Link>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <Link href="/cookies" className="text-white/30 hover:text-white/60 transition-colors">
              Cookies
            </Link>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <button
              onClick={() => openCookiesBanner()}
              className="text-white/30 hover:text-white/60 transition-colors"
            >
              Preferencias
            </button>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <a href="mailto:bestigesomatosensorial@gmail.com" className="text-white/30 hover:text-white/60 transition-colors">
              bestigesomatosensorial@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}